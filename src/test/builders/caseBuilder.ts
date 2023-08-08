import { CaseResponse } from 'blaise-api-node-client';
import { CaseFactsheet } from '../../common/interfaces/case.interface';

export default class CaseBuilder {
  serialNumber: string = '1';

  prem1: string = 'Flat 1';

  prem2: string = 'Richmond House';

  prem3: string = 'Rice Road';

  prem4: string = '';

  county: string = 'Gwent';

  town: string = 'Newport';

  postcode: string = 'NZ11 4PD';

  outcome: string = '100';

  numberOfRespondents: string = '1';

  interviewerName: string = 'Rich';

  respondantNames: string[] = [];

  resondantDobs: string[] = [];

  names: string[] = [
    'Richmond Ricecake',
    'Bartholomew Edgar',
    'Sariha Smith',
    'George Thompson',
    'Tina Pipes',
    'Steve Doe',
    'Debra Oak',
    'Margret Keys',
    'Tim Lemmings',
    'Becky Light',
    'Ben Simmons',
    'Iona South',
  ];

  dobs: string[] = [
    '1980-01-15',
    '1995-05-11',
    '1991-01-01',
    '1994-12-25',
    '1999-11-07',
    '1973-07-09',
    '1982-02-23',
    '1990-09-13',
    '1996-01-24',
    '1954-07-30',
  ];

  constructor(numberOfRespondents: number) {
    this.numberOfRespondents = String(numberOfRespondents);

    for (let respondentNumber = 1; respondentNumber <= +this.numberOfRespondents; respondentNumber += 1) {
      this.respondantNames.push(`${this.names[respondentNumber]}`);
      this.resondantDobs.push(`${this.dobs[respondentNumber]}`);
    }
  }

  buildCaseResponse():CaseResponse {
    const caseResponse: CaseResponse = {
      caseId: `${this.serialNumber}`,
      fieldData: {
        'qiD.Serial_Number': this.serialNumber,
        'qDataBag.Prem1': this.prem1,
        'qDataBag.Prem2': this.prem2,
        'qDataBag.Prem3': this.prem3,
        'qDataBag.Prem4': this.prem4,
        'qDataBag.District': this.county,
        'qDataBag.PostTown': this.town,
        'qDataBag.PostCode': this.postcode,
        'qhAdmin.HOut': this.outcome,
        'qhAdmin.Interviewer[1]': this.interviewerName,
        dmhSize: this.numberOfRespondents,
      },
    };

    for (let respondentNumber = 1; respondentNumber <= +this.numberOfRespondents; respondentNumber += 1) {
      caseResponse.fieldData[`dmName[${respondentNumber}]`] = `${this.respondantNames[respondentNumber]}`;
      caseResponse.fieldData[`dmDteOfBth[${respondentNumber}]`] = `${this.resondantDobs[respondentNumber]}`;
    }
    return caseResponse;
  }

  buildCaseFactsheet():CaseFactsheet {
    const caseFactsheet: CaseFactsheet = {
      CaseId: this.serialNumber,
      OutcomeCode: this.outcome,
      InterviewerName: this.interviewerName,
      NumberOfRespondants: this.numberOfRespondents,
      Address: {
        AddressLine1: this.prem1,
        AddressLine2: this.prem2,
        AddressLine3: this.prem3,
        AddressLine4: this.prem4,
        County: this.county,
        Town: this.town,
        Postcode: this.postcode,
      },
      Respondents: [],
    };

    for (let respondentNumber = 1; respondentNumber <= +this.numberOfRespondents; respondentNumber += 1) {
      caseFactsheet.Respondents.push({
        RespondentName: `${this.respondantNames[respondentNumber]}`,
        DateOfBirth: `${this.resondantDobs[respondentNumber]}`,
      });
    }
    return caseFactsheet;
  }
}
