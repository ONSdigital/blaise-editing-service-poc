import { CaseOutcome } from 'blaise-api-node-client';
import { CaseDetails } from '../../common/interfaces/caseInterface';

const CaseDetailsListMockObject: CaseDetails[] = [{
  CaseId: '1',
  CaseStatus: CaseOutcome.Completed,
  CaseLink: 'http://www.cati.com/1',
  QuestionnaireName: 'OPN2201A',
},
{
  CaseId: '2',
  CaseStatus: CaseOutcome.HQRefusal,
  CaseLink: 'http://www.cati.com/2',
  QuestionnaireName: 'OPN2201A',
},
{
  CaseId: '3',
  CaseStatus: CaseOutcome.DeleteRequested,
  CaseLink: 'http://www.cati.com/3',
  QuestionnaireName: 'OPN2201A',
}];

export default CaseDetailsListMockObject;
