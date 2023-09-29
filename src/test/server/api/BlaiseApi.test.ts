import BlaiseApiClient, { QuestionnaireReport } from 'blaise-api-node-client';
import {
  IMock, It, Mock, Times,
} from 'typemoq';
import BlaiseApi from '../../../server/api/BlaiseApi';
import {
  questionnaire1Mock, questionnaire2Mock, questionnaire3Mock,
  questionnaire4Mock, questionnaireListMockObject,
} from '../../mockObjects/questionnaireListMockObject';
import {
  questionnaireReport1MockObject,
} from '../../mockObjects/questionnaireReportMockObjects';
import {
  caseFactsheetMockObject, caseResponseMockObject,
} from '../../mockObjects/caseMockObject';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';
import { CaseDetails } from '../../../common/interfaces/caseInterface';
import FakeServerConfigurationProvider from '../configuration/FakeServerConfigurationProvider';

// create fake config
const configFake = new FakeServerConfigurationProvider('restapi.blaise.com', 'dist', 5000, 'gusty', 'cati.blaise.com', 'richlikesricecakes', '12h', ['DST']);

// mock blaise api client

const blaiseApiClientMock: IMock<BlaiseApiClient> = Mock.ofType(BlaiseApiClient);

// create service under test
const sut = new BlaiseApi(configFake, blaiseApiClientMock.object);

const questionnaireName = 'OPN2201A';
const username: string = 'toby';

