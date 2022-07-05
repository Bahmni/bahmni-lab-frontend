import {openmrsFetch} from '@openmrs/esm-framework'
import {ReportEntry} from '../types'
const s = 'byFullySpecifiedName'
const name = 'Lab+Samples'
const v =
  'custom:(uuid,name:(display,uuid),names:(display,conceptNameType,name),set,setMembers:(uuid,name:(display,uuid),names:(display,conceptNameType,name),set,setMembers:(uuid,name:(display,uuid),names:(display,conceptNameType,name),set,conceptClass:(uuid,name,description),setMembers:(uuid,name:(display,uuid),names:(display,conceptNameType,name),set,conceptClass:(uuid,name,description),setMembers:(uuid,name:(display,uuid),names:(display,conceptNameType,name),set,conceptClass:(uuid,name,description))))))'
const locale = localStorage.getItem('i18nextLng')

export const getPendingLabOrdersURL = (patientUuid: string) =>
  `/ws/rest/v1/order?patient=${patientUuid}&orderType=Lab Order&v=default`

export const getLabTests = () =>
  `/ws/rest/v1/concept?s=${s}&locale=${locale}&name=${name}&v=${v}`

export const uploadDocumentURL =
  '/ws/rest/v1/bahmnicore/visitDocument/uploadDocument'

export const saveDiagnosticReportURL = '/ws/fhir2/R4/DiagnosticReport'

export const fetcher = (url: string) =>
  openmrsFetch(url, {
    method: 'GET',
  })

export const postApiCall = (url, data, abortController) => {
  return openmrsFetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
    signal: abortController.signal,
  })
}

export const mergeMultipleTests = (diagnosticReports: Array<ReportEntry>) => {
  const documentUrls: Array<string> = []
  const uniqueDiagnosticReports: Array<ReportEntry> = []
  for (let index = 0; index < diagnosticReports?.length; index++) {
    const diagnosticReport: ReportEntry = diagnosticReports[index]
    const documentUrl: string = diagnosticReport.resource.presentedForm[0].url
    if (documentUrls.includes(documentUrl)) {
      const existingReports: Array<ReportEntry> = uniqueDiagnosticReports.filter(
        report => report.resource.presentedForm[0].url === documentUrl,
      )
      if (existingReports.length === 1) {
        existingReports[0].resource.code.coding[0].display = `${existingReports[0].resource.code.coding[0].display}, ${diagnosticReport.resource.code.coding[0].display}`
      }
    } else {
      documentUrls.push(documentUrl)
      uniqueDiagnosticReports.push(diagnosticReport)
    }
  }
  return uniqueDiagnosticReports
}
