import BlaiseApiClient, { CaseResponseMockObject, CaseStatusListMockObject } from 'blaise-api-node-client';
import {
  IMock, It, Mock, Times,
} from 'typemoq';
import FakeConfigurationProvider from '../configuration/FakeConfigurationProvider';
import BlaiseApi from '../../../server/api/BlaiseApi';
import {
  questionnaire1CaseAllocationMock, questionnaire1Mock, questionnaire2CaseAllocationMock, questionnaire2Mock, questionnaire3CaseAllocationMock, questionnaire3Mock,
  questionnaire4CaseAllocationMock, questionnaire4Mock, questionnaireAllocationListMockObject, questionnaireListMockObject,
} from '../../mockObjects/questionnaireListMockObject';
import {
  questionnaireReport1MockObject, questionnaireReport2MockObject, questionnaireReport3MockObject, questionnaireReport4MockObject,
} from '../../mockObjects/questionnaireReportMockObjects';

const questionnaireName = 'LMS2201_LT1';

// create fake config
const configFake = new FakeConfigurationProvider('restapi.blaise.com', 'dist', 5000, 'gusty', 'cati.blaise.com', 'richlikesricecakes', '12h', ['DST']);

// mock blaise api client

const blaiseApiClientMock: IMock<BlaiseApiClient> = Mock.ofType(BlaiseApiClient);

// create service under test
const sut = new BlaiseApi(configFake, blaiseApiClientMock.object);

describe('getCaseStatus from Blaise', () => {
  beforeEach(() => {
    blaiseApiClientMock.reset();
  });

  it('Should retrieve a list case statuses from blaise', async () => {
    // arrange
    blaiseApiClientMock.setup((client) => client.getCaseStatus(configFake.ServerPark, questionnaireName)).returns(async () => CaseStatusListMockObject);

    // act
    const result = await sut.getCaseStatus(questionnaireName);

    // assert
    expect(result).toEqual(CaseStatusListMockObject);
  });

  it('Should call the getCaseStatus function with the expected parameters', async () => {
    // arrange
    blaiseApiClientMock.setup((client) => client.getCaseStatus(It.isAnyString(), It.isAnyString())).returns(async () => CaseStatusListMockObject);

    // act
    await sut.getCaseStatus(questionnaireName);

    // assert
    blaiseApiClientMock.verify((client) => client.getCaseStatus(configFake.ServerPark, questionnaireName), Times.once());
  });
});

describe('getCase from Blaise', () => {
  beforeEach(() => {
    blaiseApiClientMock.reset();
  });

  it('Should retrieve a case from blaise', async () => {
    // arrange
    const caseId = '90001';
    blaiseApiClientMock.setup((client) => client.getCase(configFake.ServerPark, questionnaireName, caseId)).returns(async () => CaseResponseMockObject);

    // act
    const result = await sut.getCase(questionnaireName, caseId);

    // assert
    expect(result).toEqual(CaseResponseMockObject);
  });

  it('Should call the getCase function with the expected parameters', async () => {
    // arrange
    const caseId = '90001';
    blaiseApiClientMock.setup((client) => client.getCase(It.isAnyString(), It.isAnyString(), It.isAnyString())).returns(async () => CaseResponseMockObject);

    // act
    await sut.getCase(questionnaireName, caseId);

    // assert
    blaiseApiClientMock.verify((client) => client.getCase(configFake.ServerPark, questionnaireName, caseId), Times.once());
  });
});

describe('getQuestionnairesWithAllocation from Blaise', () => {
  const fieldIds = ['allocation.toeditor'];

  beforeEach(() => {
    blaiseApiClientMock.reset();
  });
  /*   it('Should call getQuestionnaires and getReportData for all questionnaires in that list', async () => {
    // arrange
    blaiseApiClientMock.setup((client) => client.getQuestionnaires(configFake.ServerPark)).returns(async () => questionnaireListMockObject);
    blaiseApiClientMock.setup((client) => client.getQuestionnaireReportData(configFake.ServerPark, It.isAnyString(), fieldIds))
      .returns(async () => questionnaireReport1MockObject);

    // act
    await sut.getQuestionnairesWithAllocation();

    // assert
    blaiseApiClientMock.verify((client) => client.getQuestionnaires(configFake.ServerPark), Times.once());

    questionnaireListMockObject.forEach((questionnaire) => {
      blaiseApiClientMock.verify((client) => client.getQuestionnaireReportData(configFake.ServerPark, questionnaire.name, fieldIds), Times.once());
    });
  }); */

  it('Should return the expected list of questionnaires with allocation information', async () => {
    // arrange
    blaiseApiClientMock.setup((client) => client.getQuestionnaires(configFake.ServerPark)).returns(async () => questionnaireListMockObject);

    // mock questionnaire 1 report data
    const reportdata1Mock = questionnaireReport1MockObject;
    reportdata1Mock.reportingData = questionnaire1CaseAllocationMock;
    blaiseApiClientMock.setup((client) => client.getQuestionnaireReportData(configFake.ServerPark, questionnaire1Mock.name, fieldIds)).returns(async () => reportdata1Mock);

    // mock questionnaire 2 report data
    const reportdata2Mock = questionnaireReport2MockObject;
    reportdata2Mock.reportingData = questionnaire2CaseAllocationMock;
    blaiseApiClientMock.setup((client) => client.getQuestionnaireReportData(configFake.ServerPark, questionnaire2Mock.name, fieldIds)).returns(async () => reportdata2Mock);

    // mock questionnaire 3 report data
    const reportdata3Mock = questionnaireReport3MockObject;
    reportdata3Mock.reportingData = questionnaire3CaseAllocationMock;
    blaiseApiClientMock.setup((client) => client.getQuestionnaireReportData(configFake.ServerPark, questionnaire3Mock.name, fieldIds)).returns(async () => reportdata3Mock);

    // mock questionnaire 4 report data
    const reportdata4Mock = questionnaireReport4MockObject;
    reportdata4Mock.reportingData = questionnaire4CaseAllocationMock;
    blaiseApiClientMock.setup((client) => client.getQuestionnaireReportData(configFake.ServerPark, questionnaire4Mock.name, fieldIds)).returns(async () => reportdata4Mock);

    // act
    const result = await sut.getQuestionnaires();

    // assert
    expect(result).toEqual(questionnaireAllocationListMockObject);
  });
});
