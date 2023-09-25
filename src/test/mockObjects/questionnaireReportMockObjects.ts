import { QuestionnaireReport } from 'blaise-api-node-client';
import {
  questionnaire1CaseAllocationMock,
  questionnaire1Mock, questionnaire2CaseAllocationMock, questionnaire2Mock, questionnaire3CaseAllocationMock, questionnaire3Mock, questionnaire4CaseAllocationMock, questionnaire4Mock,
} from './questionnaireListMockObject';

export const questionnaireReport1MockObject: QuestionnaireReport = {
  questionnaireName: questionnaire1Mock.name,
  questionnaireId: '00000000-0000-0000-0000-000000000000',
  reportingData: questionnaire1CaseAllocationMock,
};

export const questionnaireReport2MockObject: QuestionnaireReport = {
  questionnaireName: questionnaire2Mock.name,
  questionnaireId: '00000000-0000-0000-0000-000000000000',
  reportingData: questionnaire2CaseAllocationMock,
};

export const questionnaireReport3MockObject: QuestionnaireReport = {
  questionnaireName: questionnaire3Mock.name,
  questionnaireId: '00000000-0000-0000-0000-000000000000',
  reportingData: questionnaire3CaseAllocationMock,
};

export const questionnaireReport4MockObject: QuestionnaireReport = {
  questionnaireName: questionnaire4Mock.name,
  questionnaireId: '00000000-0000-0000-0000-000000000000',
  reportingData: questionnaire4CaseAllocationMock,
};

export const questionnaireReportMockObjectList: QuestionnaireReport[] = [
  questionnaireReport1MockObject,
  questionnaireReport2MockObject,
  questionnaireReport3MockObject,
  questionnaireReport4MockObject
]