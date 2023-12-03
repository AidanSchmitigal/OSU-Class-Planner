<script lang="ts">
  import { checkIfCondition, type AnyRule, type Rule } from '$lib/requirements';
  import { hasCourseSelector, selectedCourses } from '$lib/selectedCourses';
  import { getBlock } from '$lib/selectedPrograms';
  import RuleComponent from './RuleComponent.svelte';

  let _rule: Rule;
  export { _rule as rule };
  const rule: AnyRule = _rule as AnyRule;

  let conditionalCheck:
    | {
        eval: boolean;
        comparisons: {
          eval: boolean;
          expression: string;
        }[];
      }
    | undefined = rule.ruleType === 'IfStmt' ? checkIfCondition(rule.requirement.leftCondition) : undefined;
  let ifTrue = conditionalCheck ? conditionalCheck.eval : undefined;
</script>

<div class={`p-2 ${ifTrue === undefined ? 'bg-gray-100' : ifTrue ? 'bg-green-100' : 'bg-red-100'}`}>
  {#if rule.ruleType === 'IfStmt'}
    IF
    <span>
      {#each conditionalCheck?.comparisons ?? [] as comparison}
        <span class={comparison.eval ? 'text-green-500' : 'text-red-500'}>{comparison.expression}&nbsp;</span>
      {/each}
    </span>
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
    {@const evaledCourses = ($selectedCourses.length, rule.requirement.courseArray.filter((course) => hasCourseSelector(course.discipline, course.number)))}
    {rule.requirement.classesBegin ? `${rule.requirement.classesBegin} classes` : `${rule.requirement.creditsBegin} credits`} in
    {#each rule.requirement.courseArray as course, i}
      <span class={evaledCourses[i] ? 'text-green-500' : 'text-red-500'}>
        {course.discipline}
        {course.number}
        {rule.requirement.classCreditOperator.toLowerCase()}
      </span>
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
    {rule.label} (Complete);
  {:else if rule.ruleType === 'Incomplete'}
    {rule.label} (Incomplete);
  {/if}
</div>
