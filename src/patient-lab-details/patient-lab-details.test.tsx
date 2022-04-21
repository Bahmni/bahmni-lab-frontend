import {ExtensionSlot, openmrsFetch, usePatient} from '@openmrs/esm-framework'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {when} from 'jest-when'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {SWRConfig} from 'swr'
import {headers} from '../constants'
import {
  mockEmptyPendingLabOrderResponse,
  mockPendingLabOrdersErrorResponse,
  mockPendingLabOrdersResponse,
} from '../__mocks__/pendingLabOrders.mock'
import PatientLabDetails from './patient-lab-details'

const mockPatientUuid = '1'
const matchParams = {
  isExact: true,
  params: {patientUuid: `${mockPatientUuid}`},
  path: '',
  url: '',
}

describe('Patient lab details', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {value: localStorageMock})
    when(openmrsFetch).mockImplementation(() => jest.fn())
    localStorage.setItem('i18nextLng', 'en-us')
  })
  afterEach(() => {
    localStorage.removeItem('i18nextLng'), jest.clearAllMocks()
  })

  it('should show loader if call for patient data is in progress', async() => {
    when(usePatient)
      .calledWith(mockPatientUuid)
      .mockReturnValue({
        isLoading: true,
      })
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch.mockReturnValue(mockPendingLabOrdersResponse)

    render(
      <PatientLabDetails
        match={matchParams}
        history={undefined}
        location={undefined}
      />,
    )
   await waitFor(()=>  expect(screen.getByText(/loading \.\.\./i)).toBeInTheDocument())
  })

  it('should show error message when usePatient call fails', () => {
    when(usePatient)
      .calledWith(mockPatientUuid)
      .mockReturnValue({
        error: {message: 'unable to fetch patient data'},
      })
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch.mockReturnValue(mockPendingLabOrdersResponse)

    render(
      <PatientLabDetails
        match={matchParams}
        history={undefined}
        location={undefined}
      />,
    )
    expect(screen.queryByText(/loading \.\.\./i)).not.toBeInTheDocument()
    expect(
      screen.getByText(/Something went wrong: unable to fetch patient data/i),
    ).toBeInTheDocument()
  })

  it('should show patient information in the patient header slot when usePatient call succeeds', () => {
    when(usePatient)
      .calledWith(mockPatientUuid)
      .mockReturnValue({
        patient: {id: mockPatientUuid},
      })
    when(ExtensionSlot).mockImplementation((props: any) => {
      return (
        <>
          <div>Extension slot name : {props.extensionSlotName} </div>
          <div>State : {JSON.stringify(props.state)}</div>
        </>
      )
    })
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch.mockReturnValue(mockPendingLabOrdersResponse)

    render(
      <BrowserRouter>
        <PatientLabDetails
          match={matchParams}
          history={undefined}
          location={undefined}
        />
      </BrowserRouter>,
    )
    expect(screen.queryByText(/loading \.\.\./i)).not.toBeInTheDocument()
    expect(
      screen.getByText(/Extension slot name : patient\-header\-slot/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /State : \{"patient":\{"id":"1"\},"patientuuid":"1","hideActionsOverflow":true\}/i,
      ),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /upload report/i,
      }),
    ).toBeInTheDocument()

    userEvent.click(screen.getByText('Upload Report'))
    expect(global.window.location.href).toMatch('/patient/1/report')
  })

  it('should display pending lab orders table when call for orders data is successful', async () => {
    when(usePatient)
      .calledWith(mockPatientUuid)
      .mockReturnValue({
        patient: {id: '1'},
      })
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch.mockReturnValue(mockPendingLabOrdersResponse)

    render(
      <SWRConfig value={{provider: () => new Map()}}>
        <BrowserRouter>
          <PatientLabDetails
            match={matchParams}
            history={undefined}
            location={undefined}
          />
        </BrowserRouter>
      </SWRConfig>,
    )

    await waitFor(() => {
      expect(screen.getByText(/Pending lab orders/i)).toBeInTheDocument()
    })
    expect(screen.getByTitle(/lab-order-table/i)).toBeInTheDocument()
    headers.map(header => {
      expect(
        screen.getByRole('columnheader', {name: header.header}),
      ).toBeInTheDocument()
    })
    expect(
      screen.getByRole('cell', {name: 'April 19, 2022'}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('cell', {name: 'Routine Blood'}),
    ).toBeInTheDocument()
    expect(screen.getByRole('cell', {name: 'Test Orderer'})).toBeInTheDocument()
    screen.getByRole('checkbox', {
      name: /select all rows/i
    })
    expect(screen.getAllByRole('checkbox', {
      name: /select all rows/i
    }).length).toEqual(1)
    expect(screen.getAllByRole('checkbox', {
      name: /select row/i
    }).length).toEqual(1)
    expect(
      screen.queryByText(
        /Something went wrong in fetching pending lab orders\.\.\./i,
      ),
    ).not.toBeInTheDocument()
  })
  it('should display error message when call for orders data is unsuccessful', async () => {
    when(usePatient)
      .calledWith(mockPatientUuid)
      .mockReturnValue({
        patient: {id: '1'},
      })
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch.mockRejectedValueOnce(mockPendingLabOrdersErrorResponse)

    render(
      <SWRConfig value={{provider: () => new Map()}}>
        <BrowserRouter>
          <PatientLabDetails
            match={matchParams}
            history={undefined}
            location={undefined}
          />
        </BrowserRouter>
      </SWRConfig>,
    )

    await waitFor(() => {
      expect(
        screen.getByText(
          /Something went wrong in fetching pending lab orders\.\.\./i,
        ),
      ).toBeInTheDocument()
    })
    expect(screen.queryByText('Pending lab orders')).not.toBeInTheDocument()
    expect(screen.queryByTitle(/lab-order-table/i)).not.toBeInTheDocument()
  })
  it('should not display pending lab orders table when there is no open orders', async () => {
    when(usePatient)
      .calledWith(mockPatientUuid)
      .mockReturnValue({
        patient: {id: '1'},
      })
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch.mockReturnValue(mockEmptyPendingLabOrderResponse)

    render(
      <SWRConfig value={{provider: () => new Map()}}>
        <BrowserRouter>
          <PatientLabDetails
            match={matchParams}
            history={undefined}
            location={undefined}
          />
        </BrowserRouter>
      </SWRConfig>,
    )

    await waitFor(() => {
      expect(screen.queryByText('Pending lab orders')).not.toBeInTheDocument()
    })
    expect(screen.queryByTitle(/lab-order-table/i)).not.toBeInTheDocument()
    expect(
      screen.queryByText(
        /Something went wrong in fetching pending lab orders\.\.\./i,
      ),
    ).not.toBeInTheDocument()
  })
})

const localStorageMock = (function() {
  let store = {}

  return {
    getItem(key) {
      return store[key]
    },

    setItem(key, value) {
      store[key] = value
    },

    clear() {
      store = {}
    },

    removeItem(key) {
      delete store[key]
    },
  }
})()
