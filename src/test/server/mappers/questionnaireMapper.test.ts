import mapQuestionnaireAllocation from "../../../server/mappers/questionnaireMapper";
import { questionnaireAllocationListMockObject, questionnaireListMockObject } from "../../mockObjects/questionnaireListMockObject";
import { questionnaireReportMockObjectList } from "../../mockObjects/questionnaireReportMockObjects";

describe('Map a list o questionnaires and reports to a questionnaire allocation list', () => {
    it('It should return a correctly mapped list of questionnaires with allocation details', () => {
      // act
      const result = mapQuestionnaireAllocation(questionnaireListMockObject, questionnaireReportMockObjectList);
  
      // assert
     expect(result).toEqual(questionnaireAllocationListMockObject);
    });
  });