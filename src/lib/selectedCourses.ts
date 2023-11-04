import _courses from '$lib/data/courses.json' assert { type: 'json' };
const courses = _courses as Course[];

import { loadLocalStore, saveLocalStore } from '$lib';
import { get, writable } from 'svelte/store';
import { getCollege, getConcentration, getDegree, getMajor, selectedPrograms } from './selectedPrograms';
import { getCourseRquirements } from './requirements';

export const selectedCourses = writable<{ year: number; terms: { term: Term; courses: Course[] }[] }[]>(
  loadLocalStore('selectedCourses') ??
    Array(new Date().getFullYear() - 2023 + 4)
      .fill(0)
      .map((_, i) => ({
        year: new Date().getFullYear() + i,
        terms: [
          {
            term: Term.FALL,
            courses: []
          },
          {
            term: Term.WINTER,
            courses: []
          },
          {
            term: Term.SPRING,
            courses: []
          },
          {
            term: Term.SUMMER,
            courses: []
          }
        ]
      }))
);
selectedCourses.subscribe((value) => {
  saveLocalStore('selectedCourses', value);
});

let allDegreeRequirements: { discipline: string; code: string }[] = [];
let allCollegeRequirements: { discipline: string; code: string }[] = [];
let allMajorRequirements: { discipline: string; code: string }[] = [];
let allConcentrationRequirements: { discipline: string; code: string }[] = [];
let allBaccalaureateRequirements: { discipline: string; code: string }[] = [];

function updateCourseRequirements(
  programs: {
    degree: string;
    college: string;
    major: string;
    concentration: string;
  }[]
) {
  allDegreeRequirements = programs.flatMap((p) => (getDegree(p.degree)?.requirements ?? []).flatMap(getCourseRquirements).flatMap((r) => r.courses));
  allCollegeRequirements = programs.flatMap((p) => (getCollege(p.college)?.requirements ?? []).flatMap(getCourseRquirements).flatMap((r) => r.courses));
  allMajorRequirements = programs.flatMap((p) => (getMajor(p.major)?.requirements ?? []).flatMap(getCourseRquirements).flatMap((r) => r.courses));
  allConcentrationRequirements = programs.flatMap((p) => (getConcentration(p.concentration)?.requirements ?? []).flatMap(getCourseRquirements).flatMap((r) => r.courses));
  // allBaccalaureateRequirements = programs.flatMap((p) => getDegree(p.degree)?.baccalaureateRequirements ?? []);
  allBaccalaureateRequirements = [];
}
selectedPrograms.subscribe(updateCourseRequirements);

export function getCourse(discipline: string, code: string): Course | undefined {
  const course = courses.find((c) => c.discipline === discipline && c.code === code);
  if (!course) return undefined;

  const requirement = allDegreeRequirements.some((c) => c.discipline === discipline && c.code === code)
    ? Requirement.REQUIRED //
    : allCollegeRequirements.some((c) => c.discipline === discipline && c.code === code)
    ? Requirement.REQUIRED
    : allMajorRequirements.some((c) => c.discipline === discipline && c.code === code)
    ? Requirement.MAJOR
    : allConcentrationRequirements.some((c) => c.discipline === discipline && c.code === code)
    ? Requirement.CONCENTRATION
    : allBaccalaureateRequirements.some((c) => c.discipline === discipline && c.code === code)
    ? Requirement.BACCORE
    : Requirement.ELECTIVE;

  return {
    ...course,
    // Add extra data
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
        return years;
      }
    }
    return years;
  });
}

export function hasCourse(course: Course): boolean {
  return !!get(selectedCourses).some((y) => y.terms.some((t) => t.courses.some((c) => c.discipline === course.discipline && c.code === course.code)));
}

export function getPostrequisites(course: Course): Course[] {
  return courses.filter((c) => c.prerequisites.some((p) => p.discipline === course.discipline && p.code === course.code));
}

// export function removeCourse(course: Course) {
//   selectedCourses.update((courses) => courses.filter((c) => c !== course));
//   save();
// }

// export function updateCourse(course: Course) {
//   selectedCourses.update((courses) => {
//     const index = courses.findIndex((c) => c.discipline === course.discipline && c.code === course.code);
//     courses[index] = course;
//     return courses;
//   });
//   save();
// }

