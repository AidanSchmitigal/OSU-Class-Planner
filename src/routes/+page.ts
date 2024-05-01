export const ssr = false;

// import type { Requirement } from '$lib';
// import degrees from '$lib/data/degrees.json';
// import majors from '$lib/data/majors.json';
// import concentrations from '$lib/data/concentrations.json';

// const requirements: Rule[] = degrees[0].requirements;

// type Rule = {
//   label: string;
//   ifElsePart?: 'IfPart' | 'ElsePart';
//   ruleType: string;
//   requirement: object;
// };

// type IfRequirement = Rule & {
//   ruleType: 'IfStmt';
//   requirement: {
//     leftCondition: Condition;
//     ifPart: {
//       ruleArray: Rule[];
//     };
//     elsePart?: {
//       ruleArray: Rule[];
//     };
//   };
// };

// type Condition = {
//   connector: 'OR' | 'AND';
//   leftCondition:
//     | Condition
//     | {
//         relationalOperator: RelationalOperator;
//       };
//   rightCondition?:
//     | Condition
//     | {
//         relationalOperator: RelationalOperator;
//       };
//   relationalOperator: undefined;
// };

// type RelationalOperator = {
//   left: string;
//   right: string;
//   operator: string;
// };

// type BlockTypeRequirement = Rule & {
//   ruleType: 'Blocktype';
//   requirement: {
//     numBlocktypes: string;
//     type: string;
//   };
// };

// type BlockRequirement = Rule & {
//   ruleType: 'Block';
//   requirement: {
//     numBlocks: string;
//     type: string;
//     value: string;
//   };
// };

// type CourseRequirement = Rule & {
//   ruleType: 'Course';
//   requirement: {
//     classesBegin: string;
//     classCreditOperator: 'OR' | 'AND';
//     connector: string;
//     courseArray: {
//       discipline: string;
//       number: string;
//     }[];
//   };
// };

// type GroupRequirement = Rule & {
//   ruleType: 'Group';
//   requirement: {
//     numberOfGroups: string;
//     numberOfRules: string;
//   };
//   ruleArray: Rule[];
// };

// type SubsetRequirement = Rule & {
//   ruleType: 'Subset';
//   ruleArray: Rule[];
// };

// type CompleteRequirement = Rule & {
//   ruleType: 'Complete';
// };
// type IncompleteRequirement = Rule & {
//   ruleType: 'Incomplete';
// };

// // degrees.forEach((d) => {
// //   console.log(d.description, '\n');
// //   d.requirements.forEach((r: Rule) => {
// //     console.log(ruleToSimpleString(r), '\n');
// //   });
// // });

// // console.log(majors[0].requirements[0]);
// // majors.forEach((d) => {
// //   console.log(d.description, '\n');
// //   d.requirements.forEach((r: Rule) => {
// //     console.log(ruleToSimpleString(r), '\n');
// //   });
// // });

// // concentrations.forEach((c) => {
// //   console.log(c.description, '\n');
// //   c.requirements.forEach((r: Rule) => {
// //     console.log(ruleToSimpleString(r), '\n');
// //   });
// // });

// function ruleToSimpleString(rule: IfRequirement | BlockTypeRequirement | BlockRequirement | CourseRequirement | GroupRequirement | SubsetRequirement | CompleteRequirement | IncompleteRequirement, indent = 0): string {
//   switch (rule.ruleType) {
//     case 'IfStmt':
//       return ifRequirementToSimpleString(rule, indent);
//     case 'Blocktype':
//       return blockTypeRequirementToSimpleString(rule);
//     case 'Block':
//       return blockRequirementToSimpleString(rule);
//     case 'Course':
//       return courseRequirementToSimpleString(rule);
//     case 'Group':
//       return groupRequirementToSimpleString(rule);
//     case 'Subset':
//       return subsetRequirementToSimpleString(rule);
//     case 'Complete':
//       return `${rule.label} (Complete)`;
//     case 'Incomplete':
//       return `${rule.label} (Incomplete)`;
//   }
//   return `<blank> ${rule.ruleType}`;
// }

// function ifRequirementToSimpleString(rule: IfRequirement, indent: number): string {
//   const leftCondition = conditionToSimpleString(rule.requirement.leftCondition);
//   const indentSpaces = ' '.repeat(indent);
//   const innerIndentSpaces = ' '.repeat(indent + 1);

//   return `${indentSpaces}if (${leftCondition}) {\n${innerIndentSpaces}${rule.requirement.ifPart.ruleArray.map((r) => ruleToSimpleString(r, indent + 1)).join('\n')}\n${indentSpaces}} else {\n${innerIndentSpaces}${rule.requirement.elsePart?.ruleArray.map((r) => ruleToSimpleString(r, indent + 1)).join('\n')}\n${indentSpaces}}`;
// }

// function conditionToSimpleString(
//   condition:
//     | Condition
//     | {
//         relationalOperator: RelationalOperator;
//       }
// ): string {
//   if (condition.relationalOperator) {
//     return `${condition.relationalOperator.left} ${condition.relationalOperator.operator} ${condition.relationalOperator.right}`;
//   }
//   return `${conditionToSimpleString(condition.leftCondition)} ${condition.connector} ${condition.rightCondition ? conditionToSimpleString(condition.rightCondition) : '<blank>'}`;
// }

// function blockTypeRequirementToSimpleString(rule: BlockTypeRequirement): string {
//   return `${rule.requirement.numBlocktypes} block of type ${rule.requirement.type}`;
// }

// function blockRequirementToSimpleString(rule: BlockRequirement): string {
//   return `${rule.requirement.numBlocks} block of type ${rule.requirement.value} (${rule.requirement.type})`;
// }

// function courseRequirementToSimpleString(rule: CourseRequirement): string {
//   return `${rule.requirement.classesBegin} classes in ${rule.requirement.courseArray.map((c) => `${c.discipline} ${c.number}`).join(` ${rule.requirement.classCreditOperator} `)}`;
// }

// function groupRequirementToSimpleString(rule: GroupRequirement): string {
//   let text = `${rule.requirement.numberOfGroups} groups of ${rule.requirement.numberOfRules} rules\n`;
//   text += rule.ruleArray.map((r) => ruleToSimpleString(r)).join('\n');
//   return text;
// }

// function subsetRequirementToSimpleString(rule: SubsetRequirement): string {
//   return rule.ruleArray.map((r) => ruleToSimpleString(r)).join('\n');
// }
