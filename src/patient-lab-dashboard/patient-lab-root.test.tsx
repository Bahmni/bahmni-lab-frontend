import {render, screen, waitFor} from '@testing-library/react'
import React from 'react'
import {of} from 'rxjs'
import Root from './patient-lab-root.component'
import {mockUser} from '../__mocks__/mockUser'

const mockUserObservable = of(mockUser)
jest.mock('@openmrs/esm-framework', () => ({
  openmrsFetch: jest.fn().mockResolvedValue({}),
  getCurrentUser: jest.fn(() => mockUserObservable),
  createGlobalStore: jest.fn(),
  createUseStore: jest.fn(),
  userHasAccess: jest
    .fn()
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(false),
  subscribeConnectivity: jest.fn(),
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
