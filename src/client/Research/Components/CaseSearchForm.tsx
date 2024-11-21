import { ReactElement, SetStateAction, useState } from 'react';
import { ONSButton, ONSPanel, ONSTextInput } from 'blaise-design-system-react-components';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';
import CaseSearchDetails from './CaseSearchDetails';
import UserRole from '../../Common/enums/UserTypes';

interface CaseSearchFormProps {
  questionnaire: QuestionnaireDetails;
}

export default function CaseSearchForm({ questionnaire }: CaseSearchFormProps): ReactElement {
  const [caseIdValue, setCaseIdValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleCaseIdChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setCaseIdValue(e.target?.value);
  };

  return (
    <div className="questionnaire">
      <ONSPanel status="info">
        <dl
          className="ons-metadata ons-metadata__list ons-grid ons-grid--gutterless ons-u-cf ons-u-mb-no"
          title="Questionnares"
          data-testid={`${questionnaire.questionnaireName}-Search-Content`}
          style={{ padding: '0 0 15px 5px' }}
        >
          <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Field period:</dt>
          <dd className="ons-description-list__value ons-grid__col ons-col-7@m">{questionnaire.fieldPeriod}</dd>
          <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Total number of cases:</dt>
          <dd className="ons-description-list__value ons-grid__col ons-col-7@m">{questionnaire.numberOfCases}</dd>
        </dl>
      </ONSPanel>
      <br />
      <ONSTextInput
        label="Enter case id"
        id="caseid"
        autoFocus
        onChange={handleCaseIdChange}
      />
      <ONSButton
        label="Search"
        primary
        loading={submitting}
        onClick={async () => { setSubmitting(true); setSearchValue(caseIdValue); setSubmitting(false); }}
      />
      <br />
      <br />

      {searchValue.length > 0 && <CaseSearchDetails questionnaireName={questionnaire.questionnaireName} caseId={searchValue} role={UserRole.FRS_Research} />}

    </div>
  );
}
