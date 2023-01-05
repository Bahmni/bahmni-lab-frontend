import {
  ExtensionSlot,
  openmrsFetch,
  usePagination,
  usePatient,
} from '@openmrs/esm-framework'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {when} from 'jest-when'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import * as swr from 'swr'
import {SWRConfig} from 'swr'
import {
  auditLogURL,
  bahmniEncounterUrl,
  getPayloadForPatientAccess,
  saveDiagnosticReportURL,
} from '../../utils/api-utils'
import {
  defaultVisitTypeKey,
  encounterTypeUuidsKey,
  isAuditLogEnabledKey,
  loggedInUserKey,
} from '../../utils/constants'
import {localStorageMock, verifyApiCall} from '../../utils/test-utils'
import {mockConfigResponse} from '../../__mocks__/config.mock'
import {mockDoctorNames} from '../../__mocks__/doctorNames.mock'
import {
  mockBahmniEncounterErrorResponse,
  mockBahmniEncounterRequest,
  mockBahmniEncounterResponse,
  mockEncounterTypeResponse,
} from '../../__mocks__/encounter.mock'
import {mockPendingLabOrder} from '../../__mocks__/patientLabDetails.mock'
import {mockPendingLabOrdersResponse} from '../../__mocks__/pendingLabOrders.mock'
import {
  mockEmptyReportTableResponse,
  mockReportTableResponse,
} from '../../__mocks__/reportTable.mock'
import {
  diagnosticReportRequestBodyWithBasedOn,
  mockDiagnosticReportErrorResponse,
  mockDiagnosticReportResponse,
  mockLabTestsResponse,
  mockUploadFileResponse,
} from '../../__mocks__/selectTests.mock'
import PatientLabDetails from './patient-lab-details'

const mockPatientUuid = '123'
const matchParams = {
  isExact: true,
  params: {patientUuid: `${mockPatientUuid}`},
  path: '',
  url: '',
}
const file = new File(['content'], 'test.pdf', {type: 'application/pdf'})
const currentDay: string = getFormatedDate(0)
const mockOrderTypeUuid = '8189b409-3f10-11e4-adec-0800271c1b75'

jest.mock('../../hooks/useOrderTypeUuidConfig', () => ({
  useOrderTypeUuidConfig: jest.fn().mockImplementation(() => ({
    orderTypeUuidConfig: mockOrderTypeUuid,
  })),
}))

