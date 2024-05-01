import { get } from 'svelte/store';
import { getBlock, selectedMinors, selectedPrograms } from './selectedPrograms';
import { selectedCourses } from './selectedCourses';

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
  courseArray?: {
    discipline: string;
    number: string;
  }[];
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
      withArray?: { code: string; valueList: string[] }[];
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

export function conditionToString(
  condition:
    | Condition
    | {
        relationalOperator: RelationalOperator;
      }
): string {
  if (condition.relationalOperator) {
    if (condition.relationalOperator.left === '-COURSE-') {
      const course = condition.relationalOperator.courseArray![0];
      return `(${course.discipline} ${course.number}) ${condition.relationalOperator.operator} ${condition.relationalOperator.right}`;
    }
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
  const leftCourses = rule.requirement.ifPart.ruleArray.flatMap(getCourseRquirements);
  const rightCourses = rule.requirement.elsePart ? rule.requirement.elsePart.ruleArray.flatMap(getCourseRquirements) : [];
  return [...leftCourses, ...rightCourses];
}

// function getCourseRequirementsForCondition(
//   condition:
//     | Condition
//     | {
//         relationalOperator: RelationalOperator;
//       }
// ): {
//   coursesNeeded?: number;
//   creditsNeeded?: number;
//   courses: {
//     discipline: string;
//     code: string;
//   }[];
// }[] {
//   if (condition.relationalOperator) {
//     return [];
//   }
//   const leftCourses = getCourseRequirementsForCondition(condition.leftCondition);
//   const rightCourses = condition.rightCondition ? getCourseRequirementsForCondition(condition.rightCondition) : [];
//   return [...leftCourses, ...rightCourses];
// }

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
    attribute?: string;
  }[];
} {
  const coursesNeeded = rule.requirement.classesBegin ? parseInt(rule.requirement.classesBegin) : undefined;
  const creditsNeeded = rule.requirement.creditsBegin ? parseInt(rule.requirement.creditsBegin) : undefined;
  const courses: {
    discipline: string;
    code: string;
  }[] = rule.requirement.courseArray.map((c) => ({
    discipline: c.discipline,
    code: c.number,
    attribute: c.withArray ? c.withArray.find((w) => w.code === 'ATTRIBUTE')?.valueList[0] : undefined
  }));
  return {
    label: rule.label,
    coursesNeeded,
    creditsNeeded,
    courses
  };
}

// "-COURSE-" -> is the current course Compared to "TAKEN" or "PASSED" // CUSTOM

// "SCHOOL" -> 01 or 03                (user is always 01)             // number = number
// "DEGREE" -> Degree                                                  // list inclues (number)
// "COLLEGE" -> Colleges                                               // list inclues (number)
// "OSU_DEGREE" -> Degree (always same as DEGREE)                      // ^
// "MAJOR" -> Majors                                                   // list inclues (number)
// "OSU_MAJOR" -> Majors (always same as MAJOR)                        // ^
// "CONC" -> concentrations                                            // list inclues (number)
// "MINOR" -> Minors                                                   // list inclues (number)
// "BANNERGPA" -> GPA (compared to "2.0", "3.25", "3.0"                // number = number

// "NUMMAJORS" -> Number of Majors                                     // number = number
// "NUMMINORS" -> Number of minors                                     // number = number

// "1STMAJOR" -> Majors (always same as MAJOR)                         // majors[0] = number
// "2NDMAJOR" -> Majors (always same as MAJOR)                         // majors[1] = number
// "3RDMAJOR" -> Majors (always same as MAJOR)                         // majors[2] = number

// "AUDITACTION" -> (always what-if)   (not sure what user should be)  // true
// "AUDITTYPE" -> (always Atletic)                                     // false

// operators
// '>=', '<>', '=', '>', 'WAS' (only used by COURSE)

const ASSUMED_GPA = 4.0;

function convertOperator(operator: string): string {
  switch (operator) {
    case '<>':
      return '!=';
    case '=':
      return '==';
    default:
      return operator;
  }
}

