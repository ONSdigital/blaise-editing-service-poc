import { getCurrentUser } from 'blaise-login-react-client';
import { User } from 'blaise-api-node-client';
import AuthenticationApi from '../../../client/clients/AuthenticationApi';

// use axios mock adapter
// mock blaise login module including AuthManager
jest.mock('blaise-login-react-client');
const sut = new AuthenticationApi();

describe('GetUser from Blaise', () => {
  it('Should return expected user', async () => {
    // arrange
    const getLoggedInUserMock = getCurrentUser as jest.Mock<Promise<User>>;
    const userMock = {
      name: 'jake',
      role: 'Manager',
      serverParks: ['gusty'],
      defaultServerPark: 'gusty',
    };

    getLoggedInUserMock.mockImplementation(() => Promise.resolve(userMock));

    // act
    const userRole = await sut.getRoleOfLoggedInUser();

    // assert
    expect(userRole).toEqual(userMock.role);
  });

  it('Should throw an error if getCurrentUser errors', async () => {
    // arrange
    const getLoggedInUserMock = getCurrentUser as jest.Mock<Promise<User>>;
    getLoggedInUserMock.mockImplementation(() => Promise.reject());

    // act && assert
    expect(() => sut.getRoleOfLoggedInUser()).rejects.toThrow('Unable to retrieve logged in user');
  });
});
