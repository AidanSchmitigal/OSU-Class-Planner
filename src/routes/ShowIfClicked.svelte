<script lang="ts">
  export let title = '';
  let open = false;
</script>

<details bind:open class="bg-gray-50 border-[3px] p-2 shadow-md h-fit my-auto">
  <summary>{title}</summary>
  {#if open}
    <slot />
  {/if}
</details>
