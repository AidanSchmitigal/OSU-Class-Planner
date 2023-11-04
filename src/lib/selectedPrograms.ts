// @ts-ignore
import _degreeTree from '$lib/data/degreeTree.json' assert { type: 'json' };
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
// @ts-ignore
import _degrees from '$lib/data/degrees.json' assert { type: 'json' };
const degrees = (_degrees as ProgramList).map((e) => ({
  ...e,
  courseRequirements: e.requirements.flatMap(getCourseRquirements)
})) as ProgramList;
// @ts-ignore
import _colleges from '$lib/data/colleges.json' assert { type: 'json' };
// @ts-ignore
const colleges = (_colleges as ProgramList).map((e) => ({
  ...e,
  courseRequirements: e.requirements.flatMap(getCourseRquirements)
})) as ProgramList;
// @ts-ignore
import _majors from '$lib/data/majors.json' assert { type: 'json' };
const majors = (_majors as ProgramList).map((e) => ({
  ...e,
  courseRequirements: e.requirements.flatMap(getCourseRquirements)
})) as ProgramList;
// @ts-ignore
import _concentrations from '$lib/data/concentrations.json' assert { type: 'json' };
const concentrations = (_concentrations as ProgramList).map((e) => ({
  ...e,
  courseRequirements: e.requirements.flatMap(getCourseRquirements)
})) as ProgramList;

type ProgramList = {
  key: string;
  description: string;
  requirements: Rule[];
  courseRequirements: {
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
