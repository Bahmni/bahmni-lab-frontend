import { openmrsFetch, useLayoutType } from '@openmrs/esm-framework'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { SWRConfig } from 'swr'
import { mockDoctorNames } from '../../__mocks__/doctorNames.mock'
import {
  mockAlltestAndPanels,
  mockLabTestsResponse
} from '../../__mocks__/selectTests.mock'
import { LabTestResultsProvider } from '../../context/lab-test-results-context'
import PendingLabOrdersProvider from '../../context/pending-orders-context'
import { UploadReportProvider } from '../../context/upload-report-context'
import { localStorageMock } from '../../utils/test-utils'
import TestResults from './test-results'
jest.mock('../../context/lab-test-results-context', () => ({
  ...jest.requireActual('../../context/lab-test-results-context'),
  useLabTestResultsContext: jest.fn(() => ({
    labTestResults: mockLabTestsResponse,
    labTestResultsError: undefined,
  })),
  useAllTestAndPanel: jest.fn(() => ({
    allTestsAndPanels: mockAlltestAndPanels,
  })),
}))

describe('TestResults Report', () => {
  const saveHandler = jest.fn()
  const closeHandler = jest.fn()
  beforeEach(() => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'bahmni.user.location={"uuid":"locationuuid123"}',
    })
    Object.defineProperty(window, 'localStorage', {value: localStorageMock})
  })
  afterEach(() => {
    jest.clearAllMocks(), localStorage.clear()
  })
  it('should close the side panel on click of close button', () => {
    localStorage.setItem('i18nextLng', 'en')
    const mockedLayout = useLayoutType as jest.Mock
    mockedLayout.mockReturnValue('desktop')
    renderWithContextProvider(
      <LabTestResultsProvider>
        <TestResults
          closeHandler={closeHandler}
          saveHandler={saveHandler}
          header={'Test Header'}
          patientUuid={'123'}
        />
      </LabTestResultsProvider>,
    )
    userEvent.click(screen.getByLabelText('close-icon'))
    expect(closeHandler).toBeCalled()
  })
  it('should reset the value on click of discard button', async () => {
    localStorage.setItem('i18nextLng', 'en')
    const mockedLayout = useLayoutType as jest.Mock
    mockedLayout.mockReturnValue('desktop')
    renderWithContextProvider(
      <SWRConfig value={{provider: () => new Map()}}>
        <LabTestResultsProvider>
          <TestResults
            saveHandler={saveHandler}
            closeHandler={closeHandler}
            header={'Test Header'}
            patientUuid={'123'}
          />
        </LabTestResultsProvider>
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
    userEvent.click(screen.getByRole('button', {name: /discard/i}))
    expect(
      screen.getByRole('textbox', {
        name: /report date/i,
      }),
    ).not.toHaveValue(currentDay)
    expect(
      screen.getByRole('button', {
        name: /Click to record clinical conclusion/i,
      }),
    ).not.toHaveValue('Normal Report')
  })
  it('should not allow user to select future dates', async () => {
    localStorage.setItem('i18nextLng', 'en')
    const mockedLayout = useLayoutType as jest.Mock
    mockedLayout.mockReturnValue('desktop')
    renderWithContextProvider(
      <TestResults
        closeHandler={closeHandler}
        saveHandler={saveHandler}
        header={'Test Header'}
        patientUuid={'123'}
      />,
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
    <LabTestResultsProvider>
      <PendingLabOrdersProvider>
        <UploadReportProvider>{children}</UploadReportProvider>
      </PendingLabOrdersProvider>
    </LabTestResultsProvider>,
  )
}
