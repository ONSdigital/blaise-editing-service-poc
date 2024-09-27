import { CaseResponse } from 'blaise-api-node-client';
import { CaseSummaryDetails } from '../../../common/interfaces/caseInterface';
import mapCaseSummary from '../../../server/mappers/caseMapper';

describe('Map case response to case summary', () => {
  it('It should return a correctly mapped summary with responent(s)', () => {
    // arrange
    const CaseResponseData:CaseResponse = {
      caseId: '9001',
      fieldData: {
        'qiD.Serial_Number': '9001',
        'QSignIn.StartDat': '2024-05-11',
        'qDataBag.District': 'Gwent',
        'qhAdmin.HOut': '110',
        'qhAdmin.QObsSheet.MainAcD': '1',
        'qhAdmin.QObsSheet.TypAcDV': '1',
        'qhAdmin.QObsSheet.FloorN': '2',
        'qhAdmin.Interviewer[1]': 'Rich',
        'QAccomdat.HHStat': '1',
        'QAccomdat.Bedroom': '2',
        'BU[1].QBenefit.QBenef2[1].HBenAmt': '380',
        'QCounTax.CTBand': '1',
        'BU[1].QBUId.BUNum': '1',
        'BU[1].QSelfJob[1].Adult[1].BusRoom': '1',
        'BU[1].QCurst1.Adult[1].EmpStat': '2',
        'BU[1].QCurst1.Adult[1].Persid': '1',
        'BU[1].QBenefit.QWageBen.Adult[1].WageBen[1]': '5',
        'BU[1].QBenefit.QWageBen.Adult[1].Persid': '1',
        'BU[1].QBenefit.QWageBen.Adult[1].JSAType': '2',
        'dmName[1]': 'Richmond Ricecake',
        'dmDteOfBth[1]': '1980-01-15',
        'dmName[2]': 'Bartholomew Edgar',
        'dmDteOfBth[2]': '1995-06-11',
        dmhSize: '2',
      },
    };

    const expectedSummaryDetails:CaseSummaryDetails = {
      CaseId: '9001',
      OutcomeCode: '110',
      InterviewDate: new Date('2024-05-11'),
      District: 'Gwent',
      InterviewerName: 'Rich',
      NumberOfRespondents: '2',
      Household: {
        Accommodation: {
          Main: 'House/Bungalow',
          Type: 'Detached',
        },
        FloorNumber: '2',
        Status: 'Conventional',
        NumberOfBedrooms: '2',
        ReceiptOfHousingBenefit: '380',
        PeriodCode: '380',
        CouncilTaxBand: 'Band A',
        BusinessRoom: true,
        SelfEmployed: true,
        SelfEmployedMembers: ['1'],
        IncomeSupport: true,
        IncomeSupportMembers: ['1'],
        IncomeBasedJaSupport: true,
        IncomeBasedJaSupportMembers: ['2'],
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
    expect(result).toEqual(expectedSummaryDetails);
  });

  it.each(['one', 'dyhzjsgfkb'])('It should error when household size can not be converted into a number', (value) => {
    // arrange
    const CaseResponseData:CaseResponse = {
      caseId: '9001',
      fieldData: {
        'qiD.Serial_Number': '9001',
        'QSignIn.StartDat': '2024-05-11',
        'qDataBag.District': 'Gwent',
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
        'QSignIn.StartDat': '2024-05-11',
        'qDataBag.District': 'Gwent',
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
