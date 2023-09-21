import { CaseStatus } from 'blaise-api-node-client';
import { CaseDetails } from '../../common/interfaces/caseInterface';

const questionnaireName = 'OPN2201A';
const case1PrimaryKey = '1';
const case2PrimaryKey = '2';
const case3PrimaryKey = '3';

const case1outcome = 110;
const case2outcome = 310;
const case3outcome = 0;

export const CaseStatusListMockObject:CaseStatus[] = [{
  primaryKey: case1PrimaryKey,
  outcome: case1outcome,
}, {
  primaryKey: case2PrimaryKey,
  outcome: case2outcome,
}, {
  primaryKey: case3PrimaryKey,
  outcome: case3outcome,
}];

export const CaseDetailsListMockObject:CaseDetails[] = [
  {
    CaseId: case1PrimaryKey,
    CaseLink: `https://cati.blaise.com/${questionnaireName}?Mode=CAWI&KeyValue=${case1PrimaryKey}`,
    CaseStatus: case1outcome,
    QuestionnaireName: questionnaireName,
  },
  {
    CaseId: case2PrimaryKey,
    CaseLink: `https://cati.blaise.com/${questionnaireName}?Mode=CAWI&KeyValue=${case2PrimaryKey}`,
    CaseStatus: case2outcome,
    QuestionnaireName: questionnaireName,
  },
  {
    CaseId: case3PrimaryKey,
    CaseLink: `https://cati.blaise.com/${questionnaireName}?Mode=CAWI&KeyValue=${case3PrimaryKey}`,
    CaseStatus: case3outcome,
    QuestionnaireName: questionnaireName,
  },
];
