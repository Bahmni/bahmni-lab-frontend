import {ExtensionSlot, usePatient} from '@openmrs/esm-framework'
import {Button} from 'carbon-components-react'
import React from 'react'
import {Link, RouteComponentProps} from 'react-router-dom'
import Loader from '../loader/loader.component'
import styles from './patient-lab-details.scss'
import AddFilled16 from '@carbon/icons-react/lib/add/16'

interface PatientParamsType {
  patientUuid: string
}

const PatientLabDetails: React.FC<RouteComponentProps<PatientParamsType>> = ({
  match,
}) => {
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
          <div>
            <aside>
              <ExtensionSlot
                extensionSlotName="patient-header-slot"
                state={{patient, patientUuid: patient.id}}
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
        </div>
      )}
    </main>
  )
}

export default PatientLabDetails
