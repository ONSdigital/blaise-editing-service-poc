import { CaseEditInformation } from 'blaise-api-node-client/lib/cjs/interfaces/case';
import CaseOutcome from 'blaise-api-node-client/lib/cjs/enums/caseOutcome';
import EditedStatus from 'blaise-api-node-client/lib/cjs/enums/editedStatus';
import mapEditorInformation from '../../../client/Mappers/editorInformaitionMapper';
import { EditorInformation } from '../../../client/Interfaces/editorInterface';

describe('Map editor informaiton', () => {
  it('It should return a correctly mapped editor informaito given all details are present', () => {
    // arrange

    const caseEditInformationList: CaseEditInformation[] = [{
      primaryKey: '10001011',
      outcome: CaseOutcome.Completed,
      assignedTo: 'Rich',
      editedStatus: EditedStatus.NotStarted,
      interviewer: '',
    },
    {
      primaryKey: '10001013',
      outcome: CaseOutcome.Completed,
      assignedTo: 'Rich',
      editedStatus: EditedStatus.Started,
      interviewer: '',
    },
    ];

    const expectedEditorInformaiton: EditorInformation = {
      numberOfCasesAllocated: 2,
      Cases: [{
        CaseId: '10001011',
        EditStatus: EditedStatus.NotStarted,
      },
      {
        CaseId: '10001013',
        EditStatus: EditedStatus.Started,
      }],
    };

    // act
    const result = mapEditorInformation(caseEditInformationList);

    // assert
    expect(result).toEqual(expectedEditorInformaiton);
  });
});
