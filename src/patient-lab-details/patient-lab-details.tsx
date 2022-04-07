import {ExtensionSlot, usePatient} from '@openmrs/esm-framework'
<<<<<<< HEAD
import {Button} from 'carbon-components-react'
=======
>>>>>>> e7b7712 (BAH-1503 | Refactor. rename patient lab chart component and url to patient lab details)
import React from 'react'
import {Link, RouteComponentProps} from 'react-router-dom'
import Loader from '../loader/loader.component'
import styles from './patient-lab-details.scss'
<<<<<<< HEAD
import AddFilled16 from '@carbon/icons-react/lib/add/16'

interface PatientParamsType {
  patientUuid: string
}

const PatientLabDetails: React.FC<RouteComponentProps<PatientParamsType>> = ({
  match,
}) => {
=======

interface PatientLabChartParams {
  patientUuid: string
}

const PatientLabDetails: React.FC<RouteComponentProps<
  PatientLabChartParams
>> = ({match}) => {
>>>>>>> e7b7712 (BAH-1503 | Refactor. rename patient lab chart component and url to patient lab details)
  const {patientUuid} = match.params
  const {isLoading, patient, error} = usePatient(patientUuid)
  return (
    <main className={styles.chartContainer}>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>Something went wrong: {error.message}</div>
      ) : (
        <div>
<<<<<<< HEAD
          <div>
            <aside>
              <ExtensionSlot
                extensionSlotName="patient-header-slot"
                state={{patient, patientUuid: patient.id, hideActionsOverflow: true}}
              />
            </aside>
          </div>
          <br></br>
          <br></br>
          <Link
            to={{
              pathname: '/patient/' + patient.id + '/report',
              state: {patient},
            }}
          >
            <Button renderIcon={AddFilled16}>Upload Report</Button>
          </Link>
=======
          <aside>
            <ExtensionSlot
              extensionSlotName="patient-header-slot"
              state={{
                patient,
                patientUuid: patient.id,
                hideActionsOverflow: true,
              }}
            />
          </aside>
>>>>>>> e7b7712 (BAH-1503 | Refactor. rename patient lab chart component and url to patient lab details)
        </div>
      )}
    </main>
  )
}

export default PatientLabDetails
