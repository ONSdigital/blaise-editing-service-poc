import { Questionnaire } from 'blaise-api-node-client';
import { QuestionnaireDetails } from '../../common/interfaces/surveyInterface';

export const questionnaire1Mock: Questionnaire = {
  name: 'LMS2101_AA1',
  serverParkName: 'gusty',
  installDate: '2021-01-15T15:26:43.4233454+00:00',
  fieldPeriod: '2021-01-01T00:00:00',
  surveyTla: 'LMS',
  status: 'Active',
  dataRecordCount: 3,
  hasData: false,
  active: false,
};

export const questionnaire2Mock: Questionnaire = {
  name: 'FRS2504A',
  serverParkName: 'gusty',
  installDate: '2021-02-15T15:26:43.4233454+00:00',
  fieldPeriod: '2021-01-01T00:00:00',
  surveyTla: 'FRS',
  status: 'Active',
  dataRecordCount: 1,
  hasData: false,
  active: false,
};

export const questionnaire3Mock: Questionnaire = {
  name: 'LMS2101_AC1',
  serverParkName: 'gusty',
  installDate: '2021-03-15T15:26:43.4233454+00:00',
  fieldPeriod: '2021-01-01T00:00:00',
  surveyTla: 'LMS',
  status: 'Active',
  dataRecordCount: 0,
  hasData: false,
  active: false,
};

export const questionnaire4Mock: Questionnaire = {
  name: 'OPN2201A',
  serverParkName: 'gusty',
  installDate: '2022-04-15T15:26:43.4233454+00:00',
  fieldPeriod: '2022-01-01T00:00:00',
  surveyTla: 'OPN',
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
  questionnaireName: 'LMS2101_AA1',
  numberOfCases: 3,
  fieldPeriod: 'January 2021',
  surveyTla: 'LMS',
};

export const questionnaireDetails2MockObject: QuestionnaireDetails = {
  questionnaireName: 'FRS2504A',
  numberOfCases: 1,
  fieldPeriod: 'January 2021',
  surveyTla: 'FRS',
};

export const questionnaireDetails3MockObject: QuestionnaireDetails = {
  questionnaireName: 'LMS2101_AC1',
  numberOfCases: 0,
  fieldPeriod: 'January 2021',
  surveyTla: 'LMS',
};

export const questionnaireDetails4MockObject: QuestionnaireDetails = {
  questionnaireName: 'OPN2201A',
  numberOfCases: 3,
  fieldPeriod: 'January 2022',
  surveyTla: 'OPN',
};

export const questionnaireDetailsListMockObject: QuestionnaireDetails[] = [
  questionnaireDetails1MockObject,
  questionnaireDetails2MockObject,
  questionnaireDetails3MockObject,
  questionnaireDetails4MockObject,
];

export const editQuestionnaireDetailsMockObject: QuestionnaireDetails[] = [{
  questionnaireName: 'FRS2504A',
  numberOfCases: 1,
  fieldPeriod: 'January 2021',
  surveyTla: 'FRS',
}];
