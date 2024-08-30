import { CaseOutcome, CaseEditInformation, EditedStatus } from 'blaise-api-node-client';
import Organisation from 'blaise-api-node-client/lib/cjs/enums/organisation';
import { EditorInformation } from '../../client/Interfaces/editorInterface';
import { SupervisorInformation } from '../../client/Interfaces/supervisorInterface';

export const caseEditInformationMockObject1: CaseEditInformation = {
  primaryKey: '10001011',
  outcome: CaseOutcome.Completed,
  assignedTo: 'Rich',
  interviewer: '',
  editedStatus: EditedStatus.Finished,
  organisation: Organisation.ONS,
};
export const caseEditInformationMockObject2: CaseEditInformation = {
  primaryKey: '10001012',
  outcome: CaseOutcome.Completed,
  assignedTo: 'bob',
  interviewer: '',
  editedStatus: EditedStatus.NotStarted,
  organisation: Organisation.ONS,
};
export const caseEditInformationMockObject3: CaseEditInformation = {
  primaryKey: '10001013',
  outcome: CaseOutcome.Partial,
  assignedTo: 'Julie',
  interviewer: '',
  editedStatus: EditedStatus.Query,
  organisation: Organisation.ONS,
};
export const caseEditInformationMockObject4: CaseEditInformation = {
  primaryKey: '10001014',
  outcome: CaseOutcome.CompletedNudge,
  assignedTo: 'Sarah',
  interviewer: '',
  editedStatus: EditedStatus.Started,
  organisation: Organisation.ONS,
};
export const caseEditInformationMockObject5: CaseEditInformation = {
  primaryKey: '10001015',
  outcome: CaseOutcome.Completed,
  assignedTo: 'Rich',
  interviewer: '',
  editedStatus: EditedStatus.Started,
  organisation: Organisation.ONS,
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
      EditStatus: 'Completed',
    },
    {
      CaseId: '10001015',
      EditStatus: 'In progress',
    },
  ],
};

export const MappedSupervisorInformationMockObject: SupervisorInformation = {
  TotalNumberOfCases: 5,
  NumberOfCasesNotAllocated: 0,
  NumberOfCasesAllocated: 5,
  NumberOfCasesCompleted: 1,
  EditorInformation: [
    {
      EditorName: 'Rich',
      NumberOfCasesAllocated: 2,
      NumberOfCasesCompleted: 1,
      NumberOfCasesQueried: 0,
    },
    {
      EditorName: 'bob',
      NumberOfCasesAllocated: 1,
      NumberOfCasesCompleted: 0,
      NumberOfCasesQueried: 0,
    },
    {
      EditorName: 'Julie',
      NumberOfCasesAllocated: 1,
      NumberOfCasesCompleted: 0,
      NumberOfCasesQueried: 1,
    },
    {
      EditorName: 'Sarah',
      NumberOfCasesAllocated: 1,
      NumberOfCasesCompleted: 0,
      NumberOfCasesQueried: 0,
    },
  ],
};
