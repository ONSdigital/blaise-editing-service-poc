import { CaseEditInformation } from 'blaise-api-node-client/lib/cjs/interfaces/case';
import CaseOutcome from 'blaise-api-node-client/lib/cjs/enums/caseOutcome';
import EditedStatus from 'blaise-api-node-client/lib/cjs/enums/editedStatus';
import Organisation from 'blaise-api-node-client/lib/cjs/enums/organisation';
import { CasesNotAllocatedInformation } from '../../../client/Interfaces/caseAllocationInterface';
import mapCasesNotAllocated from '../../../client/Mappers/caseAllocationMapper';

describe('Map cases not allocated informaiton', () => {
  it('It should return a correctly mapped cases not allocated model given all details are present', () => {
    // arrange

    const caseEditInformationList: CaseEditInformation[] = [{
      primaryKey: '10001011',
      outcome: CaseOutcome.Completed,
      assignedTo: '',
      interviewer: 'bobw',
      editedStatus: EditedStatus.NotStarted,
      organisation: Organisation.ONS,
      editUrl: 'https://cati.blaise.com/FRS2504A?Mode=CAWI&KeyValue=10001011',
    },
    {
      primaryKey: '10001013',
      outcome: CaseOutcome.Completed,
      assignedTo: '',
      interviewer: 'jamester',
      editedStatus: EditedStatus.NotStarted,
      organisation: Organisation.ONS,
      editUrl: 'https://cati.blaise.com/FRS2504A?Mode=CAWI&KeyValue=10001013',
    },
    {
      primaryKey: '10001014',
      outcome: CaseOutcome.CompletedProxy,
      assignedTo: '',
      interviewer: 'bobw',
      editedStatus: EditedStatus.NotStarted,
      organisation: Organisation.ONS,
      editUrl: 'https://cati.blaise.com/FRS2504A?Mode=CAWI&KeyValue=10001014',
    },
    {
      primaryKey: '10001015',
      outcome: CaseOutcome.CompletedNudge,
      assignedTo: 'Jake',
      interviewer: 'jamester',
      editedStatus: EditedStatus.NotStarted,
      organisation: Organisation.ONS,
      editUrl: 'https://cati.blaise.com/FRS2504A?Mode=CAWI&KeyValue=10001015',
    },
    ];

    const expectedCasesNotAllocatedInformation: CasesNotAllocatedInformation = {
      interviewerCases: [{
        Interviewer: 'bobw',
        Cases: ['10001011', '10001014'],
      },
      {
        Interviewer: 'jamester',
        Cases: ['10001013'],
      },
      ],
    };

    // act
    const result = mapCasesNotAllocated(caseEditInformationList);

    // assert
    expect(result).toEqual(expectedCasesNotAllocatedInformation);
  });
});
