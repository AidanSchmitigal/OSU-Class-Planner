// @ts-ignore
import { courses, allProgramsLoaded } from '$lib/selectedPrograms';

import { loadLocalStore, loadedFromURL, saveLocalStore, urlParams, type Course, Term, Terms, Status, Requirement } from '$lib';
import { get, writable } from 'svelte/store';

function importCourses(courses: string) {
  const importedCourses = JSON.parse(courses) as { year: number; terms: { term: Term; courses: { discipline: string; code: string, status: Status, requirement: Requirement }[] }[] }[];
  if (!importedCourses) return;
  allProgramsLoaded.then(() => {
  selectedCourses.set(importedCourses.map((c) => ({
    year: c.year,
    terms: c.terms.map((t) => ({
      term: t.term,
      courses: t.courses.map((c) => {
        const course = getCourse(c.discipline, c.code)!
        course.status = c.status;
        course.requirement = c.requirement;
        return course;
      }),
    }))
  })));
  });
  return []
}

export const selectedCourses = writable<{ year: number; terms: { term: Term; courses: Course[] }[] }[]>(
  loadedFromURL
    ? importCourses(urlParams.get('courses')!)
    : loadLocalStore('selectedCourses') ??
        Array(new Date().getFullYear() - 2022 + 4)
          .fill(0)
          .map((_, i) => ({
            year: 2022 + i,
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
export const psuedoCourses = writable<Map<string, { discipline: string; code: string }[]>>(new Map(loadLocalStore('psuedoCourses')));
psuedoCourses.subscribe((value) => saveLocalStore('psuedoCourses', Array.from(value.entries())));

export function exportCourses() {
  const exportingCourses = get(selectedCourses).map((c) => ({
    year: c.year,
    terms: c.terms.map((t) => ({
      term: t.term,
      courses: t.courses.map((c) => ({
        discipline: c.discipline,
        code: c.code,
        status: c.status,
        requirement: c.requirement
      }))
    }))
  }));
  return JSON.stringify(exportingCourses);
}

export function getCourse(discipline: string, code: string, assignedRequirement?: Requirement): Course | undefined {
  const course = courses.find((c) => c.discipline === discipline && c.code === code);
  if (!course) return undefined;

  return {
    ...course,
    status: Status.NOT_STARTED,
    requirement: assignedRequirement ?? Requirement.NONE
  };
}

export function getAllCoursesMatching(discipline: string, code: string, attribute?: string, assignedRequirement?: Requirement): Course[] {
  const disciplineRegex = `^${discipline.split('@').join('.*')}$`;
  const codeRegex = `^${code.split('@').join('.*')}$`;
  const fcourses = courses.filter((c) => c.discipline.match(disciplineRegex) && c.code.match(codeRegex) && (!attribute || c.attributes.some((a) => a.code === attribute)));
  return fcourses.map((course) => ({
    ...course,
    status: Status.NOT_STARTED,
    requirement: assignedRequirement ?? Requirement.NONE
  }));
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

export function getPsuedoCourses(key: string): { discipline: string; code: string }[] {
  if (get(psuedoCourses).has(key)) return get(psuedoCourses).get(key)!;
  psuedoCourses.update((p) => p.set(key, []));
  return [];
}

export function addPsuedoCourse(key: string, discipline: string, code: string) {
  if (!getCourse(discipline, code)) return;
  psuedoCourses.update((p) => {
    const courses = p.get(key)!;
    if (courses.some((c) => c.discipline === discipline && c.code === code)) return p;
    courses.push({ discipline, code });
    p.set(key, courses);
    return p;
  });
}

export function hasCourse(course: Course): boolean {
  return !!get(selectedCourses).some((y) => y.terms.some((t) => t.courses.some((c) => c.discipline === course.discipline && c.code === course.code)));
}

export function hasSomeCourseSelector(
  courses: { discipline: string; code: string; attribute?: string }[],
  requirement: {
    credits?: number;
    courses?: number;
  }
) {
  const matches = courses
    .filter((c) => hasCourseSelector(c.discipline, c.code, c.attribute))
    .map((c) => getAllCoursesMatching(c.discipline, c.code, c.attribute))
    .flat();
  if (requirement.credits) {
    const credits = matches.reduce((a, c) => a + getCredits(c!), 0);
    return credits >= requirement.credits;
  }
  if (requirement.courses) return matches.length >= requirement.courses;
  return false;
}

export function hasCourseSelector(discipline: string, code: string, attribute?: string): boolean {
  const disciplineRegex = `^${discipline.split('@').join('.*')}$`;
  const codeRegex = `^${code.split('@').join('.*')}$`;
  return !!get(selectedCourses).some((y) => y.terms.some((t) => t.courses.some((c) => c.discipline.match(disciplineRegex) && c.code.match(codeRegex) && (!attribute || c.attributes.some((a) => a.code === attribute)))));
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

export function getCredits(course: Course): number {
  if (course.creditHourHigh !== '') return +course.creditHourHigh;
  return +course.creditHourLow;
}
