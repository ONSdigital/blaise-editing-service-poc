import { ReactElement } from 'react';
import { Accordion } from 'blaise-design-system-react-components';
import { ExpandableContent } from 'blaise-design-system-react-components/build/src/components/Accordion';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';
import EditorsQuestionnaireDetails from './EditorsQuestionnaireDetails';

interface EditorsQuestionnairesListProps {
  questionnaires: QuestionnaireDetails[];
}

function CreateContent(questionnaires:QuestionnaireDetails[]):ExpandableContent[] {
  return questionnaires.map((questionnaire) => ({ title: questionnaire.questionnaireName, content: <EditorsQuestionnaireDetails />, contentId: 'questionnaire' }));
}

export default function EditorsQuestionnairesList({ questionnaires }: EditorsQuestionnairesListProps): ReactElement {
  return (
    <>
      <br />
      <Accordion ContentId="questionnaire" ShowAllEnabled Expandables={CreateContent(questionnaires)} />
    </>
  );
}
