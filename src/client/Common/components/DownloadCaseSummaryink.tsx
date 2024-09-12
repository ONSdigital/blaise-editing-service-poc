import { CaseSummaryDetails } from '../../../common/interfaces/caseInterface';
import mapCaseSummaryText from '../../Mappers/caseSummaryTextMapper';

export interface Props {
  caseId: string
}

async function getCaseSummary(caseid: string) {
  const caseSummary: CaseSummaryDetails = {
    CaseId: caseid,
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
