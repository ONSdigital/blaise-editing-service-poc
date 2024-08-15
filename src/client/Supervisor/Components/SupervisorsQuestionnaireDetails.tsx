import { ReactElement } from 'react';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';
import { useAsyncRequestWithParam } from '../../Common/hooks/useAsyncRequest';
import { getSupervisorEditorInformation } from '../../api/NodeApi';
import AsyncContent from '../../Common/components/AsyncContent';
import { SupervisorInformation } from '../../Interfaces/supervisorInterface';
import SupervisorsContent from './SupervisorsContent';

interface SupervisorsQuestionnairesDetailsProps {
  questionnaire: QuestionnaireDetails;
}

export default function SupervisorsQuestionnairesDetails({ questionnaire }: SupervisorsQuestionnairesDetailsProps): ReactElement {
  const supervisorInformation = useAsyncRequestWithParam<SupervisorInformation, string>(getSupervisorEditorInformation, questionnaire.questionnaireName);

  return (

    <div className="questionnaire" data-testid="questionnaire">
      <AsyncContent content={supervisorInformation}>
        {(loadedSupervisorInformation) => <SupervisorsContent supervisorInformation={loadedSupervisorInformation} questionnaire={questionnaire} />}
      </AsyncContent>
    </div>
  );
}
