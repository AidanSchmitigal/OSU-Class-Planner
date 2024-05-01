import { writable } from 'svelte/store';
import type { Course } from './selectedCourses';

export const hoverCourse = writable<Course | null>(null);

export const popupCourses = writable<{ x: number; y: number; course: Course }[]>([]);
let updating = false;
popupCourses.subscribe((value) => {
  if (updating) return (updating = false);
  updating = true;
  popupCourses.set([...new Set(value)]);
});
