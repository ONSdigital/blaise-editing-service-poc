import BlaiseApiClient, { CaseData, CaseResponseMockObject, CaseStatusListMockObject, reportMockObject } from 'blaise-api-node-client';
import { IMock, It, Mock, Times } from 'typemoq';
import FakeConfigurationProvider from '../configuration/FakeConfigurationProvider';
import BlaiseApi from '../../../server/api/BlaiseApi';
import { questionnaireAllocationListMockObject, questionnaireListMockObject } from '../../mockObjects/questionnaireListMockObject';

const questionnaireName = 'LMS2201_LT1';

// create fake config
const configFake = new FakeConfigurationProvider('restapi.blaise.com', 'dist', 5000, 'gusty', 'cati.blaise.com', 'richlikesricecakes', '12h', ['DST']);

// mock blaise api client

const blaiseApiClientMock: IMock<BlaiseApiClient> = Mock.ofType(BlaiseApiClient);

// create service under test
const sut = new BlaiseApi(configFake, blaiseApiClientMock.object);

describe('getCaseStatus from Blaise', () => {
  it('Should retrieve a list case statuses from blaise', async () => {
    // arrange
    blaiseApiClientMock.setup((client) => client.getCaseStatus(configFake.ServerPark, questionnaireName)).returns(async () => CaseStatusListMockObject);

    // act
    const result = await sut.getCaseStatus(questionnaireName);

    // assert
    expect(result).toEqual(CaseStatusListMockObject);
  });
});

describe('getCase from Blaise', () => {    
  it('Should retrieve a case from blaise', async () => {
    // arrange
    const caseId = '90001';
    blaiseApiClientMock.setup((client) => client.getCase(configFake.ServerPark, questionnaireName, caseId)).returns(async () => CaseResponseMockObject);

    // act
    const result = await sut.getCase(questionnaireName, caseId);

    // assert
    expect(result).toEqual(CaseResponseMockObject);
  });
});

describe('getQuestionnairesWithAllocation from Blaise', () => {
  beforeEach(() => {
    blaiseApiClientMock.reset();
  });
  it('Should retrieve a list of questionnaires from blaise and get the allocation info for all questionnaires in that list', async () => {
    // arrange
    blaiseApiClientMock.setup((client) => client.getQuestionnaires(configFake.ServerPark)).returns(async () => questionnaireListMockObject);
    blaiseApiClientMock.setup((client) => client.getReportData(configFake.ServerPark, It.isAnyString())).returns(async () => reportMockObject);

    // act
    await sut.getQuestionnairesWithAllocation();

    // assert
    blaiseApiClientMock.verify((client) => client.getQuestionnaires(configFake.ServerPark), Times.once());

    questionnaireListMockObject.forEach((questionnaire) => {
      blaiseApiClientMock.verify((client) => client.getReportData(configFake.ServerPark,questionnaire.name), Times.once()); 
    })
  }); 

  it('Should return the expected list of questionnaires with allocation information', async () => {
    // arrange
    let reportdataMock = reportMockObject;
    blaiseApiClientMock.setup((client) => client.getQuestionnaires(configFake.ServerPark)).returns(async () => questionnaireListMockObject);
    
    questionnaireListMockObject.forEach((questionnaire) => {
      const caseData = questionnaireAllocationListMockObject.find(q => q.name === questionnaire.name)?.caseAllocation as CaseData[];
      reportdataMock.reportingData = caseData;

      blaiseApiClientMock.setup((client) => client.getReportData(configFake.ServerPark, questionnaire.name)).returns(async () => reportdataMock);
    })      

    // act
    const result = await sut.getQuestionnairesWithAllocation();


    // assert
    expect(result).toEqual(questionnaireAllocationListMockObject)

  });   
});
