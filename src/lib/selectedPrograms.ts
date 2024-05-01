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
  allBaccalaureateRequirements = blocks.flatMap((p) => p.courseRequirements ?? []).flatMap((r) => r.courses);
}

export function getCourseCategory(course: Course) {
  const equals = (c: { discipline: string; code: string }) => c.discipline === course.discipline && c.code === course.code;
  return allDegreeRequirements.some(equals)
    ? Requirement.REQUIRED //
    : allCollegeRequirements.some(equals)
      ? Requirement.REQUIRED
      : allMajorRequirements.some(equals)
        ? Requirement.MAJOR
        : allConcentrationRequirements.some(equals)
          ? Requirement.CONCENTRATION
          : allBaccalaureateRequirements.some(equals)
            ? Requirement.BACCORE
            : Requirement.ELECTIVE;
}

// @ts-ignore
const _degreeTree = await (await fetch('/data/degreeTree.json')).json();
const degreeTree = _degreeTree as {
  degree: string;
  colleges: {
    college: string;
    majors: {
      major: string;
      concentrations: string[];
    }[];
  }[];
}[];
function addCourseRequirementsToOBJ(_: unknown) {
  return (_ as unknown as ProgramList).map((e) => ({
    ...e,
    courseRequirements: e.requirements.flatMap(getCourseRquirements)
  })) as ProgramList;
}

// @ts-ignore
const _blocks = await (await fetch('/data/blocks.json')).json().then((j) => (loadPart('blocks'), j));
const blocks = addCourseRequirementsToOBJ(_blocks);
// @ts-ignore
// import _degrees from '$lib/data/degrees.json' assert { type: 'json' };
const _degrees = await (await fetch('/data/degrees.json')).json().then((j) => (loadPart('degrees'), j));
const degrees = addCourseRequirementsToOBJ(_degrees);
// @ts-ignore
const _colleges = await (await fetch('/data/colleges.json')).json().then((j) => (loadPart('colleges'), j));
// @ts-ignore
const colleges = addCourseRequirementsToOBJ(_colleges);
// @ts-ignore
const _majors = await (await fetch('/data/majors.json')).json().then((j) => (loadPart('majors'), j));
const majors = addCourseRequirementsToOBJ(_majors);
// @ts-ignore
const _concentrations = await (await fetch('/data/concentrations.json')).json().then((j) => (loadPart('concentrations'), j));
const concentrations = addCourseRequirementsToOBJ(_concentrations);
// @ts-ignore
const _minors = await (await fetch('/data/minors.json')).json().then((j) => (loadPart('minors'), j));
const minors = addCourseRequirementsToOBJ(_minors);

// blocks.forEach((b) => {
//   b.requirements.forEach(ruleToString);
// });
// degrees.forEach((b) => {
//   b.requirements.forEach(ruleToString);
// });
// colleges.forEach((b) => {
//   b.requirements.forEach(ruleToString);
// });
// majors.forEach((b) => {
//   b.requirements.forEach(ruleToString);
// });
// concentrations.forEach((b) => {
//   b.requirements.forEach(ruleToString);
// });
// minors.forEach((b) => {
//   b.requirements.forEach(ruleToString);
// });

type ProgramList = {
  key: string;
  description: string;
  requirements: Rule[];
  courseRequirements: {
    label: string;
    coursesNeeded?: number;
    creditsNeeded?: number;
    courses: {
      discipline: string;
      code: string;
      attribute?: string;
    }[];
  }[];
}[];

import { get, writable } from 'svelte/store';
import { getCourseRquirements, type Rule } from './requirements';
import { loadLocalStore, loadedFromURL, saveLocalStore, urlParams, type Course, Requirement } from '$lib';

function importPrograms(programs: string) {
  if (!programs) return null;
  return JSON.parse(programs);
}
function importMinors(minors: string) {
  if (!minors) return null;
  return JSON.parse(minors);
}

export const selectedPrograms = writable<
  {
    degree: string;
    college: string;
    major: string;
    concentration: string;
  }[]
>(loadedFromURL ? importPrograms(urlParams.get('programs')!) : loadLocalStore('selectedPrograms') ?? []);
selectedPrograms.subscribe((value) => {
  if (!loadedFromURL) saveLocalStore('selectedPrograms', value);
  updateCourseRequirements(value);
});
export const selectedMinors = writable<string[]>(loadedFromURL ? importMinors(urlParams.get('minors')!) : loadLocalStore('selectedMinors') ?? []);
selectedMinors.subscribe((value) => {
  if (!loadedFromURL) saveLocalStore('selectedMinors', value);
});

export function exportPrograms() {
  return JSON.stringify(get(selectedPrograms));
}

export function exportMinors() {
  return JSON.stringify(get(selectedMinors));
}

export function getDegrees() {
  return degreeTree;
}

export function getColleges(degree: string) {
  return degreeTree.find((d) => d.degree === degree)?.colleges ?? [];
}

export function getMajors(degree: string, college: string) {
  return getColleges(degree)?.find((c) => c.college === college)?.majors ?? [];
}

export function getConcentrations(degree: string, college: string, major: string) {
  return getMajors(degree, college)?.find((m) => m.major === major)?.concentrations ?? [];
}

export function getMinors() {
  return minors;
}

export function getDegree(degree: string) {
  return degrees.find((d) => d.key === degree);
}

export function getCollege(college: string) {
  return colleges.find((c) => c.key === college);
}

export function getMajor(major: string) {
  return majors.find((m) => m.key === major);
}

export function getConcentration(concentration: string) {
  return concentrations.find((c) => c.key === concentration);
}

