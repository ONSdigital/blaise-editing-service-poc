import { render, act, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userMockObject from '../../../mockObjects/userMockObject';
import { getSupervisorEditorInformation, getSurveys } from '../../../../client/Common/api/NodeApi';
import { Survey } from '../../../../common/interfaces/surveyInterface';
import SupervisorsHome from '../../../../client/Supervisor/Pages/SupervisorsHome';
import { SupervisorInformation } from '../../../../common/interfaces/supervisorInterface';
import UserRole from '../../../../client/Common/enums/UserRole';
import FilteredSurveyListMockObject from '../../MockObjects/SurveyMockObjects';
import { SupervisorInformationMockObject1, SupervisorInformationMockObject2 } from '../../MockObjects/SupervisorMockObjects';

// set global vars
const userRole:string = UserRole.SVT_Supervisor;
let view:RenderResult;

// set mocks
jest.mock('../../../../client/Common/api/NodeApi');
const getSurveysMock = getSurveys as jest.Mock<Promise<Survey[]>>;
const getSupervisorCaseInformationMock = getSupervisorEditorInformation as jest.Mock<Promise<SupervisorInformation>>;

describe('Given there are surveys available in blaise', () => {
  beforeEach(() => {
    getSurveysMock.mockImplementation(() => Promise.resolve(FilteredSurveyListMockObject));
    getSupervisorCaseInformationMock.mockReturnValueOnce(Promise.resolve(SupervisorInformationMockObject1))
      .mockReturnValueOnce(Promise.resolve(SupervisorInformationMockObject2));
  });

  afterEach(() => {
    getSurveysMock.mockReset();
    getSupervisorCaseInformationMock.mockReset();
  });

  it('should render the supervisor page correctly when surveys are returned', async () => {
    // arrange
    const user = userMockObject;
    user.role = userRole;

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <SupervisorsHome user={user} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });

  it('should display the expected survey details', async () => {
    // arrange
    const user = userMockObject;
    user.role = userRole;

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <SupervisorsHome user={user} />
        </BrowserRouter>,
      );
    });

    // assert
    FilteredSurveyListMockObject.forEach((survey, surveyIndex) => {
      const surveyListView = view.getByTestId(`survey-accordion-${surveyIndex}-heading`);
      expect(surveyListView).toHaveTextContent(survey.name);

      const questionnaireListView = view.getByTestId(`survey-accordion-${surveyIndex}-content`);
      survey.questionnaires.forEach(({ questionnaireName }, QuestionnaireIndex) => {
        expect(questionnaireListView).toHaveTextContent(questionnaireName);

        if (QuestionnaireIndex === 0) {
          const questionnaireView = view.getByTestId(`${questionnaireName}-supervisor-Content`);
          expect(questionnaireView).toHaveTextContent(String(SupervisorInformationMockObject1.TotalNumberOfCases));
          expect(questionnaireView).toHaveTextContent(String(SupervisorInformationMockObject1.NumberOfCasesNotAllocated));
          expect(questionnaireView).toHaveTextContent(String(SupervisorInformationMockObject1.NumberOfCasesAllocated));
          expect(questionnaireView).toHaveTextContent(String(SupervisorInformationMockObject1.NumberOfCasesCompleted));

          const editorRows = view.getAllByLabelText(`${questionnaireName}-Editor`);
          const numberOfCasesAllocatedRows = view.getAllByLabelText(`${questionnaireName}-NumberOfCasesAllocated`);
          const numberOfCasesCompleted = view.getAllByLabelText(`${questionnaireName}-NumberOfCasesCompleted`);
          const numberOfCasesQueried = view.getAllByLabelText(`${questionnaireName}-NumberOfCasesQueried`);

          SupervisorInformationMockObject1.Editors.forEach((editor, index) => {
            expect(editorRows[index]).toHaveTextContent(editor.EditorName);
            expect(numberOfCasesAllocatedRows[index]).toHaveTextContent(String(editor.NumberOfCasesAllocated));
            expect(numberOfCasesCompleted[index]).toHaveTextContent(String(editor.NumberOfCasesCompleted));
            expect(numberOfCasesQueried[index]).toHaveTextContent(String(editor.NumberOfCasesQueried));
          });
        }

        if (QuestionnaireIndex === 1) {
          const questionnaireView = view.getByTestId(`${questionnaireName}-supervisor-Content`);
          expect(questionnaireView).toHaveTextContent(String(SupervisorInformationMockObject2.TotalNumberOfCases));
          expect(questionnaireView).toHaveTextContent(String(SupervisorInformationMockObject2.NumberOfCasesNotAllocated));
          expect(questionnaireView).toHaveTextContent(String(SupervisorInformationMockObject2.NumberOfCasesAllocated));
          expect(questionnaireView).toHaveTextContent(String(SupervisorInformationMockObject2.NumberOfCasesCompleted));

          const editorRows = view.getAllByLabelText(`${questionnaireName}-Editor`);
          const numberOfCasesAllocatedRows = view.getAllByLabelText(`${questionnaireName}-NumberOfCasesAllocated`);
          const numberOfCasesCompleted = view.getAllByLabelText(`${questionnaireName}-NumberOfCasesCompleted`);
          const numberOfCasesQueried = view.getAllByLabelText(`${questionnaireName}-NumberOfCasesQueried`);

          SupervisorInformationMockObject2.Editors.forEach((editor, index) => {
            expect(editorRows[index]).toHaveTextContent(editor.EditorName);
            expect(numberOfCasesAllocatedRows[index]).toHaveTextContent(String(editor.NumberOfCasesAllocated));
            expect(numberOfCasesCompleted[index]).toHaveTextContent(String(editor.NumberOfCasesCompleted));
            expect(numberOfCasesQueried[index]).toHaveTextContent(String(editor.NumberOfCasesQueried));
          });
        }
      });
    });
  });
});

describe('Given there are no surveys available in blaise', () => {
  beforeEach(() => {
    getSurveysMock.mockImplementation(() => Promise.resolve([]));
  });

  afterEach(() => {
    getSurveysMock.mockReset();
  });

  it('should render the page correctly when no surveys are returned', async () => {
    // arrange
    const user = userMockObject;
    user.role = userRole;

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <SupervisorsHome user={user} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });

  it('should display a message telling the user there are no surveys', async () => {
    // arrange
    const user = userMockObject;
    user.role = userRole;

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <SupervisorsHome user={user} />
        </BrowserRouter>,
      );
    });

    // assert
    const surveysView = view.getByTestId('Surveys');
    expect(surveysView).toHaveTextContent('There are no surveys available');
  });
});

describe('Given there the blaise rest api is not available', () => {
  beforeEach(() => {
    getSurveysMock.mockRejectedValue(new Error('try again in a few minutes'));
  });

  afterEach(() => {
    getSurveysMock.mockReset();
  });

  it('should display an error message telling the user to try again in a few minutes', async () => {
    // arrange
    const user = userMockObject;
    user.role = userRole;

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <SupervisorsHome user={user} />
        </BrowserRouter>,
      );
    });

    // assert
    const surveysView = view.getByTestId('Surveys');
    expect(surveysView).toHaveTextContent('try again in a few minutes');
  });

  it('should render the page correctly for the user when an error occurs', async () => {
    // arrange
    const user = userMockObject;
    user.role = userRole;

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <SupervisorsHome user={user} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });
});
