import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
// import { getCaseSummary } from '../../api/NodeApi';
// import { useAsyncRequestWithTwoParams } from '../../Common/hooks/useAsyncRequest';
// import AsyncContent from '../../Common/components/AsyncContent';
// import { CaseSummaryDetails } from '../../../common/interfaces/caseInterface';
import CaseSummaryContent from '../Components/CaseSummaryContent';
import { CaseSummaryDetails } from '../../../common/interfaces/caseInterface';

function DisplayCaseSummary(questionnaireName: string, caseId: string) {
  // const caseSummary = useAsyncRequestWithTwoParams<CaseSummaryDetails, string, string>(getCaseSummary, questionnaireName, caseId);
  console.log(questionnaireName, caseId);
  const caseSummaryDetailsMockObject: CaseSummaryDetails = {
    CaseId: '90001',
    OutcomeCode: 110,
    InterviewerName: 'Rich',
    NumberOfRespondents: 2,
    Address: {
      AddressLine1: 'Flat 1',
      AddressLine2: 'Richmond House',
      AddressLine3: 'Rice Road',
      AddressLine4: 'Duffrin',
      County: 'Gwent',
      Town: 'Newport',
      Postcode: 'NZ11 4PD',
    },
    Respondents: [
      {
        RespondentName: 'Richmond Ricecake',
        DateOfBirth: new Date(1980, 1, 15),
      },
      {
        RespondentName: 'Bartholomew Edgar',
        DateOfBirth: new Date(1995, 5, 11),
      },
    ],
  };

  return (
    <div data-testid="Summary">
      {/*       <AsyncContent content={caseSummary}>
        {(caseSummaryContent) => <CaseSummaryContent caseSummary={caseSummaryContent} />}
      </AsyncContent> */}

      <CaseSummaryContent caseSummary={caseSummaryDetailsMockObject} />
    </div>
  );
}

export type CaseSummaryParams = {
  questionnaireName: string
  caseId: string
};

export default function CaseSummary(): ReactElement {
  const { questionnaireName, caseId } = useParams<keyof CaseSummaryParams>() as CaseSummaryParams;

  return DisplayCaseSummary(questionnaireName, caseId);
}
