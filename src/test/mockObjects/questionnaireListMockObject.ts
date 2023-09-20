import { CaseData, Questionnaire } from "blaise-api-node-client";
import { QuestionnaireAllocation } from "../../common/interfaces/surveyInterface";

export const questionnaire1Mock: Questionnaire = 
  {
    name: 'LMS2101_AA1',
    serverParkName: 'gusty',
    installDate: '2021-01-15T15:26:43.4233454+00:00',
    status: 'Active',
    dataRecordCount: 2,
    hasData: false,
    active: false
  }

  export const questionnaire2Mock: Questionnaire = 
  {
    name: 'LMS2101_AB1',
    serverParkName: 'gusty',
    installDate: '2021-02-15T15:26:43.4233454+00:00',
    status: 'Active',
    dataRecordCount: 1,
    hasData: false,
    active: false,
  } 

  export const questionnaire3Mock: Questionnaire = 
  {
    name: 'LMS2101_AC1',
    serverParkName: 'gusty',
    installDate: '2021-03-15T15:26:43.4233454+00:00',
    status: 'Active',
    dataRecordCount: 0,
    hasData: false,
    active: false,
  }

  export const questionnaire4Mock: Questionnaire = 
  {
    name: 'OPN2201A',
    serverParkName: 'gusty',
    installDate: '2021-04-15T15:26:43.4233454+00:00',
    status: 'Active',
    dataRecordCount: 3,
    hasData: false,
    active: false,
  }


export const questionnaireListMockObject: Questionnaire[] = [
  questionnaire1Mock,
  questionnaire2Mock,
  questionnaire3Mock,
  questionnaire4Mock,
  ];


  export const questionnaire1CaseAllocationMock: CaseData[] = 
    [{
      CaseId: '9001',
      HOut: '110',
      ToEditor: 'jakew',
    },
    {
      CaseId: '9002',
      HOut: '210',
      ToEditor: 'tobym',
    }]

    export const questionnaire2CaseAllocationMock: CaseData[] = 
    [{
      CaseId: '9008',
      HOut: '110',
      ToEditor: 'jakew',
    }]   

    export const questionnaire3CaseAllocationMock: CaseData[] = 
    []       

    export const questionnaire4CaseAllocationMock: CaseData[] = 
    [{
      CaseId: '9001',
      HOut: '110',
      ToEditor: 'jakew',
    },
    {
      CaseId: '9002',
      HOut: '210',
      ToEditor: 'tobym',
    },
    {
      CaseId: '9003',
      HOut: '110',
      ToEditor: 'jakew',
    }  ]    

  export const questionnaireAllocationListMockObject: QuestionnaireAllocation[] = [
    {
      name: 'LMS2101_AA1',
      serverParkName: 'gusty',
      installDate: '2021-01-15T15:26:43.4233454+00:00',
      status: 'Active',
      dataRecordCount: 2,
      hasData: false,
      active: false,
      caseAllocation: questionnaire1CaseAllocationMock
    },
    {
      name: 'LMS2101_AB1',
      serverParkName: 'gusty',
      installDate: '2021-02-15T15:26:43.4233454+00:00',
      status: 'Active',
      dataRecordCount: 1,
      hasData: false,
      active: false,
      caseAllocation: questionnaire2CaseAllocationMock,
    },
    {
      name: 'LMS2101_AC1',
      serverParkName: 'gusty',
      installDate: '2021-03-15T15:26:43.4233454+00:00',
      status: 'Active',
      dataRecordCount: 0,
      hasData: false,
      active: false,
      caseAllocation: questionnaire3CaseAllocationMock,
    },
    {
      name: 'OPN2201A',
      serverParkName: 'gusty',
      installDate: '2021-04-15T15:26:43.4233454+00:00',
      status: 'Active',
      dataRecordCount: 3,
      hasData: false,
      active: false,
      caseAllocation: questionnaire4CaseAllocationMock,
    }];  

