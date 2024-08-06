import BlaiseApiClient, { CaseEditInformationListMockObject } from 'blaise-api-node-client';
import { IMock, Mock, Times } from 'typemoq';
import BlaiseApi from '../../../server/api/BlaiseApi';
import { editQuestionnaireDetailsMockObject, questionnaireListMockObject } from '../../mockObjects/questionnaireListMockObject';
import FakeServerConfigurationProvider from '../configuration/FakeServerConfigurationProvider';

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
    blaiseApiClientMock.setup((client) => client.getQuestionnaires(configFake.ServerPark)).returns(async () => questionnaireListMockObject.filter((q) => q.surveyTla === 'FRS'));

    // act
    const result = await sut.getQuestionnaires();

    // assert
    expect(result).toEqual(editQuestionnaireDetailsMockObject);
  });
});

describe('editingDetails from Blaise', () => {
  beforeEach(() => {
    blaiseApiClientMock.reset();
  });
  it('Should call getEditingDetails for a given questionnaire', async () => {
    // arrange
    const questionnaire = 'FRS2504A';
    blaiseApiClientMock.setup((client) => client.getCaseEditInformation(configFake.ServerPark, questionnaire)).returns(async () => CaseEditInformationListMockObject);

    // act
    await sut.getCaseEditInformation(questionnaire);

    // assert
    blaiseApiClientMock.verify((client) => client.getCaseEditInformation(configFake.ServerPark, questionnaire), Times.once());
  });
});
