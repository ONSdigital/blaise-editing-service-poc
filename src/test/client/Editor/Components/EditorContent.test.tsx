import { act, render, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EditorContent from '../../../../client/Editor/Components/EditorContent';
import { questionnaireDetails2MockObject } from '../../../mockObjects/questionnaireListMockObject';
import { EditorInformationMockObject } from '../../MockObjects/EditorMockObjects';

const editorInformation = EditorInformationMockObject;
const QuestionnaireDetails = questionnaireDetails2MockObject;
let view:RenderResult;

describe('Given there is a survey and cases avalible for an editor', () => {
  it('should display the editor page correctly', async () => {
    // arrange
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <EditorContent editorInformation={editorInformation} questionnaire={QuestionnaireDetails} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });

  it('should render the editor page correctly', async () => {
    // arrange
    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <EditorContent editorInformation={editorInformation} questionnaire={QuestionnaireDetails} />
        </BrowserRouter>,
      );
    });

    // assert

    const expectedView = view.getByTestId(`${questionnaireDetails2MockObject.questionnaireName}-editorContent`);
    expect(expectedView).toHaveTextContent(questionnaireDetails2MockObject.fieldPeriod ?? 'Not Found');
    expect(expectedView).toHaveTextContent(EditorInformationMockObject.numberOfCasesAllocated.toString());
    EditorInformationMockObject.Cases.forEach((caseDetails) => {
      expect(expectedView).toHaveTextContent(caseDetails.CaseId);
      expect(expectedView).toHaveTextContent(caseDetails.EditStatus.toString());
    });
  });
});
