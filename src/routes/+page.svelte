<script lang="ts">
  import { selectedPrograms, getDegrees, getColleges, getMajors, getConcentrations, getDegree, getCollege, getMajor, getConcentration, getMinors, selectedMinors, getMinor } from '$lib/selectedPrograms';
  import { ruleToString, getCourseRquirements } from '$lib/requirements';
  import CourseComponent from './CourseComponent.svelte';
  import { type Course, type Term, Statuses, Requirements, Terms, getCourse, selectedCourses, addCourse, removeCourse, moveCourse } from '$lib/selectedCourses';

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

    if (!hoveringOver) return removeCourse(draggingCourse);
    const { year, term } = hoveringOver;

    if (!moveCourse(draggingCourse, year, term)) addCourse(draggingCourse, year, term);

    draggingCourse = undefined;
    hoveringOver = null;
  }
</script>

<div class="flex gap-1 items-center">
  (Click)
  {#each Statuses as status}
    <div class={`p-1 px-2 border-2 border-transparent rounded-full capitalize ${status.style}`}>{status.value.toLowerCase().replace('_', ' ')}</div>
  {/each}
  <div class="w-8" />
  (Right Click)
  {#each Requirements as requirement}
    <div class={`p-1 px-2 rounded-md capitalize border-2 ${requirement.style}`}>{requirement.value.toLowerCase().replace('_', ' ')}</div>
  {/each}
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
  <div class="flex gap-2 flex-col">
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

<div class="flex overflow-x-scroll sticky top-0 gap-3 z-10 bg-white min-h-[25vh] max-h-[50vh]">
  {#each $selectedCourses as year}
    <div class="flex flex-col">
      {year.year}
      <div class="flex gap-1 h-full">
        {#each year.terms as term}
          <div class="flex-col flex gap-1 h-full">
            <span class="text-lg font-bold capitalize">{term.term}</span>
            <div
              class="flex p-2 flex-col gap-1 min-w-[6rem] min-h-[10rem] bg-gray-50 h-full"
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
                  {course} />
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

{#each $selectedPrograms as _program}
  {#each [{ data: _program.degree, getter: getDegree }, { data: _program.college, getter: getCollege }, { data: _program.major, getter: getMajor }, { data: _program.concentration, getter: getConcentration }] as program}
    {#if program.data}
      {@const programData = program.getter(program.data)}
      <p class="text-lg font-bold capitalize">
        {programData?.description}
      </p>
      <details>
        <summary>Requirements</summary>
        <p class="whitespace-pre">
          {programData?.requirements.map((r) => ruleToString(r)).join('\n')}
        </p>
      </details>
      <p class="whitespace-pre flex flex-wrap gap-2">
        {#each programData?.courseRequirements ?? [] as courseSet}
          <div class={`${(courseSet.coursesNeeded ?? courseSet.creditsNeeded) == 1 ? '' : 'bg-slate-100'} flex flex-col`}>
            <p>{(courseSet.coursesNeeded ?? courseSet.creditsNeeded) == 1 ? '' : courseSet.coursesNeeded ? `${courseSet.coursesNeeded} courses from` : `${courseSet.creditsNeeded} credits from`}</p>
            <div class="flex flex-wrap gap-2">
              {#each courseSet.courses as courseO}
                {@const course = getCourse(courseO.discipline, courseO.code)}
                {#if course}
                  <CourseComponent
                    on:dragstart={(event) => {
                      dragStart(event, course);
                    }}
                    {course} />
                {/if}
              {/each}
            </div>
          </div>
        {/each}
      </p>
    {/if}
  {/each}
{/each}

{#each $selectedMinors as minor}
  {@const minorData = getMinor(minor)}
  <p class="text-lg font-bold capitalize">
    {minorData?.description}
  </p>
  <details>
    <summary>Requirements</summary>
    <p class="whitespace-pre">
      {minorData?.requirements.map((r) => ruleToString(r)).join('\n')}
    </p>
  </details>
  <p class="whitespace-pre flex flex-wrap gap-2">
    {#each minorData?.courseRequirements ?? [] as courseSet}
      <div class={`${(courseSet.coursesNeeded ?? courseSet.creditsNeeded) == 1 ? '' : 'bg-slate-100'} flex flex-col`}>
        <p>{(courseSet.coursesNeeded ?? courseSet.creditsNeeded) == 1 ? '' : courseSet.coursesNeeded ? `${courseSet.coursesNeeded} courses from` : `${courseSet.creditsNeeded} credits from`}</p>
        <div class="flex flex-wrap gap-2">
          {#each courseSet.courses as courseO}
            {@const course = getCourse(courseO.discipline, courseO.code)}
            {#if course}
              <CourseComponent
                on:dragstart={(event) => {
                  dragStart(event, course);
                }}
                {course} />
            {/if}
          {/each}
        </div>
      </div>
    {/each}
  </p>
{/each}
