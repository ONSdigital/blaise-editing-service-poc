import { render, act, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { getSurveys } from '../../../client/clients/serverApi';

import { Survey } from '../../../common/interfaces/surveyInterface';
import surveyListMockObject from '../../mockObjects/surveyListMockObject';
import Surveys from '../../../client/pages/Surveys';

jest.mock('../../../client/clients/serverApi');

const getSurveysMock = getSurveys as jest.Mock<Promise<Survey[]>>;
let view:RenderResult;

describe('Given there are surveys available in blaise', () => {
  beforeEach(() => {
    getSurveysMock.mockImplementation(() => Promise.resolve(surveyListMockObject));
  });

  afterEach(() => {
    getSurveysMock.mockReset();
  });

  it('should render the manager page correctly when surveys are returned', async () => {
    // arrange
    const userRole = 'Manager';

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Surveys userRole={userRole} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });

  it('should render the editor page correctly when surveys are returned', async () => {
    // arrange
    const userRole = 'Editor';

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Surveys userRole={userRole} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });

  it('should display a list of the expected surveys for the manager', async () => {
    // arrange
    const userRole = 'Manager';

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Surveys userRole={userRole} />
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

  it('should display a list of the expected surveys for the editor', async () => {
    // arrange
    const userRole = 'Editor';

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Surveys userRole={userRole} />
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
    getSurveysMock.mockImplementation(() => Promise.resolve([]));
  });

  afterEach(() => {
    getSurveysMock.mockReset();
  });

  it('should render the page correctly when no surveys are returned for the manager', async () => {
    // arrange
    const userRole = 'Manager';

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Surveys userRole={userRole} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });

  it('should render the page correctly when no surveys are returned for the editor', async () => {
    // arrange
    const userRole = 'Editor';

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Surveys userRole={userRole} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });

  it('should display a message telling the user there are no surveys for the manager', async () => {
    // arrange
    const userRole = 'Manager';

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Surveys userRole={userRole} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view.getByText(/There are no surveys available/)).toBeInTheDocument();
  });

  it('should display a message telling the user there are no surveys for the editor', async () => {
    // arrange
    const userRole = 'Editor';

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Surveys userRole={userRole} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view.getByText(/There are no surveys available/)).toBeInTheDocument();
  });
});

describe('Given there the blaise rest api is not available', () => {
  beforeEach(() => {
    getSurveysMock.mockRejectedValue(new Error('try again in a few minutes'));
  });

  afterEach(() => {
    getSurveysMock.mockReset();
  });

  it('should display an error message telling the manager to try again in a few minutes', async () => {
    // arrange
    const userRole = 'Manager';

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Surveys userRole={userRole} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view.getByText(/try again in a few minutes/)).toBeInTheDocument();
  });

  it('should display an error message telling the editor to try again in a few minutes', async () => {
    // arrange
    const userRole = 'Editor';

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Surveys userRole={userRole} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view.getByText(/try again in a few minutes/)).toBeInTheDocument();
  });

  it('should render the page correctly for the manager when an error occurs', async () => {
    // arrange
    const userRole = 'Manager';

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Surveys userRole={userRole} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });

  it('should render the page correctly for the editor when an error occurs', async () => {
    // arrange
    const userRole = 'Editor';

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Surveys userRole={userRole} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });
});
