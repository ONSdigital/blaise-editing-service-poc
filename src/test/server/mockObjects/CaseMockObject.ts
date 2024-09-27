import {
  CaseOutcome, CaseEditInformation, EditedStatus, CaseResponse,
} from 'blaise-api-node-client';
import Organisation from 'blaise-api-node-client/lib/cjs/enums/organisation';
import { CaseSummaryDetails } from '../../../common/interfaces/caseInterface';

export const caseEditInformationMockObject1: CaseEditInformation = {
  primaryKey: '10001011',
  outcome: CaseOutcome.Completed,
  assignedTo: 'Rich',
  interviewer: '',
  editedStatus: EditedStatus.Finished,
  organisation: Organisation.ONS,
  editUrl: 'https://cati.blaise.com/FRS2504A?Mode=CAWI&KeyValue=10001011',
};
export const caseEditInformationMockObject2: CaseEditInformation = {
  primaryKey: '10001012',
  outcome: CaseOutcome.Completed,
  assignedTo: 'bob',
  interviewer: '',
  editedStatus: EditedStatus.NotStarted,
  organisation: Organisation.ONS,
  editUrl: 'https://cati.blaise.com/FRS2504A?Mode=CAWI&KeyValue=10001012',
};
export const caseEditInformationMockObject3: CaseEditInformation = {
  primaryKey: '10001013',
  outcome: CaseOutcome.Partial,
  assignedTo: 'Julie',
  interviewer: '',
  editedStatus: EditedStatus.Query,
  organisation: Organisation.ONS,
  editUrl: 'https://cati.blaise.com/FRS2504A?Mode=CAWI&KeyValue=10001013',
};
export const caseEditInformationMockObject4: CaseEditInformation = {
  primaryKey: '10001014',
  outcome: CaseOutcome.CompletedNudge,
  assignedTo: 'Sarah',
  interviewer: '',
  editedStatus: EditedStatus.Started,
  organisation: Organisation.ONS,
  editUrl: 'https://cati.blaise.com/FRS2504A?Mode=CAWI&KeyValue=10001014',
};
export const caseEditInformationMockObject5: CaseEditInformation = {
  primaryKey: '10001015',
  outcome: CaseOutcome.Completed,
  assignedTo: 'Rich',
  interviewer: '',
  editedStatus: EditedStatus.Started,
  organisation: Organisation.ONS,
  editUrl: 'https://cati.blaise.com/FRS2504A?Mode=CAWI&KeyValue=10001015',
};

export const CaseEditInformationListMockObject: CaseEditInformation[] = [
  caseEditInformationMockObject1,
  caseEditInformationMockObject2,
  caseEditInformationMockObject3,
  caseEditInformationMockObject4,
  caseEditInformationMockObject5,
];

export const caseResponseMockObject: CaseResponse = {
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

export const caseSummaryDetailsMockObject: CaseSummaryDetails = {
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
