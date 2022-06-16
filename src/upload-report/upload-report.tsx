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
} from '../context/upload-report-context'
import Overlay from '../overlay'
import SelectTest from '../select-test/select-test'
import UploadFile from '../upload-file/upload-file'
import {
  BasedOnType,
  saveDiagnosticReport,
  uploadFile,
} from './upload-report.resources'
import styles from './upload-report.scss'
import {usePendingLabOrderContext} from '../context/pending-orders-context'

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
  const {selectedTests, setSelectedTests} = useSelectedTests()
  const maxCount: number = 500
  const {selectedFile, setSelectedFile} = useSelectedFile()
  const {selectedPendingOrder} = usePendingLabOrderContext()

  const handleDiscard = () => {
    setIsDiscardButtonClicked(true)
    setReportDate(null)
    setReportConclusion('')
    setSelectedFile(null)
    setSelectedTests([])
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
      if (uploadFileResponse.ok) {
        const url = uploadFileResponse.data.url
        const isPendingOrderInPayload =
          selectedPendingOrder.filter(
            pendingOrder => pendingOrder.conceptUuid === selectedTests[0].uuid,
          ).length == 1
        let basedOn: Array<BasedOnType> = null
        if (isPendingOrderInPayload)
          basedOn = [
            {
              reference: 'ServiceRequest',
              display: selectedTests[0].name.display,
            },
          ]
        if (url) {
          const diagnosticReportResponse = await saveDiagnosticReport(
            patientUuid,
            reportDate,
            selectedTests[0],
            url,
            selectedFile.name,
            reportConclusion,
            ac,
            basedOn,
          )
          if (diagnosticReportResponse.ok) {
            close(true)
          }
        }
      }
    }
    reader.readAsDataURL(selectedFile)
  }

  const renderButtonGroup = () => (
    <div className={styles.overlayButtons}>
      <Button onClick={handleDiscard} kind="secondary" size="lg">
        Discard
      </Button>
      <Button
        onClick={saveReport}
        size="lg"
        disabled={!reportDate || !selectedFile || selectedTests.length === 0}
      >
        Save and Upload
      </Button>
    </div>
  )

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
    </Overlay>
  )
}

export default UploadReport
