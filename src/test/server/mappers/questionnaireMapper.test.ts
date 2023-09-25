import mapQuestionnaireAllocation from "../../../server/mappers/questionnaireMapper";
import { questionnaireAllocationListMockObject, questionnaireListMockObject } from "../../mockObjects/questionnaireListMockObject";
import { questionnaireReportMockObjectList } from "../../mockObjects/questionnaireReportMockObjects";

describe('Map a list o questionnaires and reports to a questionnaire allocation list', () => {
    it('It should return a correctly mapped list of questionnaires with allocation details', () => {
      // arrange
      const questionnaireList = questionnaireListMockObject;
      const questionnaireReportList = questionnaireReportMockObjectList;

/*       const questionnaireAllocationListMockObject = questionnaireList as QuestionnaireAllocation[];
      questionnaireAllocationListMockObject[0]?.caseAllocation ?? questionnaireReportList[0]?.reportingData;
      questionnaireAllocationListMockObject[1]?.caseAllocation ?? questionnaireReportList[1]?.reportingData;
      questionnaireAllocationListMockObject[2]?.caseAllocation ?? questionnaireReportList[2]?.reportingData;
      questionnaireAllocationListMockObject[3]?.caseAllocation ?? questionnaireReportList[3]?.reportingData; */
  
      // act
      const result = mapQuestionnaireAllocation(questionnaireList, questionnaireReportList);
      console.debug(questionnaireAllocationListMockObject)
  
      // assert
     expect(result).toEqual(questionnaireAllocationListMockObject);
    });
  });