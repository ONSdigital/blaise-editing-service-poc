import { CaseEditInformation } from 'blaise-api-node-client/lib/cjs/interfaces/case';
import CaseOutcome from 'blaise-api-node-client/lib/cjs/enums/caseOutcome';
import EditedStatus from 'blaise-api-node-client/lib/cjs/enums/editedStatus';
import Organisation from 'blaise-api-node-client/lib/cjs/enums/organisation';
import mapEditorInformation from '../../../client/Mappers/editorInformaitionMapper';
import { EditorInformation } from '../../../client/Interfaces/editorInterface';

describe('Map editor informaiton', () => {
  it('It should return a correctly mapped editor informaito given all details are present', () => {
    // arrange

    const caseEditInformationList: CaseEditInformation[] = [{
      primaryKey: '10001011',
      outcome: CaseOutcome.Completed,
      assignedTo: 'Rich',
      interviewer: '',
      editedStatus: EditedStatus.NotStarted,
      organisation: Organisation.ONS,
    },
    {
      primaryKey: '10001013',
      outcome: CaseOutcome.Completed,
      assignedTo: 'Rich',
      interviewer: '',
      editedStatus: EditedStatus.Started,
      organisation: Organisation.ONS,
    },
    {
      primaryKey: '10001014',
      outcome: CaseOutcome.CompletedProxy,
      assignedTo: 'Jake',
      interviewer: '',
      editedStatus: EditedStatus.Query,
      organisation: Organisation.ONS,
    },
    {
      primaryKey: '10001015',
      outcome: CaseOutcome.CompletedNudge,
      assignedTo: 'Jake',
      interviewer: '',
      editedStatus: EditedStatus.Finished,
      organisation: Organisation.ONS,
    },
    ];

    const expectedEditorInformaiton: EditorInformation = {
      numberOfCasesAllocated: 4,
      Cases: [{
        CaseId: '10001011',
        EditStatus: 'Not started',
      },
      {
        CaseId: '10001013',
        EditStatus: 'Started',
      },
      {
        CaseId: '10001014',
        EditStatus: 'Queried',
      },
      {
        CaseId: '10001015',
        EditStatus: 'Finished',
      }],
    };

    // act
    const result = mapEditorInformation(caseEditInformationList);

    // assert
    expect(result).toEqual(expectedEditorInformaiton);
  });
});
