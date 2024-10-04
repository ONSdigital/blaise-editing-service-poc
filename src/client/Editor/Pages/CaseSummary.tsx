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
    CaseId: '9001',
    OutcomeCode: '110',
    InterviewDate: new Date('2024-05-11'),
    District: 'Gwent',
    InterviewerName: 'Rich',
    NumberOfRespondents: '6',
    Household: {
      Accommodation: {
        Main: 'House/Bungalow',
        Type: 'Detached',
      },
      FloorNumber: '2',
      Status: 'Conventional',
      NumberOfBedrooms: '2',
      ReceiptOfHousingBenefit: '380',
      PeriodCode: '380',
      CouncilTaxBand: 'Band A',
      BusinessRoom: true,
      SelfEmployed: true,
      SelfEmployedMembers: ['1'],
      IncomeSupport: true,
      IncomeSupportMembers: ['1'],
      IncomeBasedJaSupport: true,
      IncomeBasedJaSupportMembers: ['2'],
    },
    Respondents: [
      {
        PersonNumber: '1',
        RespondentName: 'Richmond Ricecake',
        BenefitUnit: '1',
        Sex: 'M',
        DateOfBirth: new Date('1980-01-15'),
        MaritalStatus: 'COH',
        Relationship: ['*', '15', '12', '4', '6', '1'],
      },
      {
        PersonNumber: '2',
        RespondentName: 'Betty Bettison',
        BenefitUnit: '1',
        Sex: 'F',
        DateOfBirth: new Date('1995-06-11'),
        MaritalStatus: 'COH',
        Relationship: ['4', '*', '20', '3', '3', '17'],
      },
      {
        PersonNumber: '3',
        RespondentName: 'Bobby Bobbington',
        BenefitUnit: '2',
        Sex: 'M',
        DateOfBirth: new Date('1980-01-15'),
        MaritalStatus: 'COH',
        Relationship: ['10', '2', '*', '8', '8', '1'],
      },
      {
        PersonNumber: '4',
        RespondentName: 'Caroline Carrot',
        BenefitUnit: '2',
        Sex: 'F',
        DateOfBirth: new Date('1995-06-11'),
        MaritalStatus: 'COH',
        Relationship: ['1', '1', '12', '*', '14', '7'],
      },
      {
        PersonNumber: '5',
        RespondentName: 'Frank Frankleton',
        BenefitUnit: '3',
        Sex: 'M',
        DateOfBirth: new Date('1980-01-15'),
        MaritalStatus: 'COH',
        Relationship: ['16', '14', '3', '4', '*', '8'],
      },
      {
        PersonNumber: '6',
        RespondentName: 'Maggie Magpie',
        BenefitUnit: '3',
        Sex: 'F',
        DateOfBirth: new Date('1995-06-11'),
        MaritalStatus: 'COH',
        Relationship: ['15', '20', '3', '5', '9', '*'],
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
