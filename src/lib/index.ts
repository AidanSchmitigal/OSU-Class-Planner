// import degreeTree from '$lib/data/degreeTree.json';
// import degrees from '$lib/data/majors.json';
import majorsData from '$lib/data/majors.json';
// import concentrations from '$lib/data/majors.json';
// // import coursesData from '$lib/data/classes.json';
// // import baccoreData from '$lib/data/baccore.json';
// import { selectedMajor } from './selectedCourses';
// import { get } from 'svelte/store';

export type Major = {
  majorCode: string;
  title: string;
  courses: { discipline: string; number: string }[][];
};
export { majorsData as majors };

export type BacCore = {
  title: string;
  courses: { discipline: string; number: string }[];
};
// export { baccoreData as baccores };

export function loadLocalStore<T>(key: string): T | undefined {
  const localStore = localStorage.getItem(key);
  if (localStore) {
    return JSON.parse(localStore);
  }
  return undefined;
}

export function saveLocalStore(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}

// type Prerequisite = {
// 	operator: 'AND' | 'OR';
// 	classes: ClassModel[];
// };

export type Course = {
  discipline: string;
  code: string;
  title: string;
  credits: string;
  prerequisites: { discipline: string; code: string }[];
  year: number;
  term: Term;
  requirement: Requirement;
  status: Status;
};

// export function getCourseData(discipline: string, code: string | number): Course | undefined {
//   const foundClass = coursesData.find((c) => c.discipline === discipline && c.code == code);
//   if (!foundClass) return console.log(`Could not find course ${discipline} ${code}`), undefined;

//   let requirement = Requirement.NONE;
//   if (get(selectedMajor)?.courses.find((c) => c.find((c) => c.discipline === discipline && c.number === code))) {
//     requirement = Requirement.MAJOR;
//   } else if (baccoreData.find((b) => b.courses.find((c) => c.discipline === discipline && c.number === code))) {
//     requirement = Requirement.BACCORE;
//   }

//   return {
//     ...foundClass,
//     status: Status.NOT_STARTED,
//     requirement,
//     year: -1,
//     term: Term.FALL
//   };
// }

export enum Term {
  FALL = 'FALL',
  WINTER = 'WINTER',
  SPRING = 'SPRING',
  SUMMER = 'SUMMER'
}

export const Requirement = {
  NONE: { value: 'NONE', style: 'border-gray-100' },
  REQUIRED: { value: 'REQUIRED', style: 'border-red-500' },
  BACCORE: { value: 'BACCORE', style: 'border-blue-500' },
  MAJOR: { value: 'MAJOR', style: 'border-amber-500' },
  ELECTIVE: { value: 'ELECTIVE', style: 'border-green-500' }
};
export type Requirement = typeof Requirement[keyof typeof Requirement];
export function nextRequirement(requirement: Requirement): Requirement {
  switch (requirement) {
    case Requirement.NONE:
      return Requirement.REQUIRED;
    case Requirement.REQUIRED:
      return Requirement.BACCORE;
    case Requirement.BACCORE:
      return Requirement.MAJOR;
    case Requirement.MAJOR:
      return Requirement.ELECTIVE;
    case Requirement.ELECTIVE:
      return Requirement.NONE;
    default:
      return Requirement.NONE;
  }
}
export function previousRequirement(requirement: Requirement): Requirement {
  switch (requirement) {
    case Requirement.NONE:
      return Requirement.ELECTIVE;
    case Requirement.REQUIRED:
      return Requirement.NONE;
    case Requirement.BACCORE:
      return Requirement.REQUIRED;
    case Requirement.MAJOR:
      return Requirement.BACCORE;
    case Requirement.ELECTIVE:
      return Requirement.MAJOR;
    default:
      return Requirement.NONE;
  }
}

export const Status = {
  NOT_STARTED: { value: 'NOT_STARTED', style: 'transparent' },
  NEXT_TERM: { value: 'NEXT_TERM', style: 'bg-amber-500' },
  IN_PROGRESS: { value: 'IN_PROGRESS', style: 'bg-blue-500' },
  COMPLETED: { value: 'COMPLETED', style: 'bg-green-500' }
};
export type Status = typeof Status[keyof typeof Status];
export function nextStatus(status: Status): Status {
  switch (status) {
    case Status.NOT_STARTED:
      return Status.NEXT_TERM;
    case Status.NEXT_TERM:
      return Status.IN_PROGRESS;
    case Status.IN_PROGRESS:
      return Status.COMPLETED;
    case Status.COMPLETED:
      return Status.NOT_STARTED;
    default:
      return Status.NOT_STARTED;
  }
}
export function previousStatus(status: Status): Status {
  switch (status) {
    case Status.NOT_STARTED:
      return Status.COMPLETED;
    case Status.NEXT_TERM:
      return Status.NOT_STARTED;
    case Status.IN_PROGRESS:
      return Status.NEXT_TERM;
    case Status.COMPLETED:
      return Status.IN_PROGRESS;
    default:
      return Status.NOT_STARTED;
  }
}
