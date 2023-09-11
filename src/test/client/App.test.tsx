import {
  RenderResult, act, render,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import surveyListMockObject from '../mockObjects/surveyListMockObject';
import { getSurveys } from '../../client/clients/NodeApi';
import { Survey } from '../../common/interfaces/surveyInterface';
import userMockObject from '../mockObjects/userMockObject';
import App from '../../client/App';
import { Authenticate } from 'blaise-login-react-client';
import MockAuthenticate from '../mockComponents/mockAuthenticate';

// set global variables
//const validUserRoles:string[] = ['Manager', 'Editor'];
let view:RenderResult;


// create mocks
jest.mock('blaise-login-react-client');
Authenticate.prototype.render = MockAuthenticate.prototype.render;

jest.mock('../../client/clients/NodeApi');
const getSurveysMock = getSurveys as jest.Mock<Promise<Survey[]>>;

describe('Renders the correct screen depending if the user has recently logged in', () => {
  beforeEach(() => {
    getSurveysMock.mockImplementation(() => Promise.resolve(surveyListMockObject));
  });

  afterEach(() => {
    getSurveysMock.mockReset();
  });

  it('Should display a message asking the user to enter their Blaise user credentials if they are not logged in', async () => {
    // arrange
    const user = userMockObject;
    // act
    await act(async () => {
      view = render(
      <BrowserRouter>
      <App/>
{/*           <MockAuthenticate title="Blaise editing service">
      {(user, loggedIn, logOutFunction) => (
        <LayoutTemplate showSignOutButton={loggedIn} signOut={() => logOutFunction()}>
          <AppContent user={user} />
        </LayoutTemplate>
      )}
    </MockAuthenticate> */}
      </BrowserRouter>);
    });

    // assert
    const appView = view.getByTestId('authenticated');
    expect(appView).toHaveTextContent(`Bonjour tout le monde ${user.name}`);
  });
/*
  it('Should render the login page correctly', async () => {
    // arrange
    //mockLoggedIn.mockImplementation(() => Promise.resolve(false));

    // act
    await act(async () => {
      view = render(<BrowserRouter><App /></BrowserRouter>);
    });

    // assert
    expect(view).toMatchSnapshot();
  });

  it.each(validUserRoles)('Should display the surveys page if the user is already logged in', async (userRole) => {
    // arrange
    const user = userMockObject;
    user.role = userRole;

    mockLoggedIn.mockImplementation(() => Promise.resolve(true));
    mockLoggedInUser.mockImplementation(() => Promise.resolve(user));

    // act
    await act(async () => {
      view = render(<BrowserRouter><App /></BrowserRouter>);
    });

    // assert
    const appView = view.getByTestId('app-content');
    expect(appView).toHaveTextContent(`Bonjour tout le monde ${user.name}`);
  });

  it.each(validUserRoles)('Should render the surveys page correctly', async (userRole) => {
    // arrange
    const user = userMockObject;
    user.role = userRole;

    mockLoggedIn.mockImplementation(() => Promise.resolve(true));
    mockLoggedInUser.mockImplementation(() => Promise.resolve(user));

    // act
    await act(async () => {
      view = render(<BrowserRouter><App /></BrowserRouter>);
    });

    // assert
    expect(view).toMatchSnapshot();
  }); */
});
