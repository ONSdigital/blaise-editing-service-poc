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
});