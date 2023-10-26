import { loadLocalStore, saveLocalStore, type Course, type Major, majors } from '$lib';
import { writable, get } from 'svelte/store';

export const selectedMajor = writable<Major | undefined>(getMajor(loadLocalStore<string>('selectedMajor') ?? ''));
export const selectedCourses = writable<Course[]>(loadLocalStore('selectedCourses') ?? []);

export function addCourse(course: Course): Course | undefined {
  if (hasCourse(course.discipline, course.code)) return;
  selectedCourses.update((courses) => [...courses, course]);
  return course;
}

export function hasCourse(discipline: string, code: string): boolean {
  return !!get(selectedCourses).find((c) => c.discipline === discipline && c.code === code);
}

export function removeCourse(course: Course) {
  selectedCourses.update((courses) => courses.filter((c) => c !== course));
  save();
}

export function updateCourse(course: Course) {
  selectedCourses.update((courses) => {
    const index = courses.findIndex((c) => c.discipline === course.discipline && c.code === course.code);
    courses[index] = course;
    return courses;
  });
  save();
}

export function save() {
  saveLocalStore('selectedCourses', get(selectedCourses));
}

function getMajor(majorCode: string): Major | undefined {
  return majors.find((m) => m.majorCode === majorCode);
}

export function setMajor(majorCode: string) {
  const major = getMajor(majorCode);
  if (!major) return;
  selectedMajor.update(() => major);
  saveLocalStore('selectedMajor', majorCode);
}