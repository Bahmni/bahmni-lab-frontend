import {openmrsFetch, usePagination} from '@openmrs/esm-framework'
import {render, screen, waitFor} from '@testing-library/react'
import {when} from 'jest-when'
import userEvent from '@testing-library/user-event'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {SWRConfig} from 'swr'
import {
  isAuditLogEnabledKey,
  loggedInUserKey,
  reportHeaders,
} from '../constants'
import {localStorageMock, verifyApiCall} from '../utils/test-utils'
import ReportTable from './report-table.component'
import {
  mockReportTableResponse,
  mockReportTableErrorResponse,
  mockEmptyReportTableResponse,
} from '../__mocks__/reportTable.mock'
import {
  auditLogURL,
  getPayloadForViewingPatientReport,
} from '../utils/api-utils'

const mockPatientUuid = 'uuid-1'
const mockedOpenmrsFetch = openmrsFetch as jest.Mock

describe('Paginated Reports Table', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {value: localStorageMock})
    when(openmrsFetch).mockImplementation(() => jest.fn())
    localStorage.setItem('i18nextLng', 'en-us')
    mockedOpenmrsFetch.mockReturnValue(mockReportTableResponse)
    when(usePagination)
      .calledWith(expect.anything(), 5)
      .mockReturnValue({
        results: [
          {
            id: '7102ba1d-34e2-486f-b156-8c39f8596724',
            tests: 'Systolic blood pressure',
            url:
              'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
            date: 'May 24, 2022',
            requester: 'Superman',
            file: 'MP Report.jpg',
            conclusion: 'sample conclusion',
          },
        ],
        goTo: jest.fn(),
        currentPage: 1,
      })
  })

  afterEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('should display uploaded reports table when call for reports data is successful', async () => {
    render(
      <SWRConfig value={{provider: () => new Map()}}>
        <BrowserRouter>
          <ReportTable patientUuid={mockPatientUuid} />
        </BrowserRouter>
      </SWRConfig>,
    )

    await waitFor(() => {
      expect(screen.getByText(/Reports table/i)).toBeInTheDocument()
    })
    expect(screen.getByTitle(/report-table/i)).toBeInTheDocument()
    reportHeaders.map(header => {
      expect(
        screen.getByRole('columnheader', {name: header.header}),
      ).toBeInTheDocument()
    })
    expect(screen.getByRole('cell', {name: 'May 24, 2022'})).toBeInTheDocument()
    expect(
      screen.getByRole('cell', {name: 'Systolic blood pressure'}),
    ).toBeInTheDocument()
    expect(screen.getByText(/superman/i)).toBeInTheDocument()
    expect(screen.getAllByRole('button').length).toEqual(5)
    expect(screen.getByText(/3 \/ 3 items/i)).toBeInTheDocument()

    expect(
      screen.queryByText(
        /Something went wrong in fetching Report tables\.\.\./i,
      ),
    ).not.toBeInTheDocument()
  })

  it('should able to display only the provider name in the requester field', async () => {
    const mockUsePagination = usePagination as jest.Mock

    render(
      <SWRConfig value={{provider: () => new Map()}}>
        <BrowserRouter>
          <ReportTable patientUuid={mockPatientUuid} />
        </BrowserRouter>
      </SWRConfig>,
    )
    await waitFor(() => {
      expect(screen.getByText(/Reports table/i)).toBeInTheDocument()
    })

    expect(mockUsePagination.mock.calls[1][0][0]).toEqual({
      id: '7102ba1d-34e2-486f-b156-8c39f8596724',
      tests: 'Systolic blood pressure',
      url: '/files/uploaded-doc-uuid-1',
      patientId: 'Test Test (OpenMRS ID: 10005V1)',
      date: 'May 24, 2022',
      requester: 'Super Man',
      file: 'MP Report',
      conclusion: 'Correlate with other findings. inconclusive.',
    })
  })

  it('should display error message when call for reports data is unsuccessful', async () => {
    mockedOpenmrsFetch.mockRejectedValueOnce(mockReportTableErrorResponse)

    render(
      <SWRConfig value={{provider: () => new Map()}}>
        <BrowserRouter>
          <ReportTable patientUuid={mockPatientUuid} />
        </BrowserRouter>
      </SWRConfig>,
    )

    await waitFor(() => {
      expect(
        screen.getByText(
          /Something went wrong in fetching Report tables\.\.\./i,
        ),
      ).toBeInTheDocument()
    })
    expect(screen.queryByText('Reports table')).not.toBeInTheDocument()
    expect(screen.queryByText(/1 \/ 1 items/i)).not.toBeInTheDocument()
  })
  it('should not display report table when there is no reports uploaded', async () => {
    mockedOpenmrsFetch.mockReturnValue(mockEmptyReportTableResponse)
    render(
      <SWRConfig value={{provider: () => new Map()}}>
        <BrowserRouter>
          <ReportTable patientUuid={mockPatientUuid} />
        </BrowserRouter>
      </SWRConfig>,
    )

    await waitFor(() => {
      expect(screen.queryByText('Reports table')).toBeInTheDocument()
    })
    expect(
      screen.queryByText(/No previous reports found for this patient/i),
    ).toBeInTheDocument()
  })

  it('should display uploaded jpg file as pop up in the screen when clicked and post audit log message', async () => {
    localStorage.setItem(loggedInUserKey, 'superman')
    localStorage.setItem(isAuditLogEnabledKey, 'true')
    render(
      <SWRConfig value={{provider: () => new Map()}}>
        <BrowserRouter>
          <ReportTable patientUuid={mockPatientUuid} />
        </BrowserRouter>
      </SWRConfig>,
    )

    await waitFor(() => {
      expect(screen.getByText(/Reports table/i)).toBeInTheDocument()
    })
    expect(screen.getByTitle(/report-table/i)).toBeInTheDocument()
    expect(
      screen.getByRole('cell', {name: 'Systolic blood pressure'}),
    ).toBeInTheDocument()
    expect(screen.getByRole('presentation')).toHaveClass('bx--modal')

    userEvent.click(
      screen.getByRole('button', {
        name: 'MP Report.jpg',
      }),
    )

    await waitFor(() => {
      expect(screen.getByRole('presentation')).toHaveClass(
        'bx--modal is-visible',
      )
    })
    expect(screen.getByAltText('MP Report.jpg')).toHaveClass('image')

    expect(mockedOpenmrsFetch).toBeCalledTimes(2)
    verifyApiCall(
      auditLogURL,
      'POST',
      JSON.stringify(
        getPayloadForViewingPatientReport(
          'superman',
          'uuid-1',
          '10005V1',
          'MP Report',
          'May 24, 2022',
          'Systolic blood pressure',
        ),
      ),
    )

    userEvent.click(
      screen.getByRole('button', {
        name: /close/i,
      }),
    )

    await waitFor(() => {
      expect(screen.getByRole('presentation')).toHaveClass('bx--modal')
    })
  })

  it('should display uploaded pdf file and post audit log message', async () => {
    localStorage.setItem(loggedInUserKey, 'superman')
    localStorage.setItem(isAuditLogEnabledKey, 'true')
    when(usePagination)
      .calledWith(expect.anything(), 5)
      .mockReturnValue({
        results: [
          {
            id: '1178aaed-e352-48f8-8685-4ae8d17d732e',
            tests: 'Systolic blood pressure',
            url:
              'https://bahmni.atlassian.net/wiki/pages/viewpageattachments.action?pageId=2870280206&preview=%2F2870280206%2F2959572999%2FPDFReportServlet%20-%20139900.pdf',
            date: 'May 24, 2022',
            requester: 'Superman',
            file: 'MP Report.pdf',
            conclusion: 'sample conclusion',
          },
        ],
        goTo: jest.fn(),
        currentPage: 1,
      })
    render(
      <SWRConfig value={{provider: () => new Map()}}>
        <BrowserRouter>
          <ReportTable patientUuid={mockPatientUuid} />
        </BrowserRouter>
      </SWRConfig>,
    )

    await waitFor(() => {
      expect(screen.getByText(/Reports table/i)).toBeInTheDocument()
    })
    expect(screen.getByTitle(/report-table/i)).toBeInTheDocument()
    expect(
      screen.getByRole('cell', {name: 'Systolic blood pressure'}),
    ).toBeInTheDocument()
    userEvent.click(
      screen.getByRole('link', {
        name: /mp report\.pdf/i,
      }),
    )

    await waitFor(() => expect(mockedOpenmrsFetch).toBeCalledTimes(2))

    verifyApiCall(
      auditLogURL,
      'POST',
      JSON.stringify(
        getPayloadForViewingPatientReport(
          'superman',
          'uuid-1',
          '10005V1',
          'MP Report',
          'May 24, 2022',
          'Systolic blood pressure',
        ),
      ),
    )
  })
})
