import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ONSPanel } from 'blaise-design-system-react-components';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';

interface SupervisorsQuestionnairesDetailsProps {
  questionnaire: QuestionnaireDetails;
}

export default function SupervisorsQuestionnaireDetails({ questionnaire }: SupervisorsQuestionnairesDetailsProps): ReactElement {
  return (
    <ONSPanel status="info">
      <dl
        className="ons-description-list ons-description-list__items ons-grid ons-grid--gutterless ons-u-cf ons-u-mb-no"
        title="Information about this business and its survey requirements"
        aria-label="Information about this business and its survey requirements"
      >
        <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Field period:</dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m"><strong>{questionnaire.fieldPeriod}</strong></dd>
        <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Total number of cases:</dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m"><strong>1000</strong></dd>
        <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Number of cases allocated:</dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m"><strong>30</strong></dd>
        <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Number of cases not allocated:</dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m">
          <strong>970</strong>
          {' '}
          <Link className="allocate" to="/allocate">(Allocate)</Link>
        </dd>

        <dt className="ons-description-list__term ons-grid__col ons-col-5@m" style={{ margin: '50px 0 0 0' }}>
          <Link className="allocate" to="/">Doctor Doom:</Link>
        </dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m" style={{ margin: '50px 0 0 0' }}>
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

        <dt className="ons-description-list__term ons-grid__col ons-col-5@m"><Link className="allocate" to="/">Captain Fantastic:</Link></dt>
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
        <dt className="ons-description-list__term ons-grid__col ons-col-5@m" style={{ margin: '0 0 30px 0' }}><Link className="allocate" to="/">The Thing:</Link></dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m" style={{ margin: '0 0 30px 0' }}>
          <strong>0</strong>
          {' '}
          case(s) allocated
        </dd>
      </dl>
    </ONSPanel>
  );
}
