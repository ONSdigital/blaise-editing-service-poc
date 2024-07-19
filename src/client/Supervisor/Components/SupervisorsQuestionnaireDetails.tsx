import { ReactElement } from 'react';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';

interface SupervisorsQuestionnairesDetailsProps {
  questionnaire: QuestionnaireDetails;
}

export default function SupervisorsQuestionnaireDetails({ questionnaire }: SupervisorsQuestionnairesDetailsProps): ReactElement {
  return (
    <div style={{ margin: '0 0 0 25px' }}>

      <dl
        className="ons-description-list ons-description-list__items ons-grid ons-grid--gutterless ons-u-cf ons-u-mb-no"
        title="Information about this business and its survey requirements"
        aria-label="Information about this business and its survey requirements"
      >
        <dt className="ons-description-list__term ons-grid__col ons-col-3@m">Questionnaire name:</dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-9@m">{questionnaire.questionnaireName}</dd>
        <dt className="ons-description-list__term ons-grid__col ons-col-3@m">Survey month:</dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-9@m">April 2025</dd>
        <dt className="ons-description-list__term ons-grid__col ons-col-3@m">Total number of cases:</dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-9@m">100</dd>
        <dt className="ons-description-list__term ons-grid__col ons-col-3@m">Number of cases to assigned;</dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-9@m">Editor 1: 5</dd>
        <dd className="ons-description-list__value ons-grid__col ons-col-9@m">Editor 2: 10</dd>
        <dd className="ons-description-list__value ons-grid__col ons-col-9@m">Editor 3: 7</dd>
        <dt className="ons-description-list__term ons-grid__col ons-col-3@m">Number of cases completed:</dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-9@m">Editor 1: 2</dd>
        <dd className="ons-description-list__value ons-grid__col ons-col-9@m">Editor 2: 1</dd>
        <dd className="ons-description-list__value ons-grid__col ons-col-9@m">Editor 3: 6</dd>
      </dl>
    </div>
  );
}
