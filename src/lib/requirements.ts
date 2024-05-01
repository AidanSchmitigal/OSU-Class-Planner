import { getBlock } from './selectedPrograms';

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
    classesBegin?: string;
    creditsBegin?: string;
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

export type AnyRule = IfRequirement | BlockTypeRequirement | BlockRequirement | CourseRequirement | GroupRequirement | SubsetRequirement | CompleteRequirement | IncompleteRequirement;

export function ruleToString(_rule: Rule, indent = 0): string {
  const rule: AnyRule = _rule as AnyRule;
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

  return `${indentSpaces}if (${leftCondition}) {\n${innerIndentSpaces}${rule.requirement.ifPart.ruleArray.map((r) => ruleToString(r, indent + 1)).join('\n')}\n${indentSpaces}} ${rule.requirement.elsePart ? `else {\n${innerIndentSpaces}${rule.requirement.elsePart.ruleArray.map((r) => ruleToString(r, indent + 1)).join('\n')}\n${indentSpaces}}` : ''}`;
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
  return `${conditionToString(condition.leftCondition)} ${condition.rightCondition ? `${condition.connector} ${conditionToString(condition.rightCondition)}` : ''}`;
}

function blockTypeRequirementToString(rule: BlockTypeRequirement): string {
  return `${rule.requirement.numBlocktypes} block of type ${rule.requirement.type}`;
}

function blockRequirementToString(rule: BlockRequirement): string {
  return `${rule.requirement.numBlocks} block of type ${rule.requirement.value} (${rule.requirement.type})`;
}

function courseRequirementToString(rule: CourseRequirement): string {
  return `${rule.requirement.classesBegin ? `${rule.requirement.classesBegin} classes` : `${rule.requirement.creditsBegin} credits`} in ${rule.requirement.courseArray.map((c) => `${c.discipline} ${c.number}`).join(` ${rule.requirement.classCreditOperator} `)}`;
}

function groupRequirementToString(rule: GroupRequirement): string {
  let text = `${rule.requirement.numberOfGroups} groups of ${rule.requirement.numberOfRules} rules\n`;
  text += rule.ruleArray.map((r) => ruleToString(r)).join('\n');
  return text;
}

function subsetRequirementToString(rule: SubsetRequirement): string {
  return rule.ruleArray.map((r) => ruleToString(r)).join('\n');
}

export function getCourseRquirements(_rule: Rule): {
  coursesNeeded?: number;
  creditsNeeded?: number;
  courses: {
    discipline: string;
    code: string;
  }[];
}[] {
  const rule: AnyRule = _rule as AnyRule;
  switch (rule.ruleType) {
    case 'IfStmt':
      return getCourseRequirementsForIf(rule);
    case 'Blocktype':
      return [];
    case 'Block':
      return getCourseRequirementsForBlock(rule);
    case 'Course':
      return [getCourseRequirementsForRule(rule)];
    case 'Group':
      return [];
    case 'Subset':
      return rule.ruleArray.flatMap(getCourseRquirements);
    case 'Complete':
      return [];
    case 'Incomplete':
      return [];
  }
  return [];
}

function getCourseRequirementsForIf(rule: IfRequirement): {
  coursesNeeded?: number;
  creditsNeeded?: number;
  courses: {
    discipline: string;
    code: string;
  }[];
}[] {
  const leftCondition = rule.requirement.leftCondition;
  const leftCourses = getCourseRequirementsForCondition(leftCondition);
  const rightCourses = rule.requirement.elsePart ? getCourseRequirementsForCondition(leftCondition) : [];
  return [...leftCourses, ...rightCourses];
}

function getCourseRequirementsForCondition(
  condition:
    | Condition
    | {
        relationalOperator: RelationalOperator;
      }
): {
  coursesNeeded?: number;
  creditsNeeded?: number;
  courses: {
    discipline: string;
    code: string;
  }[];
}[] {
  if (condition.relationalOperator) {
    return [];
  }
  const leftCourses = getCourseRequirementsForCondition(condition.leftCondition);
  const rightCourses = condition.rightCondition ? getCourseRequirementsForCondition(condition.rightCondition) : [];
  return [...leftCourses, ...rightCourses];
}

function getCourseRequirementsForBlock(rule: BlockRequirement) {
  return getBlock(rule.requirement.value)?.courseRequirements ?? [];
  // return `${rule.requirement.numBlocks} block of type ${rule.requirement.value} (${rule.requirement.type})`;
}

function getCourseRequirementsForRule(rule: CourseRequirement): {
  label: string;
  coursesNeeded?: number;
  creditsNeeded?: number;
  courses: {
    discipline: string;
    code: string;
  }[];
} {
  const coursesNeeded = rule.requirement.classesBegin ? parseInt(rule.requirement.classesBegin) : undefined;
  const creditsNeeded = rule.requirement.creditsBegin ? parseInt(rule.requirement.creditsBegin) : undefined;
  const courses: {
    discipline: string;
    code: string;
  }[] = rule.requirement.courseArray.map((c) => ({
    discipline: c.discipline,
    code: c.number
  }));
  return {
    label: rule.label,
    coursesNeeded,
    creditsNeeded,
    courses
  };
}
