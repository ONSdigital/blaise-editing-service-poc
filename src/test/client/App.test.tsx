import {
  RenderResult, act, render,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { IMock, Mock } from 'typemoq';
import App from '../../client/App';
import LoginManager from '../../client/clients/LoginManager';
import { getSurveys } from '../../client/clients/serverApi'
import { Survey } from '../../common/interfaces/surveyInterface';
import surveyListMockObject from '../mockObjects/surveyListMockObject';

// create mocks
jest.mock('../../client/clients/serverApi');
const getSurveysMock = getSurveys as jest.Mock<Promise<Survey[]>>;
const loginManagerMock: IMock<LoginManager> = Mock.ofType(LoginManager);

//set global variables
const validUserRoles:string[] = ['Manager', 'Editor'];
let view:RenderResult;

describe('Renders the correct screen depending if the user has recently logged in', () => {
  beforeEach(() => {
    getSurveysMock.mockImplementation(() => Promise.resolve(surveyListMockObject));
  });

  afterEach(() => {
    loginManagerMock.reset();
    getSurveysMock.mockReset();
  });

  it('Should display a message asking the user to enter their Blaise user credentials if they are not logged in', async () => {
    // arrange
    loginManagerMock.setup((lm) => lm.loggedIn()).returns(() => Promise.resolve(false));

    // act
    await act(async () => {
      view = render(<BrowserRouter><App loginManager={loginManagerMock.object} /></BrowserRouter>);
    });

    // assert
    const appView = view.getByTestId('app-content');
    expect(appView).toHaveTextContent('Enter your Blaise username and password');
  });

  it('Should render the login page correctly', async () => {
    // arrange
    loginManagerMock.setup((lm) => lm.loggedIn()).returns(() => Promise.resolve(false));

    // act
    await act(async () => {
      view = render(<BrowserRouter><App loginManager={loginManagerMock.object} /></BrowserRouter>);
    });

    // assert
    expect(view).toMatchSnapshot();
  });

  it.each(validUserRoles)('Should display the surveys page if the user is already logged in', async (userRole) => {
    // arrange
    loginManagerMock.setup((lm) => lm.loggedIn()).returns(() => Promise.resolve(true));
    loginManagerMock.setup((lm) => lm.getRoleOfLoggedInUser()).returns(() => Promise.resolve(userRole));

    // act
    await act(async () => {
      view = render(<BrowserRouter><App loginManager={loginManagerMock.object} /></BrowserRouter>);
    });

    // assert
    const appView = view.getByTestId('app-content');
    expect(appView).toHaveTextContent(`Bonjour tout le monde ${userRole}`);
  });

  it.each(validUserRoles)('Should render the surveys page correctly', async (userRole) => {
    // arrange
    loginManagerMock.setup((lm) => lm.loggedIn()).returns(() => Promise.resolve(true));
    loginManagerMock.setup((lm) => lm.getRoleOfLoggedInUser()).returns(() => Promise.resolve(userRole));

    // act
    await act(async () => {
      view = render(<BrowserRouter><App loginManager={loginManagerMock.object} /></BrowserRouter>);
    });

    // assert
    expect(view).toMatchSnapshot();
  });
});
