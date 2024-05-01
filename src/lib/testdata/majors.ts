'https://mydegrees.oregonstate.edu:7447/dashboard/api/';
fetch('https://mydegrees.oregonstate.edu:7447/dashboard/api/course-link?discipline=CS&number=325&');
fetch('https://mydegrees.oregonstate.edu:7447/dashboard/api/course-link?discipline=%40&number=%40&attribute=CPCD&attributeOperator=%3D&');

('https://mydegrees.oregonstate.edu:7447/dashboard/api/courses?size=1000000');

fetch('https://mydegrees.oregonstate.edu:7447/dashboard/api/audit', {
  body: {
    studentId: '934424307',
    isIncludeInprogress: true,
    isIncludePreregistered: true,
    isKeepCurriculum: false,
    school: '01',
    degree: 'BS',
    catalogYear: '2324',
    goals: [
      { code: 'MAJOR', value: '307', catalogYear: '' },
      { code: 'MINOR', value: '758', catalogYear: '' },
      { code: 'CONC', value: '354', catalogYear: '' },
      { code: 'COLLEGE', value: '16', catalogYear: '' },
      { code: 'MAJOR', value: '910', catalogYear: '' },
      { code: 'COLLEGE', value: '01', catalogYear: '' }
    ],
    classes: []
  },
  method: 'POST'
});

fetch('https://mydegrees.oregonstate.edu:7447/dashboard/api/audit', {
  headers: {
    accept: 'application/json',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    pragma: 'no-cache',
    'sec-ch-ua': '"Chromium";v="117", "Not;A=Brand";v="8"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin'
  },
  referrer: 'https://mydegrees.oregonstate.edu:7447/dashboard/worksheets/whatif',
  referrerPolicy: 'strict-origin-when-cross-origin',
  body: '{"studentId":"934424307","isIncludeInprogress":true,"isIncludePreregistered":true,"isKeepCurriculum":false,"school":"01","degree":"BS","catalogYear":"2324","goals":[{"code":"MAJOR","value":"307","catalogYear":""},{"code":"MINOR","value":"758","catalogYear":""},{"code":"CONC","value":"354","catalogYear":""},{"code":"COLLEGE","value":"16","catalogYear":""},{"code":"MAJOR","value":"910","catalogYear":""},{"code":"COLLEGE","value":"01","catalogYear":""}],"classes":[]}',
  method: 'POST',
  mode: 'cors',
  credentials: 'include'
});

