import { ReactElement } from 'react';
import { Accordion } from 'blaise-design-system-react-components';
import { ExpandableContent } from 'blaise-design-system-react-components/build/src/components/Accordion';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';
import SupervisorsQuestionnaireDetails from './SupervisorsQuestionnaireDetails';

interface SupervisorsQuestionnairesListProps {
  questionnaires: QuestionnaireDetails[];
}

function CreateContent(questionnaires:QuestionnaireDetails[]):ExpandableContent[] {
  return questionnaires.map((questionnaire) => ({ title: questionnaire.questionnaireName, content: <SupervisorsQuestionnaireDetails questionnaire={questionnaire} />, contentId: 'questionnaire' }));
}

export default function SupervisorsQuestionnairesList({ questionnaires }: SupervisorsQuestionnairesListProps): ReactElement {
  return (
    <>
      <br />
      <Accordion ContentId="questionnaire" ShowAllEnabled Expandables={CreateContent(questionnaires)} />
    </>
  );
}
