import {openmrsFetch, useLayoutType} from '@openmrs/esm-framework'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import {SWRConfig} from 'swr'
import PendingLabOrdersProvider from '../context/pending-orders-context'
import {UploadReportProvider} from '../context/upload-report-context'
import {localStorageMock} from '../utils/test-utils'
import {uploadFiles} from '../utils/test-utils/upload-report-helper'
import {mockDoctorNames} from '../__mocks__/doctorNames.mock'
import {
  diagnosticReportRequestBody,
  mockDiagnosticReportErrorResponse,
  mockDiagnosticReportResponse,
  mockLabTestsResponse,
  mockUploadFileResponse,
  selfDiagnosticRequestBody,
  uploadFileRequestBody,
} from '../__mocks__/selectTests.mock'
import UploadReport from './upload-report'

describe('Upload Report', () => {
  beforeEach(() =>
    Object.defineProperty(window, 'localStorage', {value: localStorageMock}),
  )
  afterEach(() => {
    jest.clearAllMocks(), localStorage.clear()
  })
  it('should close the side panel on click of close button', () => {
    localStorage.setItem('i18nextLng', 'en')
    const close = jest.fn()

    const mockedLayout = useLayoutType as jest.Mock
    mockedLayout.mockReturnValue('desktop')

    renderWithContextProvider(
      <UploadReport close={close} header={'Test Header'} patientUuid={'123'} />,
    )

    userEvent.click(screen.getByLabelText('close-icon'))

    expect(close).toBeCalled()
  })
  it('should reset the value on click of discard button', async () => {
    const file = new File(['content'], 'test.jpg', {type: 'image/jpg'})
    localStorage.setItem('i18nextLng', 'en')
    const close = jest.fn()

    const mockedLayout = useLayoutType as jest.Mock
    mockedLayout.mockReturnValue('desktop')

    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch.mockResolvedValue(mockLabTestsResponse)

    renderWithContextProvider(
      <SWRConfig value={{provider: () => new Map()}}>
        <UploadReport
          close={close}
          header={'Test Header'}
          patientUuid={'123'}
        />
      </SWRConfig>,
    )

    userEvent.click(
      screen.getByRole('textbox', {
        name: /report date/i,
      }),
    )

    const currentDay: string = getFormatedDate(0)
    userEvent.click(screen.getByLabelText(currentDay))

    expect(
      screen.getByRole('textbox', {
        name: /report date/i,
      }),
    ).toHaveValue(
      new Date(currentDay).toLocaleDateString('en', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    )
    await waitFor(() =>
      userEvent.type(screen.getByRole('searchbox', {name: /search/i}), 'ab'),
    )
    expect(screen.getByRole('searchbox', {name: /search/i})).toHaveValue('ab')

    const fileInput = screen.getByLabelText(
      'Drag and drop files here or click to upload',
    ) as HTMLInputElement

    uploadFiles(fileInput, [file])

    expect(fileInput.files.length).toBe(1)

    const fileName = await screen.findByText('test.jpg')
    expect(fileName).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', {name: /discard/i}))

    const fileNameQuery = await screen.queryByText('test.jpg')
    expect(fileNameQuery).not.toBeInTheDocument()

    expect(screen.getByRole('searchbox', {name: /search/i})).not.toHaveValue(
      'ab',
    )
    expect(
      screen.getByRole('textbox', {
        name: /report date/i,
      }),
    ).not.toHaveValue(currentDay)
    expect(screen.getByTestId(/selected-tests/i)).toHaveTextContent(
      'Selected Tests ( 0 )',
    )
    expect(screen.getByTestId(/available-tests/i)).toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )
    expect(screen.getByTestId(/available-tests/i)).toHaveTextContent(
      /haemoglobin/i,
    )
    expect(
      screen.getByRole('button', {
        name: /Click to record clinical conclusion/i,
      }),
    )
  })
  it('should not allow user to select future dates', async () => {
    localStorage.setItem('i18nextLng', 'en')
    const close = jest.fn()

    const mockedLayout = useLayoutType as jest.Mock
    mockedLayout.mockReturnValue('desktop')

    renderWithContextProvider(
      <UploadReport close={close} header={'Test Header'} patientUuid={'123'} />,
    )

    expect(
      screen.getByRole('button', {name: /save and upload/i}),
    ).toBeDisabled()

    userEvent.click(
      screen.getByRole('textbox', {
        name: /report date/i,
      }),
    )

    const currentDay = screen.getByLabelText(getFormatedDate(0))
    const futureDate = screen.getByLabelText(getFormatedDate(1))

    expect(currentDay.className).not.toMatch(/-disabled/i)
    expect(futureDate.className).toMatch(/-disabled/i)
  })
  it('should disable save and upload button until report date, selected test,doctor name and test report file have value', async () => {
    const file = new File(['content'], 'test.jpg', {type: 'image/jpg'})
    localStorage.setItem('i18nextLng', 'en')
    const close = jest.fn()
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch
      .mockReturnValueOnce(mockLabTestsResponse)
      .mockReturnValue(mockDoctorNames)

    const mockedLayout = useLayoutType as jest.Mock
    mockedLayout.mockReturnValue('desktop')

    renderWithContextProvider(
      <SWRConfig value={{provider: () => new Map()}}>
        <UploadReport
          close={close}
          header={'Test Header'}
          patientUuid={'123'}
        />
      </SWRConfig>,
    )

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
      expect(screen.queryByText(/loading \.\.\./i)).not.toBeInTheDocument(),
    )
    expect(screen.getByText(/select tests/i)).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('checkbox', {name: /Absolute Eosinphil Count/i}),
    )
    userEvent.click(
      screen.getByRole('button', {
        name: /Select a Doctor/i,
      }),
    )

    userEvent.click(await screen.findByText('admin - Super User'))
    expect(await screen.findByText(/admin - Super user/i)).toBeInTheDocument()

    const fileInput = screen.getByLabelText(
      'Drag and drop files here or click to upload',
    ) as HTMLInputElement

    uploadFiles(fileInput, [file])

    expect(fileInput.files.length).toBe(1)
    const fileName = await screen.findByText('test.jpg')
    expect(fileName).toBeInTheDocument()

    expect(
      screen.getByRole('button', {name: /save and upload/i}),
    ).not.toBeDisabled()
  })

  it('should make a file upload api call and fhir diagnostic api call on click of save and upload button', async () => {
    const file = new File(['content'], 'test.pdf', {type: 'application/pdf'})
    localStorage.setItem('i18nextLng', 'en')
    const close = jest.fn()
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch
      .mockReturnValueOnce(mockLabTestsResponse)
      .mockReturnValueOnce(mockDoctorNames)
      .mockReturnValueOnce(mockUploadFileResponse)
      .mockReturnValue(mockDiagnosticReportResponse)

    const mockedLayout = useLayoutType as jest.Mock
    mockedLayout.mockReturnValue('desktop')

    renderWithContextProvider(
      <SWRConfig value={{provider: () => new Map()}}>
        <UploadReport
          close={close}
          header={'Test Header'}
          patientUuid={'123'}
        />
      </SWRConfig>,
    )

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
      expect(screen.queryByText(/loading \.\.\./i)).not.toBeInTheDocument(),
    )
    expect(screen.getByText(/select tests/i)).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('checkbox', {name: /Absolute Eosinphil Count/i}),
    )

    userEvent.click(
      screen.getByRole('button', {
        name: /Select a Doctor/i,
      }),
    )

    userEvent.click(await screen.findByText('admin - Super User'))
    expect(await screen.findByText(/admin - Super user/i)).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('button', {
        name: /Click to record clinical conclusion/i,
      }),
    )

    await waitFor(() =>
      userEvent.type(screen.getAllByRole('textbox')[1], 'Normal Report', {
        delay: 1,
      }),
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
    await waitFor(() => {
      expect(mockedOpenmrsFetch).toBeCalledTimes(5)
    })
    expect(mockedOpenmrsFetch.mock.calls[2][1].method).toBe('POST')
    expect(mockedOpenmrsFetch.mock.calls[2][1].body).toBe(uploadFileRequestBody)
    expect(mockedOpenmrsFetch.mock.calls[3][1].method).toBe('POST')
    expect(mockedOpenmrsFetch.mock.calls[3][1].body).toBe(
      diagnosticReportRequestBody(new Date(currentDay).toISOString()),
    )
  })
  it('should save and upload report when user selects self in doctors dropdown and click save and upload button', async () => {
    const file = new File(['content'], 'test.pdf', {type: 'application/pdf'})
    localStorage.setItem('i18nextLng', 'en')
    const close = jest.fn()
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch
      .mockReturnValueOnce(mockLabTestsResponse)
      .mockReturnValueOnce(mockDoctorNames)
      .mockReturnValueOnce(mockUploadFileResponse)
      .mockReturnValue(mockDiagnosticReportResponse)

    const mockedLayout = useLayoutType as jest.Mock
    mockedLayout.mockReturnValue('desktop')

    renderWithContextProvider(
      <SWRConfig value={{provider: () => new Map()}}>
        <UploadReport
          close={close}
          header={'Test Header'}
          patientUuid={'123'}
        />
      </SWRConfig>,
    )

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
      expect(screen.queryByText(/loading \.\.\./i)).not.toBeInTheDocument(),
    )
    expect(screen.getByText(/select tests/i)).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('checkbox', {name: /Absolute Eosinphil Count/i}),
    )

    userEvent.click(
      screen.getByRole('button', {
        name: /Select a Doctor/i,
      }),
    )

    userEvent.click(await screen.findByText(/self/i))
    expect(await screen.findByText(/self/i)).toBeInTheDocument()

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
    await waitFor(() => {
      expect(mockedOpenmrsFetch).toBeCalledTimes(5)
    })
    expect(mockedOpenmrsFetch.mock.calls[2][1].method).toBe('POST')
    expect(mockedOpenmrsFetch.mock.calls[2][1].body).toBe(uploadFileRequestBody)
    expect(mockedOpenmrsFetch.mock.calls[3][1].method).toBe('POST')
    expect(mockedOpenmrsFetch.mock.calls[3][1].body).toBe(
      selfDiagnosticRequestBody(new Date(currentDay).toISOString()),
    )
    console.log(mockedOpenmrsFetch.mock.calls[4])
  })

  it('should enable save and upload button if post API call fails', async () => {
    const file = new File(['content'], 'test.pdf', {type: 'application/pdf'})
    localStorage.setItem('i18nextLng', 'en')
    const close = jest.fn()
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch
      .mockReturnValueOnce(mockLabTestsResponse)
      .mockReturnValueOnce(mockDoctorNames)
      .mockReturnValueOnce(mockUploadFileResponse)
      .mockReturnValueOnce(mockDiagnosticReportErrorResponse)

    const mockedLayout = useLayoutType as jest.Mock
    mockedLayout.mockReturnValue('desktop')

    renderWithContextProvider(
      <SWRConfig value={{provider: () => new Map()}}>
        <UploadReport
          close={close}
          header={'Test Header'}
          patientUuid={'123'}
        />
      </SWRConfig>,
    )
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
      expect(screen.queryByText(/loading \.\.\./i)).not.toBeInTheDocument(),
    )

    userEvent.click(
      screen.getByRole('checkbox', {name: /Absolute Eosinphil Count/i}),
    )
    userEvent.click(
      screen.getByRole('button', {
        name: /Select a Doctor/i,
      }),
    )
    userEvent.click(await screen.findByText('admin - Super User'))

    userEvent.click(
      screen.getByRole('button', {
        name: /Click to record clinical conclusion/i,
      }),
    )
    await waitFor(() =>
      userEvent.type(screen.getAllByRole('textbox')[1], 'Normal Report', {
        delay: 1,
      }),
    )
    const fileInput = screen.getByLabelText(
      'Drag and drop files here or click to upload',
    ) as HTMLInputElement

    uploadFiles(fileInput, [file])

    const saveButton = screen.getByRole('button', {name: /save and upload/i})

    expect(saveButton).not.toBeDisabled()
    userEvent.click(saveButton)
    expect(saveButton).toBeDisabled()
    await waitFor(() => {
      expect(mockedOpenmrsFetch).toBeCalledTimes(4)
      expect(mockedOpenmrsFetch.mock.calls[2][1].method).toBe('POST')
      expect(mockedOpenmrsFetch.mock.calls[2][1].body).toBe(
        uploadFileRequestBody,
      )
      expect(mockedOpenmrsFetch.mock.calls[3][1].method).toBe('POST')
      expect(saveButton).not.toBeDisabled()
    })
  })

  it('should disable save and upload button after first click', async () => {
    const file = new File(['content'], 'test.pdf', {type: 'application/pdf'})
    localStorage.setItem('i18nextLng', 'en')
    const close = jest.fn()
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch
      .mockReturnValueOnce(mockLabTestsResponse)
      .mockReturnValueOnce(mockDoctorNames)
      .mockReturnValueOnce(mockUploadFileResponse)
      .mockReturnValue(mockDiagnosticReportResponse)

    const mockedLayout = useLayoutType as jest.Mock
    mockedLayout.mockReturnValue('desktop')

    renderWithContextProvider(
      <SWRConfig value={{provider: () => new Map()}}>
        <UploadReport
          close={close}
          header={'Test Header'}
          patientUuid={'123'}
        />
      </SWRConfig>,
    )

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
      expect(screen.queryByText(/loading \.\.\./i)).not.toBeInTheDocument(),
    )

    userEvent.click(
      screen.getByRole('checkbox', {name: /Absolute Eosinphil Count/i}),
    )
    userEvent.click(
      screen.getByRole('button', {
        name: /Select a Doctor/i,
      }),
    )
    userEvent.click(await screen.findByText('admin - Super User'))

    userEvent.click(
      screen.getByRole('button', {
        name: /Click to record clinical conclusion/i,
      }),
    )
    await waitFor(() =>
      userEvent.type(screen.getAllByRole('textbox')[1], 'Normal Report', {
        delay: 1,
      }),
    )
    const fileInput = screen.getByLabelText(
      'Drag and drop files here or click to upload',
    ) as HTMLInputElement

    uploadFiles(fileInput, [file])

    const saveButton = screen.getByRole('button', {name: /save and upload/i})

    expect(saveButton).not.toBeDisabled()
    userEvent.click(saveButton)
    expect(saveButton).toBeDisabled()
    await waitFor(() => {
      expect(mockedOpenmrsFetch).toBeCalledTimes(5)
    })
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

function renderWithContextProvider(children) {
  return render(
    <PendingLabOrdersProvider>
      <UploadReportProvider>{children}</UploadReportProvider>
    </PendingLabOrdersProvider>,
  )
}
