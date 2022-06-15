import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import {localStorageMock} from '../utils/test-utils'
import DoctorListDropdown from './doctor-list-dropdown'
import {openmrsFetch} from '@openmrs/esm-framework'
import {mockDoctorNames} from '../__mocks__/doctorNames.mock'
import {UploadReportContext} from '../context/upload-report-context'
import {DoctorDetailsData} from '../types'

describe('upload file', () => {
  let doctor: DoctorDetailsData
  const setDoctor = (input: DoctorDetailsData) => {
    doctor = {display: input.display, uuid: input.uuid, links: [], type: ''}
  }
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {value: localStorageMock})

    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch.mockResolvedValue(mockDoctorNames)

    const value = {
      doctor,
      setDoctor,
    }
    renderWithContextProvider(<DoctorListDropdown />, value)
  })

  afterEach(() => jest.clearAllMocks())

  it('should show doctor dropdown when doctor list dropdown component is rendered', async () => {
    const selectedButton = screen.getByRole('button', {
      name: /Please select the doctor name/i,
    })

    expect(selectedButton).toBeInTheDocument()
  })

  it('should be able to select dropdown item when clicked on the dropdown and doctor details value should be updated', async () => {
    userEvent.click(
      screen.getByRole('button', {
        name: /Please select the doctor name/i,
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

function renderWithContextProvider(children, value) {
  return render(
    <UploadReportContext.Provider value={value}>
      {children}
    </UploadReportContext.Provider>,
  )
}
