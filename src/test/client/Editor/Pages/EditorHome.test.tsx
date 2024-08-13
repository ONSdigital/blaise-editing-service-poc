import { render, act, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userMockObject from '../../../mockObjects/userMockObject';
import { getEditorCaseInformation, getSurveys } from '../../../../client/Common/api/NodeApi';
import { Survey } from '../../../../common/interfaces/surveyInterface';
import EditorHome from '../../../../client/Editor/Pages/EditorHome';
import { EditorInformation } from '../../../../common/interfaces/editorInterface';
import { EditorInformationMockObject, FilteredSurveyListMockObject } from '../../MockObjects/EditorMockObjects';

// set global vars
const userRole:string = 'Editor';
let view:RenderResult;

// set mocks
jest.mock('../../../../client/Common/api/NodeApi');
const getSurveysMock = getSurveys as jest.Mock<Promise<Survey[]>>;
const getEditorCaseInformationMock = getEditorCaseInformation as jest.Mock<Promise<EditorInformation>>;

describe('Given there are surveys available in blaise', () => {
  beforeEach(() => {
    getSurveysMock.mockImplementation(() => Promise.resolve(FilteredSurveyListMockObject));
    getEditorCaseInformationMock.mockImplementation(() => Promise.resolve(EditorInformationMockObject));
  });
  afterEach(() => {
    getSurveysMock.mockReset();
    getEditorCaseInformationMock.mockReset();
  });

  it('should render the editor page correctly when surveys are returned', async () => {
    // arrange
    const user = userMockObject;
    user.role = userRole;

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <EditorHome user={user} />
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
          <EditorHome user={user} />
        </BrowserRouter>,
      );
    });

    // assert
    FilteredSurveyListMockObject.forEach((survey, surveyIndex) => {
      const surveyListView = view.getByTestId(`survey-accordion-${surveyIndex}-heading`);
      expect(surveyListView).toHaveTextContent(survey.name);
      const questionnaireListView = view.getByTestId(`survey-accordion-${surveyIndex}-content`);
      survey.questionnaires.forEach(({ questionnaireName, fieldPeriod, numberOfCases }) => {
        expect(questionnaireListView).toHaveTextContent(questionnaireName);

        const questionnaireView = view.getByTestId(`${questionnaireName}-editorContent`);
        expect(questionnaireView).toHaveTextContent(String(fieldPeriod));
        expect(questionnaireView).toHaveTextContent(String(numberOfCases));

        const caseRows = view.getAllByLabelText('CaseID');
        const editStatusRows = view.getAllByLabelText('EditStatus');
        
        EditorInformationMockObject.Cases.forEach((caseDetails, caseIndex) => {
          expect(caseRows[caseIndex]).toHaveTextContent(caseDetails.CaseId);
          expect(editStatusRows[caseIndex]).toHaveTextContent(String(caseDetails.EditStatus));
        });
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
          <EditorHome user={user} />
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
          <EditorHome user={user} />
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
          <EditorHome user={user} />
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
          <EditorHome user={user} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });
});
