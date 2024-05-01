<script lang="ts">
  import { hoverCourse, popupCourses } from '$lib/hoverClass';
  import { nextRequirement, getCourse, nextStatus, type Course, selectedCourses } from '$lib/selectedCourses';

  export let inPlanner = false;
  export let course: Course | null = null;
  export let courseData:
    | {
        discipline: string;
        code: string;
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
    class={`${course.requirement.style} outline-none bg-gray-50 flex-shrink-0 relative border-[3px] p-2 rounded-[50%] shadow-md flex flex-col w-28 h-[5.5rem] justify-start items-center`}
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
    {#if inPlanner}
      <span class="text-[10px] font-light">({course.creditHourLow || course.creditHourHigh})</span>
    {/if}
  </button>
{:else if courseData}
  <div class="bg-gray-50 flex-shrink-0 relative border-[3px] p-2 rounded-[50%] shadow-md flex flex-col w-28 h-[5.5rem] justify-start items-center">
    <span class="uppercase font-bold">{courseData.discipline} {courseData.code}</span>
    <span class="text-[10px] text-center whitespace-break-spaces">UNKNOWN COURSE</span>
  </div>
{:else}
  <div class="bg-gray-50 flex-shrink-0 relative border-[3px] p-2 rounded-[50%] shadow-md flex flex-col w-28 h-[5.5rem] justify-start items-center">
    <span class="text-[10px] text-center whitespace-break-spaces">NO DATA PROVIDED</span>
  </div>
{/if}