describe('getCaseDetails from Blaise', () => {
  const fieldIds: string[] = ['qserial.serial_number', 'qhadmin.hout', 'allocation.toeditor'];
  beforeEach(() => {
    blaiseApiClientMock.reset();
  });

  it('Should retrieve a filtered list of case details is a username is supplied', async () => {
    // arrange
    const questionnaireReport1MockObjectLocal: QuestionnaireReport = {
      questionnaireName,
      questionnaireId: '00000000-0000-0000-0000-000000000000',
      reportingData: [
        {
          'qserial.serial_number': '9001',
          'qhadmin.hout': 110,
          'allocation.toeditor': username,
        },
        {
          'qserial.serial_number': '9002',
          'qhadmin.hout': 120,
          'allocation.toeditor': '',
        },
        {
          'qserial.serial_number': '9003',
          'qhadmin.hout': 210,
          'allocation.toeditor': username,
        },
        {
          'qserial.serial_number': '9004',
          'qhadmin.hout': 120,
          'allocation.toeditor': 'Mike',
        },
      ],
    };

    const caseDetailsListMockObject:CaseDetails[] = [
      {
        CaseId: '9001',
        CaseStatus: 110,
        EditorAllocated: username,
        EditCaseLink: `https://cati.blaise.com/${questionnaireName}?Mode=CAWI&KeyValue=9001`,
      },
      {
        CaseId: '9003',
        CaseStatus: 210,
        EditorAllocated: username,
        EditCaseLink: `https://cati.blaise.com/${questionnaireName}?Mode=CAWI&KeyValue=9003`,
      },
    ];

    blaiseApiClientMock.setup((client) => client.getQuestionnaireReportData(configFake.ServerPark, questionnaireName, fieldIds))
      .returns(async () => questionnaireReport1MockObjectLocal);

    // act
    const result = await sut.getCaseDetails(questionnaireName, username);

    // assert
    expect(result).toEqual(caseDetailsListMockObject);
  });

  it('Should retrieve a full list of case details is a username is not supplied', async () => {
    // arrange
    const questionnaireReport1MockObjectLocal: QuestionnaireReport = {
      questionnaireName,
      questionnaireId: '00000000-0000-0000-0000-000000000000',
      reportingData: [
        {
          'qserial.serial_number': '9001',
          'qhadmin.hout': 110,
          'allocation.toeditor': username,
        },
        {
          'qserial.serial_number': '9002',
          'qhadmin.hout': 120,
          'allocation.toeditor': '',
        },
        {
          'qserial.serial_number': '9003',
          'qhadmin.hout': 210,
          'allocation.toeditor': username,
        },
        {
          'qserial.serial_number': '9004',
          'qhadmin.hout': 120,
          'allocation.toeditor': 'Mike',
        },
      ],
    };

    const caseDetailsListMockObject:CaseDetails[] = [
      {
        CaseId: '9001',
        CaseStatus: 110,
        EditorAllocated: username,
        EditCaseLink: `https://cati.blaise.com/${questionnaireName}?Mode=CAWI&KeyValue=9001`,

      },
      {
        CaseId: '9002',
        CaseStatus: 120,
        EditorAllocated: '',
        EditCaseLink: `https://cati.blaise.com/${questionnaireName}?Mode=CAWI&KeyValue=9002`,
      },
      {
        CaseId: '9003',
        CaseStatus: 210,
        EditorAllocated: username,
        EditCaseLink: `https://cati.blaise.com/${questionnaireName}?Mode=CAWI&KeyValue=9003`,
      },
      {
        CaseId: '9004',
        CaseStatus: 120,
        EditorAllocated: 'Mike',
        EditCaseLink: `https://cati.blaise.com/${questionnaireName}?Mode=CAWI&KeyValue=9004`,
      },
    ];

    blaiseApiClientMock.setup((client) => client.getQuestionnaireReportData(configFake.ServerPark, questionnaireName, fieldIds))
      .returns(async () => questionnaireReport1MockObjectLocal);

    // act
    const result = await sut.getCaseDetails(questionnaireName);

    // assert
    expect(result).toEqual(caseDetailsListMockObject);
  });

  it('Should retrieve an empty list of cases if none are allocated to the user when a username is supplied', async () => {
    // arrange
    const questionnaireReport1MockObjectLocal: QuestionnaireReport = {
      questionnaireName,
      questionnaireId: '00000000-0000-0000-0000-000000000000',
      reportingData: [
        {
          'qserial.serial_number': '9001',
          'qhadmin.hout': 110,
          'allocation.toeditor': 'bob',
        },
        {
          'qserial.serial_number': '9002',
          'qhadmin.hout': 120,
          'allocation.toeditor': '',
        },
        {
          'qserial.serial_number': '9003',
          'qhadmin.hout': 210,
          'allocation.toeditor': 'mike',
        },
        {
          'qserial.serial_number': '9004',
          'qhadmin.hout': 120,
          'allocation.toeditor': 'Mike',
        },
      ],
    };

    blaiseApiClientMock.setup((client) => client.getQuestionnaireReportData(configFake.ServerPark, questionnaireName, fieldIds))
      .returns(async () => questionnaireReport1MockObjectLocal);

    // act
    const result = await sut.getCaseDetails(questionnaireName, username);

    // assert
    expect(result).toEqual([]);
  });

  it('Should retrieve an empty list is questionnaire has no cases', async () => {
    // arrange
    const questionnaireReport1MockObjectLocal: QuestionnaireReport = {
      questionnaireName,
      questionnaireId: '00000000-0000-0000-0000-000000000000',
      reportingData: [],
    };

    blaiseApiClientMock.setup((client) => client.getQuestionnaireReportData(configFake.ServerPark, questionnaireName, fieldIds))
      .returns(async () => questionnaireReport1MockObjectLocal);

    // act
    const result = await sut.getCaseDetails(questionnaireName);

    // assert
    expect(result).toEqual([]);
  });

  it('Should call the getCaseDetails function with the expected parameters', async () => {
    // arrange
    blaiseApiClientMock.setup((client) => client.getQuestionnaireReportData(configFake.ServerPark, questionnaireName, fieldIds))
      .returns(async () => questionnaireReport1MockObject);

    // act
    await sut.getCaseDetails(questionnaireName, username);

    // assert
    blaiseApiClientMock.verify((client) => client.getQuestionnaireReportData(configFake.ServerPark, questionnaireName, fieldIds), Times.once());
  });
});

describe('getCaseFactsheet from Blaise', () => {
  beforeEach(() => {
    blaiseApiClientMock.reset();
  });

  it('Should retrieve a case from blaise', async () => {
    // arrange
    const caseId = '90001';
    blaiseApiClientMock.setup((client) => client.getCase(configFake.ServerPark, questionnaireName, caseId)).returns(async () => caseResponseMockObject);

    // act
    const result = await sut.getCaseFactsheet(questionnaireName, caseId);

    // assert
    expect(result).toEqual(caseFactsheetMockObject);
  });

  it('Should call the getCaseFactsheet function with the expected parameters', async () => {
    // arrange
    const caseId = '90001';
    blaiseApiClientMock.setup((client) => client.getCase(It.isAnyString(), It.isAnyString(), It.isAnyString())).returns(async () => caseResponseMockObject);

    // act
    await sut.getCaseFactsheet(questionnaireName, caseId);

    // assert
    blaiseApiClientMock.verify((client) => client.getCase(configFake.ServerPark, questionnaireName, caseId), Times.once());
  });
});

