import BlaiseApiClient, { CaseEditInformationListMockObject } from 'blaise-api-node-client';
import {
  IMock, It, Mock, Times,
} from 'typemoq';
import BlaiseApi from '../../../server/api/BlaiseApi';
import { questionnaireDetailsListMockObject, questionnaireListMockObject } from '../mockObjects/questionnaireListMockObject';
import FakeServerConfigurationProvider from '../configuration/FakeServerConfigurationProvider';
import userMockObject from '../mockObjects/userMockObject';
import { caseResponseMockObject, caseSummaryMockObject } from '../mockObjects/CaseMockObject';

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

describe('getCaseSummary from Blaise', () => {
  beforeEach(() => {
    blaiseApiClientMock.reset();
  });

  it('Should retrieve a case summary from blaise', async () => {
    // arrange
    const questionnaireName = 'OPN2201A';
    const caseId = '90001';

    blaiseApiClientMock.setup((client) => client.getCase(configFake.ServerPark, questionnaireName, caseId)).returns(async () => caseResponseMockObject);

    // act
    const result = await sut.getCaseSummary(questionnaireName, caseId);

    // assert
    expect(result).toEqual(caseSummaryMockObject);
  });

  it('Should call the getCaseFactsheet function with the expected parameters', async () => {
    // arrange
    const questionnaireName = 'OPN2201A';
    const caseId = '90001';

    blaiseApiClientMock.setup((client) => client.getCase(It.isAnyString(), It.isAnyString(), It.isAnyString())).returns(async () => caseResponseMockObject);

    // act
    await sut.getCaseSummary(questionnaireName, caseId);

    // assert
    blaiseApiClientMock.verify((client) => client.getCase(configFake.ServerPark, questionnaireName, caseId), Times.once());
  });
});

describe('getCaseEditInformation from Blaise', () => {
  beforeEach(() => {
    blaiseApiClientMock.reset();
  });

  it('Should call getCaseEditInformation for a given questionnaire', async () => {
    // arrange
    const questionnaire = 'FRS2504A';
    blaiseApiClientMock.setup((client) => client.getCaseEditInformation(configFake.ServerPark, questionnaire)).returns(async () => CaseEditInformationListMockObject);

    // act
    await sut.getCaseEditInformation(questionnaire);

    // assert
    blaiseApiClientMock.verify((client) => client.getCaseEditInformation(configFake.ServerPark, questionnaire), Times.once());
  });

  it('Should return an expected list of Cases for editing', async () => {
    // arrange
    const questionnaire = 'FRS2504A';
    blaiseApiClientMock.setup((client) => client.getCaseEditInformation(configFake.ServerPark, questionnaire)).returns(async () => CaseEditInformationListMockObject);

    // act
    const result = await sut.getCaseEditInformation(questionnaire);

    // assert
    expect(result).toEqual(CaseEditInformationListMockObject);
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
