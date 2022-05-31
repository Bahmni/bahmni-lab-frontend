import {
  Accordion,
  AccordionItem,
  Checkbox,
  Search,
  Tag,
} from 'carbon-components-react'
import React, {useEffect, useState} from 'react'
import useSWR from 'swr'
import {useSelectedTests} from '../context/upload-report-context'
import Loader from '../loader/loader.component'
import {LabTest} from '../types/selectTest'
import {fetcher, getLabTests} from '../utils/api-utils'
import styles from './select-test.scss'

const SelectTest = ({isDiscardButtonClicked}) => {
  const [searchResults, setSearchResults] = useState<Array<LabTest>>([])
  const [totalTests, setTotalTests] = useState<Array<LabTest>>([])
  const [searchValue, setSearchValue] = useState<string>()
  const [isAvailableTestsClicked, setIsAvailableTestsClicked] = useState<
    boolean
  >(true)
  const {selectedTests, setSelectedTests} = useSelectedTests()
  const [totalPanels, setTotalPanels] = useState<Array<LabTest>>([])
  const [allTestsAndPanels, setAllTestsAndPanels] = useState<Array<LabTest>>([])

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
      setSearchResults(allTestsAndPanels)
  }, [searchValue, searchResults, selectedTests])

  useEffect(() => {
    searchResults.length === 0 &&
      labTestResults?.data?.results[0]?.setMembers?.map(sample => {
        sample.setMembers.map((tests: LabTest) => {
          if (tests.conceptClass?.name == 'LabTest') {
            setTotalTests(totalTest => [...totalTest, tests])
          } else if (tests.conceptClass?.name == 'LabSet') {
            setTotalPanels(panel => [...panel, tests])
          }
          setSearchResults(searchResults => [...searchResults, tests])
          setAllTestsAndPanels(searchResults => [...searchResults, tests])
        })
      })
  }, [labTestResults])

  useEffect(() => {
    if (searchValue) {
      const filteredTestsAndPanels = allTestsAndPanels.filter(test =>
        test.name.display.toLowerCase().includes(searchValue.toLowerCase()),
      )
      filterSearchResults(filteredTestsAndPanels)
    } else {
      filterSearchResults(allTestsAndPanels)
    }
  }, [searchValue])

  const isCommonTestPresent = (
    filteredTest: LabTest,
    selectedTest: LabTest,
  ) => {
    return filteredTest?.name?.display === selectedTest?.name?.display
  }

  const isLabTest = (test: LabTest) => test.conceptClass.name == 'LabTest'

  const removeSelectedPanels = (
    updatedSearchResults: Array<LabTest>,
    selectedPanelName: Array<string>,
  ) =>
    updatedSearchResults.filter(
      test => !selectedPanelName.includes(test.name.display),
    )

  const filterSearchResults = (labTests: Array<LabTest>) => {
    if (selectedTests.length > 0) {
      let updatedSearchResults = []
      for (let labTest of labTests) {
        let isSelectedTestPresent = false
        let selectedPanelName = []
        for (let selectedTest of selectedTests) {
          if (isLabTest(selectedTest)) {
            if (isCommonTestPresent(labTest, selectedTest)) {
              isSelectedTestPresent = true
              break
            }
          } else if (!isLabTest(selectedTest)) {
            selectedPanelName.push(selectedTest.name.display)
            for (let selectedPanel of selectedTest.setMembers) {
              if (isCommonTestPresent(labTest, selectedPanel)) {
                isSelectedTestPresent = true
                break
              }
            }
          }
        }
        if (!isSelectedTestPresent) {
          updatedSearchResults.push(labTest)
        }
        updatedSearchResults = removeSelectedPanels(
          updatedSearchResults,
          selectedPanelName,
        )
      }
      setSearchResults(updatedSearchResults)
    } else setSearchResults(labTests)
  }

  const handleClear = () => {
    if (selectedTests.length > 0) {
      filterSearchResults(allTestsAndPanels)
    } else setSearchResults(allTestsAndPanels)
  }

  const filterTests = (tests: Array<LabTest>, testToRemove: LabTest) =>
    tests.filter((test: LabTest) => !isCommonTestPresent(test, testToRemove))

  const removeSelectedTest = (test: LabTest) => {
    const remainingTests = filterTests(searchResults, test)
    if (!isLabTest(test)) {
      let listOfSelectedTests = selectedTests
      for (let testInPanel of test.setMembers) {
        let isTestInPanel = false
        for (let labTest of selectedTests) {
          if (isCommonTestPresent(testInPanel, labTest)) {
            isTestInPanel = true
            break
          }
        }
        if (isTestInPanel)
          listOfSelectedTests = filterTests(listOfSelectedTests, testInPanel)
      }
      setSelectedTests(listOfSelectedTests)
      removeTestsInPanel(test, remainingTests)
    } else setSearchResults(remainingTests)
    setSelectedTests((selectedTest: Array<LabTest>) => [...selectedTest, test])
  }

  const handleSelect = (selectedTest: LabTest) => {
    removeSelectedTest(selectedTest)
  }

  const removeTestsInPanel = (
    selectedTest: LabTest,
    remainingTests: Array<LabTest>,
  ) => {
    let tests = remainingTests
    for (let filteredTest of selectedTest.setMembers) {
      let isSelectedTestPresent = false
      for (let searchResult of tests) {
        if (isCommonTestPresent(filteredTest, searchResult)) {
          isSelectedTestPresent = true
          break
        }
      }
      if (isSelectedTestPresent) {
        tests = filterTests(tests, filteredTest)
      }
    }
    setSearchResults(tests)
  }

  const handleUnselect = (unselectedTest: LabTest) => {
    updateSearchResultOnUnselect(unselectedTest)
    setSelectedTests(filterTests(selectedTests, unselectedTest))
    addTestsInPanel(unselectedTest)
  }

  const isTestHavingSearchValue = test =>
    test.name.display.toLowerCase().includes(searchValue?.toLowerCase())

  const updateSearchResultOnUnselect = (unselectedTest: LabTest) =>
    (isTestHavingSearchValue(unselectedTest) || !searchValue) &&
    setSearchResults(searchResults => [...searchResults, unselectedTest])

  const addTestsInPanel = unselectedTest => {
    if (!isLabTest(unselectedTest))
      unselectedTest.setMembers.map((test: LabTest) => {
        if (
          isTestHavingSearchValue(test) &&
          searchResults.find(
            searchResult => !isCommonTestPresent(searchResult, test),
          )
        )
          setSearchResults(searchResults => [...searchResults, test])
      })
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
          <div style={{display: 'flex'}}>
            <Checkbox
              id={searchResult.name.uuid}
              key={`${searchResult.name.uuid}${index}`}
              labelText={searchResult.name.display}
              onChange={() => handleSelect(searchResult)}
            />
            {searchResult.conceptClass.name == 'LabSet' && (
              <Tag
                className="some-class"
                size="sm"
                title="Clear Filter"
                type="blue"
              >
                Panel
              </Tag>
            )}
          </div>
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
          <div style={{display: 'flex'}}>
            <Checkbox
              id={selectedTest.name.uuid}
              checked={true}
              key={`${selectedTest.name.uuid}${index}`}
              labelText={selectedTest.name.display}
              onChange={() => handleUnselect(selectedTest)}
            />
            {selectedTest.conceptClass.name == 'LabSet' && (
              <Tag
                className="some-class"
                size="sm"
                title="Clear Filter"
                type="blue"
              >
                Panel
              </Tag>
            )}
          </div>
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
          className={isAvailableTestsClicked && styles.accordionItem}
          data-testid="available-tests"
          title={`Available Tests ( ${searchResults.length -
            selectedTests.length} )`}
          open={isAvailableTestsClicked}
          children={renderSearchResults()}
          onClick={() => setIsAvailableTestsClicked(!isAvailableTestsClicked)}
        />

        <AccordionItem
          className={styles.accordionItem}
          data-testid="selected-tests"
          title={`Selected Tests ( ${selectedTests.length} )`}
          open={true}
          children={renderSelectedTests()}
        />
      </Accordion>
    </>
  )
}

export default SelectTest
