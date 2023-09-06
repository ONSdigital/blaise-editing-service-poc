import { getCurrentUser } from 'blaise-login-react-client';
import { User } from 'blaise-api-node-client';
import AuthenticationApi from '../../../client/clients/AuthenticationApi';
import userMockObject from '../../mockObjects/userMockObject';

// use axios mock adapter
// mock blaise login module including AuthManager
jest.mock('blaise-login-react-client');
const sut = new AuthenticationApi();

describe('GetUser from Blaise', () => {
  it('Should return expected user', async () => {
    // arrange
    const getLoggedInUserMock = getCurrentUser as jest.Mock<Promise<User>>;

    getLoggedInUserMock.mockImplementation(() => Promise.resolve(userMockObject));

    // act
    const user = await sut.getLoggedInUser();

    // assert
    expect(user).toEqual(userMockObject);
  });

  it('Should throw an error if getCurrentUser errors', async () => {
    // arrange
    const getLoggedInUserMock = getCurrentUser as jest.Mock<Promise<User>>;
    getLoggedInUserMock.mockImplementation(() => Promise.reject());

    // act && assert
    expect(() => sut.getLoggedInUser()).rejects.toThrow('Unable to retrieve logged in user');
  });
});
