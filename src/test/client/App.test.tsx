import {
  RenderResult, act, render,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { IMock, Mock } from 'typemoq';
import App from '../../client/App';
import LoginManager from '../../client/clients/LoginManager';
import surveyListMockObject from '../mockObjects/surveyListMockObject';
import NodeApi from '../../client/clients/NodeApi';

// create mocks
const loginManagerMock: IMock<LoginManager> = Mock.ofType(LoginManager);
const nodeApiMock: IMock<NodeApi> = Mock.ofType(NodeApi);

// set global variables
const validUserRoles:string[] = ['Manager', 'Editor'];
let view:RenderResult;

describe('Renders the correct screen depending if the user has recently logged in', () => {
  beforeEach(() => {
    nodeApiMock.setup((api) => api.getSurveys()).returns(() => Promise.resolve(surveyListMockObject));
  });

  afterEach(() => {
    loginManagerMock.reset();
    nodeApiMock.reset();
  });

  it('Should display a message asking the user to enter their Blaise user credentials if they are not logged in', async () => {
    // arrange
    loginManagerMock.setup((lm) => lm.userLoggedIn).returns(() => false);

    // act
    await act(async () => {
      view = render(<BrowserRouter><App loginManager={loginManagerMock.object} nodeApi={nodeApiMock.object} /></BrowserRouter>);
    });

    // assert
    const appView = view.getByTestId('app-content');
    expect(appView).toHaveTextContent('Enter your Blaise username and password');
  });

  it('Should render the login page correctly', async () => {
    // arrange
    loginManagerMock.setup((lm) => lm.userLoggedIn).returns(() => false);

    // act
    await act(async () => {
      view = render(<BrowserRouter><App loginManager={loginManagerMock.object} nodeApi={nodeApiMock.object} /></BrowserRouter>);
    });

    // assert
    expect(view).toMatchSnapshot();
  });

  it.each(validUserRoles)('Should display the surveys page if the user is already logged in', async (userRole) => {
    // arrange
    loginManagerMock.setup((lm) => lm.userLoggedIn).returns(() => true);
    loginManagerMock.setup((lm) => lm.getRoleOfLoggedInUser()).returns(() => Promise.resolve(userRole));

    // act
    await act(async () => {
      view = render(<BrowserRouter><App loginManager={loginManagerMock.object} nodeApi={nodeApiMock.object} /></BrowserRouter>);
    });

    // assert
    const appView = view.getByTestId('app-content');
    expect(appView).toHaveTextContent(`Bonjour tout le monde ${userRole}`);
  });

  it.each(validUserRoles)('Should render the surveys page correctly', async (userRole) => {
    // arrange
    loginManagerMock.setup((lm) => lm.userLoggedIn).returns(() => true);
    loginManagerMock.setup((lm) => lm.getRoleOfLoggedInUser()).returns(() => Promise.resolve(userRole));

    // act
    await act(async () => {
      view = render(<BrowserRouter><App loginManager={loginManagerMock.object} nodeApi={nodeApiMock.object} /></BrowserRouter>);
    });

    // assert
    expect(view).toMatchSnapshot();
  });
});
