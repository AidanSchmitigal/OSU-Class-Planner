<script lang="ts">
  import { type Course, getCourseData, majors, baccores, Status, Requirement, Term } from '$lib';
  import CourseComponent from './CourseComponent.svelte';
  import { addCourse, hasCourse, removeCourse, selectedCourses, selectedMajor, setMajor, updateCourse } from '$lib/selectedCourses';

  let searchCourse: Course | undefined = undefined;
  let hoveringOver: null | { year: number; term: Term } = null;

  function dragStart(event: DragEvent, course: Course | undefined) {
    const data = { course };
    event.dataTransfer!.setData('text/plain', JSON.stringify(data));
  }

  function drop(event: DragEvent) {
    event.preventDefault();

    const json = event.dataTransfer!.getData('text/plain');
    let { course } = JSON.parse(json);

    if (course.discipline === searchCourse?.discipline && course.code === searchCourse?.code) searchCourse = undefined;

    if (!hoveringOver) {
      removeCourse(course);
      return;
    }

    if (course.year === -1) {
      course = addCourse(course);
      if (!course) return;
    }

    course.year = hoveringOver.year;
    course.term = hoveringOver.term;
    updateCourse(course);

    hoveringOver = null;
  }
</script>

<div class="flex gap-2">
  {#each [Status.NOT_STARTED, Status.NEXT_TERM, Status.IN_PROGRESS, Status.COMPLETED] as status}
    <div class={`p-1 px-2 border-2 border-transparent rounded-full capitalize ${status.style}`}>{status.value.toLowerCase().replace('_', ' ')}</div>
  {/each}
  {#each [Requirement.NONE, Requirement.REQUIRED, Requirement.BACCORE, Requirement.MAJOR, Requirement.ELECTIVE] as requirement}
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
    searchCourse = getCourseData(discipline, code);
    e.currentTarget.value = '';
  }} />

<select
  class="w-full border-2 border-blue-500 rounded-sm"
  value={$selectedMajor?.majorCode}
  on:change={(e) => {
    setMajor(e.currentTarget.value);
  }}>
  {#each majors as major}
    <option value={major.majorCode}>{major.title}</option>
  {/each}
</select>

{#if searchCourse != undefined}
  <CourseComponent
    course={searchCourse}
    on:dragstart={(event) => {
      dragStart(event, searchCourse);
    }} />
{/if}

<div class="flex overflow-x-scroll gap-8">
  {#each [0, 1, 2, 3] as year}
    <div class="flex flex-col">
      Year {year + 1}
      <div class="flex gap-2 h-full">
        {#each Object.values(Term) as term}
          <div class="flex-col flex gap-2 h-full">
            <span class="text-2xl font-bold capitalize">{term}</span>
            <div
              class="flex p-2 flex-col gap-2 min-w-[8rem] min-h-[10rem] bg-gray-50 h-full"
              class:hovering={hoveringOver?.year === year && hoveringOver?.term === term}
              role="group"
              on:dragenter={() => {
                return (hoveringOver = { year, term });
              }}
              on:dragleave={() => (hoveringOver = null)}
              on:drop={(event) => drop(event)}
              on:dragover={(event) => (event.preventDefault(), (hoveringOver = { year, term }))}>
              {#each $selectedCourses.filter((course) => course.year === year && course.term === term) as course}
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

{#key $selectedCourses}
  <div class="flex flex-wrap gap-1">
    {#if selectedMajor}
      {#each $selectedMajor?.courses ?? [] as courseList}
        <div class={`flex gap-1  ${courseList.length == 1 ? '' : 'bg-gray-100 outline-1 outline-double outline-white'}`}>
          {#each courseList as course}
            {#if !hasCourse(course.discipline, course.number)}
              {@const courseData = getCourseData(course.discipline, course.number)}
              {#if courseData}
                <CourseComponent
                  on:dragstart={(event) => {
                    dragStart(event, courseData);
                  }}
                  course={courseData} />
              {/if}
            {/if}
          {/each}
        </div>
      {/each}
    {/if}
  </div>
{/key}

<div>
  {#each baccores as baccore}
    <p class="text-2xl font-bold capitalize">
      {baccore.title}
    </p>
    <div class="flex flex-wrap gap-2">
      {#each baccore.courses as course}
        {@const courseData = getCourseData(course.discipline, course.number)}
        {#if courseData && !hasCourse(course.discipline, course.number)}
          <CourseComponent
            on:dragstart={(event) => {
              dragStart(event, courseData);
            }}
            course={courseData} />
        {/if}
      {/each}
    </div>
  {/each}
</div>
