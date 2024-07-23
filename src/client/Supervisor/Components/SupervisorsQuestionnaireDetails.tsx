import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';

interface SupervisorsQuestionnairesDetailsProps {
  questionnaire: QuestionnaireDetails;
}

export default function SupervisorsQuestionnaireDetails({ questionnaire }: SupervisorsQuestionnairesDetailsProps): ReactElement {
  return (
    <div style={{
      margin: '0 0 0 2px', padding: '10px', backgroundColor: '#e7f3ec', border: '1px dotted',
    }}
    >
      <dl
        className="ons-description-list ons-description-list__items ons-grid ons-grid--gutterless ons-u-cf ons-u-mb-no"
        title="Information about this business and its survey requirements"
        aria-label="Information about this business and its survey requirements"
      >
        <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Field period:</dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m"><strong>{questionnaire.fieldPeriod}</strong></dd>
        <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Number of cases:</dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m"><strong>1000</strong></dd>
        <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Number of cases allocated:</dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m">
          <strong>30</strong>
          {' '}
          <Link to="/">Allocate</Link>
        </dd>

        <dt className="ons-description-list__term ons-grid__col ons-col-5@m"><Link to="/">Doctor Doom:</Link></dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m">
          <strong>10</strong>
          {' '}
          case(s) allocated
        </dd>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m">
          <strong>5</strong>
          {' '}
          case(s) not started
        </dd>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m">
          <strong>2</strong>
          {' '}
          case(s) in progress
        </dd>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m">
          <strong>2</strong>
          {' '}
          case(s) completed
        </dd>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m">
          <strong>1</strong>
          {' '}
          case(s) with queries
        </dd>

        <dt className="ons-description-list__term ons-grid__col ons-col-5@m"><Link to="/">Captain Fantastic:</Link></dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m">
          <strong>5</strong>
          {' '}
          case(s) allocated
        </dd>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m">
          <strong>4</strong>
          {' '}
          case(s) not started
        </dd>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m">
          <strong>1</strong>
          {' '}
          case(s) in progress
        </dd>
        <dt className="ons-description-list__term ons-grid__col ons-col-5@m"><Link to="/">The Thing:</Link></dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m">
          <strong>0</strong>
          {' '}
          case(s) allocated
        </dd>
      </dl>
    </div>
  );
}
