import {openmrsFetch} from '@openmrs/esm-framework'
import {render, screen, waitFor} from '@testing-library/react'
import React from 'react'
import {of} from 'rxjs'
import {mockUnauthorizedUser, mockUser} from '../__mocks__/mockUser'
import Root from './patient-lab-root.component'
import {translations} from '../__mocks__/translations.mock'

const mockUserObservable = of(mockUser)
jest.mock('@openmrs/esm-framework', () => ({
  openmrsFetch: jest.fn().mockResolvedValue({}),
  getCurrentUser: jest.fn(() => mockUserObservable),
  createGlobalStore: jest.fn(),
  createUseStore: jest.fn(),
  userHasAccess: jest.fn().mockReturnValue(false),
  subscribeConnectivity: jest.fn(),
  useSession: jest.fn(() => mockUnauthorizedUser),
  UserHasAccess: jest
    .fn()
    .mockImplementationOnce(({children}) => {
      return children
    })
    .mockImplementationOnce(({fallback}) => {
      return fallback
    }),
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => {
      return translations[key] || key
    },
  }),
}))

jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom')

  return {
    ...original,
    __esModule: true,
    Redirect: ({to}) => <div>Redirected to login</div>,
  }
})

describe('Root', () => {
  it('should render home when user hits home url', async () => {
    let mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch.mockReturnValueOnce({data: true})
    window.history.pushState({}, 'Lab Entry', '/lab/home')
    render(<Root />)
    await waitFor(() =>
      expect(screen.getByText(/welcome to lab entry/i)).toBeInTheDocument(),
    )
  })
  it('should redirect user when user is unauthorized', () => {
    render(<Root />)

    expect(screen.getByText(/redirected to login/i)).toBeInTheDocument()
  })
})
