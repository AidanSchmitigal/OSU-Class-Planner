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
const _blocks = await (await fetch('/data/blocks.json')).json();
const blocks = addCourseRequirementsToOBJ(_blocks);
// @ts-ignore
// import _degrees from '$lib/data/degrees.json' assert { type: 'json' };
const _degrees = await (await fetch('/data/degrees.json')).json();
const degrees = addCourseRequirementsToOBJ(_degrees);
// @ts-ignore
const _colleges = await (await fetch('/data/colleges.json')).json();
// @ts-ignore
const colleges = addCourseRequirementsToOBJ(_colleges);
// @ts-ignore
const _majors = await (await fetch('/data/majors.json')).json();
const majors = addCourseRequirementsToOBJ(_majors);
// @ts-ignore
const _concentrations = await (await fetch('/data/concentrations.json')).json();
const concentrations = addCourseRequirementsToOBJ(_concentrations);
// @ts-ignore
const _minors = await (await fetch('/data/minors.json')).json();
const minors = addCourseRequirementsToOBJ(_minors);

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
    }[];
  }[];
}[];

import { writable } from 'svelte/store';
import { getCourseRquirements, type Rule } from './requirements';
import { loadLocalStore, saveLocalStore } from '$lib';

export const selectedPrograms = writable<
  {
    degree: string;
    college: string;
    major: string;
    concentration: string;
  }[]
>(loadLocalStore('selectedPrograms') ?? []);
selectedPrograms.subscribe((value) => {
  saveLocalStore('selectedPrograms', value);
});
export const selectedMinors = writable<string[]>(loadLocalStore('selectedMinors') ?? []);
selectedMinors.subscribe((value) => {
  saveLocalStore('selectedMinors', value);
});

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
