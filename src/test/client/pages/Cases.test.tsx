import { RenderResult, act, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'react-router';
import { IMock, Mock } from 'typemoq';
import Cases from '../../../client/pages/Cases';
import CaseDetailsBuilder from '../../builders/caseDetailsBuilder';
import NodeApi from '../../../client/clients/NodeApi';

// declare global vars
const questionnaireName: string = 'TEST111A';
let view:RenderResult;

// declare mocks
/* eslint import/no-extraneous-dependencies: 0 */
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useParams: jest.fn() }));
jest.spyOn(Router, 'useParams').mockReturnValue({ questionnaireName });

const nodeApiMock: IMock<NodeApi> = Mock.ofType(NodeApi);

describe('Given there are cases available in blaise for questionnaire', () => {
  afterEach(() => {
    nodeApiMock.reset();
  });

  it.each([1, 2, 3, 4])('should render the page correctly when x cases are returned', async (value) => {
    // arrange
    const caseDetailsBuider = new CaseDetailsBuilder(value);
    const caseDetailsListMockObject = caseDetailsBuider.BuildCaseDetails();

    nodeApiMock.setup((api) => api.getCases(questionnaireName)).returns(() => Promise.resolve(caseDetailsListMockObject));

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Cases nodeApi={nodeApiMock.object} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });

  it.each([1, 2, 3, 4])('should display a list of the expected questionnaires of x cases', async (value) => {
    // arrange
    const caseDetailsBuider = new CaseDetailsBuilder(value);
    const caseDetailsListMockObject = caseDetailsBuider.BuildCaseDetails();
    nodeApiMock.setup((api) => api.getCases(questionnaireName)).returns(() => Promise.resolve(caseDetailsListMockObject));

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Cases nodeApi={nodeApiMock.object} />
        </BrowserRouter>,
      );
    });

    // assert

    caseDetailsListMockObject.forEach((caseDetail, caseIndex) => {
      const caseListView = view.getByTestId(`case-table-row${caseIndex}`);
      expect(caseListView).toHaveTextContent(caseDetail.CaseId);
      expect(caseListView).toHaveTextContent(String(caseDetail.CaseStatus));
      expect(view.getByRole('link', { name: caseDetail.CaseId })).toHaveAttribute('href', caseDetail.CaseLink);
    });
  });
});

describe('Given there are no cases available in blaise for questionnaire', () => {
  beforeEach(() => {
    nodeApiMock.setup((api) => api.getCases(questionnaireName)).returns(() => Promise.resolve([]));
  });

  afterEach(() => {
    nodeApiMock.reset();
  });

  it('should render the page correctly when no cases are returned', async () => {
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Cases nodeApi={nodeApiMock.object} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });

  it('should display a message "There are no cases available"', async () => {
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Cases nodeApi={nodeApiMock.object} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view.getByText(/There are no cases available/)).toBeInTheDocument();
  });
});

describe('Given there the blaise rest api is not available', () => {
  beforeEach(() => {
    nodeApiMock.setup((api) => api.getCases(questionnaireName)).returns(() => Promise.reject(new Error('try again in a few minutes')));
  });

  afterEach(() => {
    nodeApiMock.reset();
  });

  it('should display an error message telling the user to try again in a few minutes', async () => {
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Cases nodeApi={nodeApiMock.object} />
        </BrowserRouter>,
      );
    });

    // assert
    const casesView = view.getByTestId('Cases');
    expect(casesView).toHaveTextContent('try again in a few minutes');
  });

  it('should render the page correctly when an error occurs', async () => {
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Cases nodeApi={nodeApiMock.object} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });
});