describe('Patient lab details', () => {
  beforeEach(() => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'bahmni.user.location={"uuid":"locationuuid123"}',
    })
    Object.defineProperty(window, 'localStorage', {value: localStorageMock})
    when(usePatient)
      .calledWith(mockPatientUuid)
      .mockReturnValue({
        patient: {
          id: mockPatientUuid,
          identifier: [
            {
              type: {text: 'Patient Identifier'},
              value: 'GAN000001',
            },
          ],
        },
      })
    localStorage.setItem('i18nextLng', 'en')
    when(ExtensionSlot).mockImplementation((props: any) => {
      return (
        <>
          <div>Extension slot name : {props.extensionSlotName} </div>
          <div>State : {JSON.stringify(props.state)}</div>
        </>
      )
    })
    when(usePagination)
      .calledWith(expect.anything(), 5)
      .mockReturnValue(mockPendingLabOrder)
  })

  afterEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
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

  it('should show patient information in the patient header slot when usePatient call succeeds', async () => {
    render(
      <BrowserRouter>
        <PatientLabDetails
          match={matchParams}
          history={undefined}
          location={undefined}
        />
      </BrowserRouter>,
    )
    expect(
      screen.getByText(/Extension slot name : patient\-header\-slot/i),
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        /State : \{"patient":\{"id":"123","identifier":\[\{"type":\{"text":"Patient Identifier"\},"value":"GAN000001"\}\]\},"patientuuid":"123","hideActionsOverflow":true\}/i,
      ),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /upload report/i,
      }),
    ).toBeInTheDocument()
  })

  it('should render Patient Dashboard and post audit log message', () => {
    localStorage.setItem(loggedInUserKey, 'superman')
    localStorage.setItem(isAuditLogEnabledKey, 'true')
    localStorage.setItem(
      encounterTypeUuidsKey,
      '[{"LAB_RESULT":"LabResultUuid"},{"Patient Document":"PatientdocumentUuid"}]',
    )
    localStorage.setItem(defaultVisitTypeKey, 'OPD')
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
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

    expect(mockedOpenmrsFetch).toBeCalledTimes(1)
    verifyApiCall(
      auditLogURL,
      'POST',
      JSON.stringify(
        getPayloadForPatientAccess('superman', '123', 'GAN000001'),
      ),
    )
  })

  it('should display Overlay on click of upload report button', () => {
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
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch
      .mockReturnValueOnce(mockPendingLabOrdersResponse)
      .mockReturnValueOnce(mockEmptyReportTableResponse)
      .mockReturnValueOnce(mockLabTestsResponse)
      .mockReturnValueOnce(mockConfigResponse)
      .mockReturnValueOnce(mockEncounterTypeResponse)
      .mockReturnValue(mockLabTestsResponse)
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

    expect(screen.queryByText(/absolute eosinphil count/i)).toBeInTheDocument()

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
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch
      .mockReturnValueOnce(mockPendingLabOrdersResponse)
      .mockReturnValueOnce(mockEmptyReportTableResponse)
      .mockReturnValueOnce(mockLabTestsResponse)
      .mockReturnValueOnce(mockConfigResponse)
      .mockReturnValueOnce(mockEncounterTypeResponse)
      .mockReturnValueOnce(mockDoctorNames)
      .mockReturnValueOnce(mockUploadFileResponse)
      .mockReturnValue(mockDiagnosticReportResponse)

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

    userEvent.click(
      screen.getByRole('button', {
        name: /Select a Doctor/i,
      }),
    )

    userEvent.click(await screen.findByText('admin - Super User'))
    expect(await screen.findByText(/admin - Super user/i)).toBeInTheDocument()
    const saveButton = screen.getByRole('button', {name: /save and upload/i})

    expect(saveButton).not.toBeDisabled()
    userEvent.click(saveButton)

    await waitFor(() =>
      expect(
        screen.getByText(/Report successfully uploaded/i),
      ).toBeInTheDocument(),
    )
    userEvent.click(screen.getByTitle(/closes notification/i))
  })

  it('should populate based on property if a pending order is selected', async () => {
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch
      .mockReturnValueOnce(mockPendingLabOrdersResponse)
      .mockReturnValueOnce(mockEmptyReportTableResponse)
      .mockReturnValueOnce(mockLabTestsResponse)
      .mockReturnValueOnce(mockConfigResponse)
      .mockReturnValueOnce(mockEncounterTypeResponse)
      .mockReturnValueOnce(mockDoctorNames)
      .mockReturnValueOnce(mockUploadFileResponse)
      .mockReturnValueOnce(mockBahmniEncounterResponse)
      .mockReturnValue(mockDiagnosticReportResponse)

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
      userEvent.click(screen.getAllByRole('checkbox', {name: /Select row/i})[0])
    })

    userEvent.click(screen.getByRole('button', {name: /upload report/i}))

    expect(
      screen.getByRole('button', {name: /save and upload/i}),
    ).toBeDisabled()

    await waitFor(() => {
      expect(screen.getByTestId(/selected-tests/i)).toHaveTextContent(
        'Selected Tests ( 1 )',
      )
      expect(screen.getByTitle(/doctor list/i)).toHaveTextContent('Super Man')
    })

    const fileInput = screen.getByLabelText(
      'Drag and drop files here or click to upload',
    ) as HTMLInputElement

    uploadFiles(fileInput, [file])
    await verifyFileName(fileInput)
    await saveReport()
    expect(mockedOpenmrsFetch).toBeCalledTimes(9)
    verifyApiCall(bahmniEncounterUrl, 'POST')
    verifyApiCall(
      saveDiagnosticReportURL,
      'POST',
      diagnosticReportRequestBodyWithBasedOn(
        new Date(currentDay).toISOString(),
      ),
    )
  })

  it('should make multiple POST calls when multiple tests are selected', async () => {
    const mutateMock = jest.spyOn(swr, 'mutate')
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch
      .mockReturnValueOnce(mockPendingLabOrdersResponse)
      .mockReturnValueOnce(mockReportTableResponse)
      .mockReturnValueOnce(mockLabTestsResponse)
      .mockReturnValueOnce(mockConfigResponse)
      .mockReturnValueOnce(mockEncounterTypeResponse)
      .mockReturnValueOnce(mockDoctorNames)
      .mockReturnValueOnce(mockUploadFileResponse)
      .mockReturnValueOnce(mockBahmniEncounterResponse)
      .mockReturnValueOnce(mockDiagnosticReportResponse)

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

    userEvent.click(screen.getByLabelText(currentDay))

    await waitFor(() => {
      expect(
        screen.getByRole('checkbox', {name: /Absolute Eosinphil Count/i}),
      ).toBeInTheDocument(),
        expect(
          screen.getByRole('checkbox', {name: /Haemoglobin/i}),
        ).toBeInTheDocument()
    })
    expect(screen.getByText(/select tests/i)).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('checkbox', {name: /Absolute Eosinphil Count/i}),
    )
    userEvent.click(screen.getByRole('checkbox', {name: /Haemoglobin/i}))

    const fileInput = screen.getByLabelText(
      'Drag and drop files here or click to upload',
    ) as HTMLInputElement

    uploadFiles(fileInput, [file])
    await verifyFileName(fileInput)

    userEvent.click(
      screen.getByRole('button', {
        name: /Select a Doctor/i,
      }),
    )

    userEvent.click(await screen.findByText('admin - Super User'))
    expect(await screen.findByText(/admin - Super user/i)).toBeInTheDocument()

    await saveReport()

    expect(mockedOpenmrsFetch).toBeCalledTimes(11)
    verifyApiCall(saveDiagnosticReportURL, 'POST')
    expect(mutateMock).toHaveBeenCalledTimes(2)
  })
  it('should show failure notification when encounter call fails', async () => {
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch
      .mockReturnValueOnce(mockPendingLabOrdersResponse)
      .mockReturnValueOnce(mockEmptyReportTableResponse)
      .mockReturnValueOnce(mockLabTestsResponse)
      .mockReturnValueOnce(mockConfigResponse)
      .mockReturnValueOnce(mockEncounterTypeResponse)
      .mockReturnValueOnce(mockDoctorNames)
      .mockReturnValueOnce(mockUploadFileResponse)
      .mockReturnValueOnce(mockBahmniEncounterErrorResponse)

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

    userEvent.click(
      screen.getByRole('button', {
        name: /Select a Doctor/i,
      }),
    )

    userEvent.click(await screen.findByText('admin - Super User'))
    expect(await screen.findByText(/admin - Super user/i)).toBeInTheDocument()
    const saveButton = screen.getByRole('button', {name: /save and upload/i})

    expect(saveButton).not.toBeDisabled()
    userEvent.click(saveButton)

    await waitFor(() => {
      expect(screen.getByText(/Failed to upload report/i)).toBeInTheDocument()
      expect(
        screen.queryByRole('button', {name: /save and upload/i}),
      ).not.toBeInTheDocument()
    })
    userEvent.click(screen.getByTitle(/closes notification/i))
  })
  it('should show failure notification on report upload', async () => {
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch
      .mockReturnValueOnce(mockPendingLabOrdersResponse)
      .mockReturnValueOnce(mockEmptyReportTableResponse)
      .mockReturnValueOnce(mockLabTestsResponse)
      .mockReturnValueOnce(mockConfigResponse)
      .mockReturnValueOnce(mockEncounterTypeResponse)
      .mockReturnValueOnce(mockDoctorNames)
      .mockReturnValueOnce(mockUploadFileResponse)
      .mockReturnValueOnce(mockBahmniEncounterResponse)
      .mockRejectedValue(mockDiagnosticReportErrorResponse)

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

    userEvent.click(
      screen.getByRole('button', {
        name: /Select a Doctor/i,
      }),
    )

    userEvent.click(await screen.findByText('admin - Super User'))
    expect(await screen.findByText(/admin - Super user/i)).toBeInTheDocument()
    const saveButton = screen.getByRole('button', {name: /save and upload/i})

    expect(saveButton).not.toBeDisabled()
    userEvent.click(saveButton)

    await waitFor(() => {
      expect(screen.getByText(/Failed to upload report/i)).toBeInTheDocument()
      expect(
        screen.queryByRole('button', {name: /save and upload/i}),
      ).not.toBeInTheDocument()
    })
    userEvent.click(screen.getByTitle(/closes notification/i))
  })
  it('should make encounter post call with Lab result encounterTypeUuid when selected order is an open order', async () => {
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch
      .mockReturnValueOnce(mockPendingLabOrdersResponse)
      .mockReturnValueOnce(mockEmptyReportTableResponse)
      .mockReturnValueOnce(mockLabTestsResponse)
      .mockReturnValueOnce(mockConfigResponse)
      .mockReturnValueOnce(mockEncounterTypeResponse)
      .mockReturnValueOnce(mockDoctorNames)
      .mockReturnValueOnce(mockUploadFileResponse)
      .mockReturnValueOnce(mockBahmniEncounterResponse)
      .mockReturnValue(mockDiagnosticReportResponse)

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
      userEvent.click(screen.getAllByRole('checkbox', {name: /Select row/i})[0])
    })
    userEvent.click(screen.getByRole('button', {name: /upload report/i}))

    expect(
      screen.getByRole('button', {name: /save and upload/i}),
    ).toBeDisabled()

    await waitFor(() => {
      expect(screen.getByTestId(/selected-tests/i)).toHaveTextContent(
        'Selected Tests ( 1 )',
      )
    })

    userEvent.click(screen.getByText('Super Man'))

    const fileInput = screen.getByLabelText(
      'Drag and drop files here or click to upload',
    ) as HTMLInputElement

    uploadFiles(fileInput, [file])
    await verifyFileName(fileInput)
    await saveReport()
    expect(mockedOpenmrsFetch).toBeCalledTimes(9)
    verifyApiCall(
      bahmniEncounterUrl,
      'POST',
      JSON.stringify(mockBahmniEncounterRequest.labResult),
    )
  })
  it('should make encounter post call with Patinet document encounterTypeUuid when selected order is not an open order', async () => {
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch
      .mockReturnValueOnce(mockPendingLabOrdersResponse)
      .mockReturnValueOnce(mockEmptyReportTableResponse)
      .mockReturnValueOnce(mockLabTestsResponse)
      .mockReturnValueOnce(mockConfigResponse)
      .mockReturnValueOnce(mockEncounterTypeResponse)
      .mockReturnValueOnce(mockDoctorNames)
      .mockReturnValueOnce(mockUploadFileResponse)
      .mockReturnValueOnce(mockBahmniEncounterResponse)
      .mockReturnValue(mockDiagnosticReportResponse)

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
    userEvent.click(
      screen.getByRole('button', {
        name: /Select a Doctor/i,
      }),
    )
    userEvent.click(await screen.findByText('self (patient)'))
    expect(await screen.findByText('self (patient)')).toBeInTheDocument()
    await saveReport()
    verifyApiCall(
      bahmniEncounterUrl,
      'POST',
      JSON.stringify(mockBahmniEncounterRequest.patientDocument),
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

async function verifyFileName(fileInput: HTMLInputElement) {
  expect(fileInput.files.length).toBe(1)
  const fileName = await screen.findByText('test.pdf')
  expect(fileName).toBeInTheDocument()
}

async function saveReport() {
  const saveButton = screen.getByRole('button', {name: /save and upload/i})
  userEvent.click(screen.getByLabelText(currentDay))
  expect(saveButton).not.toBeDisabled()
  userEvent.click(saveButton)

  await waitFor(() =>
    expect(
      screen.getByText(/Report successfully uploaded/i),
    ).toBeInTheDocument(),
  )
}
