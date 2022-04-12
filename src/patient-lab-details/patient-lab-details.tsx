import {ExtensionSlot, usePatient} from '@openmrs/esm-framework'
<<<<<<< HEAD
<<<<<<< HEAD
import {Button} from 'carbon-components-react'
=======
>>>>>>> e7b7712 (BAH-1503 | Refactor. rename patient lab chart component and url to patient lab details)
=======
import {Button} from 'carbon-components-react'
>>>>>>> 9e8b733 (BAH-1503 | Add. create an Upload reports button to navigate to report upload screen)
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

interface PatientParamsType {
  patientUuid: string
}

<<<<<<< HEAD
const PatientLabDetails: React.FC<RouteComponentProps<
  PatientLabChartParams
>> = ({match}) => {
>>>>>>> e7b7712 (BAH-1503 | Refactor. rename patient lab chart component and url to patient lab details)
=======
const PatientLabDetails: React.FC<RouteComponentProps<PatientParamsType>> = ({
  match,
}) => {
>>>>>>> 9e8b733 (BAH-1503 | Add. create an Upload reports button to navigate to report upload screen)
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
<<<<<<< HEAD
>>>>>>> e7b7712 (BAH-1503 | Refactor. rename patient lab chart component and url to patient lab details)
=======
          <br></br>
          <br></br>
          <Link
            to={{
              pathname: '/patient/' + patient.id + '/report',
              state: {patient},
            }}
          >
            <Button>Upload Report</Button>
          </Link>
>>>>>>> 9e8b733 (BAH-1503 | Add. create an Upload reports button to navigate to report upload screen)
        </div>
      )}
    </main>
  )
}

export default PatientLabDetails
