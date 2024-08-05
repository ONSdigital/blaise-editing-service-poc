import { CaseOutcome, EditedStatus, EditingDetails } from "blaise-api-node-client";

export const editingDetailsMockObject1: EditingDetails = {
  primaryKey: '10001011',
  outcome: CaseOutcome.Completed,
  assignedTo: 'Rich',
  editedStatus: EditedStatus.Finished,
  interviewer: '',
};
export const editingDetailsMockObject2: EditingDetails = {
  primaryKey: '10001012',
  outcome: CaseOutcome.Completed,
  assignedTo: 'bob',
  editedStatus: EditedStatus.NotStarted,
  interviewer: '',
};
export const editingDetailsMockObject3: EditingDetails = {
  primaryKey: '10001013',
  outcome: CaseOutcome.Partial,
  assignedTo: 'Julie',
  editedStatus: EditedStatus.Query,
  interviewer: '',
};
export const editingDetailsMockObject4: EditingDetails = {
  primaryKey: '10001014',
  outcome: CaseOutcome.CompletedNudge,
  assignedTo: 'Sarah',
  editedStatus: EditedStatus.Started,
  interviewer: '',
};
export const editingDetailsMockObject5: EditingDetails = {
  primaryKey: '10001015',
  outcome: CaseOutcome.Completed,
  assignedTo: 'rich',
  editedStatus: EditedStatus.Started,
  interviewer: '',
};

export const editingDetailsListMockObject: EditingDetails[] = [
  editingDetailsMockObject1,
  editingDetailsMockObject2,
  editingDetailsMockObject3,
  editingDetailsMockObject4,
  editingDetailsMockObject5,
]