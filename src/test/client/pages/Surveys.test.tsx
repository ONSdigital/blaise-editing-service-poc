import { render, act, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { IMock, Mock } from 'typemoq';
import surveyListMockObject from '../../mockObjects/surveyListMockObject';
import Surveys from '../../../client/pages/Surveys';
import NodeApi from '../../../client/clients/NodeApi';

const validUserRoles:string[] = ['Manager', 'Editor'];
const nodeApiMock: IMock<NodeApi> = Mock.ofType(NodeApi);
let view:RenderResult;

describe('Given there are surveys available in blaise', () => {
  beforeEach(() => {
    nodeApiMock.setup((api) => api.getSurveys()).returns(() => Promise.resolve(surveyListMockObject));
  });

  afterEach(() => {
    nodeApiMock.reset();
  });

  it.each(validUserRoles)('should render the manager page correctly when surveys are returned', async (userRole) => {
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Surveys nodeApi={nodeApiMock.object} userRole={userRole} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });

  it.each(validUserRoles)('should display a list of the expected surveys', async (userRole) => {
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Surveys nodeApi={nodeApiMock.object} userRole={userRole} />
        </BrowserRouter>,
      );
    });

    // assert
    surveyListMockObject.forEach((survey, surveyIndex) => {
      const surveyListView = view.getByTestId(`accordion-${surveyIndex}-heading`);
      expect(surveyListView).toHaveTextContent(survey.name);

      survey.questionnaires.forEach(({ name, dataRecordCount }) => {
        const questionnaireListView = view.getByTestId(`accordion-${surveyIndex}-content`);
        expect(questionnaireListView).toHaveTextContent(name);
        expect(questionnaireListView).toHaveTextContent(String(dataRecordCount));
      });
    });
  });
});

describe('Given there are no surveys available in blaise', () => {
  beforeEach(() => {
    nodeApiMock.setup((api) => api.getSurveys()).returns(() => Promise.resolve([]));
  });

  afterEach(() => {
    nodeApiMock.reset();
  });

  it.each(validUserRoles)('should render the page correctly when no surveys are returned', async (userRole) => {
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Surveys nodeApi={nodeApiMock.object} userRole={userRole} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });

  it.each(validUserRoles)('should display a message telling the user there are no surveys', async (userRole) => {
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Surveys nodeApi={nodeApiMock.object} userRole={userRole} />
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
    nodeApiMock.setup((api) => api.getSurveys()).returns(() => Promise.reject(new Error('try again in a few minutes')));
  });

  afterEach(() => {
    nodeApiMock.reset();
  });

  it.each(validUserRoles)('should display an error message telling the user to try again in a few minutes', async (userRole) => {
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Surveys nodeApi={nodeApiMock.object} userRole={userRole} />
        </BrowserRouter>,
      );
    });

    // assert
    const surveysView = view.getByTestId('Surveys');
    expect(surveysView).toHaveTextContent('try again in a few minutes');
  });

  it.each(validUserRoles)('should render the page correctly for the user when an error occurs', async (userRole) => {
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Surveys nodeApi={nodeApiMock.object} userRole={userRole} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });
});