// function getMajor(majorCode: string): Major | undefined {
//   return majors.find((m) => m.majorCode === majorCode);
// }

// export function setMajor(majorCode: string) {
//   const major = getMajor(majorCode);
//   if (!major) return;
//   selectedMajor.update(() => major);
//   saveLocalStore('selectedMajor', majorCode);
// }

export type Course = {
  discipline: string;
  code: string;
  title: string;
  description?: string;
  descriptionAdditional?: string;

  repeatLimit: string;
  creditHourLow: string;
  creditHourHigh: string;
  creditHourIndicator: '' | 'TO' | 'OR';

  attributes: {
    code: string;
    description: string;
  }[];

  prerequisites: {
    discipline: string;
    code: string;
    levelCode: string;
    minimumGrade: string;
    concurrencyIndicator: string;
    connector: string;
    leftParenthesis: string;
    rightParenthesis: string;
  }[];

  sections: {
    termCode: string;
    termLiteral: string;
    courseReferenceNumber: string;
    sequenceNumber: string;
    scheduleCode: string;
    campusCode: string;
    courseTitle: string;
    creditHours: string;
    gradeModeCode: string;
    gradableIndicator: string;
    maximumEnrollment: string;
    enrollment: string;
    seatsAvailable: string;
    waitCapacity: string;
    waitCount: string;
    waitAvailable: string;
    meetings: {
      termCode: string;
      courseReferenceNumber: string;
      daysCode: string;
      dayNumber: string;
      beginTime: string;
      endTime: string;
      buildingCode: string;
      roomCode: string;
      activityDate: string;
      startDate: string;
      endDate: string;
      category: string;
      sunday: string;
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      scheduleCode: string;
      override: string;
      creditHourSession: string;
      meetingNumber: string;
      hoursPerWeek: string;
      funcCode: string;
      comtCode: string;
      schsCode: string;
      mtypCode: string;
    }[];
  }[];

  requirement: Requirement;
  status: Status;
};

export enum Term {
  FALL = 'FALL',
  WINTER = 'WINTER',
  SPRING = 'SPRING',
  SUMMER = 'SUMMER'
}
export const Terms = [Term.FALL, Term.WINTER, Term.SPRING, Term.SUMMER];

export const Requirement = {
  NONE: { value: 'NONE', style: 'border-gray-100' },
  REQUIRED: { value: 'REQUIRED', style: 'border-red-500' },
  BACCORE: { value: 'BACCORE', style: 'border-blue-500' },
  MAJOR: { value: 'MAJOR', style: 'border-amber-500' },
  CONCENTRATION: { value: 'CONCENTRATION', style: 'border-pink-500' },
  ELECTIVE: { value: 'ELECTIVE', style: 'border-green-500' }
};
export const Requirements = [Requirement.NONE, Requirement.REQUIRED, Requirement.BACCORE, Requirement.MAJOR, Requirement.CONCENTRATION, Requirement.ELECTIVE];

export type Requirement = typeof Requirement[keyof typeof Requirement];
export function nextRequirement(requirement: Requirement): Requirement {
  return Requirements[(Requirements.indexOf(requirement) + 1) % Requirements.length];
}
export function previousRequirement(requirement: Requirement): Requirement {
  return Requirements[(Requirements.indexOf(requirement) - 1 + Requirements.length) % Requirements.length];
}

export const Status = {
  NOT_STARTED: { value: 'NOT_STARTED', style: 'transparent' },
  NEXT_TERM: { value: 'NEXT_TERM', style: 'bg-amber-500' },
  IN_PROGRESS: { value: 'IN_PROGRESS', style: 'bg-blue-500' },
  COMPLETED: { value: 'COMPLETED', style: 'bg-green-500' }
};
export const Statuses = [Status.NOT_STARTED, Status.NEXT_TERM, Status.IN_PROGRESS, Status.COMPLETED];
export type Status = typeof Status[keyof typeof Status];
export function nextStatus(status: Status): Status {
  return Statuses[(Statuses.indexOf(status) + 1) % Statuses.length];
}
export function previousStatus(status: Status): Status {
  return Statuses[(Statuses.indexOf(status) - 1 + Statuses.length) % Statuses.length];
}
