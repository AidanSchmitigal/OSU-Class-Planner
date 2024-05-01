<script lang="ts">
  import type { Course, Requirement } from '$lib';
  import { addPsuedoCourse, getAllCoursesMatching, getCourse, getPsuedoCourses, hasCourse } from '$lib/selectedCourses';
  import CourseComponent from './CourseComponent.svelte';
  import CourseList from './CourseList.svelte';
  import ShowIfClicked from './ShowIfClicked.svelte';

  export let courses: {
    discipline: string;
    code: string;
    attribute?: string | undefined;
  }[];
  export let psuedoKey: string;
  export let dragStart: (event: DragEvent, course: Course) => void;
  export let requirement: Requirement;

  let psuedoInput = '';
  let rerenderOnDrag = false;
</script>

{#each courses as courseData}
  {@const course = getCourse(courseData.discipline, courseData.code)}
  {#if course === undefined && courseData.discipline === 'PSEUDO'}
    <div class="bg-gray-100 p-1">
      <input
        type="text"
        class="w-full border-2 border-blue-500"
        placeholder="Enter your own classes"
        bind:value={psuedoInput}
        on:keydown={(e) => {
          if (e.key !== 'Enter') return;
          e.preventDefault();
          const [discipline, code] = psuedoInput.toUpperCase().split(' ');
          addPsuedoCourse(psuedoKey, discipline, code);
          psuedoInput = '';
        }} />
      <div class="flex flex-wrap gap-2">
        {#key psuedoInput}
          <CourseList courses={getPsuedoCourses(psuedoKey)} psuedoKey={psuedoKey + '_'} {dragStart} {requirement} />
        {/key}
      </div>
    </div>
  {:else if course === undefined && (courseData.discipline.includes('@') || courseData.code.includes('@'))}
    <ShowIfClicked title={`${courseData.discipline} ${courseData.code} ${courseData.attribute ? `| ${courseData.attribute}` : ''}`}>
      <div class="flex flex-wrap gap-2">
        <CourseList courses={getAllCoursesMatching(courseData.discipline, courseData.code, courseData.attribute)} {psuedoKey} {dragStart} {requirement} />
      </div>
    </ShowIfClicked>
  {:else if course === undefined || !hasCourse(course) || (rerenderOnDrag && !rerenderOnDrag)}
    {(course ? course.requirement = requirement : '', '')}
    <CourseComponent
      on:dragstart={(event) => {
        if (course === undefined) return;
        dragStart(event, course);
      }}
      on:dragend={() => {
        rerenderOnDrag = !rerenderOnDrag;
      }}
      {course}
      {courseData} />
  {/if}
{/each}
