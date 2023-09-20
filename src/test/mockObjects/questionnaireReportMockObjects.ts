import { QuestionnaireReport } from 'blaise-api-node-client';
import {
  questionnaire1Mock, questionnaire2Mock, questionnaire3Mock, questionnaire4Mock,
} from './questionnaireListMockObject';

export const questionnaireReport1MockObject: QuestionnaireReport = {
  questionnaireName: questionnaire1Mock.name,
  questionnaireId: '00000000-0000-0000-0000-000000000000',
  reportingData: [],
};

export const questionnaireReport2MockObject: QuestionnaireReport = {
  questionnaireName: questionnaire2Mock.name,
  questionnaireId: '00000000-0000-0000-0000-000000000000',
  reportingData: [],
};

export const questionnaireReport3MockObject: QuestionnaireReport = {
  questionnaireName: questionnaire3Mock.name,
  questionnaireId: '00000000-0000-0000-0000-000000000000',
  reportingData: [],
};

export const questionnaireReport4MockObject: QuestionnaireReport = {
  questionnaireName: questionnaire4Mock.name,
  questionnaireId: '00000000-0000-0000-0000-000000000000',
  reportingData: [],
};
