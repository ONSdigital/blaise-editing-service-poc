import { RenderResult, act, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'react-router';
import { getCaseFactsheet } from '../../../client/api/blaiseApi';
import { CaseFactsheetDetails } from '../../../common/interfaces/caseInterface';
import CaseBuilder from '../../builders/caseBuilder';
import CaseFactsheet from '../../../client/pages/CaseFactsheet';

// declare global vars
const questionnaireName: string = 'TEST111A';
const caseId: string = '1';
let view:RenderResult;

// declare mocks
/* eslint import/no-extraneous-dependencies: 0 */
jest.mock('../../../client/api/blaiseApi');
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useParams: jest.fn() }));
jest.spyOn(Router, 'useParams').mockReturnValue({ questionnaireName, caseId });

const getCaseFactsheetMock = getCaseFactsheet as jest.Mock<Promise<CaseFactsheetDetails>>;

describe('Given there is a case available in blaise for a questionnaire', () => {
  it.each([1, 3, 5, 10])('should render the factsheet page for the case correctly', async (value) => {
    // arrange

    const caseBuilder = new CaseBuilder(value);
    const expectedCaseFactsheet: CaseFactsheetDetails = caseBuilder.buildCaseFactsheet();

    getCaseFactsheetMock.mockImplementation(() => Promise.resolve(expectedCaseFactsheet));

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <CaseFactsheet />
        </BrowserRouter>,
      );
    });

    // assert
    const caseFactSheetView = view.getByTestId('factsheetId');
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
});
