const _courses = await (await fetch('/data/courses.json')).json();
const courses = _courses as Course[];

import { loadLocalStore, loadedFromURL, saveLocalStore, urlParams, type Course, Term, Terms, Status } from '$lib';
import { get, writable } from 'svelte/store';
import { getCourseCategory } from './selectedPrograms';

function importCourses(courses: string) {
  const importedCourses = JSON.parse(courses) as { year: number; terms: { term: Term; courses: { discipline: string; code: string }[] }[] }[];
  if (!importedCourses) return;
  return importedCourses.map((c) => ({
    year: c.year,
    terms: c.terms.map((t) => ({
      term: t.term,
      courses: t.courses.map((c) => getCourse(c.discipline, c.code)!)
    }))
  }));
}

export const selectedCourses = writable<{ year: number; terms: { term: Term; courses: Course[] }[] }[]>(
  loadedFromURL
    ? importCourses(urlParams.get('courses')!)
    : loadLocalStore('selectedCourses') ??
        Array(new Date().getFullYear() - 2023 + 4)
          .fill(0)
          .map((_, i) => ({
            year: new Date().getFullYear() + i,
            terms: Terms.map((term) => ({
              term,
              courses: []
            }))
          }))
);
let quickSave = false;
selectedCourses.subscribe((value) => {
  if (quickSave || loadedFromURL) return (quickSave = false);
  const lastTermHasCourses = !!value.at(-1)?.terms.at(-1)?.courses.length;
  if (lastTermHasCourses) {
    value.push({
      year: value.at(-1)!.year + 1,
      terms: Terms.map((term) => ({
        term,
        courses: []
      }))
    });
    quickSave = true;
    selectedCourses.set(value);
  }
  saveLocalStore('selectedCourses', value);
});

export function exportCourses() {
  const exportingCourses = get(selectedCourses).map((c) => ({
    year: c.year,
    terms: c.terms.map((t) => ({
      term: t.term,
      courses: t.courses.map((c) => ({
        discipline: c.discipline,
        code: c.code
      }))
    }))
  }));
  return JSON.stringify(exportingCourses);
}

export function getCourse(discipline: string, code: string, attribute?: string): Course | undefined {
  const disciplineRegex = `^${discipline.split('@').join('.*')}$`;
  const codeRegex = `^${code.split('@').join('.*')}$`;
  const course = courses.find((c) => c.discipline.match(disciplineRegex) && c.code.match(codeRegex) && (!attribute || c.attributes.some((a) => a.code === attribute)));
  if (!course) return undefined;

  // const course = courses.find((c) => c.discipline === discipline && c.code === code);
  // if (!course) return undefined;

  const requirement = getCourseCategory(course);

  return {
    ...course,
    status: Status.NOT_STARTED,
    requirement
  };
}

export function addCourse(course: Course, year: number, term: Term): Course | undefined {
  if (hasCourse(course)) return;
  selectedCourses.update((years) => {
    const yearIndex = years.find((y) => y.year === year);
    if (!yearIndex) return years;

    const termIndex = yearIndex.terms.find((t) => t.term === term);
    if (!termIndex) return years;

    termIndex.courses.push(course);
    return years;
  });
  return course;
}

export function moveCourse(course: Course, toYear: number, toTerm: Term): boolean {
  if (!hasCourse(course)) return false;
  selectedCourses.update((years) => {
    for (const year of years) {
      for (const term of year.terms) {
        term.courses = term.courses.filter((c) => c !== course);
      }
    }
    return years;
  });
  if (addCourse(course, toYear, toTerm)) return true;
  return false;
}

export function removeCourse(course: Course) {
  selectedCourses.update((years) => {
    for (const year of years) {
      for (const term of year.terms) {
        term.courses = term.courses.filter((c) => c !== course);
      }
    }
    return years;
  });
}

export function hasCourse(course: Course): boolean {
  return !!get(selectedCourses).some((y) => y.terms.some((t) => t.courses.some((c) => c.discipline === course.discipline && c.code === course.code)));
}

export function hasSomeCourseSelector(
  courses: { discipline: string; code: string }[],
  requirement: {
    credits?: number;
    courses?: number;
  }
) {
  const matches = courses.map((c) => getCourse(c.discipline, c.code)).filter((c) => c && hasCourseSelector(c.discipline, c.code));
  if (requirement.credits) {
    const credits = matches.reduce((a, c) => a + +(c!.creditHourLow || c!.creditHourHigh), 0);
    return credits >= requirement.credits;
  }
  if (requirement.courses) return matches.length >= requirement.courses;
  return false;
}

export function hasCourseSelector(discipline: string, code: string): boolean {
  const anyDiscipline = discipline === '@';
  const anyCode = code === '@';
  return !!get(selectedCourses).some((y) => y.terms.some((t) => t.courses.some((c) => (anyDiscipline || c.discipline === discipline) && (anyCode || c.code === code))));
}

export function getPostrequisites(course: Course): Course[] {
  return courses.filter((c) => c.prerequisites.some((p) => p.discipline === course.discipline && p.code === course.code));
}

export function getTermsOffered(course: Course): { year: number; terms: Term[] }[] {
  const years: { year: number; terms: Term[] }[] = [];
  course.sections.forEach((s) => {
    const [_year, _term] = s.termLiteral.split(' ');
    const year = +_year,
      term = _term.toUpperCase() as Term;
    const yearIndex = years.findIndex((y) => y.year === year);
    if (yearIndex === -1) years.push({ year: year, terms: [term] });
    else if (!years[yearIndex].terms.includes(term)) years[yearIndex].terms.push(term);
  });
  return years;
}
