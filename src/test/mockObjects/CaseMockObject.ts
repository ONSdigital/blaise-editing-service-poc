import { CaseOutcome, CaseEditInformation } from 'blaise-api-node-client';
import { EditorInformation } from '../../common/interfaces/caseInterface';

export const caseEditInformationMockObject1: CaseEditInformation = {
  primaryKey: '10001011',
  outcome: CaseOutcome.Completed,
  assignedTo: 'Rich',
  editedStatus: 'Finished',
  interviewer: '',
};
export const caseEditInformationMockObject2: CaseEditInformation = {
  primaryKey: '10001012',
  outcome: CaseOutcome.Completed,
  assignedTo: 'bob',
  editedStatus: 'Not Started',
  interviewer: '',
};
export const caseEditInformationMockObject3: CaseEditInformation = {
  primaryKey: '10001013',
  outcome: CaseOutcome.Partial,
  assignedTo: 'Julie',
  editedStatus: 'Query',
  interviewer: '',
};
export const caseEditInformationMockObject4: CaseEditInformation = {
  primaryKey: '10001014',
  outcome: CaseOutcome.CompletedNudge,
  assignedTo: 'Sarah',
  editedStatus: 'Started',
  interviewer: '',
};
export const caseEditInformationMockObject5: CaseEditInformation = {
  primaryKey: '10001015',
  outcome: CaseOutcome.Completed,
  assignedTo: 'Rich',
  editedStatus: 'Started',
  interviewer: '',
};

export const CaseEditInformationListMockObject: CaseEditInformation[] = [
  caseEditInformationMockObject1,
  caseEditInformationMockObject2,
  caseEditInformationMockObject3,
  caseEditInformationMockObject4,
  caseEditInformationMockObject5,
];

export const MappedEditorInformationRichMockObject: EditorInformation = {
  numberOfCasesAllocated: 2,
  Cases: [
    {
      CaseId: '10001011',
      EditStatus: 'Finished',
    },
    {
      CaseId: '10001015',
      EditStatus: 'Started',
    },
  ],
};
