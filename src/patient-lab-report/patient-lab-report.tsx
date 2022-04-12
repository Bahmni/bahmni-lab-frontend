import {ExtensionSlot} from '@openmrs/esm-framework'
import React from 'react'
import {useLocation} from 'react-router-dom'
import styles from './patient-lab-report.scss'

interface PatientType {
  patient: fhir.Patient
}

const PatientLabReport = () => {
  const location = useLocation<PatientType>()
  const patient = location.state.patient
  return (
    <main className={styles.chartContainer}>
      <div>
        <aside>
          <ExtensionSlot
            extensionSlotName="patient-header-slot"
            state={{
              patient: patient,
              patientUuid: patient.id,
              hideActionsOverflow: true,
            }}
          />
        </aside>
      </div>
    </main>
  )
}

export default PatientLabReport
