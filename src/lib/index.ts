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
// console.log('doing');
// import allthe from '$lib/data/TBD/allAudits.json';
// console.log('import done');
// allthe.forEach((a) => {
//   console.log(`\n${a.degree} ${a.college} ${a.major} ${a.concentration}`);
//   a.audit.blockArray.forEach((b) => {
//     console.log(`> ${b.requirementType} ${b.requirementValue}`);
//   });
// });

// const requirementsByCategory = {};

// allthe
//   .map((a) => {
//     const { degree, college, major, concentration, audit } = a;
//     return {
//       degree,
//       college,
//       major,
//       concentration,
//       audit: audit.blockArray.map((b) => ({
//         requirementType: b.requirementType,
//         requirementValue: b.requirementValue
//       }))
//     };
//   })
//   .forEach((entry) => {
//     const { degree, college, major, concentration, audit } = entry;

//     if (!requirementsByCategory[degree]) requirementsByCategory[degree] = {};
//     if (!requirementsByCategory[degree][college]) requirementsByCategory[degree][college] = {};
//     if (!requirementsByCategory[degree][college][major]) requirementsByCategory[degree][college][major] = {};
//     if (!requirementsByCategory[degree][college][major][concentration]) requirementsByCategory[degree][college][major][concentration] = [];

//     audit.forEach((b) => {
//       if (!requirementsByCategory[degree][college][major][concentration].includes(b)) {
//         requirementsByCategory[degree][college][major][concentration].push(b);
//       }
//     });
//   });

/*
requirementsByCategory looks like this:
{
  "degreeID": {
    "collegeID": {
      "majorID": {
        "concentrationID": [
          {
            requirementType: 'MAJOR',
            requirementValue: 'MAJORID'
          }
        ]
      }
    }
  }
}

[
  {
    "selfId": "",
    "requirements": []
    "ids": [
      {
        "selfId": "",
        "requirements": [],
        "ids": [
          {
            "selfId": "",
            "requirements": [],
            "ids": [
              {
                "selfId": "",
                "requirements": [
                  {
                    requirementType: 'MAJOR',
                    requirementValue: 'MAJORID'
                  }
                ],
                "ids": []
              }
            ]
          }
        ]
      }
    ]
  }
]
*/

// const newDataFormat = [];
// for (const degree in requirementsByCategory) {
//   const degreeObject = {
//     selfId: degree,
//     requirements: [],
//     ids: []
//   };
//   for (const college in requirementsByCategory[degree]) {
//     const collegeObject = {
//       selfId: college,
//       requirements: [],
//       ids: []
//     };
//     for (const major in requirementsByCategory[degree][college]) {
//       const majorObject = {
//         selfId: major,
//         requirements: [],
//         ids: []
//       };
//       for (const concentration in requirementsByCategory[degree][college][major]) {
//         if (concentration === '') {
//           majorObject.requirements = requirementsByCategory[degree][college][major][concentration];
//           continue;
//         }
//         const concentrationObject = {
//           selfId: concentration,
//           requirements: requirementsByCategory[degree][college][major][concentration],
//           ids: []
//         };
//         majorObject.ids.push(concentrationObject);
//       }
//       collegeObject.ids.push(majorObject);
//     }
//     degreeObject.ids.push(collegeObject);
//   }
//   newDataFormat.push(degreeObject);
// }

// Find common requirements
// Go deep into tree, then back out one
// If all leaves on that level have the same requirement, then that is a common requirement
// Then move the requirement up one level and remove it from the leaves
// Repeat until all requirements have been looped over
// console.log(newDataFormat);
// let a = {
//   selfId: '',
//   requirements: [],
//   ids: newDataFormat
// };
// console.log(getCommonRequirements(a)[1]);

// function getCommonRequirements(node) {
//   if (node.ids.length === 0) return console.log('returning base'), [node.requirements, node];
//   let commonRequirements = [...node.requirements];
//   let ids = [];

//   for (const child of node.ids) {
//     const [childRequirements, self] = getCommonRequirements(child);
//     ids.push(self);
//     if (commonRequirements.length === 0) commonRequirements = childRequirements;
//     commonRequirements = commonRequirements.filter((requirement) => childRequirements.find((r) => r.requirementType == requirement.requirementType && r.requirementValue == requirement.requirementValue));
//   }
//   for (const child of node.ids) {
//     child.requirements = child.requirements.filter((requirement) => !commonRequirements.find((r) => r.requirementType == requirement.requirementType && r.requirementValue == requirement.requirementValue));
//   }
//   node.requirements = commonRequirements;
//   node.ids = ids;
//   return [commonRequirements, node];
// }

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