for (const deg of ['BA', 'BFA', 'BM', 'BS', 'CERT', 'HBA', 'HBFA', 'HBM', 'HBS', '000000']) {
  fetch('https://mydegrees.oregonstate.edu:7447/dashboard/api/goals', {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      pragma: 'no-cache',
      'sec-ch-ua': '"Chromium";v="117", "Not;A=Brand";v="8"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin'
    },
    referrer: 'https://mydegrees.oregonstate.edu:7447/dashboard/worksheets/whatif',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: JSON.stringify([
      {
        id: 'programCollection',
        description: 'Program',
        isExpandable: false,
        goals: [
          { name: 'catalogYear', description: 'Catalog year', entityName: 'catalogYears', isDisabled: false, isDriver: true, isError: false, isMultiple: false, isRequired: true, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: 'api/validations/special-entities/catalogYears', errorMessage: '', catalogYear: '', choices: [], selectedChoices: ['2324'], ruleGoalCode: null, links: [] },
          {
            name: 'campus',
            description: 'Campus',
            entityName: 'campuses',
            isDisabled: false,
            isDriver: true,
            isError: false,
            isMultiple: false,
            isRequired: true,
            isStatic: false,
            isVisible: true,
            isNoValidOptionsWarning: false,
            source: '',
            errorMessage: '',
            catalogYear: '',
            choices: [
              { key: 'B', description: 'Bend Campus', isVisibleInWhatif: true },
              { key: 'C', description: 'Corvallis Campus', isVisibleInWhatif: true },
              { key: 'L', description: 'LaGrande', isVisibleInWhatif: true },
              { key: 'DSC', description: 'Online - Ecampus', isVisibleInWhatif: true },
              { key: 'PDX', description: 'Portland Campus', isVisibleInWhatif: true }
            ],
            selectedChoices: ['C'],
            ruleGoalCode: 'CAMPUS',
            links: []
          },
          {
            name: 'school',
            description: 'Level',
            entityName: 'schools',
            isDisabled: false,
            isDriver: true,
            isError: false,
            isMultiple: false,
            isRequired: true,
            isStatic: false,
            isVisible: true,
            isNoValidOptionsWarning: false,
            source: '',
            errorMessage: '',
            catalogYear: '',
            choices: [
              { key: '02', description: 'Graduate', isVisibleInWhatif: true },
              { key: '03', description: 'Postbacc Degree Seeking', isVisibleInWhatif: true },
              { key: '01', description: 'Undergraduate', isVisibleInWhatif: true }
            ],
            selectedChoices: ['01'],
            ruleGoalCode: 'SCHOOL',
            links: []
          },
          {
            name: 'degree',
            description: 'Degree',
            entityName: 'degrees',
            isDisabled: false,
            isDriver: true,
            isError: false,
            isMultiple: false,
            isRequired: true,
            isStatic: false,
            isVisible: true,
            isNoValidOptionsWarning: false,
            source: '',
            errorMessage: '',
            catalogYear: '',
            choices: [
              { key: 'BA', description: 'Bachelor of Arts', isVisibleInWhatif: true },
              { key: 'BFA', description: 'Bachelor of Fine Arts', isVisibleInWhatif: true },
              { key: 'BM', description: 'Bachelor of Music', isVisibleInWhatif: true },
              { key: 'BS', description: 'Bachelor of Science', isVisibleInWhatif: true },
              { key: 'CERT', description: 'Certificate in', isVisibleInWhatif: true },
              { key: 'HBA', description: 'Honors Bachelor of Arts', isVisibleInWhatif: true },
              { key: 'HBFA', description: 'Honors Bachelor of Fine Arts', isVisibleInWhatif: true },
              { key: 'HBM', description: 'Honors Bachelor of Music', isVisibleInWhatif: true },
              { key: 'HBS', description: 'Honors Bachelor of Science', isVisibleInWhatif: true },
              { key: '000000', description: 'Not Declared/Not Seeking Degre', isVisibleInWhatif: true }
            ],
            selectedChoices: [deg],
            ruleGoalCode: 'DEGREE',
            links: []
          },
          { name: 'college', description: 'College', entityName: 'colleges', isDisabled: true, isDriver: true, isError: false, isMultiple: false, isRequired: true, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: '', errorMessage: '', catalogYear: '', choices: [], selectedChoices: [], ruleGoalCode: null, links: [] }
        ]
      },
      {
        id: 'curriculumCollection',
        description: 'Areas of study',
        isExpandable: false,
        goals: [
          { name: 'major', description: 'Major', entityName: 'majors', isDisabled: true, isDriver: true, isError: false, isMultiple: false, isRequired: true, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: '', errorMessage: '', catalogYear: '', choices: [], selectedChoices: [], ruleGoalCode: null, links: [] },
          { name: 'concentration', description: 'Concentration', entityName: 'concentrations', isDisabled: true, isDriver: true, isError: false, isMultiple: false, isRequired: false, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: '', errorMessage: '', catalogYear: '', choices: [], selectedChoices: [], ruleGoalCode: null, links: [] },
          { name: 'minor', description: 'Minor', entityName: 'minors', isDisabled: true, isDriver: true, isError: false, isMultiple: false, isRequired: false, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: '', errorMessage: '', catalogYear: '', choices: [], selectedChoices: [], ruleGoalCode: null, links: [] }
        ]
      },
      {
        id: 'secondaryCurriculumCollection',
        description: 'Additional areas of study',
        isExpandable: false,
        goals: [
          {
            name: 'secondaryDegree',
            description: 'Degree',
            entityName: 'degrees',
            isDisabled: false,
            isDriver: true,
            isError: false,
            isMultiple: false,
            isRequired: true,
            isStatic: false,
            isVisible: true,
            isNoValidOptionsWarning: false,
            source: 'api/validations/special-entities/degrees',
            errorMessage: '',
            catalogYear: '',
            choices: [
              { key: 'BA', description: 'Bachelor of Arts', isVisibleInWhatif: true },
              { key: 'BFA', description: 'Bachelor of Fine Arts', isVisibleInWhatif: true },
              { key: 'BM', description: 'Bachelor of Music', isVisibleInWhatif: true },
              { key: 'BS', description: 'Bachelor of Science', isVisibleInWhatif: true },
              { key: 'CERT', description: 'Certificate in', isVisibleInWhatif: true },
              { key: 'HBA', description: 'Honors Bachelor of Arts', isVisibleInWhatif: true },
              { key: 'HBFA', description: 'Honors Bachelor of Fine Arts', isVisibleInWhatif: true },
              { key: 'HBM', description: 'Honors Bachelor of Music', isVisibleInWhatif: true },
              { key: 'HBS', description: 'Honors Bachelor of Science', isVisibleInWhatif: true },
              { key: '000000', description: 'Not Declared/Not Seeking Degre', isVisibleInWhatif: true }
            ],
            selectedChoices: [],
            ruleGoalCode: 'DEGREE',
            links: []
          },
          { name: 'secondaryCollege', description: 'College', entityName: 'colleges', isDisabled: true, isDriver: true, isError: false, isMultiple: false, isRequired: true, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: 'api/validations/special-entities/colleges', errorMessage: '', catalogYear: '', choices: [], selectedChoices: [], ruleGoalCode: null, links: [] },
          { name: 'secondaryMajor', description: 'Major', entityName: 'majors', isDisabled: true, isDriver: true, isError: false, isMultiple: false, isRequired: false, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: 'api/validations/special-entities/majors-whatif', errorMessage: '', catalogYear: '', choices: [], selectedChoices: [], ruleGoalCode: null, links: [] },
          { name: 'secondaryConcentration', description: 'Concentration', entityName: 'concentrations', isDisabled: true, isDriver: false, isError: false, isMultiple: false, isRequired: false, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: 'api/validations/special-entities/concentrations', errorMessage: '', catalogYear: '', choices: [], selectedChoices: [], ruleGoalCode: null, links: [] },
          { name: 'secondaryMinor', description: 'Minor', entityName: 'minors', isDisabled: true, isDriver: true, isError: false, isMultiple: false, isRequired: false, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: 'api/validations/special-entities/minors-whatif', errorMessage: '', catalogYear: '', choices: [], selectedChoices: [], ruleGoalCode: null, links: [] }
        ]
      }
    ]),
    method: 'POST',
    mode: 'cors',
    credentials: 'include'
  })
    .then((r) => r.json())
    .then((j) => {
      for (const choic of j[0].goals[4].choices) {
        fetch('https://mydegrees.oregonstate.edu:7447/dashboard/api/goals', {
          headers: {
            accept: '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            pragma: 'no-cache',
            'sec-ch-ua': '"Chromium";v="117", "Not;A=Brand";v="8"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin'
          },
          referrer: 'https://mydegrees.oregonstate.edu:7447/dashboard/worksheets/whatif',
          referrerPolicy: 'strict-origin-when-cross-origin',
          body: JSON.stringify([
            {
              id: 'programCollection',
              description: 'Program',
              isExpandable: false,
              goals: [
                { name: 'catalogYear', description: 'Catalog year', entityName: 'catalogYears', isDisabled: false, isDriver: true, isError: false, isMultiple: false, isRequired: true, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: 'api/validations/special-entities/catalogYears', errorMessage: '', catalogYear: '', choices: [], selectedChoices: ['2324'], ruleGoalCode: null, links: [] },
                {
                  name: 'campus',
                  description: 'Campus',
                  entityName: 'campuses',
                  isDisabled: false,
                  isDriver: true,
                  isError: false,
                  isMultiple: false,
                  isRequired: true,
                  isStatic: false,
                  isVisible: true,
                  isNoValidOptionsWarning: false,
                  source: '',
                  errorMessage: '',
                  catalogYear: '',
                  choices: [
                    { key: 'B', description: 'Bend Campus', isVisibleInWhatif: true },
                    { key: 'C', description: 'Corvallis Campus', isVisibleInWhatif: true },
                    { key: 'L', description: 'LaGrande', isVisibleInWhatif: true },
                    { key: 'DSC', description: 'Online - Ecampus', isVisibleInWhatif: true },
                    { key: 'PDX', description: 'Portland Campus', isVisibleInWhatif: true }
                  ],
                  selectedChoices: ['C'],
                  ruleGoalCode: 'CAMPUS',
                  links: []
                },
                {
                  name: 'school',
                  description: 'Level',
                  entityName: 'schools',
                  isDisabled: false,
                  isDriver: true,
                  isError: false,
                  isMultiple: false,
                  isRequired: true,
                  isStatic: false,
                  isVisible: true,
                  isNoValidOptionsWarning: false,
                  source: '',
                  errorMessage: '',
                  catalogYear: '',
                  choices: [
                    { key: '02', description: 'Graduate', isVisibleInWhatif: true },
                    { key: '03', description: 'Postbacc Degree Seeking', isVisibleInWhatif: true },
                    { key: '01', description: 'Undergraduate', isVisibleInWhatif: true }
                  ],
                  selectedChoices: ['01'],
                  ruleGoalCode: 'SCHOOL',
                  links: []
                },
                {
                  name: 'degree',
                  description: 'Degree',
                  entityName: 'degrees',
                  isDisabled: false,
                  isDriver: true,
                  isError: false,
                  isMultiple: false,
                  isRequired: true,
                  isStatic: false,
                  isVisible: true,
                  isNoValidOptionsWarning: false,
                  source: '',
                  errorMessage: '',
                  catalogYear: '',
                  choices: [
                    { key: 'BA', description: 'Bachelor of Arts', isVisibleInWhatif: true },
                    { key: 'BFA', description: 'Bachelor of Fine Arts', isVisibleInWhatif: true },
                    { key: 'BM', description: 'Bachelor of Music', isVisibleInWhatif: true },
                    { key: 'BS', description: 'Bachelor of Science', isVisibleInWhatif: true },
                    { key: 'CERT', description: 'Certificate in', isVisibleInWhatif: true },
                    { key: 'HBA', description: 'Honors Bachelor of Arts', isVisibleInWhatif: true },
                    { key: 'HBFA', description: 'Honors Bachelor of Fine Arts', isVisibleInWhatif: true },
                    { key: 'HBM', description: 'Honors Bachelor of Music', isVisibleInWhatif: true },
                    { key: 'HBS', description: 'Honors Bachelor of Science', isVisibleInWhatif: true },
                    { key: '000000', description: 'Not Declared/Not Seeking Degre', isVisibleInWhatif: true }
                  ],
                  selectedChoices: [deg],
                  ruleGoalCode: 'DEGREE',
                  links: []
                },
                {
                  name: 'college',
                  description: 'College',
                  entityName: 'colleges',
                  isDisabled: true,
                  isDriver: true,
                  isError: false,
                  isMultiple: false,
                  isRequired: true,
                  isStatic: true,
                  isVisible: true,
                  isNoValidOptionsWarning: false,
                  source: '',
                  errorMessage: '',
                  catalogYear: '',
                  choices: j[0].goals[4].choices,
                  selectedChoices: [choic.key],
                  ruleGoalCode: null,
                  links: []
                }
              ]
            },
            {
              id: 'curriculumCollection',
              description: 'Areas of study',
              isExpandable: false,
              goals: [
                { name: 'major', description: 'Major', entityName: 'majors', isDisabled: true, isDriver: true, isError: false, isMultiple: false, isRequired: true, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: '', errorMessage: '', catalogYear: '', choices: [], selectedChoices: [], ruleGoalCode: null, links: [] },
                { name: 'concentration', description: 'Concentration', entityName: 'concentrations', isDisabled: true, isDriver: true, isError: false, isMultiple: false, isRequired: false, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: '', errorMessage: '', catalogYear: '', choices: [], selectedChoices: [], ruleGoalCode: null, links: [] },
                { name: 'minor', description: 'Minor', entityName: 'minors', isDisabled: true, isDriver: true, isError: false, isMultiple: false, isRequired: false, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: '', errorMessage: '', catalogYear: '', choices: [], selectedChoices: [], ruleGoalCode: null, links: [] }
              ]
            },
            {
              id: 'secondaryCurriculumCollection',
              description: 'Additional areas of study',
              isExpandable: false,
              goals: [
                {
                  name: 'secondaryDegree',
                  description: 'Degree',
                  entityName: 'degrees',
                  isDisabled: false,
                  isDriver: true,
                  isError: false,
                  isMultiple: false,
                  isRequired: true,
                  isStatic: false,
                  isVisible: true,
                  isNoValidOptionsWarning: false,
                  source: 'api/validations/special-entities/degrees',
                  errorMessage: '',
                  catalogYear: '',
                  choices: [
                    { key: 'BA', description: 'Bachelor of Arts', isVisibleInWhatif: true },
                    { key: 'BFA', description: 'Bachelor of Fine Arts', isVisibleInWhatif: true },
                    { key: 'BM', description: 'Bachelor of Music', isVisibleInWhatif: true },
                    { key: 'BS', description: 'Bachelor of Science', isVisibleInWhatif: true },
                    { key: 'CERT', description: 'Certificate in', isVisibleInWhatif: true },
                    { key: 'HBA', description: 'Honors Bachelor of Arts', isVisibleInWhatif: true },
                    { key: 'HBFA', description: 'Honors Bachelor of Fine Arts', isVisibleInWhatif: true },
                    { key: 'HBM', description: 'Honors Bachelor of Music', isVisibleInWhatif: true },
                    { key: 'HBS', description: 'Honors Bachelor of Science', isVisibleInWhatif: true },
                    { key: '000000', description: 'Not Declared/Not Seeking Degre', isVisibleInWhatif: true }
                  ],
                  selectedChoices: [],
                  ruleGoalCode: 'DEGREE',
                  links: []
                },
                { name: 'secondaryCollege', description: 'College', entityName: 'colleges', isDisabled: true, isDriver: true, isError: false, isMultiple: false, isRequired: true, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: 'api/validations/special-entities/colleges', errorMessage: '', catalogYear: '', choices: [], selectedChoices: [], ruleGoalCode: null, links: [] },
                { name: 'secondaryMajor', description: 'Major', entityName: 'majors', isDisabled: true, isDriver: true, isError: false, isMultiple: false, isRequired: false, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: 'api/validations/special-entities/majors-whatif', errorMessage: '', catalogYear: '', choices: [], selectedChoices: [], ruleGoalCode: null, links: [] },
                { name: 'secondaryConcentration', description: 'Concentration', entityName: 'concentrations', isDisabled: true, isDriver: false, isError: false, isMultiple: false, isRequired: false, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: 'api/validations/special-entities/concentrations', errorMessage: '', catalogYear: '', choices: [], selectedChoices: [], ruleGoalCode: null, links: [] },
                { name: 'secondaryMinor', description: 'Minor', entityName: 'minors', isDisabled: true, isDriver: true, isError: false, isMultiple: false, isRequired: false, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: 'api/validations/special-entities/minors-whatif', errorMessage: '', catalogYear: '', choices: [], selectedChoices: [], ruleGoalCode: null, links: [] }
              ]
            }
          ]),
          method: 'POST',
          mode: 'cors',
          credentials: 'include'
        })
          .then((r) => r.json())
          .then((k) => {
            for (const maj of k[1].goals[0].choices) {
              fetch('https://mydegrees.oregonstate.edu:7447/dashboard/api/goals', {
                headers: {
                  accept: '*/*',
                  'accept-language': 'en-US,en;q=0.9',
                  'cache-control': 'no-cache',
                  'content-type': 'application/json',
                  pragma: 'no-cache',
                  'sec-ch-ua': '"Chromium";v="117", "Not;A=Brand";v="8"',
                  'sec-ch-ua-mobile': '?0',
                  'sec-ch-ua-platform': '"macOS"',
                  'sec-fetch-dest': 'empty',
                  'sec-fetch-mode': 'cors',
                  'sec-fetch-site': 'same-origin'
                },
                referrer: 'https://mydegrees.oregonstate.edu:7447/dashboard/worksheets/whatif',
                referrerPolicy: 'strict-origin-when-cross-origin',
                body: JSON.stringify([
                  {
                    id: 'programCollection',
                    description: 'Program',
                    isExpandable: false,
                    goals: [
                      { name: 'catalogYear', description: 'Catalog year', entityName: 'catalogYears', isDisabled: false, isDriver: true, isError: false, isMultiple: false, isRequired: true, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: 'api/validations/special-entities/catalogYears', errorMessage: '', catalogYear: '', choices: [], selectedChoices: ['2324'], ruleGoalCode: null, links: [] },
                      {
                        name: 'campus',
                        description: 'Campus',
                        entityName: 'campuses',
                        isDisabled: false,
                        isDriver: true,
                        isError: false,
                        isMultiple: false,
                        isRequired: true,
                        isStatic: false,
                        isVisible: true,
                        isNoValidOptionsWarning: false,
                        source: '',
                        errorMessage: '',
                        catalogYear: '',
                        choices: [
                          { key: 'B', description: 'Bend Campus', isVisibleInWhatif: true },
                          { key: 'C', description: 'Corvallis Campus', isVisibleInWhatif: true },
                          { key: 'L', description: 'LaGrande', isVisibleInWhatif: true },
                          { key: 'DSC', description: 'Online - Ecampus', isVisibleInWhatif: true },
                          { key: 'PDX', description: 'Portland Campus', isVisibleInWhatif: true }
                        ],
                        selectedChoices: ['C'],
                        ruleGoalCode: 'CAMPUS',
                        links: []
                      },
                      {
                        name: 'school',
                        description: 'Level',
                        entityName: 'schools',
                        isDisabled: false,
                        isDriver: true,
                        isError: false,
                        isMultiple: false,
                        isRequired: true,
                        isStatic: false,
                        isVisible: true,
                        isNoValidOptionsWarning: false,
                        source: '',
                        errorMessage: '',
                        catalogYear: '',
                        choices: [
                          { key: '02', description: 'Graduate', isVisibleInWhatif: true },
                          { key: '03', description: 'Postbacc Degree Seeking', isVisibleInWhatif: true },
                          { key: '01', description: 'Undergraduate', isVisibleInWhatif: true }
                        ],
                        selectedChoices: ['01'],
                        ruleGoalCode: 'SCHOOL',
                        links: []
                      },
                      {
                        name: 'degree',
                        description: 'Degree',
                        entityName: 'degrees',
                        isDisabled: false,
                        isDriver: true,
                        isError: false,
                        isMultiple: false,
                        isRequired: true,
                        isStatic: false,
                        isVisible: true,
                        isNoValidOptionsWarning: false,
                        source: '',
                        errorMessage: '',
                        catalogYear: '',
                        choices: [
                          { key: 'BA', description: 'Bachelor of Arts', isVisibleInWhatif: true },
                          { key: 'BFA', description: 'Bachelor of Fine Arts', isVisibleInWhatif: true },
                          { key: 'BM', description: 'Bachelor of Music', isVisibleInWhatif: true },
                          { key: 'BS', description: 'Bachelor of Science', isVisibleInWhatif: true },
                          { key: 'CERT', description: 'Certificate in', isVisibleInWhatif: true },
                          { key: 'HBA', description: 'Honors Bachelor of Arts', isVisibleInWhatif: true },
                          { key: 'HBFA', description: 'Honors Bachelor of Fine Arts', isVisibleInWhatif: true },
                          { key: 'HBM', description: 'Honors Bachelor of Music', isVisibleInWhatif: true },
                          { key: 'HBS', description: 'Honors Bachelor of Science', isVisibleInWhatif: true },
                          { key: '000000', description: 'Not Declared/Not Seeking Degre', isVisibleInWhatif: true }
                        ],
                        selectedChoices: [deg],
                        ruleGoalCode: 'DEGREE',
                        links: []
                      },
                      {
                        name: 'college',
                        description: 'College',
                        entityName: 'colleges',
                        isDisabled: true,
                        isDriver: true,
                        isError: false,
                        isMultiple: false,
                        isRequired: true,
                        isStatic: true,
                        isVisible: true,
                        isNoValidOptionsWarning: false,
                        source: '',
                        errorMessage: '',
                        catalogYear: '',
                        choices: j[0].goals[4].choices,
                        selectedChoices: [choic.key],
                        ruleGoalCode: null,
                        links: []
                      }
                    ]
                  },
                  {
                    id: 'curriculumCollection',
                    description: 'Areas of study',
                    isExpandable: false,
                    goals: [
                      {
                        name: 'major',
                        description: 'Major',
                        entityName: 'majors',
                        isDisabled: true,
                        isDriver: true,
                        isError: false,
                        isMultiple: false,
                        isRequired: true,
                        isStatic: true,
                        isVisible: true,
                        isNoValidOptionsWarning: false,
                        source: '',
                        errorMessage: '',
                        catalogYear: '',
                        choices: k[0].goals[5].choices,
                        selectedChoices: [maj.key],
                        ruleGoalCode: null,
                        links: []
                      },
                      {
                        name: 'concentration',
                        description: 'Concentration',
                        entityName: 'concentrations',
                        isDisabled: true,
                        isDriver: true,
                        isError: false,
                        isMultiple: false,
                        isRequired: false,
                        isStatic: true,
                        isVisible: true,
                        isNoValidOptionsWarning: false,
                        source: '',
                        errorMessage: '',
                        catalogYear: '',
                        choices: [],
                        selectedChoices: [],
                        ruleGoalCode: null,
                        links: []
                      },
                      {
                        name: 'minor',
                        description: 'Minor',
                        entityName: 'minors',
                        isDisabled: true,
                        isDriver: true,
                        isError: false,
                        isMultiple: false,
                        isRequired: false,
                        isStatic: true,
                        isVisible: true,
                        isNoValidOptionsWarning: false,
                        source: '',
                        errorMessage: '',
                        catalogYear: '',
                        choices: [],
                        selectedChoices: [],
                        ruleGoalCode: null,
                        links: []
                      }
                    ]
                  },
                  {
                    id: 'secondaryCurriculumCollection',
                    description: 'Additional areas of study',
                    isExpandable: false,
                    goals: [
                      {
                        name: 'secondaryDegree',
                        description: 'Degree',
                        entityName: 'degrees',
                        isDisabled: false,
                        isDriver: true,
                        isError: false,
                        isMultiple: false,
                        isRequired: true,
                        isStatic: false,
                        isVisible: true,
                        isNoValidOptionsWarning: false,
                        source: 'api/validations/special-entities/degrees',
                        errorMessage: '',
                        catalogYear: '',
                        choices: [
                          { key: 'BA', description: 'Bachelor of Arts', isVisibleInWhatif: true },
                          { key: 'BFA', description: 'Bachelor of Fine Arts', isVisibleInWhatif: true },
                          { key: 'BM', description: 'Bachelor of Music', isVisibleInWhatif: true },
                          { key: 'BS', description: 'Bachelor of Science', isVisibleInWhatif: true },
                          { key: 'CERT', description: 'Certificate in', isVisibleInWhatif: true },
                          { key: 'HBA', description: 'Honors Bachelor of Arts', isVisibleInWhatif: true },
                          { key: 'HBFA', description: 'Honors Bachelor of Fine Arts', isVisibleInWhatif: true },
                          { key: 'HBM', description: 'Honors Bachelor of Music', isVisibleInWhatif: true },
                          { key: 'HBS', description: 'Honors Bachelor of Science', isVisibleInWhatif: true },
                          { key: '000000', description: 'Not Declared/Not Seeking Degre', isVisibleInWhatif: true }
                        ],
                        selectedChoices: [],
                        ruleGoalCode: 'DEGREE',
                        links: []
                      },
                      { name: 'secondaryCollege', description: 'College', entityName: 'colleges', isDisabled: true, isDriver: true, isError: false, isMultiple: false, isRequired: true, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: 'api/validations/special-entities/colleges', errorMessage: '', catalogYear: '', choices: [], selectedChoices: [], ruleGoalCode: null, links: [] },
                      { name: 'secondaryMajor', description: 'Major', entityName: 'majors', isDisabled: true, isDriver: true, isError: false, isMultiple: false, isRequired: false, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: 'api/validations/special-entities/majors-whatif', errorMessage: '', catalogYear: '', choices: [], selectedChoices: [], ruleGoalCode: null, links: [] },
                      { name: 'secondaryConcentration', description: 'Concentration', entityName: 'concentrations', isDisabled: true, isDriver: false, isError: false, isMultiple: false, isRequired: false, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: 'api/validations/special-entities/concentrations', errorMessage: '', catalogYear: '', choices: [], selectedChoices: [], ruleGoalCode: null, links: [] },
                      { name: 'secondaryMinor', description: 'Minor', entityName: 'minors', isDisabled: true, isDriver: true, isError: false, isMultiple: false, isRequired: false, isStatic: true, isVisible: true, isNoValidOptionsWarning: false, source: 'api/validations/special-entities/minors-whatif', errorMessage: '', catalogYear: '', choices: [], selectedChoices: [], ruleGoalCode: null, links: [] }
                    ]
                  }
                ]),
                method: 'POST',
                mode: 'cors',
                credentials: 'include'
              })
                .then((r) => r.json())
                .then((l) => {
                  for (const chonc of l[1].goals[1].choices) {
                    console.log({
                      degree: deg,
                      college: choic.key,
                      major: maj.key,
                      concentration: chonc.key
                    });
                  }
                });
            }
          });
      }
    });
}

