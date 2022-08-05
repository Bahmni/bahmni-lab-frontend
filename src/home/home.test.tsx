import React from 'react'
import {render, screen} from '@testing-library/react'
import Home from './home'
import {of} from 'rxjs'
import {mockUser} from '../__mocks__/mockUser'
import {Redirect} from 'react-router-dom'
import {when} from 'jest-when'

const mockUserObservable = of(mockUser)
jest.mock('@openmrs/esm-framework', () => ({
  openmrsFetch: jest.fn().mockResolvedValue({}),
  getCurrentUser: jest.fn(() => mockUserObservable),
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

describe('home page', () => {
  it('should show home page', () => {
    render(<Home />)

    expect(screen.getByAltText(/Bahmni Logo/i)).toBeInTheDocument()
    expect(screen.getByText(/welcome to lab entry/i)).toBeInTheDocument()
    expect(
      screen.getByText(/please click on the search icon above to get started/i),
    ).toBeInTheDocument()
  })
  it('should redirect user when user is unauthorized', () => {
    render(<Home />)

    expect(screen.getByText(/redirected to login/i)).toBeInTheDocument()
  })
})
