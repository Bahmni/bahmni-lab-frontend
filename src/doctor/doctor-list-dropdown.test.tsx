import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import {localStorageMock} from '../utils/test-utils'
import DoctorListDropdown from './doctor-list-dropdown'
import {openmrsFetch} from '@openmrs/esm-framework'
import {mockDoctorNames} from '../__mocks__/doctorNames.mock'
import {DoctorDetailsData} from '../types'
import PendingLabOrdersProvider from '../context/pending-orders-context'
import {UploadReportContext} from '../context/upload-report-context'

describe('upload file', () => {
  let doctor: DoctorDetailsData
  const setDoctor = (input: DoctorDetailsData) => {
    doctor = {display: input.display, uuid: input.uuid}
  }

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {value: localStorageMock})
    const uploadReportContextValue = {
      doctor,
      setDoctor,
    }
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch.mockResolvedValue(mockDoctorNames)
    renderWithContextProvider(<DoctorListDropdown />, uploadReportContextValue)
  })

  afterEach(() => jest.clearAllMocks())

  it('should show doctor dropdown when doctor list dropdown component is rendered', async () => {
    const selectedButton = await screen.getByRole('button', {
      name: /Select a Doctor/i,
    })
    expect(selectedButton).toBeInTheDocument()
  })

  it('should be able to select dropdown item when clicked on the dropdown and doctor details value should be updated', async () => {
    userEvent.click(
      screen.getByRole('button', {
        name: /Select a Doctor/i,
      }),
    )
    expect(doctor).toBe(undefined)

    userEvent.click(await screen.findByText('admin - Super User'))
    expect(await screen.findByText(/admin - Super User/i)).toBeInTheDocument()
    expect(doctor.display).toBe('admin - Super User')
    expect(doctor.uuid).toBe('1')

    userEvent.click(screen.getByText('admin - Super User'))

    userEvent.click(screen.getByText('8-3 - user'))

    expect(screen.getByText(/8-3 - user/i)).toBeInTheDocument()
    expect(doctor.display).toBe('8-3 - user')
    expect(doctor.uuid).toBe('3')
  })
})

function renderWithContextProvider(children, uploadReportContextValue) {
  return render(
    <PendingLabOrdersProvider>
      <UploadReportContext.Provider value={uploadReportContextValue}>
        {children}
      </UploadReportContext.Provider>
    </PendingLabOrdersProvider>,
  )
}
