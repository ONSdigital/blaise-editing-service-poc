import { CaseResponse } from 'blaise-api-node-client';
import { CaseSummaryDetails } from '../../../common/interfaces/caseInterface';
import mapCaseSummary from '../../../server/mappers/caseMapper';
import { caseResponseMockObject } from '../mockObjects/CaseMockObject';

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

  it.each([
    ['1', 'House/Bungalow'],
    ['2', 'Flat/Maisonette'],
    ['3', 'Room/Rooms'],
    ['4', 'Other'],
    ['5', 'N/A'],
  ])('It should return the expected Accomadation Main when given valid inputs', (inputValue: string, expectedOutputValue: string) => {
    // arrange
    const CaseResponseData:CaseResponse = caseResponseMockObject;
    CaseResponseData.fieldData['qhAdmin.QObsSheet.MainAcD'] = inputValue;

    // act
    const result = mapCaseSummary(CaseResponseData);

    // assert
    expect(result.Household.Accommodation.Main).toEqual(expectedOutputValue);
  });

  it.each([
    ['0', ''],
    ['6', ''],
    ['', ''],
    ['test', ''],
  ])('It should return the expected Accomadation Main when given invalid inputs', (inputValue: string, expectedOutputValue: string) => {
    // arrange
    const CaseResponseData:CaseResponse = caseResponseMockObject;
    CaseResponseData.fieldData['qhAdmin.QObsSheet.MainAcD'] = inputValue;

    // act
    const result = mapCaseSummary(CaseResponseData);

    // assert
    expect(result.Household.Accommodation.Main).toEqual(expectedOutputValue);
  });

  it.each([
    ['1', 'Detached'],
    ['2', 'S-Detached'],
    ['3', 'Terrace'],
    ['4', 'Purp-Built'],
    ['5', 'Converted'],
    ['6', 'Mobile Home'],
    ['7', 'Other Kind'],
    ['8', 'N/A'],
  ])('It should return the expected Accomadation Type when given valid inputs', (inputValue: string, expectedOutputValue: string) => {
    // arrange
    const CaseResponseData:CaseResponse = caseResponseMockObject;
    CaseResponseData.fieldData['qhAdmin.QObsSheet.TypAcDV'] = inputValue;

    // act
    const result = mapCaseSummary(CaseResponseData);

    // assert
    expect(result.Household.Accommodation.Type).toEqual(expectedOutputValue);
  });

  it.each([
    ['0', ''],
    ['9', ''],
    ['', ''],
    ['test', ''],
  ])('It should return the expected Accomadation Type when given invalid inputs', (inputValue: string, expectedOutputValue: string) => {
    // arrange
    const CaseResponseData:CaseResponse = caseResponseMockObject;
    CaseResponseData.fieldData['qhAdmin.QObsSheet.TypAcDV'] = inputValue;

    // act
    const result = mapCaseSummary(CaseResponseData);

    // assert
    expect(result.Household.Accommodation.Type).toEqual(expectedOutputValue);
  });

  it.each([
    ['1', 'Conventional'],
    ['2', 'Shared'],
    ['3', 'n/a'],
  ])('It should return the expected HouseStatus when given valid inputs', (inputValue: string, expectedOutputValue: string) => {
    // arrange
    const CaseResponseData:CaseResponse = caseResponseMockObject;
    CaseResponseData.fieldData['QAccomdat.HHStat'] = inputValue;

    // act
    const result = mapCaseSummary(CaseResponseData);

    // assert
    expect(result.Household.Status).toEqual(expectedOutputValue);
  });

  it.each([
    ['0', ''],
    ['4', ''],
    ['', ''],
    ['test', ''],
  ])('It should return the expected HouseStatus when given invalid inputs', (inputValue: string, expectedOutputValue: string) => {
    // arrange
    const CaseResponseData:CaseResponse = caseResponseMockObject;
    CaseResponseData.fieldData['QAccomdat.HHStat'] = inputValue;

    // act
    const result = mapCaseSummary(CaseResponseData);

    // assert
    expect(result.Household.Status).toEqual(expectedOutputValue);
  });

  it.each([
    ['1', 'Band A'],
    ['2', 'Band B'],
    ['3', 'Band C'],
    ['4', 'Band D'],
    ['5', 'Band E'],
    ['6', 'Band F'],
    ['7', 'Band G'],
    ['8', 'Band H'],
    ['9', 'Band I'],
    ['10', 'Band J'],
  ])('It should return the expected CouncilTaxBand when given valid inputs', (inputValue: string, expectedOutputValue: string) => {
    // arrange
    const CaseResponseData:CaseResponse = caseResponseMockObject;
    CaseResponseData.fieldData['QCounTax.CTBand'] = inputValue;

    // act
    const result = mapCaseSummary(CaseResponseData);

    // assert
    expect(result.Household.CouncilTaxBand).toEqual(expectedOutputValue);
  });

  it.each([
    ['0', 'Blank'],
    ['11', 'Blank'],
    ['', 'Blank'],
    ['test', 'Blank'],
  ])('It should return the expected CouncilTaxBand when given invalid inputs', (inputValue: string, expectedOutputValue: string) => {
    // arrange
    const CaseResponseData:CaseResponse = caseResponseMockObject;
    CaseResponseData.fieldData['QCounTax.CTBand'] = inputValue;

    // act
    const result = mapCaseSummary(CaseResponseData);

    // assert
    expect(result.Household.CouncilTaxBand).toEqual(expectedOutputValue);
  });

  it('It should return the expected ReceiptOfHousingBenefit when only one person has this set', () => {
    // arrange
    const CaseResponseData:CaseResponse = caseResponseMockObject;
    const expectedHousingBenefit = '400';
    for (let benefitUnit = 1; benefitUnit <= 7; benefitUnit += 1) {
      for (let adult = 1; adult <= 2; adult += 1) {
        CaseResponseData.fieldData[`BU[${benefitUnit}].QBenefit.QBenef2[${adult}].HBenAmt`] = '';
      }
    }
    CaseResponseData.fieldData['BU[1].QBenefit.QBenef2[1].HBenAmt'] = expectedHousingBenefit;

    // act
    const result = mapCaseSummary(CaseResponseData);

    // assert
    expect(result.Household.ReceiptOfHousingBenefit).toEqual(expectedHousingBenefit);
  });

  it('It should return the expected ReceiptOfHousingBenefit when nobody has this set', () => {
    // arrange
    const CaseResponseData:CaseResponse = caseResponseMockObject;
    const expectedHousingBenefit = 'n/a';
    for (let benefitUnit = 1; benefitUnit <= 7; benefitUnit += 1) {
      for (let adult = 1; adult <= 2; adult += 1) {
        CaseResponseData.fieldData[`BU[${benefitUnit}].QBenefit.QBenef2[${adult}].HBenAmt`] = '';
      }
    }

    // act
    const result = mapCaseSummary(CaseResponseData);

    // assert
    expect(result.Household.ReceiptOfHousingBenefit).toEqual(expectedHousingBenefit);
  });

  it('It should return the expected ReceiptOfHousingBenefit when Multiple person have this set', () => {
    // arrange
    const CaseResponseData:CaseResponse = caseResponseMockObject;
    const expectedHousingBenefit = '400';
    for (let benefitUnit = 1; benefitUnit <= 7; benefitUnit += 1) {
      for (let adult = 1; adult <= 2; adult += 1) {
        CaseResponseData.fieldData[`BU[${benefitUnit}].QBenefit.QBenef2[${adult}].HBenAmt`] = '';
      }
    }
    CaseResponseData.fieldData['BU[1].QBenefit.QBenef2[1].HBenAmt'] = '380';
    CaseResponseData.fieldData['BU[2].QBenefit.QBenef2[2].HBenAmt'] = '390';
    CaseResponseData.fieldData['BU[3].QBenefit.QBenef2[1].HBenAmt'] = expectedHousingBenefit;

    // act
    const result = mapCaseSummary(CaseResponseData);

    // assert
    expect(result.Household.ReceiptOfHousingBenefit).toEqual(expectedHousingBenefit);
  });

  it('It should return the the firts 6 characters for ReceiptOfHousingBenefit when the input is longer than 6', () => {
    // arrange
    const CaseResponseData:CaseResponse = caseResponseMockObject;
    const inputHousingBenefit = '1234567';
    const expectedHousingBenefit = '123456';
    for (let benefitUnit = 1; benefitUnit <= 7; benefitUnit += 1) {
      for (let adult = 1; adult <= 2; adult += 1) {
        CaseResponseData.fieldData[`BU[${benefitUnit}].QBenefit.QBenef2[${adult}].HBenAmt`] = '';
      }
    }
    CaseResponseData.fieldData['BU[1].QBenefit.QBenef2[1].HBenAmt'] = inputHousingBenefit;

    // act
    const result = mapCaseSummary(CaseResponseData);

    // assert
    expect(result.Household.ReceiptOfHousingBenefit).toEqual(expectedHousingBenefit);
  });

  it('It should return the expected PeriodCode when only one person has this set', () => {
    // arrange
    const CaseResponseData:CaseResponse = caseResponseMockObject;
    const expectedHousingBenefit = '400';
    for (let benefitUnit = 1; benefitUnit <= 7; benefitUnit += 1) {
      for (let adult = 1; adult <= 2; adult += 1) {
        CaseResponseData.fieldData[`BU[${benefitUnit}].QBenefit.QBenef2[${adult}].HBenAmt`] = '';
      }
    }
    CaseResponseData.fieldData['BU[1].QBenefit.QBenef2[1].HBenAmt'] = expectedHousingBenefit;

    // act
    const result = mapCaseSummary(CaseResponseData);

    // assert
    expect(result.Household.PeriodCode).toEqual(expectedHousingBenefit);
  });

  it('It should return the expected PeriodCode when nobody has this set', () => {
    // arrange
    const CaseResponseData:CaseResponse = caseResponseMockObject;
    const expectedHousingBenefit = 'n/a';
    for (let benefitUnit = 1; benefitUnit <= 7; benefitUnit += 1) {
      for (let adult = 1; adult <= 2; adult += 1) {
        CaseResponseData.fieldData[`BU[${benefitUnit}].QBenefit.QBenef2[${adult}].HBenAmt`] = '';
      }
    }

    // act
    const result = mapCaseSummary(CaseResponseData);

    // assert
    expect(result.Household.PeriodCode).toEqual(expectedHousingBenefit);
  });

  it('It should return the expected PeriodCode when Multiple person have this set', () => {
    // arrange
    const CaseResponseData:CaseResponse = caseResponseMockObject;
    const expectedHousingBenefit = '400';
    for (let benefitUnit = 1; benefitUnit <= 7; benefitUnit += 1) {
      for (let adult = 1; adult <= 2; adult += 1) {
        CaseResponseData.fieldData[`BU[${benefitUnit}].QBenefit.QBenef2[${adult}].HBenAmt`] = '';
      }
    }
    CaseResponseData.fieldData['BU[1].QBenefit.QBenef2[1].HBenAmt'] = '380';
    CaseResponseData.fieldData['BU[2].QBenefit.QBenef2[2].HBenAmt'] = '390';
    CaseResponseData.fieldData['BU[3].QBenefit.QBenef2[1].HBenAmt'] = expectedHousingBenefit;

    // act
    const result = mapCaseSummary(CaseResponseData);

    // assert
    expect(result.Household.PeriodCode).toEqual(expectedHousingBenefit);
  });

  it('It should return the the firts 6 characters for PeriodCode when the input is longer than 6', () => {
    // arrange
    const CaseResponseData:CaseResponse = caseResponseMockObject;
    const inputHousingBenefit = '1234567';
    const expectedHousingBenefit = '123456';
    for (let benefitUnit = 1; benefitUnit <= 7; benefitUnit += 1) {
      for (let adult = 1; adult <= 2; adult += 1) {
        CaseResponseData.fieldData[`BU[${benefitUnit}].QBenefit.QBenef2[${adult}].HBenAmt`] = '';
      }
    }
    CaseResponseData.fieldData['BU[1].QBenefit.QBenef2[1].HBenAmt'] = inputHousingBenefit;

    // act
    const result = mapCaseSummary(CaseResponseData);

    // assert
    expect(result.Household.PeriodCode).toEqual(expectedHousingBenefit);
  });

  it.each([
    ['1','1','1'],
    ['3','2','2'],
    ['5','3','1'],
    ['7','4','2']
  ])('It should return true for BusinessRoom when it is set for any person', (benefitUnitToSet: string,selfEmployedToSet: string,adultToSet: string) => {
    // arrange
    const CaseResponseData:CaseResponse = caseResponseMockObject;
    for (let benefitUnit = 1; benefitUnit <= 7; benefitUnit += 1) {
      CaseResponseData.fieldData[`BU[${benefitUnit}.QBUId.BUNum`] = ''
      for (let adult = 1; adult <= 2; adult += 1) {
        for (let selfEmployed = 1; selfEmployed <= 5; selfEmployed += 1) {
          CaseResponseData.fieldData[`BU[${benefitUnit}].QSelfJob[${selfEmployed}].Adult[${adult}].BusRoom`] = '';
        }
      }
    }
    CaseResponseData.fieldData[`BU[${benefitUnitToSet}].QBUId.BUNum`] = '1';
    CaseResponseData.fieldData[`BU[${benefitUnitToSet}].QSelfJob[${selfEmployedToSet}].Adult[${adultToSet}].BusRoom`] = '1';

    // act
    const result = mapCaseSummary(CaseResponseData);

    // assert
    expect(result.Household.BusinessRoom).toEqual(true);
  });

  it.each([
    ['1','1','1'],
    ['3','2','2'],
    ['5','3','1'],
    ['7','4','2']
  ])('It should return true for BusinessRoom when it is set for any person', (benefitUnitToSet: string,selfEmployedToSet: string,adultToSet: string) => {
    // arrange
    const CaseResponseData:CaseResponse = caseResponseMockObject;
    for (let benefitUnit = 1; benefitUnit <= 7; benefitUnit += 1) {
      CaseResponseData.fieldData[`BU[${benefitUnit}.QBUId.BUNum`] = ''
      for (let adult = 1; adult <= 2; adult += 1) {
        for (let selfEmployed = 1; selfEmployed <= 5; selfEmployed += 1) {
          CaseResponseData.fieldData[`BU[${benefitUnit}].QSelfJob[${selfEmployed}].Adult[${adult}].BusRoom`] = '';
        }
      }
    }
    CaseResponseData.fieldData[`BU[${benefitUnitToSet}].QBUId.BUNum`] = '1';
    CaseResponseData.fieldData[`BU[${benefitUnitToSet}].QSelfJob[${selfEmployedToSet}].Adult[${adultToSet}].BusRoom`] = '1';

    // act
    const result = mapCaseSummary(CaseResponseData);

    // assert
    expect(result.Household.BusinessRoom).toEqual(true);
  });

  it('It should return false for BusinessRoom when it is not set for any person', () => {
    // arrange
    const CaseResponseData:CaseResponse = caseResponseMockObject;
    for (let benefitUnit = 1; benefitUnit <= 7; benefitUnit += 1) {
      CaseResponseData.fieldData[`BU[${benefitUnit}.QBUId.BUNum`] = ''
      for (let adult = 1; adult <= 2; adult += 1) {
        for (let selfEmployed = 1; selfEmployed <= 5; selfEmployed += 1) {
          CaseResponseData.fieldData[`BU[${benefitUnit}].QSelfJob[${selfEmployed}].Adult[${adult}].BusRoom`] = '';
        }
      }
    }
    
    // act
    const result = mapCaseSummary(CaseResponseData);

    // assert
    expect(result.Household.BusinessRoom).toEqual(false);
  });
});
