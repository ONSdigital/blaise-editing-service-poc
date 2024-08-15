import EditedStatus from 'blaise-api-node-client/lib/cjs/enums/editedStatus';

export interface EditorInformation {
  numberOfCasesAllocated: number,
  Cases: {
    CaseId: string,
    EditStatus: EditedStatus
  }[]
}
