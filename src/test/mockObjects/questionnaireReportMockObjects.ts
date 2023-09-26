import { QuestionnaireReport } from 'blaise-api-node-client';
import {
  questionnaire1Mock, questionnaire2Mock, questionnaire3Mock, questionnaire4Mock,
} from './questionnaireListMockObject';
import { caseDetailsListMockObject } from './caseMockObject';

export const questionnaireReport1MockObject: QuestionnaireReport = {
  questionnaireName: questionnaire1Mock.name,
  questionnaireId: '00000000-0000-0000-0000-000000000000',
  reportingData: [
    {
      'qserial.serial_number': caseDetailsListMockObject[0]?.CaseId,
      'qhadmin.hout': caseDetailsListMockObject[0]?.CaseStatus,
      'allocation.toeditor': caseDetailsListMockObject[0]?.EditorAllocated,
    },
    {
      'qserial.serial_number': caseDetailsListMockObject[1]?.CaseId,
      'qhadmin.hout': caseDetailsListMockObject[1]?.CaseStatus,
      'allocation.toeditor': caseDetailsListMockObject[1]?.EditorAllocated,
    },
    {
      'qserial.serial_number': caseDetailsListMockObject[2]?.CaseId,
      'qhadmin.hout': caseDetailsListMockObject[2]?.CaseStatus,
      'allocation.toeditor': caseDetailsListMockObject[2]?.EditorAllocated,
    },
  ],
};

export const questionnaireReport2MockObject: QuestionnaireReport = {
  questionnaireName: questionnaire2Mock.name,
  questionnaireId: '00000000-0000-0000-0000-000000000000',
  reportingData: [
    {
      'allocation.toeditor': '',
    },
  ],
};

export const questionnaireReport3MockObject: QuestionnaireReport = {
  questionnaireName: questionnaire3Mock.name,
  questionnaireId: '00000000-0000-0000-0000-000000000000',
  reportingData: [],
};

export const questionnaireReport4MockObject: QuestionnaireReport = {
  questionnaireName: questionnaire4Mock.name,
  questionnaireId: '00000000-0000-0000-0000-000000000000',
  reportingData: [
    {
      'allocation.toeditor': 'jakew',
    },
    {
      'allocation.toeditor': 'tobym',
    },
    {
      'allocation.toeditor': 'jakew',
    },
  ],
};

export const questionnaireReportMockObjectList: QuestionnaireReport[] = [
  questionnaireReport1MockObject,
  questionnaireReport2MockObject,
  questionnaireReport3MockObject,
  questionnaireReport4MockObject,
];
