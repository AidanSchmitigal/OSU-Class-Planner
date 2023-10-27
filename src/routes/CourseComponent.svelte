<script lang="ts">
  import { type Course, nextStatus, nextRequirement } from '$lib';
  import { hoverCourse } from '$lib/hoverClass';
  import { updateCourse } from '$lib/selectedCourses';

  export let course: Course;
</script>

<button
  draggable="true"
  id="{course.discipline}-{course.code}"
  on:dragstart
  on:mouseenter={() => ($hoverCourse = course)}
  on:mouseleave={() => ($hoverCourse = null)}
  class={`${course.requirement.style}  bg-gray-50 flex-shrink-0 relative border-[3px] p-2 rounded-[50%] shadow-md flex flex-col w-28 h-[5.5rem] justify-start items-center`}
  on:click={() => {
    course.status = nextStatus(course.status);
    updateCourse(course);
  }}
  on:contextmenu|preventDefault={(e) => {
    course.requirement = nextRequirement(course.requirement);
    updateCourse(course);
  }}>
  <div class={`${course.status.style} rounded-full absolute top-0 right-0 w-6 h-6`} />
  <span class="uppercase font-bold">{course.discipline} {course.code}</span>
  <span class="text-[10px] text-center capitalize">{course.title.toLowerCase()}</span>
</button>
