<script>
  import { hoverCourse } from '$lib/hoverClass';
  import '../app.css';
</script>

{#if $hoverCourse}
  <!-- SVG arrow connecting to prerequisites -->
  <svg class="z-10 fixed inset-0 pointer-events-none" viewBox={`0 0 ${innerWidth} ${innerHeight}`} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- A marker to be used as an arrowhead -->
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="red" />
      </marker>
    </defs>
    {#each $hoverCourse.prerequisites as prerequisite}
      {@const startingScreenPosition = document.getElementById(`${$hoverCourse.discipline}-${$hoverCourse.code}`)?.getBoundingClientRect()}
      {@const endingScreenPosition = document.getElementById(`${prerequisite.discipline}-${prerequisite.code}`)?.getBoundingClientRect()}
      {#if startingScreenPosition && endingScreenPosition}
        {@const startingPosition = { x: startingScreenPosition.x + startingScreenPosition.width / 2, y: startingScreenPosition.y + startingScreenPosition.height / 2 }}
        {@const endingPosition = { x: endingScreenPosition.x + endingScreenPosition.width / 2, y: endingScreenPosition.y + endingScreenPosition.height / 2 }}
        <line x1={startingPosition.x} y1={startingPosition.y} x2={endingPosition.x} y2={endingPosition.y} stroke="red" marker-end="url(#arrow)" stroke-width="5" />

        {#if endingPosition.x < 0 || endingPosition.x > innerWidth || endingPosition.y < 0 || endingPosition.y > innerHeight}
          <rect x={endingPosition.x < 0 ? 0 : endingPosition.x > innerWidth ? innerWidth - 100 : endingPosition.x - 50} y={endingPosition.y < 0 ? 0 : endingPosition.y > innerHeight ? innerHeight - 50 : endingPosition.y - 25} width="100" height="20" fill="white" />
          <text x={endingPosition.x < 0 ? 0 : endingPosition.x > innerWidth ? innerWidth - 100 : endingPosition.x - 50} y={endingPosition.y < 0 ? 0 : endingPosition.y > innerHeight ? innerHeight - 50 : endingPosition.y - 25} fill="red" font-size="20" font-family="monospace" dominant-baseline="hanging" text-anchor="start">{prerequisite.discipline}_{prerequisite.code}</text>
        {/if}

        <!-- Add a circle where the mouse is -->
        <!-- <rect x={startingScreenPosition.x} y={startingScreenPosition.y} width={startingScreenPosition.width} height={startingScreenPosition.height} fill="red" /> -->
        <rect x={0} y={0} width={10} height={10} fill="yellow" />
        <rect x={innerWidth - 10} y={innerHeight - 10} width={10} height={10} fill="lime" />
      {/if}
    {/each}
  </svg>
{/if}
<div class="p-2 gap-1 flex flex-col text-xs">
  <slot />
</div>
