<script lang="ts">
  import { navigating } from '$app/stores';
  import { Statuses, type Course, Term, Requirements } from '$lib';
  import { selectedPrograms, getDegrees, getColleges, getMajors, getConcentrations, getDegree, getCollege, getMajor, getConcentration, getMinors, selectedMinors, getMinor, exportPrograms, exportMinors } from '$lib/selectedPrograms';
  import { getCourse, selectedCourses, addCourse, removeCourse, moveCourse, hasCourse, hasSomeCourseSelector, exportCourses, getCredits, getAllCoursesMatching, getPsuedoCourses, addPsuedoCourse, psuedoCourses } from '$lib/selectedCourses';
  import RuleComponent from './RuleComponent.svelte';
  import CourseComponent from './CourseComponent.svelte';
  import ShowIfClicked from './ShowIfClicked.svelte';
  import CourseList from './CourseList.svelte';

  let fullScreenList = false;

  let searchCourse: Course | undefined = undefined;
  let hoveringOver: null | { year: number; term: Term } = null;
  let draggingCourse: Course | undefined = undefined;

  function dragStart(event: DragEvent, course: Course | undefined) {
    if (!course) return;
    draggingCourse = course;
  }

  function drop(event: DragEvent) {
    event.preventDefault();
    if (!draggingCourse) return;

    if (!hoveringOver || hoveringOver.year === -1) return removeCourse(draggingCourse);
    const { year, term } = hoveringOver;

    if (!moveCourse(draggingCourse, year, term)) addCourse(draggingCourse, year, term);

    draggingCourse = undefined;
    hoveringOver = null;
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
</script>

{#if $navigating}
  sjkfjhsdjkfhkjsdhfkjh
  <div class="fixed inset-0 bg-white z-50 flex justify-center items-center">
    <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500" />
  </div>
{/if}

<div class="flex gap-1 items-center">
  (Click)
  {#each Statuses as status}
    <div class={`p-1 px-2 border-2 border-transparent rounded-full capitalize ${status.style}`}>{status.value.toLowerCase().replace('_', ' ')}</div>
  {/each}
  <div class="w-8" />
  (Shift Click)
  {#each Requirements as requirement}
    <div class={`p-1 px-2 rounded-md capitalize border-2 ${requirement.style}`}>{requirement.value.toLowerCase().replace('_', ' ')}</div>
  {/each}
  <div class="w-8" />
  <button
    class="p-1 px-2 rounded-md border-2 border-blue-500"
    on:click={(e) => {
      const url = new URL(window.location.href);
      navigator.clipboard.writeText(url.toString());

      e.currentTarget.textContent = 'Copied!';
      const target = e.currentTarget;
      setTimeout(() => {
        target.textContent = 'Copy Share Link';
      }, 1000);
    }}>
    Copy Share Link
  </button>
</div>

<input
  class="w-full border-2 border-blue-500 rounded-sm"
  type="text"
  placeholder="Search for a course (e.g. CS 135)"
  on:keydown={(e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const [discipline, code] = e.currentTarget.value.toUpperCase().split(' ');
    searchCourse = getCourse(discipline, code);
    e.currentTarget.value = '';
  }} />

{#if searchCourse != undefined}
  <CourseComponent
    course={searchCourse}
    on:dragstart={(event) => {
      dragStart(event, searchCourse);
    }} />
{/if}

<div class="flex gap-4 h-fit">
  <div class="flex gap-2 flex-col w-full">
    <div class="flex flex-col gap-2">
      {#each $selectedPrograms as program}
        <div class="flex gap-4">
          <select
            class="w-full border-2 border-blue-500 rounded-sm"
            bind:value={program.degree}
            on:change={(e) => {
              program.college = '';
              program.major = '';
              program.concentration = '';
            }}>
            {#each getDegrees() as degree}
              <option value={degree.degree}>{getDegree(degree.degree)?.description}</option>
            {/each}
          </select>
          <select
            class="w-full border-2 border-blue-500 rounded-sm"
            bind:value={program.college}
            on:change={(e) => {
              program.major = '';
              program.concentration = '';
            }}>
            {#each getColleges(program.degree) as college}
              <option value={college.college}>{getCollege(college.college)?.description}</option>
            {/each}
          </select>
          <select
            class="w-full border-2 border-blue-500 rounded-sm"
            bind:value={program.major}
            on:change={(e) => {
              program.concentration = '';
            }}>
            {#each getMajors(program.degree, program.college) as major}
              <option value={major.major}>{getMajor(major.major)?.description}</option>
            {/each}
          </select>
          <select class="w-full border-2 border-blue-500 rounded-sm" bind:value={program.concentration}>
            {#each getConcentrations(program.degree, program.college, program.major) as concentration}
              <option value={concentration}>{getConcentration(concentration)?.description}</option>
            {/each}
          </select>
          <button class="w-12 border-2 border-blue-500 rounded-sm" on:click={() => selectedPrograms.update((programs) => programs.filter((p) => p !== program))}>Remove</button>
        </div>
      {/each}
    </div>
    <button
      class="w-full border-2 border-blue-500 rounded-sm"
      on:click={() => {
        selectedPrograms.update((programs) => [...programs, { degree: '', college: '', major: '', concentration: '' }]);
      }}>
      Add Major
    </button>
  </div>
  <div class="relative w-1/3">
    <div class="flex px-2 flex-col border-2 border-blue-500 rounded-sm overflow-y-scroll absolute inset-0 bg-white hover:h-96 hover:z-20">
      <p class="text-sm">Minors</p>
      {#each getMinors() as minor}
        <label>
          <input
            type="checkbox"
            checked={$selectedMinors.includes(minor.key)}
            on:change={(e) => {
              if (e.currentTarget.checked) selectedMinors.update((minors) => [...minors, minor.key]);
              else selectedMinors.update((minors) => minors.filter((m) => m !== minor.key));
            }} />
          {minor.description}
        </label>
      {/each}
    </div>
  </div>
</div>

<div class={`flex overflow-x-scroll sticky top-0 gap-3 z-10 bg-white min-h-[25vh] ${fullScreenList ? 'h-screen max-h-screen' : 'max-h-[50vh]'}`}>
  <div class="absolute top-0 right-0 flex gap-1 items-start">
    <div role="none" class="px-1 rounded-full bg-red-500 text-white text-[10px]" on:dragleave={() => (hoveringOver = null)} on:drop={(event) => drop(event)} on:dragover={(event) => (event.preventDefault(), (hoveringOver = { year: -1, term: Term.FALL }))}>Drag here to delete</div>
    <button
      class={`p-1 rounded-full hover:bg-gray-200 ${fullScreenList ? 'rotate-90 -scale-y-100' : ''}`}
      on:click={() => {
        fullScreenList = !fullScreenList;
      }}>
      <svg class="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 4v5h5V4H5zm7 0v5h5V4h-5zm7 0v5h5V4h-5zM5 11v5h5v-5H5zm7 0v5h5v-5h-5zm7 0v5h5v-5h-5zM5 18v2h14v-2H5z" fill="currentColor" />
      </svg>
    </button>
  </div>
  {#each $selectedCourses as year}
    <div class="flex flex-col">
      <span>
        {year.year}
        <span>({year.terms.reduce((acc, term) => acc + term.courses.reduce((acc, course) => acc + getCredits(course), 0), 0)} credits)</span>
        <span
          >(School Year {year.terms.reduce((acc, term) => acc + (term.term == Term.FALL ? 0 : term.courses.reduce((acc, course) => acc + getCredits(course), 0)), 0) +
            ($selectedCourses
              .find((y) => y.year == year.year - 1)
              ?.terms.find((t) => t.term == Term.FALL)
              ?.courses.reduce((acc, course) => acc + getCredits(course), 0) ?? 0)})</span>
      </span>
      <div class="flex gap-1">
        {#each year.terms as term, i}
          <div class="flex-col flex gap-1">
            <div>
              <span class="text-lg font-bold capitalize">{term.term}</span>
              <div>{term.courses.reduce((acc, course) => acc + getCredits(course), 0)} credits</div>
            </div>
            <div
              class={`flex p-2 flex-col gap-1 min-w-[6rem] min-h-[10rem] ${year.year === new Date().getFullYear() && Math.floor(new Date().getMonth() / 4 + 1) % 4 === i ? 'bg-blue-100' : 'bg-gray-50'}`}
              class:hovering={hoveringOver?.year === year.year && hoveringOver?.term === term.term}
              role="group"
              on:dragenter={() => {
                return (hoveringOver = { year: year.year, term: term.term });
              }}
              on:dragleave={() => (hoveringOver = null)}
              on:drop={(event) => drop(event)}
              on:dragover={(event) => (event.preventDefault(), (hoveringOver = { year: year.year, term: term.term }))}>
              {#each term.courses as course}
                <CourseComponent
                  on:dragstart={(event) => {
                    dragStart(event, course);
                  }}
                  {course}
                  inPlanner />
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

{#each $selectedPrograms as _program}
  {#each [...$selectedPrograms.flatMap((_program) => [{ data: _program.degree, getter: getDegree }, { data: _program.college, getter: getCollege }, { data: _program.major, getter: getMajor }, { data: _program.concentration, getter: getConcentration }]), ...$selectedMinors.map((minor) => ({ data: minor, getter: getMinor }))] as program}
    {#if program.data}
      {@const programData = program.getter(program.data)}
      <p class="text-lg font-bold capitalize top-1/2 bg-white">
        {programData?.description}
      </p>
      <details class="flex flex-col">
        <summary>Requirements</summary>
        {#each programData?.requirements ?? [] as rule}
          <RuleComponent {rule} />
        {/each}
      </details>
      <p class="whitespace-pre flex flex-wrap gap-2">
        {#each programData?.courseRequirements ?? [] as courseSet}
          {#if !hasSomeCourseSelector(courseSet.courses, { credits: courseSet.creditsNeeded, courses: courseSet.coursesNeeded })}
            <div class={`${courseSet.courses.length > 1 ? 'bg-slate-100' : ''} flex flex-col group relative`}>
              <p>
                {courseSet.courses.length == 1 ? '' : courseSet.coursesNeeded ? `${courseSet.coursesNeeded} courses from` : `${courseSet.creditsNeeded} credits from`}
                <span class="hidden group-hover:inline group-hover:absolute text-gray-400">({courseSet.label})</span>
              </p>
              <div class="flex flex-wrap gap-2">
                <CourseList courses={courseSet.courses} psuedoKey={programData?.key + courseSet.label} {dragStart} />
              </div>
            </div>
          {/if}
        {/each}
      </p>
    {/if}
  {/each}
{/each}
