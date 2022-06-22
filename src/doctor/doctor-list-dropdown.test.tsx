import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import {localStorageMock} from '../utils/test-utils'
import DoctorListDropdown from './doctor-list-dropdown'
import {openmrsFetch} from '@openmrs/esm-framework'
import {mockDoctorNames} from '../__mocks__/doctorNames.mock'
import {UploadReportContext} from '../context/upload-report-context'
import {DoctorDetailsData, PendingLabOrders} from '../types'
import PendingLabOrdersProvider, {
  PendingOrdersContext,
} from '../context/pending-orders-context'

describe('upload file', () => {
  let doctor: DoctorDetailsData
  const setDoctor = (input: DoctorDetailsData) => {
    doctor = {display: input.display, uuid: input.uuid}
  }

  let selectedPendingOrder: PendingLabOrders[] = [
    {
      id: '456',
      testName: 'xyz',
      date: '01-02-2000',
      conceptUuid: '567',
      orderedBy: 'admin - Super User',
      ordererUuid: '123',
    },
  ]
  const setSelectedPendingOrder = (input: PendingLabOrders) => {
    selectedPendingOrder.push({
      id: input.id,
      testName: input.testName,
      date: input.date,
      conceptUuid: input.conceptUuid,
      orderedBy: input.orderedBy,
      ordererUuid: input.ordererUuid,
    })
  }

  const uploadReportContextValue = {
    doctor,
    setDoctor,
  }

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {value: localStorageMock})

    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch.mockResolvedValue(mockDoctorNames)
  })

  afterEach(() => jest.clearAllMocks())

  it('should show doctor dropdown when doctor list dropdown component is rendered', async () => {
    renderWithContextProvider(<DoctorListDropdown />, uploadReportContextValue)
    const selectedButton = await screen.getByRole('button', {
      name: /Select a Doctor/i,
    })
    expect(selectedButton).toBeInTheDocument()
  })

  it('should be able to select dropdown item when clicked on the dropdown and doctor details value should be updated', async () => {
    renderWithContextProvider(<DoctorListDropdown />, uploadReportContextValue)
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

  it.skip('should have pre-populated doctor name in case of open order', async () => {
    console.log(doctor.display + 'initial')
    const uploadReportContextValue: any = {
      doctor: null,
      setDoctor,
    }
    render(
      <PendingOrdersContext.Provider
        value={{
          selectedPendingOrder,
          setSelectedPendingOrder,
        }}
      >
        <UploadReportContext.Provider value={uploadReportContextValue}>
          <DoctorListDropdown />
        </UploadReportContext.Provider>
      </PendingOrdersContext.Provider>,
    )
    screen.debug()
    console.log(doctor.display + ' after render')
    const selectedButton = await screen.findByText(/abc/i)
    expect(selectedButton).toBeInTheDocument()
    expect(doctor.display).toBe('admin - Super User')
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
