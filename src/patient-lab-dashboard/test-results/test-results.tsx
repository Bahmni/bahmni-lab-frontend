import {
  Button,
  Checkbox,
  DatePicker,
  DatePickerInput,
  Dropdown,
  TextArea,
  TextInput,
} from 'carbon-components-react'
import dayjs from 'dayjs'
import React, {useEffect, useState} from 'react'
import useSWR from 'swr'
import Overlay from '../../common/overlay'
import {usePendingLabOrderContext} from '../../context/pending-orders-context'
import {useDoctorDetails} from '../../context/upload-report-context'
import styles from './test-results.scss'
import {fetcher, getTestResults, swrOptions} from '../../utils/api-utils'
import {getTestName} from '../../utils/helperFunctions'
import DoctorListDropdown from '../doctors-list-dropdown/doctor-list-dropdown'
import {saveTestDiagnosticReport} from '../upload-report/upload-report.resources'
import {TestResultsLabOrder} from '../../types'
import {useAllTestAndPanel} from '../../context/lab-test-results-context'
import {useTranslation} from 'react-i18next'

interface TestResultProps {
  saveHandler: Function
  closeHandler: Function
  header: string
  patientUuid: string
}

const TestResults: React.FC<TestResultProps> = ({
  saveHandler,
  closeHandler,
  header,
  patientUuid,
}) => {
  const locale: Object = localStorage.getItem('i18nextLng')
  const currentDate: string = dayjs().format('MM/DD/YYYY')
  const [reportDate, setReportDate] = useState<Date>(null)
  const [reportConclusion, setReportConclusion] = useState<string>('')
  const {doctor, setDoctor} = useDoctorDetails()
  const [answer, setAnswer] = useState(new Map())
  const maxCount: number = 500
  const {t} = useTranslation()
  const {
    selectedPendingOrder,
    setSelectedPendingOrder,
  } = usePendingLabOrderContext()
  const [showReportConclusionLabel, setShowReportConclusionLabel] = useState<
    boolean
  >(true)
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false)
  const [labResult, setLabResult] = useState(new Map())
  const testResultData = []
  const [selectedTests, setSelectedTests] = useState([])
  const {allTestsAndPanels} = useAllTestAndPanel()
  useEffect(() => {
    const filteredTests = allTestsAndPanels.filter(
      pendingOrderTest =>
        selectedPendingOrder.findIndex(
          tempPendingTest =>
            tempPendingTest?.conceptUuid === pendingOrderTest.uuid,
        ) > -1,
    )
    setSelectedTests(filteredTests)
  }, [selectedPendingOrder, allTestsAndPanels])
  const handleDiscard = () => {
    setReportDate(null)
    setReportConclusion('')
    setSelectedTests([])
    setDoctor(null)
    setShowReportConclusionLabel(true)
    setLabResult(new Map())
    setAnswer(new Map())
  }

  selectedPendingOrder.forEach(selectedPendingOrder => {
    // eslint-disable-next-line
    const {data: testResults, error: testResultsError} = useSWR<
      TestResultsLabOrder,
      Error
    >(getTestResults(selectedPendingOrder.conceptUuid), fetcher, swrOptions)
    testResultData.push(testResults)
  })

  const isDisabled = () =>
    !reportDate || !doctor || !isValidDataPresent() || isSaveButtonClicked

  const getTestData = test => {
    const matchingData = testResultData.find(
      item => item.data.uuid === test.uuid,
    )

    if (matchingData) {
      const dataType =
        matchingData.data.setMembers.length > 0
          ? matchingData.data.setMembers.map(member => member.datatype)
          : [matchingData.data.datatype]
      return dataType
    }
    return []
  }

  const isInvalid = test => {
    if (
      labResult.get(test.uuid)?.value &&
      labResult.get(test.uuid)?.value !== ''
    ) {
      const datatype = test?.datatype.name
      if (datatype === 'Numeric' && isNaN(labResult.get(test.uuid)?.value)) {
        return true
      }
    }
    return false
  }

  const isValidDataPresent = () => {
    if (labResult.size == 0) return false

    for (let mapEntry of labResult.values()) {
      if (mapEntry.value === '') return false
    }

    for (let index = 0; index < testResultData.length; index++) {
      for (let mapEntry of labResult.keys()) {
        if (testResultData[index].data.uuid === mapEntry) {
          if (isInvalid(testResultData[index].data)) {
            return false
          }
        }
      }
    }

    return true
  }

  const renderButtonGroup = () => (
    <div className={styles.overlayButtons}>
      <Button onClick={handleDiscard} kind="secondary" size="lg">
        {t('DISCARD_LABEL', 'Discard')}
      </Button>
      <Button
        onClick={() => {
          setIsSaveButtonClicked(true), saveTestResults(), closeHandler()
        }}
        size="lg"
        disabled={isDisabled()}
      >
        {t('SAVE_AND_UPLOAD_LABEL', 'Save and Upload')}
      </Button>
    </div>
  )
  const saveTestResults = async () => {
    const ac = new AbortController()
    let allSuccess: boolean = true
    try {
      for (let index = 0; index < selectedTests.length; index++) {
        const response = await saveTestDiagnosticReport(
          undefined,
          patientUuid,
          doctor.uuid,
          selectedTests[index],
          reportDate,
          reportConclusion,
          ac,
          selectedPendingOrder[index],
          labResult,
          getTestData(selectedTests[index]),
        )
        if (allSuccess && !response.ok) {
          allSuccess = false
          break
        }
      }
    } catch (e) {
      allSuccess = false
    }
    if (allSuccess) {
      saveHandler(true)
      setSelectedPendingOrder([])
    } else {
      saveHandler(false)
    }
  }

  const getTestNameWithUnits = test => {
    return test.hiNormal && test.lowNormal
      ? `${getTestName(test)} [${test.lowNormal} - ${
          test.hiNormal
        } ${test.units ?? ''}]`
      : `${getTestName(test)} ${test.units ?? ''}`
  }
  const isAbnormal = (value, test) => {
    return (
      test.lowNormal !== null &&
      test.hiNormal !== null &&
      (value < test.lowNormal || value > test.hiNormal)
    )
  }

  const updateOrStoreLabResult = (value, test) => {
    if (value !== null || value !== undefined) {
      setLabResult(
        map =>
          new Map(
            map.set(test.uuid, {
              value: value,
              abnormal: isAbnormal(value, test),
            }),
          ),
      )
    }
  }

  const getValue = test => labResult.get(test.uuid)?.value ?? ''

  const updateLabResult = (selectedItem, test) => {
    setAnswer(map => new Map(map.set(test.uuid, selectedItem)))
    if (selectedItem.uuid)
      setLabResult(
        map =>
          new Map(
            map.set(test.uuid, {
              value: selectedItem.name.name,
              codableConceptUuid: selectedItem.uuid,
            }),
          ),
      )
    else
      setLabResult(
        map =>
          new Map(
            map.set(test.uuid, {
              value: selectedItem.name.name,
            }),
          ),
      )
  }

  const getItems = (test, datatype) => {
    const items = []
    if (datatype === 'Boolean') {
      items.push({name: {name: 'True'}}, {name: {name: 'False'}})
    } else if (datatype === 'Coded') {
      const answers = test.answers
      items.push(...answers)
    }
    return items
  }

  const getDropdownItemToString = test => data => {
    const itemName = data.name.name
    if (
      labResult.get(test.uuid)?.abnormal === true &&
      labResult.get(test.uuid)?.value === itemName
    ) {
      return <span style={{color: 'red'}}>{itemName}</span>
    }
    return itemName
  }

  const renderInputField = (test, index) => {
    if (test) {
      const datatype = test.datatype.name
      const items = getItems(test, datatype)
      return (
        <div className={styles.inputFieldWithCheckbox}>
          {datatype === 'Boolean' || datatype === 'Coded' ? (
            <Dropdown
              titleText={getTestNameWithUnits(test)}
              id="answers-list-dropdown"
              title="answers list"
              items={items}
              itemToString={getDropdownItemToString(test)}
              label={t('SELECT_ANSWER', 'Select an answer')}
              onChange={({selectedItem}) => updateLabResult(selectedItem, test)}
              selectedItem={answer.get(test.uuid) ?? ''}
              helperText={
                answer.get(test.uuid)?.name.name.length > 35
                  ? answer.get(test.uuid)?.name.name
                  : ''
              }
            />
          ) : (
            <TextInput
              key={`text-${test.uuid}-${index}`}
              labelText={getTestNameWithUnits(test)}
              id={`${test.uuid}-${index}`}
              placeholder={t('ENTER_VALUE_KEY', 'Enter Value')}
              size="sm"
              onChange={e => updateOrStoreLabResult(e.target.value, test)}
              style={labResult.get(test.uuid)?.abnormal ? {color: 'red'} : {}}
              value={getValue(test)}
              invalid={labResult.size != 0 && isInvalid(test)}
              invalidText={t('INVALID_DATA_ENTERED', 'Please enter valid data')}
            />
          )}
          <span style={{paddingLeft: '1rem'}}>
            <Checkbox
              key={`abnormal-${test.uuid}`}
              id={`abnormal-${test.uuid}`}
              labelText={t('ABNORMAL_TEXT', 'Abnormal')}
              checked={
                getValue(test) !== '' &&
                (labResult.get(test.uuid)?.abnormal ?? false)
              }
              onChange={() => {
                if (datatype === 'Coded')
                  setLabResult(
                    map =>
                      new Map(
                        map.set(test.uuid, {
                          value: labResult.get(test.uuid)?.value,
                          abnormal: !labResult.get(test.uuid)?.abnormal,
                          codableConceptUuid: labResult.get(test.uuid)
                            ?.codableConceptUuid,
                        }),
                      ),
                  )
                else
                  setLabResult(
                    map =>
                      new Map(
                        map.set(test.uuid, {
                          value: labResult.get(test.uuid)?.value,
                          abnormal: !labResult.get(test.uuid)?.abnormal,
                        }),
                      ),
                  )
              }}
            />
          </span>
        </div>
      )
    }
  }
  const renderTestResultWidget = () => {
    return (
      <>
        {testResultData.map((testResult, index) =>
          testResult?.data.conceptClass?.name === 'LabSet'
            ? testResult?.data.setMembers.map((test, index) =>
                renderInputField(test, index),
              )
            : renderInputField(testResult?.data, index),
        )}
      </>
    )
  }

  return (
    <Overlay
      close={closeHandler}
      header={header}
      buttonsGroup={renderButtonGroup()}
    >
      <div className={styles.controlFields}>
        {testResultData.length > 0
          ? renderTestResultWidget()
          : console.log('else condition on overlay')}
        <DatePicker
          className={styles.datePicker}
          datePickerType="single"
          locale={locale}
          short={true}
          value={reportDate}
          maxDate={currentDate}
          onChange={(selectedDate: Date[]) => setReportDate(selectedDate[0])}
          allowInput={false}
        >
          <label id="reportDateLabel">
            <DatePickerInput
              placeholder="mm/dd/yyyy"
              labelText={t('REPORT_DATE_LABEL', 'Report Date')}
              id="reportDate"
            />
          </label>
        </DatePicker>
        <br></br>
        <div
          className={'bx--label'}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '2px 0px 2px 0px',
            width: '100%',
          }}
        >
          {t('REQUESTED_BY', 'Requested by')}
        </div>
        <DoctorListDropdown />
      </div>
      {showReportConclusionLabel ? (
        <Button
          role="button"
          kind="ghost"
          onClick={() => {
            setShowReportConclusionLabel(false)
          }}
        >
          {t(
            'RECORD_CLINICAL_CONCLUSION_KEY',
            'Click to record clinical conclusion',
          )}
        </Button>
      ) : (
        <div style={{paddingTop: '1rem'}}>
          <div
            className={'bx--label'}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '2px 0px 2px 0px',
              width: '100%',
            }}
          >
            {t('REPORT_CONCLUSION_KEY', 'Report Conclusion')}
            <span id="counter">{`${reportConclusion?.length}/${maxCount}`}</span>
          </div>
          <TextArea
            data-testId="conclusion"
            labelText=""
            maxLength={maxCount}
            required={true}
            value={reportConclusion}
            onChange={e => setReportConclusion(e.target.value)}
          />
        </div>
      )}
    </Overlay>
  )
}

export default TestResults
