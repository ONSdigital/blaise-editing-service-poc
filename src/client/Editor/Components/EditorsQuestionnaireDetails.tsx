import { ReactElement } from 'react';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';
import { useAsyncRequestWithTwoParams } from '../../Common/hooks/useAsyncRequest';
import { getEditorInformation } from '../../api/NodeApi';
import AsyncContent from '../../Common/components/AsyncContent';
import EditorContent from './EditorContent';
import { EditorInformation } from '../../Interfaces/editorInterface';

interface EditorsQuestionnairesDetailsProps {
  questionnaire: QuestionnaireDetails;
  username: string;
}

export default function EditorsQuestionnairesDetails({ questionnaire, username }: EditorsQuestionnairesDetailsProps): ReactElement {
  const editorInformation = useAsyncRequestWithTwoParams<EditorInformation, string, string>(getEditorInformation, questionnaire.questionnaireName, username);

  return (

    <div className="questionnaire" data-testid="questionnaire">
      <AsyncContent content={editorInformation}>
        {(loadedEditorInformation) => <EditorContent editorInformation={loadedEditorInformation} questionnaire={questionnaire} />}
      </AsyncContent>
    </div>
  );
}
