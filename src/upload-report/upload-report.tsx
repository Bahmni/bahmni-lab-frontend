import {
  Button,
  DatePicker,
  DatePickerInput,
  TextArea,
} from 'carbon-components-react'
import dayjs from 'dayjs'
import React, {useState} from 'react'
import {
  useSelectedFile,
  useSelectedTests,
  useDoctorDetails,
} from '../context/upload-report-context'
import Overlay from '../overlay'
import SelectTest from '../select-test/select-test'
import UploadFile from '../upload-file/upload-file'
import {saveDiagnosticReport, uploadFile} from './upload-report.resources'
import styles from './upload-report.scss'
import {usePendingLabOrderContext} from '../context/pending-orders-context'
import {LabTest} from '../types/selectTest'
import {PendingLabOrders} from '../types'

import DoctorListDropdown from '../doctors-list-dropdown/doctor-list-dropdown'
import {
  auditLogURL,
  getPayloadForPatientReportUpload,
  postApiCall,
} from '../utils/api-utils'
import {loggedInUserKey} from '../constants'

interface UploadReportProps {
  close: Function
  header: string
  patientUuid: string
}

const UploadReport: React.FC<UploadReportProps> = ({
  close,
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
  const {selectedTests, setSelectedTests} = useSelectedTests()
  const maxCount: number = 500
  const {selectedFile, setSelectedFile} = useSelectedFile()
  const {
    selectedPendingOrder,
    setSelectedPendingOrder,
  } = usePendingLabOrderContext()
  const [showReportConclusionLabel, setShowReportConclusionLabel] = useState<
    boolean
  >(true)
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false)

  const handleDiscard = () => {
    setIsDiscardButtonClicked(true)
    setReportDate(null)
    setReportConclusion('')
    setSelectedFile(null)
    setSelectedTests([])
    setDoctor(null)
    setShowReportConclusionLabel(true)
  }

  const saveReport = () => {
    const ac = new AbortController()
    const reader = new FileReader()
    reader.onload = async event => {
      const uploadFileResponse = await uploadFile(
        patientUuid,
        event.target.result.toString(),
        selectedFile.type,
        ac,
      )
      if (uploadFileResponse?.ok) {
        const url = uploadFileResponse.data.url

        if (url) {
          await uploadSelectedTests(
            selectedTests,
            patientUuid,
            doctor.uuid,
            reportDate,
            url,
            selectedFile,
            reportConclusion,
            ac,
            selectedPendingOrder,
            close,
          )
        }
      }
    }
    reader.readAsDataURL(selectedFile)
  }

  const isDisabled = () =>
    !reportDate ||
    !selectedFile ||
    !doctor ||
    selectedTests.length === 0 ||
    isSaveButtonClicked

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

  const getPatientIdentifier = (displayName: string) => {
    if (displayName) {
      const words = displayName.match(/\w+/g)
      return words[words.length - 1]
    }
  }

  async function uploadSelectedTests(
    selectedTests: LabTest[],
    patientUuid: string,
    doctorUuid: string,
    reportDate: Date,
    url: string,
    selectedFile: File,
    reportConclusion: string,
    ac: AbortController,
    selectedPendingOrder: PendingLabOrders[],
    close: Function,
  ) {
    let allSuccess: boolean = true
    for (let index = 0; index < selectedTests.length; index++) {
      const diagnosticReportResponse = await saveDiagnosticReport(
        patientUuid,
        doctorUuid,
        reportDate,
        selectedTests[index],
        url,
        selectedFile.name,
        reportConclusion,
        ac,
        selectedPendingOrder,
      )
      if (diagnosticReportResponse.ok) {
        const loggedInUser = localStorage.getItem(loggedInUserKey)
        const auditMessage = getPayloadForPatientReportUpload(
          loggedInUser,
          patientUuid,
          getPatientIdentifier(
            diagnosticReportResponse?.data?.subject?.display,
          ),
          selectedFile.name,
        )
        postApiCall(auditLogURL, auditMessage, ac)
      }
      if (allSuccess && !diagnosticReportResponse.ok) {
        allSuccess = false
      }
    }
    if (allSuccess) {
      close(true)
      setSelectedPendingOrder([])
    } else {
      setIsSaveButtonClicked(false)
    }
  }

  return (
    <Overlay close={close} header={header} buttonsGroup={renderButtonGroup()}>
      <SelectTest isDiscardButtonClicked={isDiscardButtonClicked} />
      <br />
      <UploadFile />
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

export default UploadReport
