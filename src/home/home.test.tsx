import {openmrsFetch} from '@openmrs/esm-framework'
import {render, screen, waitFor} from '@testing-library/react'
import React from 'react'
import {of} from 'rxjs'
import {SWRConfig} from 'swr'
import {
  auditLogGlobalPropertyURL,
  auditLogURL,
  getPayloadForUserLogin,
} from '../utils/api-utils'
import {verifyApiCall} from '../utils/test-utils'
import {mockUser} from '../__mocks__/mockUser'
import Home from './home'

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
    render(
      <SWRConfig value={{provider: () => new Map()}}>
        <Home />
      </SWRConfig>,
    )

    expect(screen.getByAltText(/Bahmni Logo/i)).toBeInTheDocument()
    expect(screen.getByText(/welcome to lab entry/i)).toBeInTheDocument()
    expect(
      screen.getByText(/please click on the search icon above to get started/i),
    ).toBeInTheDocument()
  })
  it('should redirect user when user is unauthorized', () => {
    render(
      <SWRConfig value={{provider: () => new Map()}}>
        <Home />
      </SWRConfig>,
    )

    expect(screen.getByText(/redirected to login/i)).toBeInTheDocument()
  })
})

describe('home page - Auditing', () => {
  let mockedOpenmrsFetch = openmrsFetch as jest.Mock
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('should update audit logs when user enters lab lite', async () => {
    mockedOpenmrsFetch.mockReturnValue({data: true})

    render(
      <SWRConfig value={{provider: () => new Map()}}>
        <Home />
      </SWRConfig>,
    )
    await waitFor(() => expect(mockedOpenmrsFetch).toBeCalledTimes(2))

    const auditMessagePayload = getPayloadForUserLogin(mockUser.username)

    verifyApiCall(auditLogGlobalPropertyURL, 'GET')
    verifyApiCall(auditLogURL, 'POST', JSON.stringify(auditMessagePayload))
  })

  it('should not update audit logs when audit log property is disabled', async () => {
    mockedOpenmrsFetch.mockReturnValueOnce({data: false})

    render(
      <SWRConfig value={{provider: () => new Map()}}>
        <Home />
      </SWRConfig>,
    )

    await waitFor(() => expect(mockedOpenmrsFetch).toBeCalledTimes(1))

    verifyApiCall(auditLogGlobalPropertyURL, 'GET')
  })
})
