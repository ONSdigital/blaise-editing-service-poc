import { ReactElement } from 'react';
import { Accordion } from 'blaise-design-system-react-components';
import { ExpandableContent } from 'blaise-design-system-react-components/build/src/components/Accordion';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';

import UserRole from '../enums/UserRole';
import SupervisorsQuestionnaireDetails from '../../Supervisor/Components/SupervisorsQuestionnaireDetails';

function RenderQuestionnaireDetails(role:string, questionnaire:QuestionnaireDetails) {
  const userRole:UserRole = UserRole[role as UserRole];

  if (userRole === UserRole.SVT_Supervisor) {
    return <SupervisorsQuestionnaireDetails questionnaire={questionnaire} />;
  }

  return <SupervisorsQuestionnaireDetails questionnaire={questionnaire} />;
}

interface QuestionnairesListProps {
  questionnaires: QuestionnaireDetails[];
  role:string
}

function CreateContent(questionnaires:QuestionnaireDetails[], role:string):ExpandableContent[] {
  return questionnaires.map((questionnaire) => ({ title: questionnaire.questionnaireName, content: RenderQuestionnaireDetails(role, questionnaire), contentId: 'questionnaire' }));
}

export default function QuestionnairesList({ questionnaires, role }: QuestionnairesListProps): ReactElement {
  return (
    <>
      <br />
      <Accordion ContentId="questionnaire" ShowAllEnabled Expandables={CreateContent(questionnaires, role)} />
    </>
  );
}
