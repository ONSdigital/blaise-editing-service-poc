import { RenderResult, act, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'react-router';
import { IMock, Mock } from 'typemoq';
import { CaseFactsheetDetails } from '../../../common/interfaces/caseInterface';
import CaseBuilder from '../../builders/caseBuilder';
import CaseFactsheet from '../../../client/pages/CaseFactsheet';
import NodeApi from '../../../client/clients/NodeApi';

// declare global vars
const questionnaireName: string = 'TEST111A';
const caseId: string = '1';
let view:RenderResult;

// declare mocks
/* eslint import/no-extraneous-dependencies: 0 */
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useParams: jest.fn() }));
jest.spyOn(Router, 'useParams').mockReturnValue({ questionnaireName, caseId });

const nodeApiMock: IMock<NodeApi> = Mock.ofType(NodeApi);

describe('Given there is a case available in blaise for a questionnaire', () => {
  afterEach(() => {
    nodeApiMock.reset();
  });

  it.each([1, 3, 5, 10])('should render the factsheet page for the case correctly', async (value) => {
    // arrange
    const caseBuilder = new CaseBuilder(value);
    const expectedCaseFactsheet: CaseFactsheetDetails = caseBuilder.buildCaseFactsheet();

    nodeApiMock.setup((api) => api.getCaseFactsheet(questionnaireName, caseId)).returns(() => Promise.resolve(expectedCaseFactsheet));

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <CaseFactsheet nodeApi={nodeApiMock.object} />
        </BrowserRouter>,
      );
    });

    // assert
    const caseFactSheetView = view.getByTestId('Factsheet');
    expect(caseFactSheetView).toHaveTextContent(expectedCaseFactsheet.CaseId);
    expect(caseFactSheetView).toHaveTextContent(expectedCaseFactsheet.Address.AddressLine1);
    expect(caseFactSheetView).toHaveTextContent(expectedCaseFactsheet.Address.AddressLine2);
    expect(caseFactSheetView).toHaveTextContent(expectedCaseFactsheet.Address.AddressLine3);
    expect(caseFactSheetView).toHaveTextContent(expectedCaseFactsheet.Address.AddressLine4);
    expect(caseFactSheetView).toHaveTextContent(expectedCaseFactsheet.Address.County);
    expect(caseFactSheetView).toHaveTextContent(expectedCaseFactsheet.Address.Postcode);
    expect(caseFactSheetView).toHaveTextContent(expectedCaseFactsheet.Address.Town);
    expect(caseFactSheetView).toHaveTextContent(expectedCaseFactsheet.InterviewerName);
    expect(caseFactSheetView).toHaveTextContent(String(expectedCaseFactsheet.NumberOfRespondents));
    expect(caseFactSheetView).toHaveTextContent(String(expectedCaseFactsheet.OutcomeCode));
    expectedCaseFactsheet.Respondents.forEach((respondent) => {
      expect(caseFactSheetView).toHaveTextContent(respondent.RespondentName);
      expect(caseFactSheetView).toHaveTextContent(String(respondent.DateOfBirth));
    });
  });

  it.each([1, 3, 5, 10])('should display the factsheet correctly', async (value) => {
    // arrange
    const caseBuilder = new CaseBuilder(value);
    const expectedCaseFactsheet: CaseFactsheetDetails = caseBuilder.buildCaseFactsheet();

    nodeApiMock.setup((api) => api.getCaseFactsheet(questionnaireName, caseId)).returns(() => Promise.resolve(expectedCaseFactsheet));

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <CaseFactsheet nodeApi={nodeApiMock.object} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });
});

describe('Given there the blaise rest api is not available', () => {
  beforeEach(() => {
    nodeApiMock.setup((api) => api.getCaseFactsheet(questionnaireName, caseId)).returns(() => Promise.reject(new Error('try again in a few minutes')));
  });

  afterEach(() => {
    nodeApiMock.reset();
  });

  it('should display an error message telling the user to try again in a few minutes', async () => {
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <CaseFactsheet nodeApi={nodeApiMock.object} />
        </BrowserRouter>,
      );
    });

    // assert
    const factsheetView = view.getByTestId('Factsheet');
    expect(factsheetView).toHaveTextContent('try again in a few minutes');
  });

  it('should render the page correctly when an error occurs', async () => {
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <CaseFactsheet nodeApi={nodeApiMock.object} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });
});
