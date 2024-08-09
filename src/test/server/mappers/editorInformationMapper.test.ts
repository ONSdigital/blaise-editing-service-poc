import { CaseEditInformation, CaseOutcome, EditedStatus } from 'blaise-api-node-client';
import { EditorInformation } from '../../../common/interfaces/caseInterface';
import mapEditorInformaiton from '../../../server/mappers/editorInformaitionMapper';

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
      primaryKey: '10001012',
      outcome: CaseOutcome.Completed,
      assignedTo: 'Dave',
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
        EditStatus: 'Not Started',
      },
      {
        CaseId: '10001013',
        EditStatus: 'Started',
      }],
    };

    // act
    const result = mapEditorInformaiton(caseEditInformationList);

    // assert
    expect(result).toEqual(expectedEditorInformaiton);
  });
});
