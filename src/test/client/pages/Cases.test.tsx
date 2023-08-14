import { RenderResult, act, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'react-router';
import CaseDetailsListMockObject from '../../mockObjects/caseMocks';
import { getCases } from '../../../client/api/blaiseApi';
import { CaseDetails } from '../../../common/interfaces/case';
import Cases from '../../../client/pages/Cases';

// declare global vars
const questionnaireName: string = 'TEST111A';
const getCasesMock = getCases as jest.Mock<Promise<CaseDetails[]>>;
let view:RenderResult;

// declare mocks
/* eslint import/no-extraneous-dependencies: 0 */
jest.mock('../../../client/api/blaiseApi');
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useParams: jest.fn() }));
jest.spyOn(Router, 'useParams').mockReturnValue({ questionnaireName });

describe('Given there are cases available in blaise for questionnaire', () => {
  beforeEach(() => {
    getCasesMock.mockImplementation(() => Promise.resolve(CaseDetailsListMockObject));
  });

  afterEach(() => {
    getCasesMock.mockReset();
  });

  it('should render the page correctly when cases are returned', async () => {
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Cases />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });

  it('should display a list of the expected questionnaires', async () => {
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Cases />
        </BrowserRouter>,
      );
    });

    // assert
    CaseDetailsListMockObject.forEach((caseDetail) => {
      expect(view.getByText(caseDetail.CaseId)).toBeInTheDocument();
      expect(view.getByText(caseDetail.CaseStatus)).toBeInTheDocument();
      expect(view.getByRole('link', { name: caseDetail.CaseId })).toHaveAttribute('href', caseDetail.CaseLink);
    });
  });
});

describe('Given there are no cases available in blaise for questionnaire', () => {
  beforeEach(() => {
    getCasesMock.mockImplementation(() => Promise.resolve([]));
  });

  afterEach(() => {
    getCasesMock.mockReset();
  });

  it('should render the page correctly when no cases are returned', async () => {
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Cases />
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
          <Cases />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view.getByText(/There are no cases available/)).toBeInTheDocument();
  });
});

describe('Given there the blaise rest api is not available', () => {
  beforeEach(() => {
    getCasesMock.mockRejectedValue(new Error('try again in a few minutes'));
  });

  afterEach(() => {
    getCasesMock.mockReset();
  });

  it('should display an error message telling the user to try again in a few minutes', async () => {
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Cases />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view.getByText(/try again in a few minutes/)).toBeInTheDocument();
  });

  it('should render the page correctly when an error occurs', async () => {
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Cases />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });
});
