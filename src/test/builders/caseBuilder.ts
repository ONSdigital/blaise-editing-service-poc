import { CaseResponse } from 'blaise-api-node-client';
import { Faker, fakerEN_GB } from '@faker-js/faker';
import { CaseFactsheet } from '../../common/interfaces/case.interface';

export default class CaseBuilder {
  caseId: string;

  addressLine1: string;

  addressLine2: string;

  addressLine3: string;

  addressLine4: string;

  county: string;

  town: string;

  postcode: string;

  outcomeCode: number;

  numberOfRespondents: number;

  interviewerName: string;

  respondentNames: string[];

  resondentDateOfBirths: Date[];

  fakeData: Faker;

  constructor(numberOfRespondents: number) {
    this.numberOfRespondents = numberOfRespondents;
    this.fakeData = fakerEN_GB;

    this.caseId = '90001';
    this.addressLine1 = this.fakeData.location.secondaryAddress();
    this.addressLine2 = this.fakeData.location.buildingNumber();
    this.addressLine3 = this.fakeData.location.street();
    this.addressLine4 = this.fakeData.location.streetAddress();
    this.county = this.fakeData.location.county();
    this.town = this.fakeData.location.city();
    this.postcode = this.fakeData.location.zipCode();
    this.outcomeCode = 110;
    this.interviewerName = this.fakeData.person.fullName();
    this.respondentNames = [];
    this.resondentDateOfBirths = [];

    for (let respondentNumber = 1; respondentNumber <= +this.numberOfRespondents; respondentNumber += 1) {
      this.respondentNames.push(this.fakeData.person.fullName());
      this.resondentDateOfBirths.push(this.fakeData.date.birthdate());
    }
  }

  buildCaseResponse():CaseResponse {
    const caseResponse: CaseResponse = {
      caseId: `${this.caseId}`,
      fieldData: {
        'qiD.Serial_Number': this.caseId,
        'qDataBag.Prem1': this.addressLine1,
        'qDataBag.Prem2': this.addressLine2,
        'qDataBag.Prem3': this.addressLine3,
        'qDataBag.Prem4': this.addressLine4,
        'qDataBag.District': this.county,
        'qDataBag.PostTown': this.town,
        'qDataBag.PostCode': this.postcode,
        'qhAdmin.HOut': this.outcomeCode,
        'qhAdmin.Interviewer[1]': this.interviewerName,
        dmhSize: this.numberOfRespondents,
      },
    };

    for (let respondentNumber = 1; respondentNumber <= +this.numberOfRespondents; respondentNumber += 1) {
      caseResponse.fieldData[`dmName[${respondentNumber}]`] = this.respondentNames[respondentNumber];
      caseResponse.fieldData[`dmDteOfBth[${respondentNumber}]`] = this.resondentDateOfBirths[respondentNumber];
    }
    return caseResponse;
  }

  buildCaseFactsheet():CaseFactsheet {
    const caseFactsheet: CaseFactsheet = {
      CaseId: this.caseId,
      OutcomeCode: this.outcomeCode,
      InterviewerName: this.interviewerName,
      NumberOfRespondents: this.numberOfRespondents,
      Address: {
        AddressLine1: this.addressLine1,
        AddressLine2: this.addressLine2,
        AddressLine3: this.addressLine3,
        AddressLine4: this.addressLine4,
        County: this.county,
        Town: this.town,
        Postcode: this.postcode,
      },
      Respondents: [],
    };

    for (let respondentNumber = 1; respondentNumber <= +this.numberOfRespondents; respondentNumber += 1) {
      caseFactsheet.Respondents.push({
        RespondentName: this.respondentNames[respondentNumber] as string,
        DateOfBirth: this.resondentDateOfBirths[respondentNumber] as Date,
      });
    }
    return caseFactsheet;
  }
}
