<script lang="ts">
  import type { AnyRule, Rule } from '$lib/requirements';
  import { Requirement } from '$lib/selectedCourses';
  import { getBlock } from '$lib/selectedPrograms';
  import RuleComponent from './RuleComponent.svelte';

  let _rule: Rule;
  export { _rule as rule };
  const rule: AnyRule = _rule as AnyRule;
</script>

<div class="p-2 bg-gray-400/10">
  {#if rule.ruleType === 'IfStmt'}
    IF (something)
    {#each rule.requirement.ifPart.ruleArray as newRule}
      <RuleComponent rule={newRule} />
    {/each}
    {#if rule.requirement.elsePart}
      ELSE
      {#each rule.requirement.elsePart.ruleArray ?? [] as newRule}
        <RuleComponent rule={newRule} />
      {/each}
    {/if}
  {:else if rule.ruleType === 'Blocktype'}
    {rule.requirement.numBlocktypes} blocks of {rule.requirement.type}
  {:else if rule.ruleType === 'Block'}
    Block {rule.requirement.value}
    {#each getBlock(rule.requirement.value)?.requirements ?? [] as newRule}
      <RuleComponent rule={newRule} />
    {/each}
  {:else if rule.ruleType === 'Course'}
    {rule.requirement.classesBegin ? `${rule.requirement.classesBegin} classes` : `${rule.requirement.creditsBegin} credits`} in
    {#each rule.requirement.courseArray as course}
      {course.discipline}
      {course.number}
      &nbsp;{rule.requirement.classCreditOperator.toLowerCase()}&nbsp;&nbsp;
    {/each}
  {:else if rule.ruleType === 'Group'}
    {rule.requirement.numberOfGroups} groups of {rule.requirement.numberOfRules} rules
    {#each rule.ruleArray as newRule}
      <RuleComponent rule={newRule} />
    {/each}
  {:else if rule.ruleType === 'Subset'}
    {#each rule.ruleArray as newRule}
      <RuleComponent rule={newRule} />
    {/each}
  {:else if rule.ruleType === 'Complete'}
    return {rule.label} (Complete);
  {:else if rule.ruleType === 'Incomplete'}
    return {rule.label} (Incomplete);
  {/if}
</div>
