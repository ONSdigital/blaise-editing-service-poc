import { CaseResponse } from 'blaise-api-node-client';
import { CaseSummaryDetails } from '../../common/interfaces/caseInterface';

const Accommodation: Record<number, string> = {
  1: 'House/Bungalow',
  2: 'Flat/Maisonette',
  3: 'Room/Rooms',
  4: 'Other',
  5: 'N/A',
};

const AccommodationType: Record<number, string> = {
  1: 'Detached',
  2: 'S-Detached',
  3: 'Terrace',
  4: 'Purp-Built',
  5: 'Converted',
  6: 'Mobile Home',
  7: 'Other Kind',
  8: 'N/A',
};

const HouseStatus: Record<number, string> = {
  1: 'Conventional',
  2: 'Shared',
  3: 'n/a',
};

const CouncilTaxBand: Record<number, string> = {
  1: 'Band A',
  2: 'Band B',
  3: 'Band C',
  4: 'Band D',
  5: 'Band E',
  6: 'Band F',
  7: 'Band G',
  8: 'Band H',
  9: 'Band I',
  10: 'Band J',
};

function GetHousingBenefit(caseResponse: CaseResponse): string {
  let housingBenefit = 'n/a';
  for (let i = 1; i <= 7; i += 1) {
    for (let j = 1; j <= 2; j += 1) {
      const benefitAmount = caseResponse.fieldData[`BU[${i}].QBenefit.QBenef2[${j}].HBenAmt`];
      if (Number(benefitAmount) > 0) {
        housingBenefit = benefitAmount;
      }
    }
  }

  return housingBenefit.substring(0, 6);
}

function HasBusinessRoom(caseResponse: CaseResponse): boolean {
  for (let i = 1; i <= 7; i += 1) {
    if (caseResponse.fieldData[`BU[${i}].QBUId.BUNum`] !== '') {
      for (let j = 1; j <= 5; j += 1) {
        for (let k = 1; k <= 2; k += 1) {
          if (caseResponse.fieldData[`BU[${i}].QSelfJob[${j}].Adult[${k}].BusRoom`] === '1') {
            return true;
          }
        }
      }
    }
  }

  return false;
}

function GetSelfEmployedMembers(caseResponse: CaseResponse): string[] {
  const selfEmployedMembers: string[] = [];
  for (let i = 1; i <= 7; i += 1) {
    if (caseResponse.fieldData[`BU[${i}].QBUId.BUNum`] !== '') {
      for (let j = 1; j <= 2; j += 1) {
        if (caseResponse.fieldData[`BU[${i}].QCurst1.Adult[${j}].EmpStat`] === '2') {
          selfEmployedMembers.push(caseResponse.fieldData[`BU[${i}].QCurst1.Adult[${j}].Persid`]);
        }
      }
    }
  }

  return selfEmployedMembers;
}

function GetIncomeSupportPeople(caseResponse: CaseResponse): string[] {
  const incomeSupportPeople: string[] = [];
  for (let i = 1; i <= 7; i += 1) {
    if (caseResponse.fieldData[`BU[${i}].QBUId.BUNum`] !== '') {
      for (let j = 1; j <= 2; j += 1) {
        for (let k = 1; k <= 10; k += 1) {
          if (caseResponse.fieldData[`BU[${i}].QBenefit.QWageBen.Adult[${j}].WageBen[${k}]`] === '5') {
            incomeSupportPeople.push(caseResponse.fieldData[`BU[${i}].QBenefit.QWageBen.Adult[${j}].Persid`]);
          }
        }
      }
    }
  }

  return incomeSupportPeople;
}

function GetJsaPeople(caseResponse: CaseResponse): string[] {
  const jsaPeople: string[] = [];
  for (let i = 1; i <= 7; i += 1) {
    if (caseResponse.fieldData[`BU[${i}].QBUId.BUNum`] !== '') {
      for (let j = 1; j <= 2; j += 1) {
        if (caseResponse.fieldData[`BU[${i}].QBenefit.QWageBen.Adult[${j}].JSAType`] === '2'
          || caseResponse.fieldData[`BU[${i}].QBenefit.QWageBen.Adult[${j}].JSAType`] === '3') {
          jsaPeople.push(caseResponse.fieldData[`BU[${i}].QBenefit.QWageBen.Adult[${j}].JSAType`]);
        }
      }
    }
  }

  return jsaPeople;
}

export default function mapCaseSummary(caseResponse: CaseResponse): CaseSummaryDetails {
  const housingBenefit = GetHousingBenefit(caseResponse);
  const selfEmployedMembers = GetSelfEmployedMembers(caseResponse);
  const jsaPeople = GetJsaPeople(caseResponse);
  const incomeSupportPeople = GetIncomeSupportPeople(caseResponse);
  const caseSummary: CaseSummaryDetails = {
    CaseId: caseResponse.caseId,
    OutcomeCode: caseResponse.fieldData['qhAdmin.HOut'],
    InterviewDate: new Date(caseResponse.fieldData['QSignIn.StartDat']),
    District: caseResponse.fieldData['qDataBag.District'],
    InterviewerName: caseResponse.fieldData['qhAdmin.Interviewer[1]'],
    NumberOfRespondents: caseResponse.fieldData['dmhSize'],
    Household: {
      Accommodation: {
        Main: Accommodation[Number(caseResponse.fieldData['qhAdmin.QObsSheet.MainAcD'])] ?? '',
        Type: AccommodationType[Number(caseResponse.fieldData['qhAdmin.QObsSheet.TypAcDV'])] ?? '',
      },
      FloorNumber: caseResponse.fieldData['qhAdmin.QObsSheet.FloorN'],
      Status: HouseStatus[Number(caseResponse.fieldData['QAccomdat.HHStat'])] ?? '',
      NumberOfBedrooms: caseResponse.fieldData['QAccomdat.Bedroom'],
      ReceiptOfHousingBenefit: housingBenefit,
      PeriodCode: housingBenefit,
      CouncilTaxBand: CouncilTaxBand[Number(caseResponse.fieldData['QCounTax.CTBand'])] ?? 'Blank',
      BusinessRoom: HasBusinessRoom(caseResponse),
      SelfEmployed: selfEmployedMembers.length > 0,
      SelfEmployedMembers: selfEmployedMembers,
      IncomeSupport: incomeSupportPeople.length > 0,
      IncomeSupportMembers: incomeSupportPeople,
      IncomeBasedJaSupport: jsaPeople.length > 0,
      IncomeBasedJaSupportMembers: jsaPeople,
    },
    Respondents: [],
  };

  const numberOfRespondents = +caseSummary.NumberOfRespondents;

  if (Number.isNaN(numberOfRespondents) || numberOfRespondents === 0) {
    throw new Error('Number of responents not specified');
  }

  for (let respondentNumber = 1; respondentNumber <= numberOfRespondents; respondentNumber += 1) {
    caseSummary.Respondents.push({
      RespondentName: caseResponse.fieldData[`dmName[${respondentNumber}]`],
      DateOfBirth: new Date(caseResponse.fieldData[`dmDteOfBth[${respondentNumber}]`]),
    });
  }

  return caseSummary;
}
