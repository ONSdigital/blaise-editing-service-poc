import { QuestionnaireReport } from "blaise-api-node-client";
import { QuestionnaireAllocation } from "../../common/interfaces/surveyInterface";

export default function mapQuestionnaireAllocation(questionnaires: QuestionnaireAllocation[], reports:QuestionnaireReport[]): QuestionnaireAllocation[] {
        questionnaires.forEach((questionnaire) => {
        const report =  reports.find((r) => r.questionnaireName === questionnaire.name);
        questionnaire.caseAllocation = report?.reportingData ?? [];
      });
      
      return questionnaires;
}