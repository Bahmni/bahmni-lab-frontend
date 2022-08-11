export const mockUser = {
  authenticated: true,
  uuid: 'uuid',
  display: 'admin',
  person: {uuid: 'uuid', display: 'Test User'},
  privileges: [],
  roles: [{uuid: 'uuid', display: 'System Developer'}],
  username: 'admin',
  userProperties: {
    defaultLocale: 'fr',
  },
}

export const mockLoggedInUser = {
  uuid: 'uuid',
  username: 'Dr Healther Morgan',
  userProperties: {},
  person: {
    display: 'Dr Healther Morgan',
  },
}

export const mockUnauthenticatedUser = {
  authenticated: false,
}

export const mockUnauthorizedUser = {
  authenticated: true,
  user: {
    uuid: 'uuid1',
    display: 'mock',
    person: {uuid: 'uuid1', display: 'Test User'},
    privileges: [{uuid: 'uuid1'}, {display: 'test-privilege'}],
    roles: [{uuid: 'uuid1', display: 'mock-role'}],
    username: 'testuser',
    userProperties: {
      defaultLocale: 'fr',
    },
  },
}
