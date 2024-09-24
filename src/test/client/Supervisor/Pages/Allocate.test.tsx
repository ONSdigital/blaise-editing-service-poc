import { render, act, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { getAllocationDetails } from '../../../../client/api/NodeApi';
import UserRole from '../../../../client/Common/enums/UserRole';
import { AllocationDetails } from '../../../../common/interfaces/allocationInterface';
import AllocationMockObject from '../../MockObjects/AllocationMockObjects';
import Allocate from '../../../../client/Supervisor/Pages/Allocate';

// set global vars
const supervisorRole:UserRole = UserRole.SVT_Supervisor;
const editorRole:UserRole = UserRole.SVT_Editor;
let view:RenderResult;

// set mocks
jest.mock('../../../../client/api/NodeApi');
const getAllocationDetailsMock = getAllocationDetails as jest.Mock<Promise<AllocationDetails>>;

describe('Given we wish to allocte cases from an Interviewer to an Editor', () => {
  const reallocate = false;

  beforeEach(() => {
    getAllocationDetailsMock.mockReturnValueOnce(Promise.resolve(AllocationMockObject));
  });

  afterEach(() => {
    getAllocationDetailsMock.mockReset();
  });

  it('should render the allocation page correctly', async () => {
    // arrange

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Allocate supervisorRole={supervisorRole} editorRole={editorRole} reallocate={reallocate} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });

  it('should display an have the correct page info for allocation', async () => {
    // arrange

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Allocate supervisorRole={supervisorRole} editorRole={editorRole} reallocate={reallocate} />
        </BrowserRouter>,
      );
    });

    // assert
    const panelView = view.getByTestId('allocation-page-panel');
    expect(panelView).toHaveTextContent('Allocate cases from an interviewer to an editor. All cases conducted by that interviewer will be allocated to the editor');
  });

  it('should display alist of availiable interviewer for alloction from', async () => {
    // arrange

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Allocate supervisorRole={supervisorRole} editorRole={editorRole} reallocate={reallocate} />
        </BrowserRouter>,
      );
    });

    // assert
    const interviewerListOption = view.getByTestId('select-from');
    expect(interviewerListOption.childElementCount).toEqual(AllocationMockObject.Interviewers.length+1);

    expect(interviewerListOption.children[0]).toHaveTextContent("Select an option");
    AllocationMockObject.Interviewers.forEach((interviewer, interviewerIndex) => {
      expect(interviewerListOption.children[interviewerIndex+1]).toHaveTextContent(`${interviewer.Name} (${interviewer.Cases.length} case(s))`);
    });
  });

  it('should display alist of availiable editors for alloction to', async () => {
    // arrange

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Allocate supervisorRole={supervisorRole} editorRole={editorRole} reallocate={reallocate} />
        </BrowserRouter>,
      );
    });

    // assert
    const editorListOption = view.getByTestId('select-to');
    expect(editorListOption.childElementCount).toEqual(AllocationMockObject.Editors.length+1);

    expect(editorListOption.children[0]).toHaveTextContent("Select an option");
    AllocationMockObject.Editors.forEach((Editor, editorIndex) => {
      expect(editorListOption.children[editorIndex+1]).toHaveTextContent(`${Editor.Name} (${Editor.Cases.length} case(s))`);
    });
  });
});

describe('Given we wish to reallocte cases from an Editor to another Editor', () => {
  const reallocate = true;

  beforeEach(() => {
    getAllocationDetailsMock.mockReturnValueOnce(Promise.resolve(AllocationMockObject));
  });

  afterEach(() => {
    getAllocationDetailsMock.mockReset();
  });

  it('should render the allocation page correctly', async () => {
    // arrange

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Allocate supervisorRole={supervisorRole} editorRole={editorRole} reallocate={reallocate} />
        </BrowserRouter>,
      );
    });

    // assert
    expect(view).toMatchSnapshot();
  });

  it('should display an have the correct page info for reallocation', async () => {
    // arrange

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Allocate supervisorRole={supervisorRole} editorRole={editorRole} reallocate={reallocate} />
        </BrowserRouter>,
      );
    });

    // assert
    const panelView = view.getByTestId('allocation-page-panel');
    expect(panelView).toHaveTextContent('Reallocate cases from one editor to another editor. All non-completed cases will be transfered');
  });

  it('should display alist of editors for realloction from', async () => {
    // arrange

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Allocate supervisorRole={supervisorRole} editorRole={editorRole} reallocate={reallocate} />
        </BrowserRouter>,
      );
    });

    // assert
    const editorListOption = view.getByTestId('select-from');
    expect(editorListOption.childElementCount).toEqual(AllocationMockObject.Editors.length+1);

    expect(editorListOption.children[0]).toHaveTextContent("Select an option");
    AllocationMockObject.Editors.forEach((editor, editorIndex) => {
      expect(editorListOption.children[editorIndex+1]).toHaveTextContent(`${editor.Name} (${editor.Cases.length} case(s))`);
    });
  });

  it('should display a list of availiable editors for realloction to', async () => {
    // arrange

    // act
    await act(async () => {
      view = render(
        <BrowserRouter>
          <Allocate supervisorRole={supervisorRole} editorRole={editorRole} reallocate={reallocate} />
        </BrowserRouter>,
      );
    });

    // assert
    const editorListOption = view.getByTestId('select-to');
    expect(editorListOption.childElementCount).toEqual(AllocationMockObject.Editors.length+1);

    expect(editorListOption.children[0]).toHaveTextContent("Select an option");
    AllocationMockObject.Editors.forEach((Editor, editorIndex) => {
      expect(editorListOption.children[editorIndex+1]).toHaveTextContent(`${Editor.Name} (${Editor.Cases.length} case(s))`);
    });
  });
});
