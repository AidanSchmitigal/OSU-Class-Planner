// import degreeTree from '$lib/data/degreeTree.json';
// import degrees from '$lib/data/majors.json';
// import majorsData from '$lib/data/majors.json';
// import concentrations from '$lib/data/majors.json';
// // import coursesData from '$lib/data/classes.json';
// // import baccoreData from '$lib/data/baccore.json';
// import { selectedMajor } from './selectedCourses';
// import { get } from 'svelte/store';

// export type Major = {
//   majorCode: string;
//   title: string;
//   courses: { discipline: string; number: string }[][];
// };
// export { majorsData as majors };

// export type BacCore = {
//   title: string;
//   courses: { discipline: string; number: string }[];
// };
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
