import {
  CaseOutcome, CaseEditInformation, EditedStatus, CaseResponse,
} from 'blaise-api-node-client';
import Organisation from 'blaise-api-node-client/lib/cjs/enums/organisation';
import { CaseSummary } from '../../../common/interfaces/caseInterface';

export const caseEditInformationMockObject1: CaseEditInformation = {
  primaryKey: '10001011',
  outcome: CaseOutcome.Completed,
  assignedTo: 'Rich',
  interviewer: '',
  editedStatus: EditedStatus.Finished,
  organisation: Organisation.ONS,
};
export const caseEditInformationMockObject2: CaseEditInformation = {
  primaryKey: '10001012',
  outcome: CaseOutcome.Completed,
  assignedTo: 'bob',
  interviewer: '',
  editedStatus: EditedStatus.NotStarted,
  organisation: Organisation.ONS,
};
export const caseEditInformationMockObject3: CaseEditInformation = {
  primaryKey: '10001013',
  outcome: CaseOutcome.Partial,

  assignedTo: 'Julie',
  interviewer: '',
  editedStatus: EditedStatus.Query,
  organisation: Organisation.ONS,
};
export const caseEditInformationMockObject4: CaseEditInformation = {
  primaryKey: '10001014',
  outcome: CaseOutcome.CompletedNudge,
  assignedTo: 'Sarah',
  interviewer: '',
  editedStatus: EditedStatus.Started,
  organisation: Organisation.ONS,
};
export const caseEditInformationMockObject5: CaseEditInformation = {
  primaryKey: '10001015',
  outcome: CaseOutcome.Completed,
  assignedTo: 'Rich',
  interviewer: '',
  editedStatus: EditedStatus.Started,
  organisation: Organisation.ONS,
};

export const CaseEditInformationListMockObject: CaseEditInformation[] = [
  caseEditInformationMockObject1,
  caseEditInformationMockObject2,
  caseEditInformationMockObject3,
  caseEditInformationMockObject4,
  caseEditInformationMockObject5,
];

export const caseResponseMockObject: CaseResponse = {
  caseId: '90001',
  fieldData: {
    'qiD.Serial_Number': '90001',
    'qDataBag.Prem1': 'Flat 1',
    'qDataBag.Prem2': 'Richmond House',
    'qDataBag.Prem3': 'Rice Road',
    'qDataBag.Prem4': 'Duffrin',
    'qDataBag.District': 'Gwent',
    'qDataBag.PostTown': 'Newport',
    'qDataBag.PostCode': 'NZ11 4PD',
    'qhAdmin.HOut': '110',
    'qhAdmin.Interviewer[1]': 'Rich',
    dmhSize: 2,
    'dmName[1]': 'Richmond Ricecake',
    'dmDteOfBth[1]': new Date(1980, 1, 15),
    'dmName[2]': 'Bartholomew Edgar',
    'dmDteOfBth[2]': new Date(1995, 5, 11),
  },
};

export const caseSummaryMockObject: CaseSummary = {
  CaseId: '90001',
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
      DateOfBirth: new Date(1980, 1, 15),
    },
    {
      RespondentName: 'Bartholomew Edgar',
      DateOfBirth: new Date(1995, 5, 11),
    },
  ],
};
