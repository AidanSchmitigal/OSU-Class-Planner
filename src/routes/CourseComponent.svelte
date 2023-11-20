<script lang="ts">
  import { nextRequirement, type Course, nextStatus, termAbbr } from '$lib';
  import { hoverCourse, popupCourses } from '$lib/hoverClass';
  import { selectedCourses, getTermsOffered, getCredits } from '$lib/selectedCourses';

  export let inPlanner = false;
  export let course: Course | null = null;
  export let courseData:
    | {
        discipline: string;
        code: string;
        attribute?: string;
      }
    | undefined = undefined;
</script>

{#if course}
  <button
    draggable="true"
    id="{course.discipline}-{course.code}"
    on:dragstart
    on:mouseenter={() => ($hoverCourse = course)}
    on:mouseleave={() => ($hoverCourse = null)}
    class={`${course.requirement.style} group/course outline-none bg-gray-50 flex-shrink-0 relative border-[3px] p-2 rounded-[50%] shadow-md flex flex-col w-28 h-[5.5rem] justify-start items-center`}
    on:click={(e) => {
      if (!course) return;
      if (e.shiftKey) {
        course.requirement = nextRequirement(course.requirement);
        $selectedCourses = $selectedCourses;
        return;
      }

      course.status = nextStatus(course.status);
      $selectedCourses = $selectedCourses;
    }}
    on:contextmenu|preventDefault={(e) => {
      if (!course) return;
      $popupCourses = [
        ...$popupCourses,
        {
          course,
          x: e.clientX,
          y: e.clientY + window.scrollY
        }
      ];
    }}>
    <div class={`${course.status.style} rounded-full absolute top-0 right-0 w-6 h-6`} />
    <span class="uppercase font-bold">{course.discipline} {course.code}</span>
    <span class="text-[10px] text-center capitalize whitespace-break-spaces">{course.title.toLowerCase()}</span>
    <span class={`${inPlanner ? 'inline' : 'group-hover/course:inline hidden'} text-[10px] font-light`}
      >({getCredits(course)})<span class={inPlanner ? 'group-hover/course:inline hidden' : 'inline'}
        >{getTermsOffered(course)
          .flatMap((s) => s.terms)
          .map(termAbbr)}</span
      ></span>
  </button>
{:else if courseData}
  <div class="bg-gray-50 flex-shrink-0 relative border-[3px] p-2 rounded-[50%] shadow-md flex flex-col w-28 h-[5.5rem] justify-start items-center">
    <span class="uppercase font-bold">{courseData.discipline} {courseData.code}</span>
    {#if courseData.attribute}
      <span class="uppercase font-bold">{courseData.attribute}</span>
    {/if}
    <span class="text-[10px] text-center whitespace-break-spaces">UNKNOWN COURSE</span>
  </div>
{:else}
  <div class="bg-gray-50 flex-shrink-0 relative border-[3px] p-2 rounded-[50%] shadow-md flex flex-col w-28 h-[5.5rem] justify-start items-center">
    <span class="text-[10px] text-center whitespace-break-spaces">NO DATA PROVIDED</span>
  </div>
{/if}
