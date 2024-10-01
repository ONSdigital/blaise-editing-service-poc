import { CaseSummaryDetails } from '../../../common/interfaces/caseInterface';
import mapCaseSummaryText from '../../Mappers/caseSummaryTextMapper';

export interface Props {
  caseId: string
}

async function getCaseSummary(caseid: string) {
  const caseSummary: CaseSummaryDetails = {
    CaseId: caseid,
    OutcomeCode: '110',
    InterviewDate: new Date(2024, 5, 11),
    District: 'Gwent',
    InterviewerName: 'Rich',
    NumberOfRespondents: '2',
    Household: {
      Accommodation: {
        Main: '',
        Type: '',
      },
      FloorNumber: '0',
      Status: '',
      NumberOfBedrooms: '1',
      ReceiptOfHousingBenefit: '380',
      PeriodCode: '380',
      CouncilTaxBand: 'band A',
      BusinessRoom: false,
      SelfEmployed: false,
      SelfEmployedMembers: [''],
      IncomeSupport: false,
      IncomeSupportMembers: [''],
      IncomeBasedJaSupport: false,
      IncomeBasedJaSupportMembers: [''],
    },
    Respondents: [
      {
        PersonNumber: '1',
        RespondentName: 'Richmond Ricecake',
        BenefitUnit: '1',
        Sex: 'M',
        DateOfBirth: new Date('1980-01-15'),
        MaritalStatus: 'COH',
        Relationship: ['*', '1'],
      },
      {
        PersonNumber: '2',
        RespondentName: 'Betty Bettison',
        BenefitUnit: '1',
        Sex: 'F',
        DateOfBirth: new Date('1995-06-11'),
        MaritalStatus: 'COH',
        Relationship: ['1', '*'],
      },
    ],
  };

  return mapCaseSummaryText(caseSummary);
}

async function exportSummary(caseId: string) {
  const fileName = `case-summary-${caseId}.txt`;
  let fileContent = await getCaseSummary(caseId);
  const link = document.createElement('a');
  link.download = fileName;
  fileContent = fileContent.replace(/\n/g, '%0D%0A');
  link.href = `data:text/plain, ${fileContent}`;
  link.click();
}

export function DownloadCaseSummaryLink({ caseId }: Props) {
  return (
    <span
      className="link"
      id={`download-${caseId}-summary`}
      onClick={() => { exportSummary(caseId); }}
      onKeyDown={() => { exportSummary(caseId); }}
      role="presentation"
    >
      Download Summary
    </span>
  );
}
