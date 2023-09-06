import {
  RenderResult, act, render,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { IMock, Mock } from 'typemoq';
import App from '../../client/App';
import AuthenticationApi from '../../client/clients/AuthenticationApi';
import surveyListMockObject from '../mockObjects/surveyListMockObject';
import NodeApi from '../../client/clients/NodeApi';
import userMockObject from '../mockObjects/userMockObject';

// create mocks
const authenticationApiMock: IMock<AuthenticationApi> = Mock.ofType(AuthenticationApi);
const nodeApiMock: IMock<NodeApi> = Mock.ofType(NodeApi);

// set global variables
const validUserRoles:string[] = ['Manager', 'Editor'];
let view:RenderResult;

describe('Renders the correct screen depending if the user has recently logged in', () => {
  beforeEach(() => {
    nodeApiMock.setup((api) => api.getSurveys()).returns(() => Promise.resolve(surveyListMockObject));
  });

  afterEach(() => {
    authenticationApiMock.reset();
    nodeApiMock.reset();
  });

  it('Should display a message asking the user to enter their Blaise user credentials if they are not logged in', async () => {
    // arrange
    authenticationApiMock.setup((lm) => lm.loggedIn()).returns(() => Promise.resolve(false));

    // act
    await act(async () => {
      view = render(<BrowserRouter><App authenticationApi={authenticationApiMock.object} nodeApi={nodeApiMock.object} /></BrowserRouter>);
    });

    // assert
    const appView = view.getByTestId('app-content');
    expect(appView).toHaveTextContent('Enter your Blaise username and password');
  });

  it('Should render the login page correctly', async () => {
    // arrange
    authenticationApiMock.setup((lm) => lm.loggedIn()).returns(() => Promise.resolve(false));

    // act
    await act(async () => {
      view = render(<BrowserRouter><App authenticationApi={authenticationApiMock.object} nodeApi={nodeApiMock.object} /></BrowserRouter>);
    });

    // assert
    expect(view).toMatchSnapshot();
  });

  it.each(validUserRoles)('Should display the surveys page if the user is already logged in', async (userRole) => {
    // arrange
    let user = userMockObject;
    user.role = userRole;

    authenticationApiMock.setup((lm) => lm.loggedIn()).returns(() => Promise.resolve(true));
    authenticationApiMock.setup((lm) => lm.getLoggedInUser()).returns(() => Promise.resolve(user));

    // act
    await act(async () => {
      view = render(<BrowserRouter><App authenticationApi={authenticationApiMock.object} nodeApi={nodeApiMock.object} /></BrowserRouter>);
    });

    // assert
    const appView = view.getByTestId('app-content');
    expect(appView).toHaveTextContent(`Bonjour tout le monde ${user.name}`);
  });

  it.each(validUserRoles)('Should render the surveys page correctly', async (userRole) => {
    // arrange
    let user = userMockObject;
    user.role = userRole;

    authenticationApiMock.setup((lm) => lm.loggedIn()).returns(() => Promise.resolve(true));
    authenticationApiMock.setup((lm) => lm.getLoggedInUser()).returns(() => Promise.resolve(user));

    // act
    await act(async () => {
      view = render(<BrowserRouter><App authenticationApi={authenticationApiMock.object} nodeApi={nodeApiMock.object} /></BrowserRouter>);
    });

    // assert
    expect(view).toMatchSnapshot();
  });
});
