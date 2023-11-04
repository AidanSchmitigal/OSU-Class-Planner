import { writable } from 'svelte/store';
import type { Course } from './selectedCourses';

export const hoverCourse = writable<Course | null>(null);
