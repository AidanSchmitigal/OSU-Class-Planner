import type { Course } from '$lib';
import { writable } from 'svelte/store';

export const hoverCourse = writable<Course | null>(null);
