// import aduitJSON from './audit.json';
// const Audit: Audit = aduitJSON as Audit;

// type Audit = {
//   auditHeader: AuditHeader;
//   classInformation: Course[];
//   blockArray: DegreeBlock[];
// };

// type AuditHeader = {
//   studentId: string;
//   studentName: string;
//   studentEmail: string;
//   dateYear: number;
//   dateMonth: number;
//   dateDay: number;
//   studentSystemGpa: number;
//   percentComplete: number;
//   residentApplied: number;
//   residentAppliedInProgress: number;
//   transferApplied: number;
// };

// type Course = {
//   discipline: string;
//   number: string;
//   credits: string;
//   letterGrade: string;
//   id: number;
//   courseTitle: string;
//   term: string;
//   studentSystemCredits: number;
// };

// export interface DegreeBlock {
//   requirementType: string;
//   requirementValue: string;
//   title: string;
//   percentComplete: string;
//   classesApplied: string;
//   creditsApplied: string;
//   header: DegreeBlockHeader;
//   ruleArray?: RuleArrayEntity[];
// }

// export interface DegreeBlockHeader {
//   qualifierArray?: QualifierArrayEntity[];
//   remark: { textList?: string[] | null };
//   advice: Advice;
// }

// export interface QualifierArrayEntity {
//   nodeType: string;
//   tag?: string;
//   classesApplied?: string;
//   creditsApplied?: string;
//   name: string;
//   classes?: string;
//   text: string;
//   subTextList?: string[];
//   credits?: string;
//   applied?: string;
//   code?: string;
//   value?: string;
//   label?: string;
//   labelTag?: string;
//   satisfied?: string;
//   needed?: string;
//   term?: string;
// }

// export interface Advice {
//   textArray?:
//     | {
//         lineList?: string[] | null;
//       }[];
// }

// type RuleType = 'IfStmt' | 'Course' | 'Subset' | 'Group';

// export interface RuleArrayEntity {
//   percentComplete: string;
//   nodeType: string;
//   ruleType: RuleType;
//   booleanEvaluation: string;
//   requirement: Requirement;
// }

// export interface Requirement {
//   leftCondition: Condition;
//   ifPart: IfPart;
//   elsePart?: ElsePart;
//   rightCondition?: Condition;
// }

// export interface IfPart {
//   ruleArray?: {
//     label: string;
//   };
// }

// export interface ElsePart {
//   ruleArray?: {
//     label: string;
//   };
// }

// export interface Condition {
//   connector: string;
//   leftCondition?: Condition;
//   rightCondition?: Condition;
//   relationalOperator?: {
//     left: string;
//     operator: string;
//     right: string;
//     evaluation: string;
//   };
// }

// function constructStatementFromCondition(condition: Condition): string {
//   let statement = '';
//   if (condition.leftCondition) {
//     statement += constructStatementFromCondition(condition.leftCondition);
//   }
//   if (condition.connector) {
//     statement += ` ${condition.connector} `;
//   }
//   if (condition.rightCondition) {
//     statement += constructStatementFromCondition(condition.rightCondition);
//   }
//   if (condition.relationalOperator) {
//     statement += `${condition.relationalOperator.left} ${condition.relationalOperator.operator} ${condition.relationalOperator.right}`;
//   }
//   return statement;
// }

// // All required courses
// Audit.blockArray.forEach((block) => {
//   console.log(`-> ${block.title}`);
//   block.ruleArray?.forEach((rule: RuleArrayEntity) => {
//     if (rule.ruleType === 'IfStmt') {
//       const statement = constructStatementFromCondition(rule.requirement.leftCondition);
//       console.log(statement);
//     } else if (rule.ruleType === 'Course') {
//       console.log(rule.label);
//       console.log(rule.requirement.courseArray.map((c) => `${c.discipline} ${c.number}`).join(', '));
//     }
//   });
// });
export function importAudit() {}

