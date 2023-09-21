import { Questionnaire, QuestionnaireReport } from 'blaise-api-node-client';
import { QuestionnaireAllocation } from '../../common/interfaces/surveyInterface';

export default function mapQuestionnaireAllocation(questionnaires: Questionnaire[], reports:QuestionnaireReport[]): QuestionnaireAllocation[] {
  const questionnairesWithAllocations:QuestionnaireAllocation[] = [];

  questionnaires.forEach((questionnaire) => {
    const questionnaireWithAllocation = questionnaire as QuestionnaireAllocation;
    const report = reports.find((r) => r.questionnaireName === questionnaire.name);
    questionnaireWithAllocation.caseAllocation = report?.reportingData ?? [];
    questionnairesWithAllocations.push(questionnaireWithAllocation);
  });

  return questionnairesWithAllocations;
}
