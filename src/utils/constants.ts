export const spaRoot = window['getOpenmrsSpaBase']()
export const labliteModuleName = '@bahmni/lab-lite-app'
export const searchModuleName = '@openmrs/esm-patient-search-app'
export const patientLabDetailsPath = 'patient/${patientUuid}'
export const patientLabDetailsRoute = '/patient/:patientUuid'
export const labOrderUuid = '8189b409-3f10-11e4-adec-0800271c1b75'
export const defaultPageSize = 5
export const bahmniHomePath = '/bahmni/home'
export const privilegeLabLite = 'app:lab-lite'
export const maxPageSizeForDiagnosticReport = 100
export const selfPatient = 'self (patient)'
export const orderTypeUuidKey = 'orderTypeUuid'
export const labOrderType = 'Lab Order'
export const attrName = 'practitioner_type'
export const attrValue = 'Doctor'
export const orderStatusCompleted = 'COMPLETED'
export const loggedInUserKey = 'loggedInUser'
export const isAuditLogEnabledKey = 'isAuditLogEnabled'
export const successMessage = 'Report successfully uploaded'
export const failureMessage = 'Failed to upload report'
export const labEntryHomePath = '/home'
export const userLocationKey = 'bahmni.user.location'
export const documentPath = '/uploaded_results/'
export const uploadedDocumentEncounterType = 'LAB_RESULT'

export const headers = [
  {
    key: 'date',
    header: 'Date',
    txKey: 'DATE_LABEL',
  },
  {
    key: 'testName',
    header: 'Test',
    txKey: 'TEST_LABEL',
  },
  {
    key: 'orderedBy',
    header: 'Ordered By',
    txKey: 'ORDERED_BY_LABEL',
  },
  {
    key: 'orderNotes',
    header: 'Order Notes',
    txKey: 'ORDER_NOTES_LABEL',
  },
]

export const reportHeaders = [
  {
    key: 'date',
    header: 'Report date',
    txKey: 'REPORT_DATE_LABEL',
  },
  {
    key: 'tests',
    header: 'Tests',
    txKey: 'TESTS_LABEL',
  },
  {
    key: 'file',
    header: 'File',
    txKey: 'FILE_LABEL',
  },
  {
    key: 'requester',
    header: 'Requester',
    txKey: 'REQUESTER_LABEL',
  },
]
