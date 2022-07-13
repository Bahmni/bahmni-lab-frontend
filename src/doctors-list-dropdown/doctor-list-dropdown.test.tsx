import { openmrsFetch } from '@openmrs/esm-framework'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import PendingLabOrdersProvider from '../context/pending-orders-context'
import { UploadReportProvider } from '../context/upload-report-context'
import { localStorageMock } from '../utils/test-utils'
import { mockDoctorNames } from '../__mocks__/doctorNames.mock'
import DoctorListDropdown from './doctor-list-dropdown'

describe('upload file', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {value: localStorageMock})
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch.mockResolvedValue(mockDoctorNames)
    renderWithContextProvider(<DoctorListDropdown />)
  })

  afterEach(() => jest.clearAllMocks())

  it('should show doctor dropdown when doctor list dropdown component is rendered', async () => {
    const selectedButton = await screen.getByRole('button', {
      name: /Select a Doctor/i,
    })
    expect(selectedButton).toBeInTheDocument()
  })

  it('should be able to select dropdown item when clicked on the dropdown', async () => {
    userEvent.click(
      screen.getByRole('button', {
        name: /Select a Doctor/i,
      }),
    )

    userEvent.click(await screen.findByText('admin - Super User'))
    expect(await screen.findByText(/admin - Super User/i)).toBeInTheDocument()
    expect(screen.getByTitle(/doctor list/i)).toHaveTextContent(
      'admin - Super User',
    )
  })
})

function renderWithContextProvider(children) {
  return render(
    <PendingLabOrdersProvider>
      <UploadReportProvider>{children}</UploadReportProvider>
    </PendingLabOrdersProvider>,
  )
}
