import {openmrsFetch} from '@openmrs/esm-framework'
import {maxPageSizeForDiagnosticReport} from '../constants'

export const fetcher = url =>
  openmrsFetch(url, {
    method: 'GET',
  })

export const getReportTableDataURL = patientUuid =>
  `/ws/fhir2/R4/DiagnosticReport?patient=${patientUuid}&_count=${maxPageSizeForDiagnosticReport}`
export const getProvidersURL = () => `/ws/rest/v1/provider?v=full`