export function getMinor(minor: string) {
  return minors.find((m) => m.key === minor);
}

export function getBlock(block: string) {
  return blocks.find((b) => b.key === block);
}

// VAR -> COMPARED TO
/*
"AAOT" -> (always 1)
"-COURSE-" -> is the current course Compared to "TAKEN" or "PASSED"
"WHHP" -> (always 1)
"DEGREE" -> Degree
"WWRI" -> (always 1)
"MAJOR" -> Majors
"CONC" -> concentrations
"CTM" -> (always 1)
"NUMMAJORS" -> Number of Majors
"OSU_DEGREE" -> Degree (always same as DEGREE)
"BANNERGPA" -> GPA (compared to "2.0", "3.25", "3.0"
"NUMMINORS" -> Number of minors
"SCHOOL" -> 01 or 03                (user is always 01)
"COLLEGE" -> Colleges
"AUDITACTION" -> (always what-if)     (not sure what user should be)
"AUDITTYPE" -> (always Atletic)
"OSU_MAJOR" -> Majors (always same as MAJOR)
"1STMAJOR" -> Majors (always same as MAJOR)
"2NDMAJOR" -> Majors (always same as MAJOR)
"3RDMAJOR" -> Majors (always same as MAJOR)
"MINOR" -> Minors
"OSU_CERT" ->  not sure
"CAMPUSCUSTOM" -> (always B) (also what??)
"Y112" -> (always 1)
"Y113" -> (always 1)
"Y211" -> (always 1)
"Y212" -> (always 1)
"Y213" -> (always 1)
"Y311" -> (always 1)
*/

// new Set(['>=', 'WAS', '<>', '=', '>']);

// 272550;

// const a = {
//   value: [
//     ['AAOT', { value: [['>=', ['1']]] }], // some kind of transfer credit
//     ['WHHP', { value: [['>=', ['1', '1']]] }],
//     ['WWRI', { value: [['>=', ['1', '1']]] }],
//     ['-COURSE-', { value: [['WAS', ['TAKEN', 'PASSED']]] }],
//     [
//       'DEGREE',
//       {
//         value: [
//           ['<>', ['BS', 'HBS', 'BS', 'HBS']],
//           ['=', ['BA', 'BS', 'BFA', 'HBA']]
//         ]
//       }
//     ],
//     [
//       'MAJOR',
//       {
//         value: [
//           ['=', ['026']],
//           ['<>', ['026']],
//           ['>', ['012', '012', '012', '012']]
//         ]
//       }
//     ],
//     [
//       'CONC',
//       {
//         value: [
//           ['<>', ['922']],
//           ['=', ['190']]
//         ]
//       }
//     ],
//     ['CTM', { value: [['>=', ['1']]] }],
//     [
//       'NUMMAJORS',
//       {
//         value: [
//           ['>', ['2']],
//           ['=', ['2']]
//         ]
//       }
//     ],
//     ['OSU_DEGREE', { value: [['=', ['BFA']]] }],
//     ['BANNERGPA', { value: [['>=', ['2.0']]] }],
//     [
//       'NUMMINORS',
//       {
//         value: [
//           ['=', ['1']],
//           ['>', ['2']]
//         ]
//       }
//     ],
//     [
//       'SCHOOL',
//       {
//         value: [
//           ['=', ['01']],
//           ['<>', ['03']]
//         ]
//       }
//     ],
//     [
//       'COLLEGE',
//       {
//         value: [
//           ['=', ['01']],
//           ['<>', ['04']]
//         ]
//       }
//     ],
//     ['AUDITACTION', { value: [['=', ['WHATIF', 'WHATIF', 'WHATIF', 'WHATIF', 'WHATIF', 'WHATIF']]] }],
//     [
//       'AUDITTYPE',
//       {
//         value: [
//           ['<>', ['ATHLETIC']],
//           ['=', ['ATHLETIC', 'ATHLETIC']]
//         ]
//       }
//     ],
//     [
//       'OSU_MAJOR',
//       {
//         value: [
//           ['<>', ['011', '012', '011', '012', '011', '012', '011', '012', '925', '930', '940']],
//           ['=', ['011', '012', '011', '012', '011', '012', '011', '012', '307', '335']]
//         ]
//       }
//     ],
//     [
//       '1STMAJOR',
//       {
//         value: [
//           ['=', ['641', '182', '183', '182', '196', '182']],
//           ['<>', ['181', '182']]
//         ]
//       }
//     ],
//     [
//       '2NDMAJOR',
//       {
//         value: [
//           ['=', ['641', '182']],
//           ['<>', ['307', '335']]
//         ]
//       }
//     ],
//     ['3RDMAJOR', { value: [['=', ['641', '182', '183', '182', '196', '182']]] }],
//     [
//       'MINOR',
//       {
//         value: [
//           ['=', ['885', '574']],
//           ['<>', ['495']]
//         ]
//       }
//     ],
//     ['OSU_CERT', { value: [['<>', ['C540', 'C750']]] }],
//     ['CAMPUSCUSTOM', { value: [['<>', ['B']]] }],
//     ['Y112', { value: [['=', ['1']]] }],
//     ['Y113', { value: [['=', ['1', '1']]] }],
//     ['Y211', { value: [['=', ['1', '1', '1']]] }],
//     ['Y212', { value: [['=', ['1', '1', '1', '1']]] }],
//     ['Y213', { value: [['=', ['1', '1', '1', '1', '1']]] }],
//     ['Y311', { value: [['=', ['1', '1', '1', '1', '1', '1']]] }]
//   ]
// };
