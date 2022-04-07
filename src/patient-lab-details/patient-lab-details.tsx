import {ExtensionSlot, usePatient} from '@openmrs/esm-framework'
import React from 'react'
import {Link, RouteComponentProps} from 'react-router-dom'
import Loader from '../loader/loader.component'
import styles from './patient-lab-details.scss'

interface PatientLabChartParams {
  patientUuid: string
}

const PatientLabDetails: React.FC<RouteComponentProps<
  PatientLabChartParams
>> = ({match}) => {
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
        </div>
      )}
    </main>
  )
}

export default PatientLabDetails
