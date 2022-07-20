import {openmrsFetch} from '@openmrs/esm-framework'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import {SWRConfig} from 'swr'
import PendingLabOrdersProvider from '../context/pending-orders-context'
import {UploadReportProvider} from '../context/upload-report-context'
import {localStorageMock} from '../utils/test-utils'
import {
  mockDoctorNames,
  mockDoctorsListErrorResponse,
} from '../__mocks__/doctorNames.mock'
import DoctorListDropdown from './doctor-list-dropdown'

const mockedOpenmrsFetch = openmrsFetch as jest.Mock
describe('upload file', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {value: localStorageMock})

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

  it('should be able to display only doctors from the providers list', async () => {
    userEvent.click(
      screen.getByRole('button', {
        name: /Select a Doctor/i,
      }),
    )

    expect(screen.queryByText(/7-5 - Dennis Kigen/)).not.toBeInTheDocument()

    userEvent.click(await screen.findByText('admin - Super User'))

    expect(await screen.findByText(/admin - Super User/i)).toBeInTheDocument()
    expect(screen.getByTitle(/doctor list/i)).toHaveTextContent(
      'admin - Super User',
    )
  })
})

it('should display error message when call for doctors list is unsuccessful', async () => {
  mockedOpenmrsFetch.mockRejectedValueOnce(mockDoctorsListErrorResponse)
  renderWithContextProvider(<DoctorListDropdown />)

  await waitFor(() =>
    expect(
      screen.getByText(/Something went wrong in fetching Doctor Names.../),
    ).toBeInTheDocument(),
  )
})

function renderWithContextProvider(children) {
  return render(
    <SWRConfig value={{provider: () => new Map()}}>
      <PendingLabOrdersProvider>
        <UploadReportProvider>{children}</UploadReportProvider>
      </PendingLabOrdersProvider>
    </SWRConfig>,
  )
}
