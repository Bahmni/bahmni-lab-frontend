import {
  Button,
  DatePicker,
  DatePickerInput,
  TextArea,
} from 'carbon-components-react'
import dayjs from 'dayjs'
import React, {useState} from 'react'
import Overlay from '../../common/overlay'
import {usePendingLabOrderContext} from '../../context/pending-orders-context'
import {
  useDoctorDetails,
  useSelectedFile,
  useSelectedTests,
} from '../../context/upload-report-context'
import {PendingLabOrders} from '../../types'
import {LabTest} from '../../types/selectTest'
import SelectTest from '../select-test/select-test'
import UploadFile from '../upload-file/upload-file'
import {saveDiagnosticReport, uploadFile} from './upload-report.resources'
import styles from './upload-report.scss'

import {
  auditLogURL,
  getPayloadForPatientReportUpload,
  postApiCall,
} from '../../utils/api-utils'
import {isAuditLogEnabledKey, loggedInUserKey} from '../../utils/constants'
import DoctorListDropdown from '../doctors-list-dropdown/doctor-list-dropdown'
import {getTestName} from '../../utils/helperFunctions'
import {useTranslation} from 'react-i18next'

interface UploadReportProps {
  saveHandler: Function
  closeHandler: Function
  header: string
  patientUuid: string
}

const UploadReport: React.FC<UploadReportProps> = ({
  saveHandler,
  closeHandler,
  header,
  patientUuid,
}) => {
  const locale: Object = localStorage.getItem('i18nextLng')
  const currentDate: string = dayjs().format('MM/DD/YYYY')
  const {t} = useTranslation()
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
          let allSuccess: boolean = true
          try {
            for (let index = 0; index < selectedTests.length; index++) {
              await uploadSelectedTests(
                undefined,
                selectedTests[index],
                patientUuid,
                doctor.uuid,
                reportDate,
                url,
                selectedFile,
                reportConclusion,
                ac,
                selectedPendingOrder,
                saveHandler,
                allSuccess,
              )
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
        {t('DISCARD_LABEL', 'Discard')}
      </Button>
      <Button
        onClick={() => {
          setIsSaveButtonClicked(true), saveReport()
        }}
        size="lg"
        disabled={isDisabled()}
      >
        {t('SAVE_AND_UPLOAD_LABEL', 'Save and Upload')}
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
    encounter,
    selectedTest: LabTest,
    patientUuid: string,
    doctorUuid: string,
    reportDate: Date,
    url: string,
    selectedFile: File,
    reportConclusion: string,
    ac: AbortController,
    selectedPendingOrder: PendingLabOrders[],
    saveHandler: Function,
    allSuccess: boolean,
  ) {
    const diagnosticReportResponse = await saveDiagnosticReport(
      encounter,
      patientUuid,
      doctorUuid,
      reportDate,
      selectedTest,
      url,
      selectedFile.name,
      reportConclusion,
      ac,
      selectedPendingOrder,
    )
    if (diagnosticReportResponse.ok) {
      const loggedInUser = localStorage.getItem(loggedInUserKey)
      const isAuditLogEnabled = localStorage.getItem(isAuditLogEnabledKey)
      if (isAuditLogEnabled && loggedInUser) {
        const auditMessage = getPayloadForPatientReportUpload(
          loggedInUser,
          patientUuid,
          getPatientIdentifier(
            diagnosticReportResponse?.data?.subject?.display,
          ),
          selectedFile.name,
          getTestName(selectedTest),
        )
        postApiCall(auditLogURL, auditMessage, ac)
      }
    }
    if (allSuccess && !diagnosticReportResponse.ok) {
      allSuccess = false
    }
  }

  return (
    <Overlay
      close={closeHandler}
      header={header}
      buttonsGroup={renderButtonGroup()}
    >
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
        {t('REQUESTED_BY', 'Requested by')}
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
