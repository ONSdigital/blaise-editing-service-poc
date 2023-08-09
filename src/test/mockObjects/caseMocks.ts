import { CaseOutcome } from 'blaise-api-node-client';
import { CaseDetails, CaseFactsheet } from '../../common/interfaces/case.interface';

export const CaseDetailsListMockObject:CaseDetails[] = [{
  CaseId: '1',
  CaseStatus: CaseOutcome.Completed,
  CaseLink: 'http://www.cati.com/1',
},
{
  CaseId: '2',
  CaseStatus: CaseOutcome.HQRefusal,
  CaseLink: 'http://www.cati.com/2',
},
{
  CaseId: '3',
  CaseStatus: CaseOutcome.DeleteRequested,
  CaseLink: 'http://www.cati.com/3',
}];

export const CaseFactsheetMockObject: CaseFactsheet = {
  CaseId: '1',
  OutcomeCode: 100,
  InterviewerName: 'rich',
  NumberOfRespondents: 2,
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
    DateOfBirth: new Date(1980,1,15),
  },
  {
    RespondentName: 'Richmond Junior',
    DateOfBirth: new Date(2005,4,12),
  }],
};
