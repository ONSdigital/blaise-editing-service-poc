import { ReactElement, SetStateAction, useState } from 'react';
import { ONSButton, ONSPanel, ONSTextInput } from 'blaise-design-system-react-components';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';
import CaseSearchDetails from './CaseSearchDetails';
import UserRole from '../../Common/enums/UserTypes';

interface ResearchContentProps {
  questionnaire: QuestionnaireDetails;
}

export default function ResearchContent({ questionnaire }: ResearchContentProps): ReactElement {
  const [caseIdValue, setCaseIdValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleCaseIdChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setCaseIdValue(e.target?.value);
  };

  return (
    <div className="questionnaire">
      <ONSPanel status="info">
        <dl
          className="ons-metadata ons-metadata__list ons-grid ons-grid--gutterless ons-u-cf ons-u-mb-no"
          title="Questionnares"
          data-testid={`${questionnaire.questionnaireName}-supervisor-Content`}
          style={{ padding: '0 0 15px 5px' }}
        >
          <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Field period:</dt>
          <dd className="ons-description-list__value ons-grid__col ons-col-7@m">{questionnaire.fieldPeriod}</dd>
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
        onClick={async () => { setSearchValue(caseIdValue); }}
      />
      <br />
      {searchValue.length > 0 && <CaseSearchDetails questionnaireName={questionnaire.questionnaireName} caseId={searchValue} role={UserRole.FRS_Research} />}

    </div>
  );
}
