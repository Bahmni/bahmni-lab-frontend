export interface LabOrders {
  concept: Concept
  orderDate: number
  orderUuid: string
  provider: string
}

interface Concept {
  name: string
  uuid: string
}
export interface LabOrdersFetchResponse {
  data: Array<LabOrders>
}
export interface DoctorDetailsData {
  uuid: string
  display: string
}

export interface DoctorsResponse {
  data: {results: Array<DoctorDetailsData>}
}
interface GeneralInfo {
  uuid: string
  display: string
  links: [Links]
}

interface Links {
  rel: string
  uri: string
}

interface OrderType {
  uuid: string
  display: string
  name: string
  javaClassName: string
  retired: boolean
  description: string
  conceptClasses: Array<GeneralInfo>
  parent: any
  links: Array<Links>
  resourceVersion: string
}

interface ReportPresentedForm {
  contentType: string
  language: string
  url: string
  hash: string
  title: string
  creation: Date
}

interface ReportCoding {
  system: string
  code: string
  display: string
}
interface ReportCode {
  coding: Array<ReportCoding>
}
interface ReportResource {
  resourceType: string
  id: string
  meta: Meta2
  status: string
  code: Code
  presentedForm: Array<ReportPresentedForm>
}
interface ReportEntry {
  fullUrl: string
  resource: Resource
}
export interface ReportTableFetchResponse {
  data: {
    resourceType: string
    id: string
    entry: Array<ReportEntry>
    total: number
  }
}

export interface PendingLabOrders {
  id: string
  testName: string
  date: string
  orderedBy: string
  ordererUuid: string
  conceptUuid: string
}
