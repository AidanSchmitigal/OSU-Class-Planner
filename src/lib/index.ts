export enum Term {
  FALL = 'FALL',
  WINTER = 'WINTER',
  SPRING = 'SPRING',
  SUMMER = 'SUMMER'
}
export const Terms = [Term.FALL, Term.WINTER, Term.SPRING, Term.SUMMER];
export function termAbbr(term: Term) {
  switch (term) {
    case Term.FALL:
      return 'F';
    case Term.WINTER:
      return 'W';
    case Term.SPRING:
      return 'S';
    case Term.SUMMER:
      return 'U';
  }
}

export const Requirement = {
  NONE: { value: 'NONE', style: 'border-gray-100' },
  REQUIRED: { value: 'REQUIRED', style: 'border-red-500' },
  BACCORE: { value: 'BACCORE', style: 'border-blue-500' },
  MAJOR: { value: 'MAJOR', style: 'border-amber-500' },
  CONCENTRATION: { value: 'CONCENTRATION', style: 'border-pink-500' },
  ELECTIVE: { value: 'ELECTIVE', style: 'border-green-500' }
};
export const Requirements = [Requirement.NONE, Requirement.REQUIRED, Requirement.BACCORE, Requirement.MAJOR, Requirement.CONCENTRATION, Requirement.ELECTIVE];

export type Requirement = (typeof Requirement)[keyof typeof Requirement];
export function nextRequirement(requirement: Requirement): Requirement {
  return Requirements[(Requirements.indexOf(requirement) + 1) % Requirements.length];
}
export function previousRequirement(requirement: Requirement): Requirement {
  return Requirements[(Requirements.indexOf(requirement) - 1 + Requirements.length) % Requirements.length];
}

export const Status = {
  NOT_STARTED: { value: 'NOT_STARTED', style: 'transparent' },
  NEXT_TERM: { value: 'NEXT_TERM', style: 'bg-amber-500' },
  IN_PROGRESS: { value: 'IN_PROGRESS', style: 'bg-blue-500' },
  COMPLETED: { value: 'COMPLETED', style: 'bg-green-500' }
};
export const Statuses = [Status.NOT_STARTED, Status.NEXT_TERM, Status.IN_PROGRESS, Status.COMPLETED];
export type Status = (typeof Status)[keyof typeof Status];
export function nextStatus(status: Status): Status {
  return Statuses[(Statuses.indexOf(status) + 1) % Statuses.length];
}
export function previousStatus(status: Status): Status {
  return Statuses[(Statuses.indexOf(status) - 1 + Statuses.length) % Statuses.length];
}

export type Course = {
  discipline: string;
  code: string;
  title: string;
  description?: string;
  descriptionAdditional?: string;

  repeatLimit: string;
  creditHourLow: string;
  creditHourHigh: string;
  creditHourIndicator: '' | 'TO' | 'OR';

  attributes: {
    code: string;
    description: string;
  }[];

  prerequisites: {
    discipline: string;
    code: string;
    levelCode: string;
    minimumGrade: string;
    concurrencyIndicator: string;
    connector: string;
    leftParenthesis: string;
    rightParenthesis: string;
  }[];

  sections: {
    termCode: string;
    termLiteral: string;
    courseReferenceNumber: string;
    sequenceNumber: string;
    scheduleCode: string;
    campusCode: string;
    courseTitle: string;
    creditHours: string;
    gradeModeCode: string;
    gradableIndicator: string;
    maximumEnrollment: string;
    enrollment: string;
    seatsAvailable: string;
    waitCapacity: string;
    waitCount: string;
    waitAvailable: string;
    meetings: {
      termCode: string;
      courseReferenceNumber: string;
      daysCode: string;
      dayNumber: string;
      beginTime: string;
      endTime: string;
      buildingCode: string;
      roomCode: string;
      activityDate: string;
      startDate: string;
      endDate: string;
      category: string;
      sunday: string;
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      scheduleCode: string;
      override: string;
      creditHourSession: string;
      meetingNumber: string;
      hoursPerWeek: string;
      funcCode: string;
      comtCode: string;
      schsCode: string;
      mtypCode: string;
    }[];
  }[];

  requirement: Requirement;
  status: Status;
};

export const urlParams = new URLSearchParams(window.location.search);
export let loadedFromURL = false;
if (urlParams.has('courses') && urlParams.has('programs') && urlParams.has('minors')) {
  loadedFromURL = true;
}

export function loadLocalStore<T>(key: string): T | undefined {
  if (loadedFromURL) return undefined;
  const localStore = localStorage.getItem(key);
  if (localStore) {
    return JSON.parse(localStore);
  }
  return undefined;
}

export function saveLocalStore(key: string, data: unknown) {
  if (loadedFromURL) return;
  localStorage.setItem(key, JSON.stringify(data));
}
