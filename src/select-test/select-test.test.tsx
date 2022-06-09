import {openmrsFetch} from '@openmrs/esm-framework'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import {SWRConfig} from 'swr'
import PendingLabOrdersProvider from '../context/pending-orders-context'
import {UploadReportProvider} from '../context/upload-report-context'
import {
  mockLabTestsErrorResponse,
  mockLabTestsPendingResponse,
  mockLabTestsResponse,
} from '../__mocks__/selectTests.mock'
import SelectTest from './select-test'

describe('Select Test', () => {
  beforeEach(() => jest.clearAllMocks())
  it('should show tests in available tests', async () => {
    mockOpenmrsApi()
    await renderSelectTestComponent()

    await waitFor(() =>
      expect(screen.getByText('Available Tests ( 4 )')).toBeInTheDocument(),
    )

    expect(screen.getByTestId(/available-tests/i)).toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )
  })

  it('should display error message when call for lab result is unsuccessful', async () => {
    const mockedOpenmrsFetch = openmrsFetch as jest.Mock
    mockedOpenmrsFetch.mockRejectedValueOnce(mockLabTestsErrorResponse)

    await renderSelectTestComponent()

    await waitFor(() => {
      expect(
        screen.getByText(/Something went wrong in fetching Lab Tests/i),
      ).toBeInTheDocument()
    })
  })

  it('should show loader when fetching lab result data', async () => {
    mockOpenmrsApi(mockLabTestsPendingResponse)
    await renderSelectTestComponent(false)

    expect(screen.getByText(/loading \.\.\./i)).toBeInTheDocument()
  })

  it('should move test from available to selected list when selecting a test', async () => {
    mockOpenmrsApi()
    await renderSelectTestComponent()

    userEvent.click(
      screen.getByRole('checkbox', {name: /Absolute Eosinphil Count/i}),
    )

    expect(screen.getByText('Available Tests ( 3 )')).toBeInTheDocument()
    expect(screen.getByText('Selected Tests ( 1 )')).toBeInTheDocument()
    expect(screen.getByTestId(/selected-tests/i)).toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )
  })
  it('should filter tests based on search value', async () => {
    mockOpenmrsApi()
    await renderSelectTestComponent()

    expect(screen.getByTestId(/available-tests/i)).toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )
    expect(screen.getByTestId(/available-tests/i)).toHaveTextContent(
      /Haemoglobin/i,
    )

    userEvent.type(screen.getByRole('searchbox', {name: /search/i}), 'ab')
    expect(screen.getByText(/1 items matching/i)).toBeVisible()
    expect(screen.getByText('ab')).toBeInTheDocument()
    expect(screen.getByTestId(/available-tests/i)).toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )
    expect(screen.queryByTestId(/available-tests/i)).not.toHaveTextContent(
      /Haemoglobin/i,
    )
  })

  it('should show message when search value has no matching tests', async () => {
    mockOpenmrsApi()
    await renderSelectTestComponent()

    userEvent.type(screen.getByRole('searchbox', {name: /search/i}), 'abc')

    expect(screen.getByText(/No matching tests found/i)).toBeInTheDocument()
  })

  it('should move test from selected to available when unselecting a test', async () => {
    mockOpenmrsApi()
    await renderSelectTestComponent()

    userEvent.click(
      screen.getByRole('checkbox', {name: /Absolute Eosinphil Count/i}),
    )

    expect(screen.getByText('Selected Tests ( 1 )')).toBeInTheDocument()
    expect(screen.getByTestId(/selected-tests/i)).toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )
    expect(screen.queryByTestId(/available-tests/i)).not.toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )

    userEvent.click(
      screen.getByRole('checkbox', {name: /Absolute Eosinphil Count/i}),
    )

    expect(screen.getByTestId(/available-tests/i)).toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )
    expect(screen.queryByTestId(/selected-tests/i)).not.toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )

    expect(screen.getByText('Selected Tests ( 0 )')).toBeInTheDocument()
    expect(
      screen.getByText(/You have not selected any tests/i),
    ).toBeInTheDocument()
  })
  it('should not include unselected test if it does not contains search value', async () => {
    mockOpenmrsApi()
    await renderSelectTestComponent()

    userEvent.click(
      screen.getByRole('checkbox', {name: /Absolute Eosinphil Count/i}),
    )

    expect(screen.getByTestId(/selected-tests/i)).toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )

    userEvent.type(
      screen.getByRole('searchbox', {name: /search/i}),
      'haemoglobin',
    )

    expect(screen.getByTestId(/available-tests/i)).toHaveTextContent(
      /haemoglobin/i,
    )

    userEvent.click(
      screen.getByRole('checkbox', {name: /Absolute Eosinphil Count/i}),
    )

    expect(
      screen.queryByRole('checkbox', {name: /Absolute Eosinphil Count/i}),
    ).not.toBeInTheDocument()

    expect(screen.getByText('Selected Tests ( 0 )')).toBeInTheDocument()
    expect(
      screen.getByText(/You have not selected any tests/i),
    ).toBeInTheDocument()
  })
  it('should include unselected test if it contains search value', async () => {
    mockOpenmrsApi()
    await renderSelectTestComponent()

    userEvent.click(
      screen.getByRole('checkbox', {name: /Absolute Eosinphil Count/i}),
    )
    expect(screen.getByTestId(/selected-tests/i)).toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )

    userEvent.type(screen.getByRole('searchbox', {name: /search/i}), 'ab')
    userEvent.click(
      screen.getByRole('checkbox', {name: /Absolute Eosinphil Count/i}),
    )

    expect(screen.getByTestId(/available-tests/i)).toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )
    expect(screen.getByText('Selected Tests ( 0 )')).toBeInTheDocument()
    expect(
      screen.getByText(/You have not selected any tests/i),
    ).toBeInTheDocument()
  })

  it('should load all the test on clearing search value', async () => {
    mockOpenmrsApi()
    await renderSelectTestComponent()

    userEvent.type(screen.getByRole('searchbox', {name: /search/i}), 'ab')
    expect(screen.getByTestId(/available-tests/i)).toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )
    expect(screen.queryByTestId(/available-tests/i)).not.toHaveTextContent(
      /Haemoglobin/i,
    )

    userEvent.click(screen.getByRole('button', {name: /clear search input/i}))

    expect(screen.getByTestId(/available-tests/i)).toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )
    expect(screen.getByTestId(/available-tests/i)).toHaveTextContent(
      /Haemoglobin/i,
    )
  })
  it('should exclude selected in available test test on clearing search value', async () => {
    mockOpenmrsApi()
    await renderSelectTestComponent()

    userEvent.click(
      screen.getByRole('checkbox', {name: /Absolute Eosinphil Count/i}),
    )

    userEvent.type(screen.getByRole('searchbox', {name: /search/i}), 'ab')

    expect(screen.queryByTestId(/available-tests/i)).not.toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )

    userEvent.click(screen.getByRole('button', {name: /clear search input/i}))

    expect(screen.queryByTestId(/available-tests/i)).not.toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )
    expect(screen.getByTestId(/selected-tests/i)).toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )
    expect(screen.getByTestId(/available-tests/i)).toHaveTextContent(
      /Haemoglobin/i,
    )
  })
  it('should show panel tag against each panel', async () => {
    mockOpenmrsApi()
    await renderSelectTestComponent()

    const panelCount = screen.getAllByTitle(/panel/i).length
    expect(panelCount).toBe(2)
  })

  it('should update available tests when user selects a panel', async () => {
    mockOpenmrsApi()
    await renderSelectTestComponent()

    userEvent.click(screen.getByRole('checkbox', {name: /TLC/i}))

    expect(screen.queryByTestId(/available-tests/i)).not.toHaveTextContent(
      /TLC/i,
    )
    expect(screen.getByText('Available Tests ( 2 )')).toBeInTheDocument()
    expect(screen.getByText('Selected Tests ( 1 )')).toBeInTheDocument()
  })

  it('should not display test in both lists when user selects a test and a panel containing the same test', async () => {
    mockOpenmrsApi()
    await renderSelectTestComponent()

    userEvent.click(
      screen.getByRole('checkbox', {name: /Absolute Eosinphil Count/i}),
    )

    expect(screen.getByTestId(/selected-test/i)).toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )
    userEvent.click(screen.getByRole('checkbox', {name: /TLC/i}))

    expect(
      screen.queryByText(/Absolute Eosinphil Count/i),
    ).not.toBeInTheDocument()
    expect(screen.getByText('Available Tests ( 2 )')).toBeInTheDocument()
  })

  it('should display tests in panel when user unselects a panel', async () => {
    mockOpenmrsApi()
    await renderSelectTestComponent()

    userEvent.click(screen.getByRole('checkbox', {name: /TLC/i}))
    expect(screen.getByText('Available Tests ( 2 )')).toBeInTheDocument()

    userEvent.click(screen.getByRole('checkbox', {name: /TLC/i}))

    expect(screen.getByText('Available Tests ( 4 )')).toBeInTheDocument()
    expect(screen.getByTestId(/available-tests/i)).toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )
    expect(screen.getByTestId(/available-tests/i)).toHaveTextContent(
      /Total Leucocyte Count/i,
    )
  })

  it('should show test in available list if user unselects multiple panels that contains the common test', async () => {
    mockOpenmrsApi()
    await renderSelectTestComponent()

    userEvent.click(screen.getByRole('checkbox', {name: /TLC/i}))
    userEvent.click(screen.getByRole('checkbox', {name: /Anaemia Panel/i}))

    userEvent.click(screen.getByRole('checkbox', {name: /Anaemia Panel/i}))

    expect(screen.queryByTestId(/available-tests/i)).not.toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )
    expect(screen.getByTestId(/available-tests/i)).toHaveTextContent(
      /Haemoglobin/i,
    )

    userEvent.click(screen.getByRole('checkbox', {name: /TLC/i}))

    expect(screen.getByTestId(/available-tests/i)).toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )
  })

  it('should show test in available list if test matches the search value on unselecting multiple panels that contains the common test', async () => {
    mockOpenmrsApi()
    await renderSelectTestComponent()

    userEvent.click(screen.getByRole('checkbox', {name: /TLC/i}))
    userEvent.click(screen.getByRole('checkbox', {name: /Anaemia Panel/i}))

    userEvent.type(screen.getByRole('searchbox', {name: /search/i}), 'ab')
    expect(screen.queryByTestId(/available-tests/i)).not.toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )

    userEvent.click(screen.getByRole('checkbox', {name: /Anaemia Panel/i}))

    expect(screen.queryByTestId(/available-tests/i)).not.toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )

    userEvent.click(screen.getByRole('checkbox', {name: /TLC/i}))
    expect(screen.getByTestId(/available-tests/i)).toHaveTextContent(
      /Absolute Eosinphil Count/i,
    )
  })
})

const waitForLoaderToComplete = async () =>
  await waitFor(() =>
    expect(screen.queryByText(/loading \.\.\./i)).not.toBeInTheDocument(),
  )

async function renderSelectTestComponent(waitForLoader: boolean = true) {
  renderWithContextProvider(
    <SWRConfig value={{provider: () => new Map()}}>
      <SelectTest isDiscardButtonClicked={false} />
    </SWRConfig>,
  )
  if (waitForLoader) await waitForLoaderToComplete()
}

function mockOpenmrsApi(apiResponse: any = mockLabTestsResponse) {
  const mockedOpenmrsFetch = openmrsFetch as jest.Mock
  mockedOpenmrsFetch.mockResolvedValue(apiResponse)
}

function renderWithContextProvider(children) {
  return render(
    <PendingLabOrdersProvider>
      <UploadReportProvider>{children}</UploadReportProvider>
    </PendingLabOrdersProvider>,
  )
}
