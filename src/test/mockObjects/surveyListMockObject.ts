import { Survey } from '../../common/interfaces/surveyInterface';
import {
  questionnaireDetails1MockObject, questionnaireDetails2MockObject, questionnaireDetails3MockObject, questionnaireDetails4MockObject,
} from './questionnaireListMockObject';

const surveyListMockObject: Survey[] = [{
  name: 'LMS',
  questionnaires: [
    questionnaireDetails1MockObject,
    questionnaireDetails2MockObject,
    questionnaireDetails3MockObject,
  ],
},
{
  name: 'OPN',
  questionnaires: [
    questionnaireDetails4MockObject,
  ],
}];

export default surveyListMockObject;
