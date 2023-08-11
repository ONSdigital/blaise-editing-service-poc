import { RenderResult, act, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'react-router';
import { getCaseFactsheet } from '../../../client/api/blaiseApi';
import { CaseFactsheetDetails } from '../../../common/interfaces/case.interface';
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
  it('should render the factsheet page for the case correctly', async () => {
    // arrange

    const caseBuilder = new CaseBuilder(1);
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
    const fred = view.getByTestId('factsheetId');
    expect(fred).toHaveTextContent(expectedCaseFactsheet.CaseId);
    expect(fred).toHaveTextContent(expectedCaseFactsheet.Address.AddressLine1);
    expect(fred).toHaveTextContent(expectedCaseFactsheet.Address.AddressLine2);
    expect(fred).toHaveTextContent(expectedCaseFactsheet.Address.AddressLine3);
    expect(fred).toHaveTextContent(expectedCaseFactsheet.Address.AddressLine4);
    expect(fred).toHaveTextContent(expectedCaseFactsheet.Address.County);
    expect(fred).toHaveTextContent(expectedCaseFactsheet.Address.Postcode);
    expect(fred).toHaveTextContent(expectedCaseFactsheet.Address.Town);
    expect(fred).toHaveTextContent(expectedCaseFactsheet.InterviewerName);
    expect(fred).toHaveTextContent(String(expectedCaseFactsheet.NumberOfRespondents));
    expect(fred).toHaveTextContent(String(expectedCaseFactsheet.OutcomeCode));
    expectedCaseFactsheet.Respondents.forEach((respondent) => {
      expect(fred).toHaveTextContent(respondent.RespondentName);
      expect(fred).toHaveTextContent(String(respondent.DateOfBirth));
    });
  });
});