// const allthethingsTree = [];
// allthethings.forEach((thing) => {
//     const degreeGroup = allthethingsTree.find(e => e.degree == thing.degree);
//     if (!degreeGroup) allthethingsTree.push(degreeGroup = { degree: thing.degree, colleges: []});

//     const collegeGroup = degreeGroup.colleges.find(e => e.college == thing.college);
//     if (!collegeGroup) degreeGroup.push(collegeGroup = { college: thing.college, majors: []});

//     const majorGroup = collegeGroup.colleges.find(e => e.major == thing.major);
//     if (!majorGroup) collegeGroup.push(majorGroup = { major thing.major, concentrations: []});

//     const concGroup = majorGroup.colleges.find(e => e.concentration == thing.concentration);
//     if (!concGroup) majorGroup.push(concGroup = { concentration: thing.concentration});
// });

/*
const degreeTree = [
  {
    "degree": "BA",
    "colleges": [
      {
        "college": "02",
        "majors": [
          { "major": "181", "concentrations": ["754", "624", "786", "201", "491", "043", "190", "782", "744", "020", "694"] },
*/

const audits = [];
for (const degree of degreeTree) {
  for (const college of degree.colleges) {
    for (const major of college.majors) {
      fetch('https://mydegrees.oregonstate.edu:7447/dashboard/api/audit', {
        headers: {
          accept: 'application/json',
          'accept-language': 'en-US,en;q=0.9',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
          pragma: 'no-cache',
          'sec-ch-ua': '"Chromium";v="117", "Not;A=Brand";v="8"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin'
        },
        referrer: 'https://mydegrees.oregonstate.edu:7447/dashboard/worksheets/whatif',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: JSON.stringify({
          studentId: '934424307',
          isIncludeInprogress: false,
          isIncludePreregistered: false,
          isKeepCurriculum: false,
          school: '01',
          degree: degree.degree,
          catalogYear: '2324',
          goals: [
            { code: 'MAJOR', value: major.major, catalogYear: '' },
            { code: 'COLLEGE', value: college.college, catalogYear: '' }
          ],
          classes: []
        }),
        method: 'POST',
        mode: 'cors',
        credentials: 'include'
      })
        .then((r) => r.json())
        .then((j) => audits.push({ degree: degree.degree, college: college.college, major: major.major, concentration: '', audit: j }));
      for (const concentration of major.concentrations) {
        fetch('https://mydegrees.oregonstate.edu:7447/dashboard/api/audit', {
          headers: {
            accept: 'application/json',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            pragma: 'no-cache',
            'sec-ch-ua': '"Chromium";v="117", "Not;A=Brand";v="8"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin'
          },
          referrer: 'https://mydegrees.oregonstate.edu:7447/dashboard/worksheets/whatif',
          referrerPolicy: 'strict-origin-when-cross-origin',
          body: JSON.stringify({
            studentId: '934424307',
            isIncludeInprogress: false,
            isIncludePreregistered: false,
            isKeepCurriculum: false,
            school: '01',
            degree: degree.degree,
            catalogYear: '2324',
            goals: [
              { code: 'MAJOR', value: major.major, catalogYear: '' },
              { code: 'CONC', value: concentration, catalogYear: '' },
              { code: 'COLLEGE', value: college.college, catalogYear: '' }
            ],
            classes: []
          }),
          method: 'POST',
          mode: 'cors',
          credentials: 'include'
        })
          .then((r) => r.json())
          .then((j) => audits.push({ degree: degree.degree, college: college.college, major: major.major, concentration: concentration, audit: j }));
      }
    }
  }
}
