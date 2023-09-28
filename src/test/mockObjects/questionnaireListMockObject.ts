import { Questionnaire } from 'blaise-api-node-client';
import { QuestionnaireDetails } from '../../common/interfaces/surveyInterface';

export const questionnaire1Mock: Questionnaire = {
  name: 'LMS2101_AA1',
  serverParkName: 'gusty',
  installDate: '2021-01-15T15:26:43.4233454+00:00',
  status: 'Active',
  dataRecordCount: 3,
  hasData: false,
  active: false,
};

export const questionnaire2Mock: Questionnaire = {
  name: 'LMS2101_AB1',
  serverParkName: 'gusty',
  installDate: '2021-02-15T15:26:43.4233454+00:00',
  status: 'Active',
  dataRecordCount: 1,
  hasData: false,
  active: false,
};

export const questionnaire3Mock: Questionnaire = {
  name: 'LMS2101_AC1',
  serverParkName: 'gusty',
  installDate: '2021-03-15T15:26:43.4233454+00:00',
  status: 'Active',
  dataRecordCount: 0,
  hasData: false,
  active: false,
};

export const questionnaire4Mock: Questionnaire = {
  name: 'OPN2201A',
  serverParkName: 'gusty',
  installDate: '2021-04-15T15:26:43.4233454+00:00',
  status: 'Active',
  dataRecordCount: 3,
  hasData: false,
  active: false,
};

export const questionnaireListMockObject: Questionnaire[] = [
  questionnaire1Mock,
  questionnaire2Mock,
  questionnaire3Mock,
  questionnaire4Mock,
];

export const questionnaireDetails1MockObject: QuestionnaireDetails = {
  questionnaireName: questionnaire1Mock.name,
  numberOfCases: questionnaire1Mock.dataRecordCount ?? 0,
  allocationDetails: {
    numberOfAllocatedCases: 2,
    casesAllocated: [
      {
        CaseId: '9001',
        CaseStatus: 110,
        EditorAllocated: 'jakew',
      },
      {
        CaseId: '9002',
        CaseStatus: 210,
        EditorAllocated: 'toby',
      },
    ],
    casesNotAllocated: [
      {
        CaseId: '9003',
        CaseStatus: 210,
        EditorAllocated: '',
      }],
  },
};

export const questionnaireDetails2MockObject: QuestionnaireDetails = {
  questionnaireName: questionnaire2Mock.name,
  numberOfCases: questionnaire2Mock.dataRecordCount ?? 0,
  allocationDetails: {
    numberOfAllocatedCases: 0,
    casesAllocated: [],
    casesNotAllocated: [
      {
        CaseId: '8001',
        CaseStatus: 0,
        EditorAllocated: '',
      }],
  },
};

export const questionnaireDetails3MockObject: QuestionnaireDetails = {
  questionnaireName: questionnaire3Mock.name,
  numberOfCases: questionnaire3Mock.dataRecordCount ?? 0,
  allocationDetails: {
    numberOfAllocatedCases: 0,
    casesAllocated: [],
    casesNotAllocated: [],
  },
};

export const questionnaireDetails4MockObject: QuestionnaireDetails = {
  questionnaireName: questionnaire4Mock.name,
  numberOfCases: questionnaire4Mock.dataRecordCount ?? 0,
  allocationDetails: {
    numberOfAllocatedCases: 2,
    casesAllocated: [
      {
        CaseId: '7001',
        CaseStatus: 110,
        EditorAllocated: 'toby',
      },
      {
        CaseId: '7002',
        CaseStatus: 210,
        EditorAllocated: 'toby',
      },
    ],
    casesNotAllocated: [
      {
        CaseId: '7003',
        CaseStatus: 210,
        EditorAllocated: '',
      }],
  },
};

export const questionnaireDetailsListMockObject: QuestionnaireDetails[] = [
  questionnaireDetails1MockObject,
  questionnaireDetails2MockObject,
  questionnaireDetails3MockObject,
  questionnaireDetails4MockObject,
];
