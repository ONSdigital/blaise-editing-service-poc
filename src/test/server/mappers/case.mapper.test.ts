import { CaseStatus, CaseOutcome, CaseResponse } from 'blaise-api-node-client';
import { CaseDetails, CaseFactsheet } from '../../../common/interfaces/case.interface';
import { mapCaseDetails, mapCaseFactsheet } from '../../../server/mappers/case.mapper';

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

describe('Map case response to factsheet', () => {
  it('It should return a correctly mapped factsheet with 1 responent', () => {
    // arrange
    const CaseResponseMockObject:CaseResponse = {
      caseId: '1',
      fieldData: {
        'qiD.Serial_Number': '1',
        'qDataBag.Prem1': 'Flat 1',
        'qDataBag.Prem2': 'Richmond House',
        'qDataBag.Prem3': 'Rice Road',
        'qDataBag.Prem4': '',
        'qDataBag.District': 'Gwent',
        'qDataBag.PostTown': 'Newport',
        'qDataBag.PostCode': 'NZ11 4PD',
        'qhAdmin.HOut': '100',
        'qhAdmin.Interviewer[1]': 'rich',
        'dmName[1]': 'Richmond Ricecake',
        'dmDteOfBth[1]': '1980-01-15',
        dmhSize: '1',
      },
    };

    const expectedCaseFactsheet: CaseFactsheet = {
      CaseId: '1',
      OutcomeCode: '100',
      InterviewerName: 'rich',
      NumberOfRespondants: '1',
      Address: {
        AddressLine1: 'Flat 1',
        AddressLine2: 'Richmond House',
        AddressLine3: 'Rice Road',
        AddressLine4: '',
        County: 'Gwent',
        Town: 'Newport',
        Postcode: 'NZ11 4PD',
      },
      Respondents: [{
        RespondentName: 'Richmond Ricecake',
        DateOfBirth: '1980-01-15',
      }],
    };
    // act
    const result = mapCaseFactsheet(CaseResponseMockObject);

    // assert
    expect(result).toEqual(expectedCaseFactsheet);
  });

  it('It should return a correctly mapped factsheet with 2 responents', () => {
    // arrange
    const CaseResponseMockObject:CaseResponse = {
      caseId: '1',
      fieldData: {
        'qiD.Serial_Number': '1',
        'qDataBag.Prem1': 'Flat 1',
        'qDataBag.Prem2': 'Richmond House',
        'qDataBag.Prem3': 'Rice Road',
        'qDataBag.Prem4': '',
        'qDataBag.District': 'Gwent',
        'qDataBag.PostTown': 'Newport',
        'qDataBag.PostCode': 'NZ11 4PD',
        'qhAdmin.HOut': '100',
        'qhAdmin.Interviewer[1]': 'rich',
        'dmName[1]': 'Richmond Ricecake',
        'dmDteOfBth[1]': '1980-01-15',
        'dmName[2]': 'Richmond Junior',
        'dmDteOfBth[2]': '2005-04-12',
        dmhSize: '2',
      },
    };

    const expectedCaseFactsheet: CaseFactsheet = {
      CaseId: '1',
      OutcomeCode: '100',
      InterviewerName: 'rich',
      NumberOfRespondants: '2',
      Address: {
        AddressLine1: 'Flat 1',
        AddressLine2: 'Richmond House',
        AddressLine3: 'Rice Road',
        AddressLine4: '',
        County: 'Gwent',
        Town: 'Newport',
        Postcode: 'NZ11 4PD',
      },
      Respondents: [{
        RespondentName: 'Richmond Ricecake',
        DateOfBirth: '1980-01-15',
      },
      {
        RespondentName: 'Richmond Junior',
        DateOfBirth: '2005-04-12',
      }],
    };
    // act
    const result = mapCaseFactsheet(CaseResponseMockObject);

    // assert
    expect(result).toEqual(expectedCaseFactsheet);
  });

  it.each(['one', 'dyhzjsgfkb'])('It should error when household size can not be converted into a number', (value) => {
    // arrange
    const CaseResponseMockObject:CaseResponse = {
      caseId: '1',
      fieldData: {
        'qiD.Serial_Number': '1',
        'qDataBag.Prem1': 'Flat 1',
        'qDataBag.Prem2': 'Richmond House',
        'qDataBag.Prem3': 'Rice Road',
        'qDataBag.Prem4': '',
        'qDataBag.District': 'Gwent',
        'qDataBag.PostTown': 'Newport',
        'qDataBag.PostCode': 'NZ11 4PD',
        'qhAdmin.HOut': '100',
        'qhAdmin.Interviewer[1]': 'rich',
        'dmName[1]': 'Richmond Ricecake',
        'dmDteOfBth[1]': '1980-01-15',
        dmhSize: `${value}`,
      },
    };

    // act && assert
    expect(() => mapCaseFactsheet(CaseResponseMockObject)).toThrowError('Number of responents not specified');
  });

  it.each(['0', '', ' '])('It should error when household Size is missing or zero', (value) => {
    // arrange
    const CaseResponseMockObject:CaseResponse = {
      caseId: '1',
      fieldData: {
        'qiD.Serial_Number': '1',
        'qDataBag.Prem1': 'Flat 1',
        'qDataBag.Prem2': 'Richmond House',
        'qDataBag.Prem3': 'Rice Road',
        'qDataBag.Prem4': '',
        'qDataBag.District': 'Gwent',
        'qDataBag.PostTown': 'Newport',
        'qDataBag.PostCode': 'NZ11 4PD',
        'qhAdmin.HOut': '100',
        'qhAdmin.Interviewer[1]': 'rich',
        'dmName[1]': 'Richmond Ricecake',
        'dmDteOfBth[1]': '1980-01-15',
        dmhSize: `${value}`,
      },
    };

    // act && assert
    expect(() => mapCaseFactsheet(CaseResponseMockObject)).toThrowError('Number of responents not specified');
  });
});
