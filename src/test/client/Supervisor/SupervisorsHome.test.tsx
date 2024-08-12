import { render, act, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userMockObject from '../../mockObjects/userMockObject';
import { getEditorCaseInformation, getSupervisorEditorInformation, getSurveys } from '../../../client/Common/api/NodeApi';
import { Survey } from '../../../common/interfaces/surveyInterface';
import SupervisorsHome from '../../../client/Supervisor/Pages/SupervisorsHome';
import { EditorInformationMockObject, FilteredSurveyListMockObject } from '../MockObjects/EditorMockObjects';
import { SupervisorInformation } from '../../../common/interfaces/supervisorInterface';
import SupervisorInformationMockObject from '../MockObjects/SupervisorMockObjects';
import { EditorInformation } from '../../../common/interfaces/editorInterface';

// set global vars
const userRole:string = 'Supervisor';
let view:RenderResult;

// set mocks
jest.mock('../../../client/Common/api/NodeApi');
const getSurveysMock = getSurveys as jest.Mock<Promise<Survey[]>>;
const getSupervisorCaseInformationMock = getSupervisorEditorInformation as jest.Mock<Promise<SupervisorInformation>>;
const getEditorCaseInformationMock = getEditorCaseInformation as jest.Mock<Promise<EditorInformation>>;

describe('Given there are surveys available in blaise', () => {
  beforeEach(() => {
    getSurveysMock.mockImplementation(() => Promise.resolve(FilteredSurveyListMockObject));
    getSupervisorCaseInformationMock.mockImplementation(() => Promise.resolve(SupervisorInformationMockObject));
    getEditorCaseInformationMock.mockImplementation(() => Promise.resolve(EditorInformationMockObject));
  });

  afterEach(() => {
    getSurveysMock.mockReset();
    getSupervisorCaseInformationMock.mockReset();
    getEditorCaseInformationMock.mockReset();
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

  it('should display a list of the expected surveys', async () => {
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

      survey.questionnaires.forEach(({ questionnaireName }) => {
        const questionnaireListView = view.getByTestId(`survey-accordion-${surveyIndex}-content`);
        
        expect(questionnaireListView).toHaveTextContent(questionnaireName);

        //const questionnaireView = view.getByTestId(`${questionnaireName}-supervisor-Content`);
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
