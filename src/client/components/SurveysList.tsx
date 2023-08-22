import { Survey } from '../../common/interfaces/surveyInterface';

interface SurveysListProps {
  surveys: Survey[]
}

export default function SurveysList({ surveys }: SurveysListProps) {
  return (
    <>
      {surveys.map((survey) => (
        survey.questionnaires.map((questionnaire) => (
          <div>
            <div className="ons-table__cell">{questionnaire.serverParkName}</div>
            <div className="ons-table__cell">{questionnaire.dataRecordCount}</div>
          </div>
        ))))}
      ;
    </>
  );
}
