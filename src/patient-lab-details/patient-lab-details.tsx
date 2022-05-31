import AddFilled16 from '@carbon/icons-react/lib/add/16'
import {ExtensionSlot, usePatient} from '@openmrs/esm-framework'
import {
  Button,
  Column,
  Grid,
  Row,
  ToastNotification,
} from 'carbon-components-react'
import React, {useState, useReducer} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {UploadReportProvider} from '../context/upload-report-context'
import Loader from '../loader/loader.component'
import PaginatedTable from '../table/paginated-table'
import ReportTable from '../report-table/report-table.component'
import UploadReport from '../upload-report/upload-report'
import {PendingOrders} from '../types'
import styles from './patient-lab-details.scss'

interface PatientParamsType {
  patientUuid: string
}

const pendingTestReducer = (state, action) => {
  switch (action.type) {
    case 'checked':
      return [...state, action.currentRow]
    case 'unchecked':
      action.setRemovedRow(action.currentRow)
      return state.filter(tempRow => tempRow.id !== action.currentRow.id)
    case 'unchecked-overlay':
      return state.filter(
        tempRow => tempRow.conceptUuid !== action.currentRow.uuid,
      )
  }
}

const PatientLabDetails: React.FC<RouteComponentProps<PatientParamsType>> = ({
  match,
}) => {
  const {patientUuid} = match.params
  const {isLoading, patient, error} = usePatient(patientUuid)
  const [onButtonClick, setOnButtonClick] = useState<boolean>(false)
  const [onSaveSuccess, setOnSaveSuccess] = useState<boolean>(false)
  const [selectedPendingTest, selectedPendingTestDispatch] = useReducer(
    pendingTestReducer,
    [],
  )
  const [removedRow, setRemovedRow] = useState<PendingOrders>()

  const handleClick = () => {
    setOnButtonClick(true), setOnSaveSuccess(false)
  }

  const handleClose = (isSaveSuccess: boolean) => {
    setOnButtonClick(false)
    setOnSaveSuccess(isSaveSuccess)
  }

  const renderSuccessMessage = () => (
    <ToastNotification
      kind={'success'}
      lowContrast={true}
      title={'Report successfully uploaded'}
      timeout={1000}
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
          <PaginatedTable
            patientUuid={patientUuid}
            selectedPendingTestDispatch={selectedPendingTestDispatch}
            setRemovedRow={setRemovedRow}
            selectedPendingTest={selectedPendingTest}
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
                selectedPendingTest={selectedPendingTest}
                selectedPendingTestDispatch={selectedPendingTestDispatch}
                removedRow={removedRow}
              />
            </UploadReportProvider>
          )}
          <br></br>
          <br></br>
          <ReportTable patientUuid={patientUuid} />
          <br></br>
          <br></br>
        </div>
      )}
    </main>
  )
}

export default PatientLabDetails
