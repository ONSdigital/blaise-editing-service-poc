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
    InterviewDate: new Date(2024, 5, 11),
    District: 'Gwent',
    InterviewerName: 'Rich',
    NumberOfRespondents: 2,
    Household: {
      Type: '',
      FloorNumber: 0,
      Status: '',
      NumberOfBedrooms: 1,
      ReceiptOfHousingBenefit: 380,
      PeriodCode: 380,
      CouncilTaxBand: 'band A',
      BusinessRoom: false,
      SelfEmployed: false,
      SelfEmployedMembers: '',
      IncomeSupport: false,
      IncomeSupportMembers: '',
      IncomeBasesJaSupport: false,
      IncomeBasesJaSupportMembers: '',
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
