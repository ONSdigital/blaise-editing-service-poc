import { ReactElement } from 'react';
import { Accordion } from 'blaise-design-system-react-components';
import { ExpandableContent } from 'blaise-design-system-react-components/build/src/components/Accordion';
import { User } from 'blaise-api-node-client';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';

import UserRole from '../enums/UserRole';
import SupervisorsQuestionnaireDetails from '../../Supervisor/Components/SupervisorsQuestionnaireDetails';
import EditorsQuestionnaireDetails from '../../Editor/Components/EditorsQuestionnaireDetails';

function RenderQuestionnaireDetails(user:User, questionnaire:QuestionnaireDetails) {
  const { role, name } = user;

  if (role === UserRole.SVT_Supervisor) {
    return <SupervisorsQuestionnaireDetails questionnaire={questionnaire} />;
  }

  return <EditorsQuestionnaireDetails questionnaire={questionnaire} username={name} />;
}

interface QuestionnairesListProps {
  questionnaires: QuestionnaireDetails[];
  user: User
}

function CreateContent(questionnaires:QuestionnaireDetails[], user:User):ExpandableContent[] {
  return questionnaires.map((questionnaire) => ({ title: questionnaire.questionnaireName, content: RenderQuestionnaireDetails(user, questionnaire), contentId: 'questionnaire' }));
}

export default function QuestionnairesList({ questionnaires, user }: QuestionnairesListProps): ReactElement {
  return (
    <>
      <br />
      <Accordion ContentId="questionnaire" ShowAllEnabled Expandables={CreateContent(questionnaires, user)} />
    </>
  );
}
