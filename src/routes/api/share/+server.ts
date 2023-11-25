// Take in data, and produce a minified sharable permalink

import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { courses, programs, minors } = (await request.json()) as {
    courses: { discipline: string; code: string }[];
    programs: {
      degree: string;
      college: string;
      major: string;
      concentration: string;
    }[];
    minors: string[];
  };

  const data = encode(courses, programs, minors);

  return json({ data });
}

function encode(
  courses: { discipline: string; code: string }[],
  programs: {
    degree: string;
    college: string;
    major: string;
    concentration: string;
  }[],
  minors: string[]
) {
  return [courses.map((c) => `${c.discipline},${c.code}`).join('?'), programs.map((p) => `${p.degree},${p.college},${p.major},${p.concentration}`).join('?'), minors.map((m) => m).join('?')].join('!');
}
