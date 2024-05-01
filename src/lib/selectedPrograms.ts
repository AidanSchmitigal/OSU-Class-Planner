// @ts-ignore
import _degreeTree from '$lib/data/degreeTree.json';
// @ts-ignore
import _degrees from '$lib/data/degrees.json';
// @ts-ignore
import _colleges from '$lib/data/colleges.json';
// @ts-ignore
import _majors from '$lib/data/majors.json';
// @ts-ignore
import _concentrations from '$lib/data/concentrations.json';

const degreeTree: {
  degree: string;
  colleges: {
    college: string;
    majors: {
      major: string;
      concentrations: string[];
    }[];
  }[];
}[] = _degreeTree;

type ProgramList = {
  key: string;
  description: string;
  requirements: Rule[];
}[];

const degrees: ProgramList = _degrees as ProgramList;
const colleges: ProgramList = _colleges as ProgramList;
const majors: ProgramList = _majors as ProgramList;
const concentrations: ProgramList = _concentrations as ProgramList;

import { writable } from 'svelte/store';
import type { Rule } from './requirements';

export const selectedPrograms = writable<
  {
    degree: string;
    college: string;
    major: string;
    concentration: string;
  }[]
>([]);

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