// const majors = [
//   'https://catalog.oregonstate.edu/college-departments/business/accountancy-mac/',
//   'https://catalog.oregonstate.edu/college-departments/business/accountancy-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/public-health-human-sciences/school-biological-population-health-sciences/adapted-physical-education-mape/',
//   'https://catalog.oregonstate.edu/college-departments/education/counseling-adult-higher-education/adult-higher-education-edd-edm-phd/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/applied-economics/agricultural-food-business-management-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/agricultural-education-general-agriculture/agricultural-education-ms/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/agricultural-education-general-agriculture/agricultural-sciences-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/american-studies/american-studies-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/animal-rangeland-sciences/animal-science-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/animal-rangeland-sciences/animal-sciences-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-language-culture-society/anthropology-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/business/apparel-design-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-language-culture-society/applied-anthropology-ma-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/applied-economics/applied-economics-ma-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-history-philosophy-religion/applied-ethics-ma-ms/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-history-philosophy-religion/applied-humanities-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-civil-construction-engineering/architectural-engineering-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-visual-performing-design-arts/art-ba-bfa-bs-hba-hbfa-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-electrical-engineering-computer-science/artificial-intelligence-meng-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-visual-performing-design-arts/arts-media-technology-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/public-health-human-sciences/school-biological-population-health-sciences/athletic-training-matrn/',
//   'https://catalog.oregonstate.edu/college-departments/science/school-life-sciences/biochemistry-biophysics/biochemistry-biophysics-ma-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/science/school-life-sciences/biochemistry-biophysics/biochemistry-biophysics-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/science/school-life-sciences/biochemistry-biophysics/biochemistry-molecular-biology-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-chemical-biological-environmental-engineering/bioengineering-meng-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-chemical-biological-environmental-engineering/bioengineering-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/science/school-life-sciences/microbiology/biohealth-sciences-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/biological-ecological-engineering/biological-ecological-engineering-meng-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/botany-plant-pathology/biological-data-sciences-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/science/school-life-sciences/integrative-biology/biology-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/bioresource-research-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/botany-plant-pathology/botany-plant-pathology-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/botany-plant-pathology/botany-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/business/business-administration-mba-phd/',
//   'https://catalog.oregonstate.edu/college-departments/business/business-administration-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/business/business-analytics-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/business/business-msb/',
//   'https://catalog.oregonstate.edu/college-departments/business/business-information-systems-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-chemical-biological-environmental-engineering/chemical-engineering-meng-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-chemical-biological-environmental-engineering/chemical-engineering-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/science/chemistry/chemistry-ma-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/science/chemistry/chemistry-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-civil-construction-engineering/civil-engineering-meng-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-civil-construction-engineering/civil-engineering-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/earth-ocean-atmospheric-sciences/climate-science-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-language-culture-society/college-student-services-administration-edm-ms/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-communication/communication-ma-ms/',
//   'https://catalog.oregonstate.edu/college-departments/veterinary-medicine/comparative-health-sciences-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-electrical-engineering-computer-science/computer-science-meng-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-electrical-engineering-computer-science/computer-science-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-civil-construction-engineering/construction-engineering-management-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-visual-performing-design-arts/contemporary-music-industry-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/education/counseling-adult-higher-education/counseling-mcoun-phd/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-writing-literature-film/creative-writing-mfa/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-writing-literature-film/creative-writing-ba-hba/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/crop-soil-science/crop-soil-science-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/crop-soil-science/crop-science-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/science/statistics/data-analytics-ms/',
//   'https://catalog.oregonstate.edu/college-departments/business/design-human-environment-ma-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/business/design-innovation-management-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-communication/digital-communication-arts-ba-bfa-bs-hba-hbfa-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/biological-ecological-engineering/ecological-engineering-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-public-policy/economics-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/education/educational-practice-research/education-edd-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/education/educational-practice-research/education-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-electrical-engineering-computer-science/electrical-computer-engineering-meng-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-electrical-engineering-computer-science/electrical-computer-engineering-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/education/educational-practice-research/teaching-mat/elementary-option/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-mechanical-industrial-manufacturing-engineering/energy-systems-engineering-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/other-degrees-programs/engineering-science-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-writing-literature-film/english-ma/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-writing-literature-film/english-ba-hba/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/entomology/entomology-ma-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/other-degrees-programs/environmental-arts-humanities-ma/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/applied-economics/environmental-economics-policy-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-chemical-biological-environmental-engineering/environmental-engineering-meng-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-chemical-biological-environmental-engineering/environmental-engineering-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/graduate-school/environmental-sciences-ma-ms-phd-psm/',
//   'https://catalog.oregonstate.edu/college-departments/earth-ocean-atmospheric-sciences/environmental-sciences-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-language-culture-society/ethnic-studies-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/business/finance-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/fisheries-wildlife-conservation-sciences/fisheries-wildlife-administration-psm/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/fisheries-wildlife-conservation-sciences/fisheries-science-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/fisheries-wildlife-conservation-sciences/fisheries-wildlife-conservation-sciences-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/food-science-technology/food-science-sustainable-technologies-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/food-science-technology/food-science-technology-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/forestry/forest-ecosystems-society/forest-ecosystems-society-mf-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/forestry/forest-engineering-resources-management/forest-engineering-civil-engineering-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/forestry/forest-engineering-resources-management/forest-engineering-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-language-culture-society/french-ba-hba/',
//   'https://catalog.oregonstate.edu/college-departments/earth-ocean-atmospheric-sciences/geography-geospatial-science-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/earth-ocean-atmospheric-sciences/geography-geospatial-science-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/earth-ocean-atmospheric-sciences/geology-ma-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/earth-ocean-atmospheric-sciences/geology-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-language-culture-society/german-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-visual-performing-design-arts/graphic-design-bfa-hbfa/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-history-philosophy-religion/history-philosophy-science-ma-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-history-philosophy-religion/history-ma-ms/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-history-philosophy-religion/history-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/honors/honors-associate-hba-hbfa-hbm-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/honors/honors-scholar-hba-hbfa-hbm-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/horticulture/horticulture-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/horticulture/horticulture-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/business/hospitality-management-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/public-health-human-sciences/school-social-behavioral-health-sciences/human-development-family-sciences-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/public-health-human-sciences/school-social-behavioral-health-sciences/human-development-family-studies-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-mechanical-industrial-manufacturing-engineering/industrial-engineering-meng-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-mechanical-industrial-manufacturing-engineering/industrial-engineering-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/business/innovation-management-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/science/school-life-sciences/integrative-biology/integrative-biology-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/graduate-school/interdisciplinary-studies-mais/',
//   'https://catalog.oregonstate.edu/college-departments/business/interior-design-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-language-culture-society/international-studies-ba-hba/',
//   'https://catalog.oregonstate.edu/college-departments/public-health-human-sciences/school-biological-population-health-sciences/kinesiology-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/public-health-human-sciences/school-biological-population-health-sciences/kinesiology-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/liberal-studies/liberal-studies-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/business/management-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-mechanical-industrial-manufacturing-engineering/manufacturing-engineering-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/earth-ocean-atmospheric-sciences/marine-resource-management-ma-ms/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/other-degrees-programs/marine-studies-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/business/marketing-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-mechanical-industrial-manufacturing-engineering/materials-science-meng-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/science/mathematics/mathematics-ma-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/science/mathematics/mathematics-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-mechanical-industrial-manufacturing-engineering/mechanical-engineering-meng-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-mechanical-industrial-manufacturing-engineering/mechanical-engineering-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/business/merchandising-management-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/science/school-life-sciences/microbiology/microbiology-ma-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/science/school-life-sciences/microbiology/microbiology-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-visual-performing-design-arts/music-studies-bm-hbm/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-visual-performing-design-arts/music-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/forestry/forest-ecosystems-society/natural-resources-mnr/',
//   'https://catalog.oregonstate.edu/college-departments/forestry/forest-ecosystems-society/natural-resources-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-nuclear-science-engineering/nuclear-engineering-meng-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-nuclear-science-engineering/nuclear-engineering-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/public-health-human-sciences/school-biological-population-health-sciences/nutrition-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/public-health-human-sciences/school-biological-population-health-sciences/nutrition-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/earth-ocean-atmospheric-sciences/ocean-earth-atmospheric-sciences-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/earth-ocean-atmospheric-sciences/oceanography-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/other-degrees-programs/outdoor-products-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/pharmacy/pharmaceutical-sciences-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/pharmacy/pharmacy-pharmd/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-history-philosophy-religion/philosophy-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/public-health-human-sciences/school-biological-population-health-sciences/physical-therapy-dpt/',
//   'https://catalog.oregonstate.edu/college-departments/science/physics/physics-ma-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/science/physics/physics-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-public-policy/political-science-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-psychological-sciences/psychology-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-psychological-sciences/psychology-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/public-health-human-sciences/public-health-mph-phd/',
//   'https://catalog.oregonstate.edu/college-departments/public-health-human-sciences/school-social-behavioral-health-sciences/public-health-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-public-policy/public-policy-empp-mpp-phd/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-public-policy/public-policy-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-nuclear-science-engineering/radiation-health-physics-mhp-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-nuclear-science-engineering/radiation-health-physics-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/animal-rangeland-sciences/rangeland-ecology-management-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/animal-rangeland-sciences/rangeland-sciences-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-history-philosophy-religion/religious-studies-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/engineering/school-mechanical-industrial-manufacturing-engineering/robotics-meng-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/other-degrees-programs/social-science-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-public-policy/sociology-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/crop-soil-science/soil-science-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-language-culture-society/spanish-ba-hba/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-communication/speech-communication-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/science/statistics/statistics-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/business/supply-chain-logistics-management-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/sustainability-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/forestry/forest-engineering-resources-management/sustainable-forest-management-mf-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/education/educational-practice-research/teaching-mat/',
//   'https://catalog.oregonstate.edu/college-departments/education/educational-practice-research/teaching-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-visual-performing-design-arts/theatre-arts-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/forestry/forest-ecosystems-society/tourism-recreation-adventure-leadership-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/environmental-molecular-toxicology/toxicology-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/veterinary-medicine/veterinary-medicine-dvm/',
//   'https://catalog.oregonstate.edu/college-departments/graduate-school/water-resources-engineering-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/graduate-school/water-resources-policy-management-ms/',
//   'https://catalog.oregonstate.edu/college-departments/graduate-school/water-resources-science-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/agricultural-sciences/fisheries-wildlife-conservation-sciences/wildlife-science-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-language-culture-society/women-gender-sexuality-studies-ma-phd/',
//   'https://catalog.oregonstate.edu/college-departments/liberal-arts/school-language-culture-society/women-gender-sexuality-studies-ba-bs-hba-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/forestry/wood-science-engineering/wood-innovation-sustainability-bs-hbs/',
//   'https://catalog.oregonstate.edu/college-departments/forestry/wood-science-engineering/wood-science-ms-phd/',
//   'https://catalog.oregonstate.edu/college-departments/science/school-life-sciences/integrative-biology/zoology-bs-hbs/'
// ];

