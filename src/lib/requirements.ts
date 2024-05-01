export type Rule = {
  label: string;
  ifElsePart?: 'IfPart' | 'ElsePart';
  ruleType: string;
  requirement: object;
};

type IfRequirement = Rule & {
  ruleType: 'IfStmt';
  requirement: {
    leftCondition: Condition;
    ifPart: {
      ruleArray: Rule[];
    };
    elsePart?: {
      ruleArray: Rule[];
    };
  };
};

type Condition = {
  connector: 'OR' | 'AND';
  leftCondition:
    | Condition
    | {
        relationalOperator: RelationalOperator;
      };
  rightCondition?:
    | Condition
    | {
        relationalOperator: RelationalOperator;
      };
  relationalOperator: undefined;
};

type RelationalOperator = {
  left: string;
  right: string;
  operator: string;
};

type BlockTypeRequirement = Rule & {
  ruleType: 'Blocktype';
  requirement: {
    numBlocktypes: string;
    type: string;
  };
};

type BlockRequirement = Rule & {
  ruleType: 'Block';
  requirement: {
    numBlocks: string;
    type: string;
    value: string;
  };
};

type CourseRequirement = Rule & {
  ruleType: 'Course';
  requirement: {
    classesBegin: string;
    classCreditOperator: 'OR' | 'AND';
    connector: string;
    courseArray: {
      discipline: string;
      number: string;
    }[];
  };
};

type GroupRequirement = Rule & {
  ruleType: 'Group';
  requirement: {
    numberOfGroups: string;
    numberOfRules: string;
  };
  ruleArray: Rule[];
};

type SubsetRequirement = Rule & {
  ruleType: 'Subset';
  ruleArray: Rule[];
};

type CompleteRequirement = Rule & {
  ruleType: 'Complete';
};
type IncompleteRequirement = Rule & {
  ruleType: 'Incomplete';
};

export function ruleToString(rule: IfRequirement | BlockTypeRequirement | BlockRequirement | CourseRequirement | GroupRequirement | SubsetRequirement | CompleteRequirement | IncompleteRequirement, indent = 0): string {
  switch (rule.ruleType) {
    case 'IfStmt':
      return ifRequirementToString(rule, indent);
    case 'Blocktype':
      return blockTypeRequirementToString(rule);
    case 'Block':
      return blockRequirementToString(rule);
    case 'Course':
      return courseRequirementToString(rule);
    case 'Group':
      return groupRequirementToString(rule);
    case 'Subset':
      return subsetRequirementToString(rule);
    case 'Complete':
      return `${rule.label} (Complete)`;
    case 'Incomplete':
      return `${rule.label} (Incomplete)`;
  }
  return `<blank> ${rule}`;
}

function ifRequirementToString(rule: IfRequirement, indent: number): string {
  const leftCondition = conditionToString(rule.requirement.leftCondition);
  const indentSpaces = ' '.repeat(indent);
  const innerIndentSpaces = ' '.repeat(indent + 1);

  // @ts-expect-error
  return `${indentSpaces}if (${leftCondition}) {\n${innerIndentSpaces}${rule.requirement.ifPart.ruleArray.map((r) => ruleToString(r, indent + 1)).join('\n')}\n${indentSpaces}} else {\n${innerIndentSpaces}${rule.requirement.elsePart?.ruleArray.map((r) => ruleToString(r, indent + 1)).join('\n')}\n${indentSpaces}}`;
}

function conditionToString(
  condition:
    | Condition
    | {
        relationalOperator: RelationalOperator;
      }
): string {
  if (condition.relationalOperator) {
    return `${condition.relationalOperator.left} ${condition.relationalOperator.operator} ${condition.relationalOperator.right}`;
  }
  return `${conditionToString(condition.leftCondition)} ${condition.connector} ${condition.rightCondition ? conditionToString(condition.rightCondition) : '<blank>'}`;
}

function blockTypeRequirementToString(rule: BlockTypeRequirement): string {
  return `${rule.requirement.numBlocktypes} block of type ${rule.requirement.type}`;
}

function blockRequirementToString(rule: BlockRequirement): string {
  return `${rule.requirement.numBlocks} block of type ${rule.requirement.value} (${rule.requirement.type})`;
}

function courseRequirementToString(rule: CourseRequirement): string {
  return `${rule.requirement.classesBegin} classes in ${rule.requirement.courseArray.map((c) => `${c.discipline} ${c.number}`).join(` ${rule.requirement.classCreditOperator} `)}`;
}

function groupRequirementToString(rule: GroupRequirement): string {
  let text = `${rule.requirement.numberOfGroups} groups of ${rule.requirement.numberOfRules} rules\n`;
  // @ts-expect-error
  text += rule.ruleArray.map((r) => ruleToString(r)).join('\n');
  return text;
}

function subsetRequirementToString(rule: SubsetRequirement): string {
  // @ts-expect-error
  return rule.ruleArray.map((r) => ruleToString(r)).join('\n');
}
