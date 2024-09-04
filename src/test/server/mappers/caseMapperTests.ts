import { CaseResponse } from 'blaise-api-node-client';
import { CaseSummary } from '../../../common/interfaces/caseInterface';
import mapCaseSummary from '../../../server/mappers/caseMapper';

describe('Map case response to case summary', () => {
  it('It should return a correctly mapped summary with responent(s)', () => {
    // arrange
    const CaseResponseData:CaseResponse = {
      caseId: '9001',
      fieldData: {
        'qiD.Serial_Number': '9001',
        'qDataBag.Prem1': 'Flat 1',
        'qDataBag.Prem2': 'Richmond House',
        'qDataBag.Prem3': 'Rice Road',
        'qDataBag.Prem4': 'Duffrin',
        'qDataBag.District': 'Gwent',
        'qDataBag.PostTown': 'Newport',
        'qDataBag.PostCode': 'NZ11 4PD',
        'qhAdmin.HOut': '110',
        'qhAdmin.Interviewer[1]': 'Rich',
        'dmName[1]': 'Richmond Ricecake',
        'dmDteOfBth[1]': '1980-01-15',
        'dmName[2]': 'Bartholomew Edgar',
        'dmDteOfBth[2]': '1995-06-11',
        dmhSize: '2',
      },
    };

    const expectedFactsheet:CaseSummary = {
      CaseId: '9001',
      OutcomeCode: 110,
      InterviewerName: 'Rich',
      NumberOfRespondents: 2,
      Address: {
        AddressLine1: 'Flat 1',
        AddressLine2: 'Richmond House',
        AddressLine3: 'Rice Road',
        AddressLine4: 'Duffrin',
        County: 'Gwent',
        Town: 'Newport',
        Postcode: 'NZ11 4PD',
      },
      Respondents: [
        {
          RespondentName: 'Richmond Ricecake',
          DateOfBirth: new Date('1980-01-15'),
        },
        {
          RespondentName: 'Bartholomew Edgar',
          DateOfBirth: new Date('1995-06-11'),
        },
      ],
    };

    // act
    const result = mapCaseSummary(CaseResponseData);

    // assert
    expect(result).toEqual(expectedFactsheet);
  });

  it.each(['one', 'dyhzjsgfkb'])('It should error when household size can not be converted into a number', (value) => {
    // arrange
    const CaseResponseData:CaseResponse = {
      caseId: '9001',
      fieldData: {
        'qiD.Serial_Number': '9001',
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
    expect(() => mapCaseSummary(CaseResponseData)).toThrowError('Number of responents not specified');
  });

  it.each(['0', '', ' '])('It should error when household Size is missing or zero', (value) => {
    // arrange
    const CaseResponseData:CaseResponse = {
      caseId: '9001',
      fieldData: {
        'qiD.Serial_Number': '9001',
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
    expect(() => mapCaseSummary(CaseResponseData)).toThrowError('Number of responents not specified');
  });
});
