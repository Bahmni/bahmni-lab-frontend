import {
  ExtensionSlot,
  openmrsFetch,
  useLayoutType,
  usePatient,
  usePagination,
} from '@openmrs/esm-framework'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {when} from 'jest-when'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {SWRConfig} from 'swr'
import {localStorageMock} from '../utils/test-utils'
import {mockPendingLabOrder} from '../__mocks__/patientLabDetails.mock'
import {mockPendingLabOrdersResponse} from '../__mocks__/pendingLabOrders.mock'
import {
  mockLabTestsResponse,
  mockUploadFileResponse,
  mockDiagnosticReportResponse,
} from '../__mocks__/selectTests.mock'
import PatientLabDetails from './patient-lab-details'

const mockPatientUuid = '1'
const matchParams = {
  isExact: true,
  params: {patientUuid: `${mockPatientUuid}`},
  path: '',
  url: '',
}

describe('Patient lab details', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should show loader if call for patient data is in progress', async () => {
    when(usePatient)
      .calledWith(mockPatientUuid)
      .mockReturnValue({
        isLoading: true,
      })

    render(
      <PatientLabDetails
        match={matchParams}
        history={undefined}
        location={undefined}
      />,
    )
    await waitFor(() =>
      expect(screen.getByText(/loading \.\.\./i)).toBeInTheDocument(),
    )
  })

  it('should show error message when usePatient call fails', () => {
    when(usePatient)
      .calledWith(mockPatientUuid)
      .mockReturnValue({
        error: {message: 'unable to fetch patient data'},
      })

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
  })

  it('should render Paginated Table components', () => {
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

    render(
      <BrowserRouter>
        <PatientLabDetails
          match={matchParams}
          history={undefined}
          location={undefined}
        />
      </BrowserRouter>,
    )
    expect(screen.getByTitle(/paginated-table/i)).toBeInTheDocument()
    expect(screen.getByTitle(/report-table/i)).toBeInTheDocument()
  })

  it('should display Overlay on click of upload report button', () => {
    Object.defineProperty(window, 'localStorage', {value: localStorageMock})
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
    localStorage.setItem('i18nextLng', 'en')

    render(
      <BrowserRouter>
        <PatientLabDetails
          match={matchParams}
          history={undefined}
          location={undefined}
        />
      </BrowserRouter>,
    )

    userEvent.click(screen.getByRole('button', {name: /upload report/i}))

    expect(screen.getByLabelText(/overlay/i)).toBeInTheDocument()
  })

  it('should pre-populate the selected tests in upload report and makes pending lab order table read only', async () => {
    when(usePatient)
      .calledWith(mockPatientUuid)
      .mockReturnValue({
        patient: {id: mockPatientUuid},
      })

    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch
      .mockReturnValueOnce(mockPendingLabOrdersResponse)
      .mockReturnValue(mockLabTestsResponse)
    when(usePagination)
      .calledWith(expect.anything(), 5)
      .mockReturnValue(mockPendingLabOrder)
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

    expect(
      screen.getByRole('cell', {name: 'Routine Blood'}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('cell', {name: 'Anaemia Panel'}),
    ).toBeInTheDocument()

    userEvent.click(screen.getAllByRole('checkbox', {name: /Select row/i})[0])
    userEvent.click(screen.getAllByRole('checkbox', {name: /Select row/i})[1])

    userEvent.click(screen.getByRole('button', {name: /upload report/i}))

    expect(
      screen.getByRole('button', {name: /save and upload/i}),
    ).toBeDisabled()

    await waitFor(() => {
      expect(screen.getByTestId(/selected-tests/i)).toHaveTextContent(
        'Selected Tests ( 2 )',
      )
    })

    expect(
      screen.getAllByRole('checkbox', {name: /Select Row/i})[0],
    ).toBeDisabled()

    userEvent.click(screen.getByRole('button', {name: /close-icon/i}))
    expect(
      screen.getAllByRole('checkbox', {name: /Select Row/i})[0],
    ).toBeEnabled()

    userEvent.click(screen.getAllByRole('checkbox', {name: /Select row/i})[0])

    userEvent.click(screen.getByRole('button', {name: /upload report/i}))

    await waitFor(() => {
      expect(screen.getByTestId(/selected-tests/i)).toHaveTextContent(
        'Selected Tests ( 1 )',
      )
    })
  })

  it('should show success notification on report upload', async () => {
    Object.defineProperty(window, 'localStorage', {value: localStorageMock})
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
    localStorage.setItem('i18nextLng', 'en')

    const file = new File(['content'], 'test.pdf', {type: 'application/pdf'})
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch
      .mockReturnValueOnce(mockPendingLabOrdersResponse)
      .mockReturnValueOnce(mockLabTestsResponse)
      .mockReturnValueOnce(mockUploadFileResponse)
      .mockReturnValue(mockDiagnosticReportResponse)

    const mockedLayout = useLayoutType as jest.Mock
    mockedLayout.mockReturnValue('desktop')

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

    userEvent.click(screen.getByRole('button', {name: /upload report/i}))

    expect(
      screen.getByRole('button', {name: /save and upload/i}),
    ).toBeDisabled()

    userEvent.click(
      screen.getByRole('textbox', {
        name: /report date/i,
      }),
    )

    const currentDay: string = getFormatedDate(0)

    userEvent.click(screen.getByLabelText(currentDay))

    await waitFor(() =>
      expect(
        screen.getByRole('checkbox', {name: /Absolute Eosinphil Count/i}),
      ).toBeInTheDocument(),
    )
    expect(screen.getByText(/select tests/i)).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('checkbox', {name: /Absolute Eosinphil Count/i}),
    )

    const fileInput = screen.getByLabelText(
      'Drag and drop files here or click to upload',
    ) as HTMLInputElement

    uploadFiles(fileInput, [file])

    expect(fileInput.files.length).toBe(1)
    const fileName = await screen.findByText('test.pdf')
    expect(fileName).toBeInTheDocument()

    const saveButton = screen.getByRole('button', {name: /save and upload/i})

    expect(saveButton).not.toBeDisabled()
    userEvent.click(saveButton)

    await waitFor(() =>
      expect(
        screen.getByText(/Report successfully uploaded/i),
      ).toBeInTheDocument(),
    )
  })
})

function getFormatedDate(addDays: number): string {
  let date = new Date()
  date.setDate(date.getDate() + addDays)

  return date.toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function uploadFiles(input, files: File[]) {
  Object.defineProperty(input, 'files', {
    value: files,
    configurable: true,
  })

  Object.defineProperty(input, 'value', {
    set(newValue) {
      if (!newValue) {
        input.files.length = 0
      }
    },
  })

  fireEvent.change(input, {
    target: {
      files,
    },
  })
}
