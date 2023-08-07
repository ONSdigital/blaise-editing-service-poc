import { CaseStatus, CaseOutcome } from 'blaise-api-node-client';
import { CaseDetails } from '../../../common/interfaces/case.interface';
import { mapCaseDetails } from '../../../server/mappers/case.mapper';

describe('Map case status list to case details list', () => {
  it('It should return a correctly mapped list of cases', () => {
    // arrange
    const questionnaireName: string = 'TEST111A';
    const externalWebUrl: string = 'cati.blaise.com';

    const caseStatusList: CaseStatus[] = [
      {
        primaryKey: '1',
        outcome: CaseOutcome.Completed,
      },
      {
        primaryKey: '2',
        outcome: CaseOutcome.Partial,
      },
      {
        primaryKey: '3',
        outcome: CaseOutcome.AppointmentMade,
      },
    ];

    const expectedCasesList: CaseDetails[] = [
      {
        CaseId: '1',
        CaseStatus: CaseOutcome.Completed,
        CaseLink: `https://${externalWebUrl}/${questionnaireName}?Mode=CAWI&KeyValue=1`,
      },
      {
        CaseId: '2',
        CaseStatus: CaseOutcome.Partial,
        CaseLink: `https://${externalWebUrl}/${questionnaireName}?Mode=CAWI&KeyValue=2`,
      },
      {
        CaseId: '3',
        CaseStatus: CaseOutcome.AppointmentMade,
        CaseLink: `https://${externalWebUrl}/${questionnaireName}?Mode=CAWI&KeyValue=3`,
      },
    ];

    // act
    const result = mapCaseDetails(caseStatusList, questionnaireName, externalWebUrl);

    // assert
    expect(result).toEqual(expectedCasesList);
  });
});
