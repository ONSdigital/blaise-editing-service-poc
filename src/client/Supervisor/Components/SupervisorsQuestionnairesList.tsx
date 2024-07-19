import { ReactElement } from 'react';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';
import SupervisorsQuestionnaireDetails from './SupervisorsQuestionnaireDetails';

interface SupervisorsQuestionnairesListProps {
  questionnaires: QuestionnaireDetails[];
}

export default function SupervisorsQuestionnairesList({ questionnaires }: SupervisorsQuestionnairesListProps): ReactElement {
  return (
    <>
      {questionnaires.map((questionnaire) => (
        <SupervisorsQuestionnaireDetails questionnaire={questionnaire} />
      ))}

    </>
  );
}
