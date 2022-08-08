import {openmrsFetch} from '@openmrs/esm-framework'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import {of} from 'rxjs'
import {SWRConfig} from 'swr'
import {
  auditLogGlobalPropertyURL,
  auditLogURL,
  getPayloadForUserLogin,
} from '../utils/api-utils'
import {verifyApiCall} from '../utils/test-utils'
import HomeButton from './home-button'

jest.mock('@openmrs/esm-framework', () => ({
  ...jest.requireActual('@openmrs/esm-framework'),
  getCurrentUser: jest.fn().mockImplementation(() => of(mockUser)),
}))

const mockUser = {
  authenticated: true,
  username: 'superman',
}

describe('home button', () => {
  let mockedOpenmrsFetch = openmrsFetch as jest.Mock
  beforeEach(() => {
    window = Object.create(window)

    Object.defineProperty(window, 'location', {
      value: {
        href: '',
      },
    })
  })

  afterEach(() => jest.clearAllMocks())

  it('should show the home button on navigation header', () => {
    render(<HomeButton />)
    expect(
      screen.getByRole('button', {
        name: /Home/i,
      }),
    ).toBeInTheDocument()
  })

  it('should route to home path when user clicks on home button', () => {
    render(<HomeButton />)

    userEvent.click(screen.getByLabelText('Home'))
    expect(window.location.href).toEqual('/bahmni/home')
  })

  it('should update audit logs when user enters lab lite', async () => {
    mockedOpenmrsFetch.mockReturnValueOnce({data: true})

    render(
      <SWRConfig value={{provider: () => new Map()}}>
        <HomeButton />
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
        <HomeButton />
      </SWRConfig>,
    )

    await waitFor(() => expect(mockedOpenmrsFetch).toBeCalledTimes(1))

    verifyApiCall(auditLogGlobalPropertyURL, 'GET')
  })
})