export function checkIfCondition(
  condition:
    | Condition
    | {
        relationalOperator: RelationalOperator;
      }
): {
  eval: boolean;
  comparisons: {
    eval: boolean;
    expression: string;
  }[];
} {
  if (condition.relationalOperator) {
    const left = condition.relationalOperator.left;
    const right = condition.relationalOperator.right;
    const operator = convertOperator(condition.relationalOperator.operator);

    const numberIfCan = (num: string) => {
      const p = parseInt(num);
      return isNaN(p) ? num : p;
    };
    const compare = (d: string): boolean => eval(`'${numberIfCan(d)}' ${operator} '${numberIfCan(right)}'`);
    const listFunc = operator === '===' ? (d: string[]) => d.some(compare) : (d: string[]) => d.every(compare);
    let comp;
    switch (left) {
      case '-COURSE-': {
        const course = condition.relationalOperator.courseArray![0];
        const taken = get(selectedCourses).some((y) => y.terms.some((t) => t.courses.some((c) => c.discipline === course.discipline && c.code === course.number)));
        return {
          eval: taken,
          comparisons: [
            {
              eval: taken,
              expression: `(${course.discipline} ${course.number}) ${operator} ${right}`
            }
          ]
        };
      }
      case 'SCHOOL':
        comp = compare('1');
        return {
          eval: comp,
          comparisons: [
            {
              eval: comp,
              expression: `01 ${operator} ${right}`
            }
          ]
        };
      case 'BANNERGPA':
        comp = compare(ASSUMED_GPA + '');
        return {
          eval: comp,
          comparisons: [
            {
              eval: comp,
              expression: `${ASSUMED_GPA} ${operator} ${right}`
            }
          ]
        };
      case 'AUDITACTION':
        comp = compare('WHATIF');
        return {
          eval: comp,
          comparisons: [
            {
              eval: comp,
              expression: `WHATIF ${operator} ${right}`
            }
          ]
        };
      case 'AUDITTYPE':
        comp = compare('This is not ATHLETIC');
        return {
          eval: comp,
          comparisons: [
            {
              eval: comp,
              expression: `NOT_ATH ${operator} ${right}`
            }
          ]
        };
      case 'DEGREE':
      case 'OSU_DEGREE':
        comp = listFunc(get(selectedPrograms).map((p) => p.degree));
        return {
          eval: comp,
          comparisons: [
            {
              eval: comp,
              expression: `${get(selectedPrograms)
                .map((p) => p.degree)
                .join(' ')} ${operator} ${right}`
            }
          ]
        };
      case 'COLLEGE':
        comp = listFunc(get(selectedPrograms).map((p) => p.college));
        return {
          eval: comp,
          comparisons: [
            {
              eval: comp,
              expression: `${get(selectedPrograms)
                .map((p) => p.college)
                .join(' ')} ${operator} ${right}`
            }
          ]
        };
      case 'MAJOR':
      case 'OSU_MAJOR':
        comp = listFunc(get(selectedPrograms).map((p) => p.major));
        return {
          eval: comp,
          comparisons: [
            {
              eval: comp,
              expression: `${get(selectedPrograms)
                .map((p) => p.major)
                .join(' ')} ${operator} ${right}`
            }
          ]
        };
      case 'CONC':
        comp = listFunc(get(selectedPrograms).map((p) => p.concentration));
        return {
          eval: comp,
          comparisons: [
            {
              eval: comp,
              expression: `${get(selectedPrograms)
                .map((p) => p.concentration)
                .join(' ')} ${operator} ${right}`
            }
          ]
        };
      case 'MINOR':
        comp = listFunc(get(selectedMinors));
        return {
          eval: comp,
          comparisons: [
            {
              eval: comp,
              expression: `${get(selectedMinors).join(' ')} ${operator} ${right}`
            }
          ]
        };
      case 'NUMMAJORS':
        comp = compare(get(selectedPrograms).length + '');
        return {
          eval: comp,
          comparisons: [
            {
              eval: comp,
              expression: `${get(selectedPrograms).length} ${operator} ${right}`
            }
          ]
        };
      case 'NUMMINORS':
        comp = compare(get(selectedMinors).length + '');
        return {
          eval: comp,
          comparisons: [
            {
              eval: comp,
              expression: `${get(selectedMinors).length} ${operator} ${right}`
            }
          ]
        };
      case '1STMAJOR':
        comp = compare(get(selectedPrograms)[0].major);
        return {
          eval: comp,
          comparisons: [
            {
              eval: comp,
              expression: `${get(selectedPrograms)[0].major} ${operator} ${right}`
            }
          ]
        };
      case '2NDMAJOR':
        comp = compare(get(selectedPrograms)[1].major);
        return {
          eval: comp,
          comparisons: [
            {
              eval: comp,
              expression: `${get(selectedPrograms)[1].major} ${operator} ${right}`
            }
          ]
        };
      case '3RDMAJOR':
        comp = compare(get(selectedPrograms)[2].major);
        return {
          eval: comp,
          comparisons: [
            {
              eval: comp,
              expression: `${get(selectedPrograms)[2].major} ${operator} ${right}`
            }
          ]
        };

      default:
        comp = false;
        return {
          eval: comp,
          comparisons: [
            {
              eval: comp,
              expression: `Unknown ${operator} ${right}`
            }
          ]
        };
    }
  }

  const left = checkIfCondition(condition.leftCondition);
  if (condition.rightCondition) {
    const right = checkIfCondition(condition.rightCondition);
    if (condition.connector === 'AND')
      return {
        eval: left.eval && right.eval,
        comparisons: [
          {
            eval: left.eval && right.eval,
            expression: '('
          },
          ...left.comparisons,
          {
            eval: left.eval && right.eval,
            expression: ') AND ('
          },
          ...right.comparisons,
          {
            eval: left.eval && right.eval,
            expression: ')'
          }
        ]
      };
    return {
      eval: left.eval || right.eval,
      comparisons: [
        {
          eval: left.eval || right.eval,
          expression: '('
        },
        ...left.comparisons,
        {
          eval: left.eval || right.eval,
          expression: ') OR ('
        },
        ...right.comparisons,
        {
          eval: left.eval || right.eval,
          expression: ')'
        }
      ]
    };
  }
  return left;
}
