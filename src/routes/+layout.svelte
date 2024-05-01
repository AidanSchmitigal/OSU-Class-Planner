<script>
  import { hoverCourse, popupCourses } from '$lib/hoverClass';
  import { getPostrequisites } from '$lib/selectedCourses';

  import '../app.css';

  document.getElementById('prepage-load-loading')?.remove();
</script>

{#if $hoverCourse}
  <!-- SVG arrow connecting to prerequisites -->
  <svg class="z-50 fixed inset-0 pointer-events-none" viewBox={`0 0 ${innerWidth} ${innerHeight}`} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- A marker to be used as an arrowhead -->
      <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#ff000080" />
      </marker>
      <marker id="arrowGray" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#80808080" />
      </marker>
    </defs>
    <rect x={0} y={0} width={10} height={10} fill="yellow" />
    <rect x={innerWidth - 10} y={innerHeight - 10} width={10} height={10} fill="lime" />
    {#each $hoverCourse.prerequisites as prerequisite}
      {@const startingScreenPosition = document.getElementById(`${$hoverCourse.discipline}-${$hoverCourse.code}`)?.getBoundingClientRect()}
      {@const endingScreenPosition = document.getElementById(`${prerequisite.discipline}-${prerequisite.code}`)?.getBoundingClientRect()}
      {#if startingScreenPosition && endingScreenPosition}
        {@const startingPosition = { x: startingScreenPosition.x + startingScreenPosition.width / 2, y: startingScreenPosition.y + startingScreenPosition.height / 2 }}
        {@const endingPosition = { x: endingScreenPosition.x + endingScreenPosition.width / 2, y: endingScreenPosition.y + endingScreenPosition.height / 2 }}
        <line x1={startingPosition.x} y1={startingPosition.y} x2={endingPosition.x} y2={endingPosition.y} stroke="#ff000080" marker-start="url(#arrowRed)" stroke-width="4" />

        {#if endingPosition.x < 0 || endingPosition.x > innerWidth || endingPosition.y < 0 || endingPosition.y > innerHeight}
          <rect x={endingPosition.x < 0 ? 0 : endingPosition.x > innerWidth ? innerWidth - 100 : endingPosition.x - 50} y={endingPosition.y < 0 ? 0 : endingPosition.y > innerHeight ? innerHeight - 50 : endingPosition.y - 25} width="100" height="20" fill="white" />
          <text x={endingPosition.x < 0 ? 0 : endingPosition.x > innerWidth ? innerWidth - 100 : endingPosition.x - 50} y={endingPosition.y < 0 ? 0 : endingPosition.y > innerHeight ? innerHeight - 50 : endingPosition.y - 25} fill="red" font-size="20" font-family="monospace" dominant-baseline="hanging" text-anchor="start">{prerequisite.discipline}_{prerequisite.code}</text>
        {/if}

        <!-- Add a circle where the mouse is -->
        <!-- <rect x={startingScreenPosition.x} y={startingScreenPosition.y} width={startingScreenPosition.width} height={startingScreenPosition.height} fill="red" /> -->
      {/if}
    {/each}
    {#each getPostrequisites($hoverCourse) as prerequisite}
      {@const startingScreenPosition = document.getElementById(`${$hoverCourse.discipline}-${$hoverCourse.code}`)?.getBoundingClientRect()}
      {@const endingScreenPosition = document.getElementById(`${prerequisite.discipline}-${prerequisite.code}`)?.getBoundingClientRect()}
      {#if startingScreenPosition && endingScreenPosition}
        {@const startingPosition = { x: startingScreenPosition.x + startingScreenPosition.width / 2, y: startingScreenPosition.y + startingScreenPosition.height / 2 }}
        {@const endingPosition = { x: endingScreenPosition.x + endingScreenPosition.width / 2, y: endingScreenPosition.y + endingScreenPosition.height / 2 }}
        <line x1={startingPosition.x} y1={startingPosition.y} x2={endingPosition.x} y2={endingPosition.y} stroke="#80808080" marker-end="url(#arrowGray)" stroke-width="4" />

        {#if endingPosition.x < 0 || endingPosition.x > innerWidth || endingPosition.y < 0 || endingPosition.y > innerHeight}
          <rect x={endingPosition.x < 0 ? 0 : endingPosition.x > innerWidth ? innerWidth - 100 : endingPosition.x - 50} y={endingPosition.y < 0 ? 0 : endingPosition.y > innerHeight ? innerHeight - 50 : endingPosition.y - 25} width="100" height="20" fill="white" />
          <text x={endingPosition.x < 0 ? 0 : endingPosition.x > innerWidth ? innerWidth - 100 : endingPosition.x - 50} y={endingPosition.y < 0 ? 0 : endingPosition.y > innerHeight ? innerHeight - 50 : endingPosition.y - 25} fill="gray" font-size="20" font-family="monospace" dominant-baseline="hanging" text-anchor="start">{prerequisite.discipline}_{prerequisite.code}</text>
        {/if}

        <!-- Add a circle where the mouse is -->
        <!-- <rect x={startingScreenPosition.x} y={startingScreenPosition.y} width={startingScreenPosition.width} height={startingScreenPosition.height} fill="gray" /> -->
      {/if}
    {/each}
  </svg>
{/if}

{#each $popupCourses as popup}
  {@const course = popup.course}
  <div class="absolute z-50 bg-white shadow-lg w-96" style={`top: ${popup.y + 10}px; left: ${popup.x + 10}px;`}>
    <div class="flex-shrink-0 justify-between items-center p-1 border-b-2 border-gray-200 relative">
      <div class="font-bold text-sm">{course.title}</div>
      <div class="font-light text-xs">{course.discipline} {course.code} - {course.creditHourLow} {course.creditHourIndicator} {course.creditHourHigh} Credits</div>
      <button class="p-1 rounded-full hover:bg-gray-200 absolute top-0 right-0" on:click={() => popupCourses.update((courses) => courses.filter((c) => c.course !== course))}>
        <svg class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 10.586L16.95 5.636a1 1 0 111.414 1.414L13.414 12l4.95 4.95a1 1 0 11-1.414 1.414L12 13.414l-4.95 4.95a1 1 0 11-1.414-1.414L10.586 12 5.636 7.05a1 1 0 111.414-1.414L12 10.586z" fill="currentColor" />
        </svg>
      </button>
    </div>
    <div class="flex-grow p-2 overflow-auto text-sm">
      <div>{course.description}</div>
      <div class="font-bold text-sm">Prerequisites</div>
      <div>{course.prerequisites.map((prerequisite) => `${prerequisite.discipline} ${prerequisite.code}`).join(', ')}</div>
      <div class="font-bold text-sm">Postrequisites</div>
      <div>
        {getPostrequisites(course)
          .map((postrequisite) => `${postrequisite.discipline} ${postrequisite.code}`)
          .join(', ')}
      </div>
    </div>
  </div>
{/each}

<div class="p-2 gap-1 flex flex-col text-xs">
  <slot />
</div>
