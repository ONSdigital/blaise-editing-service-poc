import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ONSPanel } from 'blaise-design-system-react-components';

export default function EditorsQuestionnairesList(): ReactElement {
  return (
    <>
      <dl
        className="ons-metadata ons-metadata__list ons-grid ons-grid--gutterless ons-u-cf ons-u-mb-no"
        title="Questionnares"
        data-testid="QuestionnaireList"
        style={{ padding: '0 0 15px 5px' }}
      >
        <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Cases Allocated:</dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m"><strong>3</strong></dd>
      </dl>
      <ONSPanel status="info">
        <Link className="allocate" to="/">10001012</Link>
      </ONSPanel>
      <ONSPanel status="info">
        <dt className="ons-description-list__term ons-grid__col ons-col-5@m"><Link className="case" to="/">10001012</Link></dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m"><Link className="Edit" to="/">Edit</Link></dd>
      </ONSPanel>
      <ONSPanel status="info">
        <dt className="ons-description-list__term ons-grid__col ons-col-5@m"><Link className="case" to="/">10001013</Link></dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m"><Link className="Edit" to="/">Edit</Link></dd>
      </ONSPanel>
    </>
  );
}
