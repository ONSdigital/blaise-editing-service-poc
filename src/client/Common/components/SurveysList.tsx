import { Accordion, ONSPanel } from 'blaise-design-system-react-components';
import { ExpandableContent } from 'blaise-design-system-react-components/build/src/components/Accordion';
import { ReactElement } from 'react';
import { Survey } from '../../../common/interfaces/surveyInterface';
import QuestionnairesList from './QuestionnairesList';

interface SurveysListProps {
  surveys: Survey[]
  role:string
}

function CreateContent(surveys:Survey[], role:string):ExpandableContent[] {
  return surveys.map(({ name, questionnaires }) => ({
    title: name, content: <QuestionnairesList questionnaires={questionnaires} role={role} />, contentId: 'survey',
  }));
}

export default function SurveysList({ surveys, role }: SurveysListProps): ReactElement {
  if (surveys.length === 0) {
    return (
      <ONSPanel spacious status="info">There are no surveys available</ONSPanel>
    );
  }

  return (
    <>
      <br />
      <Accordion ContentId="survey" Expandables={CreateContent(surveys, role)} Expanded />
    </>
  );
}
