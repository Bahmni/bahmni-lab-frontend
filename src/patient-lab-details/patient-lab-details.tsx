import AddFilled16 from '@carbon/icons-react/lib/add/16'
import {ExtensionSlot, usePatient} from '@openmrs/esm-framework'
import {
  Button,
  Column,
  Grid,
  Row,
  ToastNotification,
} from 'carbon-components-react'
import React, {useCallback, useEffect, useState} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {UploadReportProvider} from '../context/upload-report-context'
import Loader from '../loader/loader.component'
import PaginatedTable from '../table/paginated-table'
import ReportTable from '../report-table/report-table.component'
import UploadReport from '../upload-report/upload-report'
import PendingLabOrdersProvider from '../context/pending-orders-context'
import styles from './patient-lab-details.scss'
import {fetcher, getReportTableDataURL} from '../utils/lab-orders'
import {ReportTableFetchResponse} from '../types'
import useSWR, {SWRResponse} from 'swr'

interface PatientParamsType {
  patientUuid: string
}

const PatientLabDetails: React.FC<RouteComponentProps<PatientParamsType>> = ({
  match,
}) => {
  const {patientUuid} = match.params
  const {isLoading, patient, error} = usePatient(patientUuid)
  const [onButtonClick, setOnButtonClick] = useState<boolean>(false)
  const [onSaveSuccess, setOnSaveSuccess] = useState<boolean>(false)
  const [reloadReportTable, setReloadReportTable] = useState<boolean>(false)

  const handleClick = () => {
    setOnButtonClick(true), setOnSaveSuccess(false), setReloadReportTable(false)
  }

  const handleClose = (isSaveSuccess: boolean) => {
    setOnButtonClick(false)
    setOnSaveSuccess(isSaveSuccess)
    setReloadReportTable(true)
  }

  const renderSuccessMessage = () => (
    <ToastNotification
      kind={'success'}
      lowContrast={true}
      title={'Report successfully uploaded'}
      timeout={1000}
      onClose={() => {
        setOnSaveSuccess(false)
        return true
      }}
    />
  )

  return (
    <main
      className={
        onButtonClick
          ? styles.patientDetailsContainerWithSidePanel
          : styles.patientDetailsContainer
      }
    >
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>Something went wrong: {error.message}</div>
      ) : (
        <div>
          <div>
            <Grid style={{paddingLeft: '0'}}>
              <Row>
                <Column lg={9}>
                  <ExtensionSlot
                    extensionSlotName="patient-header-slot"
                    state={{
                      patient,
                      patientUuid: patient.id,
                      hideActionsOverflow: true,
                    }}
                  />
                </Column>
                <Column lg={3}>
                  {onSaveSuccess && renderSuccessMessage()}
                </Column>
              </Row>
            </Grid>
          </div>
          <br></br>
          <br></br>
          <PendingLabOrdersProvider>
            <PaginatedTable
              patientUuid={patientUuid}
              onButtonClick={onButtonClick}
            />
            <br></br>
            <br></br>
            <Button renderIcon={AddFilled16} onClick={handleClick}>
              Upload Report
            </Button>
            {onButtonClick && (
              <UploadReportProvider>
                <UploadReport
                  close={(isSaveSuccess = false) => handleClose(isSaveSuccess)}
                  header="Upload Report"
                  patientUuid={patientUuid}
                />
              </UploadReportProvider>
            )}
            <br></br>
            <br></br>
          </PendingLabOrdersProvider>
<<<<<<< HEAD
          <ReportTable
            patientUuid={patientUuid}
            reloadTableData={reloadReportTable}
          />
=======
          <ReportTable patientUuid={patientUuid} />
>>>>>>> 7bdc3b8 (BAH-1813 | Upload report against open orders (UI only) (#19))
          <br></br>
          <br></br>
        </div>
      )}
    </main>
  )
}

export default PatientLabDetails
