import { ReactElement } from 'react';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';
import { useAsyncRequestWithTwoParams } from '../../Common/hooks/useAsyncRequest';
import { getSupervisorEditorInformation } from '../../api/NodeApi';
import AsyncContent from '../../Common/components/AsyncContent';
import { SupervisorInformation } from '../../Interfaces/supervisorInterface';
import SupervisorsContent from './SupervisorsContent';
import UserRole from '../../Common/enums/UserRole';

interface SupervisorsQuestionnairesDetailsProps {
  questionnaire: QuestionnaireDetails;
  userRole: UserRole;
}

export default function SupervisorsQuestionnairesDetails({ questionnaire, userRole }: SupervisorsQuestionnairesDetailsProps): ReactElement {
  const supervisorInformation = useAsyncRequestWithTwoParams<SupervisorInformation, string, UserRole>(getSupervisorEditorInformation, questionnaire.questionnaireName, userRole);

  return (

    <div className="questionnaire" data-testid="questionnaire">
      <AsyncContent content={supervisorInformation}>
        {(loadedSupervisorInformation) => <SupervisorsContent supervisorInformation={loadedSupervisorInformation} questionnaire={questionnaire} />}
      </AsyncContent>
    </div>
  );
}