describe('getQuestionnaires from Blaise', () => {
  const fieldIds: string[] = ['allocation.toeditor'];

  beforeEach(() => {
    blaiseApiClientMock.reset();
  });
  it('Should call getQuestionnaires and getReportData for all questionnaires in that list', async () => {
    // arrange
    blaiseApiClientMock.setup((client) => client.getQuestionnaires(configFake.ServerPark)).returns(async () => questionnaireListMockObject);
    blaiseApiClientMock.setup((client) => client.getQuestionnaireReportData(configFake.ServerPark, It.isAnyString(), fieldIds))
      .returns(async () => questionnaireReport1MockObject);

    // act
    await sut.getQuestionnaires();

    // assert
    blaiseApiClientMock.verify((client) => client.getQuestionnaires(configFake.ServerPark), Times.once());

    questionnaireListMockObject.forEach((questionnaire) => {
      blaiseApiClientMock.verify((client) => client.getQuestionnaireReportData(configFake.ServerPark, questionnaire.name, fieldIds), Times.once());
    });
  });

  it('Should return the expected full list of questionnaires with allocation details is no username is supplied', async () => {
    // arrange
    blaiseApiClientMock.setup((client) => client.getQuestionnaires(configFake.ServerPark)).returns(async () => questionnaireListMockObject);

    // mock questionnaire 1 report data
    const reportdata1Mock: QuestionnaireReport = {
      questionnaireName: questionnaire1Mock.name,
      questionnaireId: '00000000-0000-0000-0000-000000000000',
      reportingData: [
        {
          'qserial.serial_number': '9001',
          'qhadmin.hout': 110,
          'allocation.toeditor': 'jakew',
        },
        {
          'qserial.serial_number': '9002',
          'qhadmin.hout': 210,
          'allocation.toeditor': username,
        },
        {
          'qserial.serial_number': '9003',
          'qhadmin.hout': 210,
          'allocation.toeditor': '',
        },
      ],
    };
    blaiseApiClientMock.setup((client) => client.getQuestionnaireReportData(configFake.ServerPark, questionnaire1Mock.name, fieldIds)).returns(async () => reportdata1Mock);

    // mock questionnaire 2 report data
    const reportdata2Mock: QuestionnaireReport = {
      questionnaireName: questionnaire2Mock.name,
      questionnaireId: '00000000-0000-0000-0000-000000000000',
      reportingData: [
        {
          'qserial.serial_number': '8001',
          'qhadmin.hout': 0,
          'allocation.toeditor': '',
        },
      ],
    };
    blaiseApiClientMock.setup((client) => client.getQuestionnaireReportData(configFake.ServerPark, questionnaire2Mock.name, fieldIds)).returns(async () => reportdata2Mock);

    // mock questionnaire 3 report data
    const reportdata3Mock: QuestionnaireReport = {
      questionnaireName: questionnaire3Mock.name,
      questionnaireId: '00000000-0000-0000-0000-000000000000',
      reportingData: [],
    };
    blaiseApiClientMock.setup((client) => client.getQuestionnaireReportData(configFake.ServerPark, questionnaire3Mock.name, fieldIds)).returns(async () => reportdata3Mock);

    // mock questionnaire 4 report data
    const reportdata4Mock: QuestionnaireReport = {
      questionnaireName: questionnaire4Mock.name,
      questionnaireId: '00000000-0000-0000-0000-000000000000',
      reportingData: [
        {
          'qserial.serial_number': '7001',
          'qhadmin.hout': 110,
          'allocation.toeditor': username,
        },
        {
          'qserial.serial_number': '7002',
          'qhadmin.hout': 210,
          'allocation.toeditor': username,
        },
        {
          'qserial.serial_number': '7003',
          'qhadmin.hout': 210,
          'allocation.toeditor': '',
        },
      ],
    };
    blaiseApiClientMock.setup((client) => client.getQuestionnaireReportData(configFake.ServerPark, questionnaire4Mock.name, fieldIds)).returns(async () => reportdata4Mock);

    const expectedQuestionnaireDetails: QuestionnaireDetails[] = [{
      questionnaireName: questionnaire1Mock.name,
      numberOfCases: questionnaire1Mock.dataRecordCount ?? 0,
      numberOfCasesAllocated: 2,
    },
    {
      questionnaireName: questionnaire2Mock.name,
      numberOfCases: questionnaire2Mock.dataRecordCount ?? 0,
      numberOfCasesAllocated: 0,
    },
    {
      questionnaireName: questionnaire3Mock.name,
      numberOfCases: questionnaire3Mock.dataRecordCount ?? 0,
      numberOfCasesAllocated: 0,
    },
    {
      questionnaireName: questionnaire4Mock.name,
      numberOfCases: questionnaire4Mock.dataRecordCount ?? 0,
      numberOfCasesAllocated: 2,
    }];

    // act
    const result = await sut.getQuestionnaires();

    // assert
    expect(result).toEqual(expectedQuestionnaireDetails);
  });
});
