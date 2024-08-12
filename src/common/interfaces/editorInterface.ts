import { EditedStatus } from 'blaise-api-node-client';

export interface EditorInformation {
  numberOfCasesAllocated: number,
  Cases: {
    CaseId: string,
    EditStatus: EditedStatus
  }[]
}
