import { Accordion } from 'blaise-design-system-react-components';
import { ExpandableContent } from 'blaise-design-system-react-components/build/src/components/Accordion';
import { ReactElement } from 'react';
import { Survey } from '../../common/interfaces/surveyInterface';
import QuestionnairesList from './QuestionnairesList';

interface SurveysListProps {
  surveys: Survey[]
}

function CreateContent(surveys:Survey[]):ExpandableContent[] {
  return surveys.map(({ name, questionnaires }) => ({ title: name, content: <QuestionnairesList questionnaires={questionnaires} /> }));
}

export default function SurveysList({ surveys }: SurveysListProps): ReactElement {
  return (
    <>
      <br />
      <Accordion ShowAllEnabled Expandables={CreateContent(surveys)} />
    </>
  );
}