// let coursesJSON = [];
// Promise.all(
//   majors.map(async (major) => {
//     const page = await fetch(major)
//       .then((res) => res.text())
//       .then((text) => new DOMParser().parseFromString(text, 'text/html'));
//     if (!page) return;

//     const title = page.querySelector('.page-title')?.textContent;
//     if (title?.includes('Graduate')) return;
//     const courseList = [...page.querySelectorAll('a')].filter((a) => a.textContent?.includes('\xa0') && a.getAttribute('onclick'));
//     if (!courseList.length) {
//       console.log(`-> ${title}\nYou have no courses`);
//       return;
//     }

//     const courses: {
//       discipline: string;
//       number: string;
//     }[][] = [];
//     courseList.forEach((a) => {
//       const course = a.textContent?.split('\xa0');
//       const [discipline, number] = course ? course : ['', ''];

//       const parent = a.parentElement;
//       const text = parent.textContent.replaceAll('\xa0', ' ');
//       if (text.includes(`or ${discipline} ${number}`)) {
//         courses.at(-1).push({ discipline, number });
//       } else {
//         courses.push([{ discipline, number }]);
//       }

//       // if (text.includes(`& ${discipline} ${number}`)) {
//     });

//     // Find element containing "Major Code"
//     const majorCode = [...page.querySelectorAll('p')].find((p) => p.textContent?.includes('Major Code'))?.textContent;

//     coursesJSON.push({
//       title,
//       courses,
//       majorCode
//     });
//   })
// ).then(() => {
//   console.log(JSON.stringify(coursesJSON));
// });
