import { ReactElement } from 'react';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';
import { useAsyncRequestWithThreeParams } from '../../Common/hooks/useAsyncRequest';
import { getSupervisorEditorInformation } from '../../api/NodeApi';
import AsyncContent from '../../Common/components/AsyncContent';
import { SupervisorInformation } from '../../Interfaces/supervisorInterface';
import SupervisorsContent from './SupervisorsContent';
import UserRole from '../../Common/enums/UserTypes';

interface SupervisorsQuestionnairesDetailsProps {
  questionnaire: QuestionnaireDetails;
  supervisorRole: UserRole;
  editorRole: UserRole;
}

export default function SupervisorsQuestionnairesDetails({ questionnaire, supervisorRole, editorRole }: SupervisorsQuestionnairesDetailsProps): ReactElement {
  const supervisorInformation = useAsyncRequestWithThreeParams<SupervisorInformation, string, UserRole, UserRole>(getSupervisorEditorInformation, questionnaire.questionnaireName, supervisorRole, editorRole);

  return (

    <div className="questionnaire" data-testid="questionnaire">
      <AsyncContent content={supervisorInformation}>
        {(loadedSupervisorInformation) => <SupervisorsContent supervisorInformation={loadedSupervisorInformation} questionnaire={questionnaire} />}
      </AsyncContent>
    </div>
  );
}
