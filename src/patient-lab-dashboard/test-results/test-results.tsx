import {
  Button,
  DatePicker,
  DatePickerInput,
  NumberInput,
  TextArea,
  TextInput,
} from 'carbon-components-react'
import dayjs from 'dayjs'
import React, {useState} from 'react'
import useSWR from 'swr'
import Overlay from '../../common/overlay'
import {usePendingLabOrderContext} from '../../context/pending-orders-context'
import {
  useDoctorDetails,
  useSelectedFile,
  useSelectedTests,
} from '../../context/upload-report-context'
import styles from './test-results.scss'
import {fetcher, getTestResults, swrOptions} from '../../utils/api-utils'
import {getTestName} from '../../utils/helperFunctions'
import DoctorListDropdown from '../doctors-list-dropdown/doctor-list-dropdown'
import {saveTestDiagnosticReport} from '../upload-report/upload-report.resources'
import {LabTest} from '../../types/selectTest'

interface UploadReportProps {
  saveHandler: Function
  closeHandler: Function
  header: string
  patientUuid: string
}

const TestResults: React.FC<UploadReportProps> = ({
  saveHandler,
  closeHandler,
  header,
  patientUuid,
}) => {
  const locale: Object = localStorage.getItem('i18nextLng')
  const currentDate: string = dayjs().format('MM/DD/YYYY')
  const [reportDate, setReportDate] = useState<Date>(null)
  const [reportConclusion, setReportConclusion] = useState<string>('')
  const [isDiscardButtonClicked, setIsDiscardButtonClicked] = useState<boolean>(
    false,
  )
  const {doctor, setDoctor} = useDoctorDetails()
  const {setSelectedTests} = useSelectedTests()
  const maxCount: number = 500
  const {selectedFile, setSelectedFile} = useSelectedFile()
  const {selectedPendingOrder} = usePendingLabOrderContext()
  const [showReportConclusionLabel, setShowReportConclusionLabel] = useState<
    boolean
  >(true)
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false)
  const testResultData = []
  const handleDiscard = () => {
    setIsDiscardButtonClicked(true)
    setReportDate(null)
    setReportConclusion('')
    setSelectedFile(null)
    setSelectedTests([])
    setDoctor(null)
    setShowReportConclusionLabel(true)
    setLabResult(new Map())
  }

  const [labResult, setLabResult] = useState(new Map())

  const isDisabled = () =>
    !reportDate || !doctor || labResult.size==0 || isSaveButtonClicked

  const renderButtonGroup = () => (
    <div className={styles.overlayButtons}>
      <Button onClick={handleDiscard} kind="secondary" size="lg">
        Discard
      </Button>
      <Button
        onClick={() => {
          setIsSaveButtonClicked(true), saveReport()
        }}
        size="lg"
        disabled={isDisabled()}
      >
        Save and Upload
      </Button>
    </div>
  )

  const getSelectedPendingOrderTest = index => {
    return selectedPendingOrder[index]
  }
  const saveReport = async () => {
    const ac = new AbortController()
    let allSuccess: boolean = true
    try {
      for (let index = 0; index < selectedPendingOrder.length; index++) {
        const response = await saveTestDiagnosticReport(
          undefined,
          patientUuid,
          doctor.uuid,
          reportDate,
          reportConclusion,
          ac,
          getSelectedPendingOrderTest(index),
          labResult,
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
    } else {
      saveHandler(false)
    }
  }
  selectedPendingOrder.forEach(selectedPendingOrder => {
    const {data: testResults, error: testResultsError} = useSWR<any, Error>(
      getTestResults(selectedPendingOrder.conceptUuid),
      fetcher,
      swrOptions,
    )
    testResultData.push(testResults)
  })
  const getTestNameWithUnits = test => {
    if (test.units) {
      return test.hiNormal && test.lowNormal
        ? `${getTestName(test)} [${test.lowNormal} - ${test.hiNormal} ${
            test.units
          }]`
        : `${getTestName(test)} ${test.units}`
    }
    return getTestName(test)
  }
  const isAbnormal = (value, test) => {
    return (
      (value < test.lowNormal || value > test.hiNormal) &&
      test.lowNormal !== null && test.hiNormal !== null
    )
  }
  // let a=JSON.stringify(labResult)
  // console.log("-----------labResult-----------",labResult,a);

  const updateOrStoreLabResult = (value, test) => {
    console.log("value",value);
    console.log(labResult.get(test.uuid));

    // if(value==="" && labResult.get(test.uuid)){
    //   // console.log("inside if");
    //   // const tempMap = new Map()
    //   // labResult.forEach(map => {
    //   // if(map.get)

    //   // })

    // }
    if(value !== null || value !== undefined || !isNaN(value) || value !== '') {
      console.log("inside else");
      isAbnormal(value, test)
        ? setLabResult(
            map =>
              new Map(
                map.set(test.uuid, {
                  value: value,
                  abnormal: true,
                }),
              ),
          )
        : setLabResult(
            map =>
              new Map(
                map.set(test.uuid, {
                  value: value,
                  abnormal: false,
                }),
              ),
          )
    }
  }
  const labTestResult = (labResult, test) => {
    return labResult.get(test.uuid)?.value ?? ''
  }
  const renderInputField = (test, index) => {
    if (test) {
      return (
        <div className={styles.testresultinputfield}>
          <TextInput
            key={`text-${test.uuid}-${index}`}
            labelText={getTestNameWithUnits(test)}
            id={`${test.uuid}-${index}`}
            placeholder="Input Text"
            size="sm"
            onChange={e => updateOrStoreLabResult(e.target.value, test)}
            style={labResult.get(test.uuid)?.abnormal ? {color: 'red'} : {}}
            value={labTestResult(labResult, test)}
          />
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
            labelText="Report Date"
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
        Requested by
      </div>
      <DoctorListDropdown />
      {showReportConclusionLabel ? (
        <Button
          role="button"
          kind="ghost"
          onClick={() => {
            setShowReportConclusionLabel(false)
          }}
        >
          Click to record clinical conclusion
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
            Report Conclusion{' '}
            <span id="counter">{`${reportConclusion?.length}/${maxCount}`}</span>
          </div>
          <TextArea
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
