import { CaseData, CaseResponse } from 'blaise-api-node-client';
import { mapCaseDetails, mapCaseFactsheet } from '../../../server/mappers/caseMapper';
import { caseFactsheetMockObject, caseResponseMockObject } from '../../mockObjects/caseMockObject';
import { CaseDetails } from '../../../common/interfaces/caseInterface';

describe('Map case report data to case details list', () => {
  it('It should return a correctly mapped list of cases', () => {
    // arrange
    const questionnaireName: string = 'OPN2201A';
    const externalWebUrl: string = 'cati.blaise.com';

    const caseDataList: CaseData[] = [
      {
        'qserial.serial_number': '9001',
        'qhadmin.hout': 110,
        'allocation.toeditor': 'rrice',
      },
      {
        'qserial.serial_number': '9002',
        'qhadmin.hout': 210,
        'allocation.toeditor': '',
      },
      {
        'qserial.serial_number': '9003',
        'qhadmin.hout': 0,
        'allocation.toeditor': 'bedgar',
      },
    ];

    const expectedCaseDetails:CaseDetails[] = [
      {
        CaseId: '9001',
        CaseLink: `https://cati.blaise.com/${questionnaireName}?Mode=CAWI&KeyValue=9001`,
        CaseStatus: 110,
        EditorAllocated: 'rrice',
      },
      {
        CaseId: '9002',
        CaseLink: `https://cati.blaise.com/${questionnaireName}?Mode=CAWI&KeyValue=9002`,
        CaseStatus: 210,
        EditorAllocated: '',
      },
      {
        CaseId: '9003',
        CaseLink: `https://cati.blaise.com/${questionnaireName}?Mode=CAWI&KeyValue=9003`,
        CaseStatus: 0,
        EditorAllocated: 'bedgar',
      },
    ];

    // act
    const result = mapCaseDetails(caseDataList, questionnaireName, externalWebUrl);

    // assert
    expect(result).toEqual(expectedCaseDetails);
  });
});

describe('Map case response to factsheet', () => {
  it('It should return a correctly mapped factsheet withresponent(s)', () => {
    // arrange

    // act
    const result = mapCaseFactsheet(caseResponseMockObject);

    // assert
    expect(result).toEqual(caseFactsheetMockObject);
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
