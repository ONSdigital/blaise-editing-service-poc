import { Accordion, ONSPanel } from 'blaise-design-system-react-components';
import { ExpandableContent } from 'blaise-design-system-react-components/build/src/components/Accordion';
import { ReactElement } from 'react';
import { Survey } from '../../../common/interfaces/surveyInterface';
import SupervisorsQuestionnairesList from './SupervisorsQuestionnairesList';

interface SurveysListProps {
  surveys: Survey[]
}

function CreateContent(surveys:Survey[]):ExpandableContent[] {
  return surveys.map(({ name, questionnaires }) => ({ title: name, content: <SupervisorsQuestionnairesList questionnaires={questionnaires} /> }));
}

export default function SupervisorsSurveysList({ surveys }: SurveysListProps): ReactElement {
  if (surveys.length === 0) {
    return (
      <ONSPanel spacious status="info">There are no surveys available</ONSPanel>
    );
  }

  return (
    <>
      <br />
      <Accordion ShowAllEnabled Expandables={CreateContent(surveys)} />
    </>
  );
}
