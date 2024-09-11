import { RenderResult, act, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'react-router';
import { CaseSummaryDetails } from '../../../../common/interfaces/caseInterface';
import CaseSummary from '../../../../client/Editor/Pages/CaseSummary';
import { getCaseSummary } from '../../../../client/api/NodeApi';
import { caseSummaryDetailsMockObject } from '../../../server/mockObjects/CaseMockObject';

// declare global vars
const questionnaireName: string = 'TEST111A';
const caseId: string = '1';
let view:RenderResult;

// declare mocks
/* eslint import/no-extraneous-dependencies: 0 */
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useParams: jest.fn() }));
jest.spyOn(Router, 'useParams').mockReturnValue({ questionnaireName, caseId });
jest.mock('../../../../client/api/NodeApi');
const getCaseSummaryDetailsMock = getCaseSummary as jest.Mock<Promise<CaseSummaryDetails>>;

describe('Given there is a case available in blaise for a questionnaire', () => {
  afterEach(() => {
    getCaseSummaryDetailsMock.mockReset();
  });

  it('should render the summary page for the case correctly', async () => {
    // arrange
    const expectedCaseSummaryDetails: CaseSummaryDetails = caseSummaryDetailsMockObject;

    getCaseSummaryDetailsMock.mockImplementation(() => Promise.resolve(expectedCaseSummaryDetails));

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <CaseSummary />
        </BrowserRouter>,
      );
    });

    // assert
    const caseSummaryView = view.getByTestId('Summary');
    expect(caseSummaryView).toHaveTextContent(expectedCaseSummaryDetails.CaseId);
    expect(caseSummaryView).toHaveTextContent(expectedCaseSummaryDetails.Address.AddressLine1);
    expect(caseSummaryView).toHaveTextContent(expectedCaseSummaryDetails.Address.AddressLine2);
    expect(caseSummaryView).toHaveTextContent(expectedCaseSummaryDetails.Address.AddressLine3);
    expect(caseSummaryView).toHaveTextContent(expectedCaseSummaryDetails.Address.AddressLine4);
    expect(caseSummaryView).toHaveTextContent(expectedCaseSummaryDetails.Address.County);
    expect(caseSummaryView).toHaveTextContent(expectedCaseSummaryDetails.Address.Postcode);
    expect(caseSummaryView).toHaveTextContent(expectedCaseSummaryDetails.Address.Town);
    expect(caseSummaryView).toHaveTextContent(expectedCaseSummaryDetails.InterviewerName);
    expect(caseSummaryView).toHaveTextContent(String(expectedCaseSummaryDetails.NumberOfRespondents));
    expect(caseSummaryView).toHaveTextContent(String(expectedCaseSummaryDetails.OutcomeCode));
    expectedCaseSummaryDetails.Respondents.forEach((respondent) => {
      expect(caseSummaryView).toHaveTextContent(respondent.RespondentName);
      expect(caseSummaryView).toHaveTextContent(respondent.DateOfBirth.toDateString());
    });
  });

  it('should display the summary correctly', async () => {
    // arrange
    const expectedCaseSummaryDetails: CaseSummaryDetails = caseSummaryDetailsMockObject;

    getCaseSummaryDetailsMock.mockImplementation(() => Promise.resolve(expectedCaseSummaryDetails));

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <CaseSummary />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });
});

/* describe('Given there the blaise rest api is not available', () => {
  beforeEach(() => {
    getCaseSummaryDetailsMock.mockRejectedValue(new Error('try again in a few minutes'));
  });

  afterEach(() => {
    getCaseSummaryDetailsMock.mockReset();
  });

  it('should display an error message telling the user to try again in a few minutes', async () => {
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <CaseSummary />
        </BrowserRouter>,
      );
    });

    // assert
    const summaryView = view.getByTestId('Summary');
    expect(summaryView).toHaveTextContent('try again in a few minutes');
  });

  it('should render the page correctly when an error occurs', async () => {
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <CaseSummary />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });
});
 */