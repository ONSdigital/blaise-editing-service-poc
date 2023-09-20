import { CaseData, Questionnaire } from 'blaise-api-node-client';
import { QuestionnaireAllocation } from '../../common/interfaces/surveyInterface';

export const questionnaire1Mock: Questionnaire = {
  name: 'LMS2101_AA1',
  serverParkName: 'gusty',
  installDate: '2021-01-15T15:26:43.4233454+00:00',
  status: 'Active',
  dataRecordCount: 2,
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

export const questionnaire1CaseAllocationMock: CaseData[] = [{
  CaseId: '9001',
  HOut: '110',
  ToEditor: 'jakew',
},
{
  CaseId: '9002',
  HOut: '210',
  ToEditor: 'tobym',
}];

export const questionnaire2CaseAllocationMock: CaseData[] = [{
  CaseId: '9008',
  HOut: '110',
  ToEditor: 'jakew',
}];

export const questionnaire3CaseAllocationMock: CaseData[] = [];

export const questionnaire4CaseAllocationMock: CaseData[] = [{
  CaseId: '9001',
  HOut: '110',
  ToEditor: 'jakew',
},
{
  CaseId: '9002',
  HOut: '210',
  ToEditor: 'tobym',
},
{
  CaseId: '9003',
  HOut: '110',
  ToEditor: 'jakew',
}];

const questionnaireAllocation1Mock: QuestionnaireAllocation = questionnaire1Mock;
questionnaireAllocation1Mock.caseAllocation = questionnaire1CaseAllocationMock;

const questionnaireAllocation2Mock: QuestionnaireAllocation = questionnaire2Mock;
questionnaireAllocation2Mock.caseAllocation = questionnaire2CaseAllocationMock;

const questionnaireAllocation3Mock: QuestionnaireAllocation = questionnaire3Mock;
questionnaireAllocation3Mock.caseAllocation = questionnaire3CaseAllocationMock;

const questionnaireAllocation4Mock: QuestionnaireAllocation = questionnaire4Mock;
questionnaireAllocation4Mock.caseAllocation = questionnaire4CaseAllocationMock;

export {
  questionnaireAllocation1Mock, questionnaireAllocation2Mock, questionnaireAllocation3Mock, questionnaireAllocation4Mock,
};

export const questionnaireAllocationListMockObject: QuestionnaireAllocation[] = [
  questionnaireAllocation1Mock,
  questionnaireAllocation2Mock,
  questionnaireAllocation3Mock,
  questionnaireAllocation4Mock,
];
