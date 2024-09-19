import BlaiseApiClient, { CaseEditInformationListMockObject } from 'blaise-api-node-client';
import {
  IMock, Mock, Times,
} from 'typemoq';
import BlaiseApi from '../../../server/api/BlaiseApi';
import { questionnaireDetailsListMockObject, questionnaireListMockObject } from '../mockObjects/questionnaireListMockObject';
import FakeServerConfigurationProvider from '../configuration/FakeServerConfigurationProvider';
import userMockObject from '../mockObjects/userMockObject';
import { caseResponseMockObject } from '../mockObjects/CaseMockObject';

// create fake config
const configFake = new FakeServerConfigurationProvider();

// mock blaise api client

const blaiseApiClientMock: IMock<BlaiseApiClient> = Mock.ofType(BlaiseApiClient);

// create service under test
const sut = new BlaiseApi(configFake, blaiseApiClientMock.object);

describe('getQuestionnaires from Blaise', () => {
  beforeEach(() => {
    blaiseApiClientMock.reset();
  });

  it('Should call getQuestionnaires for all questionnaires in that list', async () => {
    // arrange
    blaiseApiClientMock.setup((client) => client.getQuestionnaires(configFake.ServerPark)).returns(async () => questionnaireListMockObject);

    // act
    await sut.getQuestionnaires();

    // assert
    blaiseApiClientMock.verify((client) => client.getQuestionnaires(configFake.ServerPark), Times.once());
  });

  it('Should return an expected list of questionnaires for editing', async () => {
    // arrange
    blaiseApiClientMock.setup((client) => client.getQuestionnaires(configFake.ServerPark)).returns(async () => questionnaireListMockObject);

    // act
    const result = await sut.getQuestionnaires();

    // assert
    expect(result).toEqual(questionnaireDetailsListMockObject);
  });
});

describe('getCase from Blaise', () => {
  beforeEach(() => {
    blaiseApiClientMock.reset();
  });

  it('Should retrieve a case from blaise', async () => {
    // arrange
    const questionnaireName = 'OPN2201A';
    const caseId = '90001';

    blaiseApiClientMock.setup((client) => client.getCase(configFake.ServerPark, questionnaireName, caseId)).returns(async () => caseResponseMockObject);

    // act
    const result = await sut.getCase(questionnaireName, caseId);

    // assert
    expect(result).toEqual(caseResponseMockObject);
  });
});

describe('updateCase from Blaise', () => {
  beforeEach(() => {
    blaiseApiClientMock.reset();
  });

  it('Should call the update function with the expected parameters', async () => {
    // arrange
    const questionnaireName = 'OPN2201A';
    const caseId = '90001';
    const caseFields = {};

    blaiseApiClientMock.setup((client) => client.updateCase(configFake.ServerPark, questionnaireName, caseId, caseFields)).returns(async () => null);

    // act
    await sut.updateCase(questionnaireName, caseId, caseFields);

    // assert
    blaiseApiClientMock.verify((client) => client.updateCase(configFake.ServerPark, questionnaireName, caseId, caseFields), Times.once());
  });
});

describe('getCaseEditInformation from Blaise', () => {
  beforeEach(() => {
    blaiseApiClientMock.reset();
  });

  it('Should call getCaseEditInformation for a given questionnaire', async () => {
    // arrange
    const questionnaireName = 'FRS2504A';
    blaiseApiClientMock.setup((client) => client.getCaseEditInformation(configFake.ServerPark, questionnaireName)).returns(async () => CaseEditInformationListMockObject);

    // act
    await sut.getCaseEditInformation(questionnaireName);

    // assert
    blaiseApiClientMock.verify((client) => client.getCaseEditInformation(configFake.ServerPark, questionnaireName), Times.once());
  });

  it('Should return an expected list of Cases for editing', async () => {
    // arrange
    const questionnaireName = 'FRS2504A';
    const expectedEditUrlBase = `https://${configFake.ExternalWebUrl}/${questionnaireName}?Mode=CAWI&KeyValue=`;
    blaiseApiClientMock.setup((client) => client.getCaseEditInformation(configFake.ServerPark, questionnaireName)).returns(async () => CaseEditInformationListMockObject);

    // act
    const caseEditInformationList = await sut.getCaseEditInformation(questionnaireName);

    // assert
    caseEditInformationList.forEach((caseEditInformation, index) => {
      expect(caseEditInformation.primaryKey).toEqual(CaseEditInformationListMockObject[index]?.primaryKey);
      expect(caseEditInformation.outcome).toEqual(CaseEditInformationListMockObject[index]?.outcome);
      expect(caseEditInformation.assignedTo).toEqual(CaseEditInformationListMockObject[index]?.assignedTo);
      expect(caseEditInformation.editedStatus).toEqual(CaseEditInformationListMockObject[index]?.editedStatus);
      expect(caseEditInformation.interviewer).toEqual(CaseEditInformationListMockObject[index]?.interviewer);
      expect(caseEditInformation.editUrl).toEqual(`${expectedEditUrlBase}${caseEditInformation.primaryKey}`);
    });
  });
});

describe('getUsers from Blaise', () => {
  beforeEach(() => {
    blaiseApiClientMock.reset();
  });

  it('Should call getCaseEditInformation for a given questionnaire', async () => {
    // arrange
    blaiseApiClientMock.setup((client) => client.getUsers()).returns(async () => [userMockObject]);

    // act
    await sut.getUsers();

    // assert
    blaiseApiClientMock.verify((client) => client.getUsers(), Times.once());
  });

  it('Should call getCaseEditInformation for a given questionnaire', async () => {
    // arrange
    blaiseApiClientMock.setup((client) => client.getUsers()).returns(async () => [userMockObject]);

    // act
    const result = await sut.getUsers();

    // assert
    expect(result).toEqual([userMockObject]);
  });
});
