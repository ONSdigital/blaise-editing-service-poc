import { ReactElement } from 'react';
import { QuestionnaireDetails } from '../../common/interfaces/surveyInterface';
import CasesList from './CasesList';

interface EditorsQuestionnairesListProps {
  questionnaires: QuestionnaireDetails[];
}

export default function EditorsQuestionnairesList({ questionnaires }: EditorsQuestionnairesListProps): ReactElement {
  return (
    <>
      {questionnaires.map((questionnaire) => (
        <CasesList questionnaireName={questionnaire.questionnaireName} cases={questionnaire.allocationDetails.casesAllocated} />
      ))}

    </>
  /*     <dl
      className="ons-metadata ons-metadata__list ons-grid ons-grid--gutterless ons-u-cf ons-u-mb-no"
      title="Questionnares"
      data-testid="QuestionnaireList"
      style={{ padding: '0 0 15px 5px' }}
    >
      <dt className="ons-metadata__term ons-grid__col ons-col-4@m">Questionnaire</dt>
      <dd className="ons-metadata__value ons-grid__col ons-col-8@m" style={{ fontWeight: 'bold' }}>Cases allocated to me</dd>

      {questionnaires.map((questionnaire) => (
        <div>{questionnaire.questionnaireName}</div>

        // <CasesList questionnaireName={questionnaire.questionnaireName} cases={questionnaire.allocationDetails.casesAllocated} />
      ))}
    </dl> */

  );
}
