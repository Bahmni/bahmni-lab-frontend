import {
  Accordion,
  AccordionItem,
  Checkbox,
  Search,
} from 'carbon-components-react'
import React, {useEffect, useState} from 'react'
import useSWR from 'swr'
import {useSelectedTests} from '../context/upload-report-context'
import Loader from '../loader/loader.component'
import {LabTest} from '../types/selectTest'
import {fetcher, getLabTests} from '../utils/api-utils'
import styles from './select-test.scss'

const SelectTest = ({
  isDiscardButtonClicked,
  selectedPendingTest,
  selectedPendingTestDispatch,
  removedRow,
}) => {
  const [searchResults, setSearchResults] = useState<Array<LabTest>>([])
  const [totalTests, setTotalTests] = useState<Array<LabTest>>([])
  const [searchValue, setSearchValue] = useState<string>()
  const [isAvailableTestsClicked, setIsAvailableTestsClicked] = useState<
    boolean
  >(true)
  const {selectedTests, setSelectedTests} = useSelectedTests()

  const {data: labTestResults, error: labTestResultsError} = useSWR<any, Error>(
    getLabTests,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  useEffect(() => {
    isDiscardButtonClicked && setSearchValue('')
  }, [isDiscardButtonClicked])

  useEffect(() => {
    if (
      searchResults.length === 0 &&
      selectedTests.length === 0 &&
      !searchValue
    )
      setSearchResults(totalTests)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, searchResults, selectedTests, selectedPendingTest])

  useEffect(() => {
    const allTests: Array<LabTest> = []
    searchResults.length === 0 &&
      labTestResults?.data?.results[0]?.setMembers?.map(sample => {
        sample.setMembers.map(tests => {
          if (tests.conceptClass?.name == 'LabTest') {
            allTests.push(tests)
          }
        })
      })
    setSearchResults(allTests)
    setTotalTests(allTests)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labTestResults])

  useEffect(() => {
    const allTests: Array<LabTest> = []
    labTestResults?.data?.results[0]?.setMembers?.map(sample => {
      sample.setMembers.map(tests => {
        if (tests.conceptClass?.name == 'LabTest') {
          allTests.push(tests)
        }
      })
    })
    const initialSelectedFromOrdersTable = allTests.filter(
      pendingOrderTest =>
        selectedPendingTest.findIndex(
          tempPendingTest =>
            tempPendingTest.conceptUuid === pendingOrderTest.uuid,
        ) > -1,
    )
    initialSelectedFromOrdersTable.forEach(selectedTest =>
      handleSelect(selectedTest),
    )
    if (selectedPendingTest.length > 0)
      setSearchResults(prevSearchResults => {
        if (prevSearchResults.length > 0) {
          return prevSearchResults.filter(
            pendingOrderTest =>
              selectedPendingTest.findIndex(
                tempPendingTest =>
                  tempPendingTest.conceptUuid === pendingOrderTest.uuid,
              ) === -1,
          )
        } else {
          return allTests.filter(
            pendingOrderTest =>
              selectedPendingTest.findIndex(
                tempPendingTest =>
                  tempPendingTest.conceptUuid === pendingOrderTest.uuid,
              ) === -1,
          )
        }
      })
    setSelectedTests(prev => {
      const allSelected = [...prev, ...initialSelectedFromOrdersTable]
      const uniqueRows = allSelected.filter(
        (value, index, a) =>
          a.findIndex(v2 => v2.uuid === value.uuid) === index,
      )
      return uniqueRows.filter(row => row.uuid != removedRow?.conceptUuid)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPendingTest, labTestResults, removedRow])

  useEffect(() => {
    if (searchValue) {
      const filteredTests = totalTests.filter(test =>
        test.name.display.toLowerCase().includes(searchValue.toLowerCase()),
      )
      filterSearchResults(filteredTests)
    } else {
      filterSearchResults(totalTests)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  const filterSearchResults = (labTests: Array<LabTest>) => {
    if (selectedTests.length > 0) {
      const tests = []
      for (let filteredTest of labTests) {
        let isSelectedTestPresent = true
        for (let selectedTest of selectedTests) {
          if (filteredTest?.name?.display !== selectedTest?.name?.display)
            isSelectedTestPresent = false
          else {
            isSelectedTestPresent = true
            break
          }
        }
        if (!isSelectedTestPresent) tests.push(filteredTest)
      }
      setSearchResults(tests)
    } else setSearchResults([...labTests])
  }

  const handleClear = () => {
    if (selectedTests.length > 0) {
      filterSearchResults(totalTests)
    } else setSearchResults([...totalTests])
  }

  const handleSelect = (selectedTest: LabTest) => {
    setSelectedTests(prev => [...prev, selectedTest])
    setSearchResults(
      searchResults.filter(
        (availableTest: LabTest) =>
          availableTest?.name?.display !== selectedTest?.name?.display,
      ),
    )
  }

  const updateSearchResultOnUnselect = (unselectedTest: LabTest) =>
    (unselectedTest.name.display
      .toLowerCase()
      .includes(searchValue?.toLowerCase()) ||
      !searchValue) &&
    setSearchResults(searchResults => [...searchResults, unselectedTest])

  const handleUnselect = (unselectedTest: LabTest) => {
    selectedPendingTestDispatch({
      type: 'unchecked-overlay',
      currentRow: unselectedTest,
    })
    updateSearchResultOnUnselect(unselectedTest)
    setSelectedTests(
      selectedTests?.filter(
        (selectedTest: LabTest) =>
          selectedTest.name.display !== unselectedTest.name.display,
      ),
    )
  }

  const showSearchCount = () => {
    if (searchResults.length > 0) {
      return (
        <>
          {searchResults.length} items matching "
          <p className={styles.bold}>{searchValue}</p>"
        </>
      )
    }
    return 'No matching tests found'
  }

  const renderSearchResults = () => {
    return (
      <>
        <div className={searchValue && styles.searchValue}>
          {searchValue && showSearchCount()}
        </div>

        {searchResults.map((searchResult, index) => (
          <Checkbox
            id={searchResult.name.uuid}
            key={`search-${searchResult.name.uuid}-${index}`}
            labelText={searchResult.name.display}
            onChange={() => handleSelect(searchResult)}
          />
        ))}
      </>
    )
  }

  const renderSelectedTests = () => {
    if (selectedTests.length == 0)
      return <div className={'bx--label'}>You have not selected any tests</div>
    return (
      <div>
        {selectedTests.map((selectedTest, index) => (
          <Checkbox
            id={selectedTest.name.uuid}
            checked={true}
            key={`selected-${selectedTest.name.uuid}${index}`}
            labelText={selectedTest.name.display}
            onChange={() => handleUnselect(selectedTest)}
          />
        ))}
      </div>
    )
  }

  if (labTestResultsError)
    return <h3>Something went wrong in fetching Lab Tests</h3>
  if (!labTestResultsError && !labTestResults) return <Loader />
  return (
    <>
      <p className={'bx--label'}>Select Tests</p>
      <div className={styles.searchTests}>
        <p className={'bx--label'}>Search</p>
        <Search
          labelText="search"
          value={searchValue}
          onChange={e => {
            setSearchValue(e.target.value)
          }}
          placeholder="Search by lab test name"
          onClear={handleClear}
        />
      </div>

      <Accordion>
        <AccordionItem
          className={isAvailableTestsClicked ? styles.accordionItem : ''}
          key={`available-tests-${totalTests.length}-${selectedTests.length}`}
          data-testid="available-tests"
          title={`Available Tests ( ${totalTests.length -
            selectedTests.length} )`}
          open={isAvailableTestsClicked}
          children={renderSearchResults()}
          onClick={() => setIsAvailableTestsClicked(!isAvailableTestsClicked)}
        />

        <AccordionItem
          data-testid="selected-tests"
          key={`selected-tests-${totalTests.length}-${selectedTests.length}`}
          title={`Selected Tests ( ${selectedTests.length} )`}
          open={true}
          children={renderSelectedTests()}
        />
      </Accordion>
    </>
  )
}

export default SelectTest
