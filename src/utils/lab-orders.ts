import {openmrsFetch} from '@openmrs/esm-framework'
import {maxPageSizeForDiagnosticReport} from '../constants'

export const getPendingLabOrdersURL = patientUuid =>
  `/ws/rest/v1/order?patient=${patientUuid}&orderType=Lab Order&v=default`

export const fetcher = url =>
  openmrsFetch(url, {
    method: 'GET',
  })

export const getReportTableDataURL = patientUuid =>
  `/ws/fhir2/R4/DiagnosticReport?patient=${patientUuid}&_count=${maxPageSizeForDiagnosticReport}`
