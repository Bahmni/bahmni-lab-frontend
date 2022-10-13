import {FetchResponse} from '@openmrs/esm-framework'
import {PendingLabOrders} from '../../types'
import {LabTest} from '../../types/selectTest'
import {
  bahmniEncounterUrl,
  postApiCall,
  saveDiagnosticReportURL,
  uploadDocumentURL,
} from '../../utils/api-utils'
import {
  defaultVisitTypeKey,
  encounterTypes,
  encounterTypeUuidsKey,
} from '../../utils/constants'

interface UploadFileResponseType {
  url: string
}

interface ReferenceRequestType {
  reference: string
}

export interface BasedOnType {
  reference: string
  display: string
  identifier: {
    value: string
  }
}

interface BahmniEncounteRequestType {
  locationUuid: string
  patientUuid: string
  providers?: Array<{uuid: string}>
  encounterUuid: string
  encounterTypeUuid: string
  visitType: string
  visitUuid: string
}

interface DiagnosticReportRequestType {
  resourceType: string
  status: string
  code: {
    coding: [
      {
        code: string
        display: string
      },
    ]
  }
  subject: ReferenceRequestType
  encounter: {reference: string}
  issued: Date
  conclusion?: string
  presentedForm: Array<{
    url: string
    title: string
  }>
  basedOn?: Array<BasedOnType>
  performer?: Array<ReferenceRequestType>
}

export function uploadFile(
  patientUuid: string,
  fileContent: string,
  fileType: string,
  ac: AbortController,
): Promise<FetchResponse<UploadFileResponseType>> {
  const requestBody = uploadFileRequestBody(fileContent, fileType, patientUuid)
  return postApiCall(uploadDocumentURL, requestBody, ac)
}

const uploadFileRequestBody = (fileContent, fileType, patientUuid) => {
  const extension = fileType.split('/')[1]
  return {
    content: removeBase64(fileContent),
    encounterTypeName: 'Patient Document',
    fileType: fileType.split('/')[0],
    format: extension,
    patientUuid: patientUuid,
  }
}

export function saveDiagnosticReport(
  bahmniEncounterResponse,
  patientUuid: string,
  performerUuid: string,
  reportDate: Date,
  selectedTest: LabTest,
  uploadFileUrl: string,
  uploadedFileName: string,
  reportConclusion: string,
  ac: AbortController,
  selectedPendingOrder: PendingLabOrders[],
) {
  let basedOn: Array<BasedOnType> = null
  const isSelectedPendingOrderContainsSelectedTest = isSelectedTestPresentInPendingOrder(
    selectedTest,
    selectedPendingOrder,
  )
  if (isSelectedPendingOrderContainsSelectedTest)
    basedOn = [
      {
        identifier: {value: selectedPendingOrder[0].id},
        reference: 'ServiceRequest',
        display: selectedTest.name.display,
      },
    ]
  const requestBody: DiagnosticReportRequestType = {
    resourceType: 'DiagnosticReport',
    status: 'final',
    code: {
      coding: [
        {
          code: selectedTest.uuid,
          display: selectedTest.name.display,
        },
      ],
    },
    subject: {
      reference: 'Patient/' + patientUuid,
    },
    encounter: {
      reference: `Encounter/${bahmniEncounterResponse.data.encounterUuid}`,
    },
    issued: reportDate,
    presentedForm: [{url: uploadFileUrl, title: uploadedFileName}],
  }
  if (reportConclusion) {
    requestBody.conclusion = reportConclusion
  }
  if (isSelectedPendingOrderContainsSelectedTest) {
    requestBody.basedOn = basedOn
  }
  if (performerUuid) {
    requestBody.performer = [
      {
        reference: 'Practitioner/' + performerUuid,
      },
    ]
  }

  return postApiCall(saveDiagnosticReportURL, requestBody, ac)
}

const removeBase64 = fileData => {
  const searchStr = ';base64'
  return fileData.substring(
    fileData.indexOf(searchStr) + searchStr.length,
    fileData.length,
  )
}

export const bahmniEncounter = (
  locationUuid: string,
  patientUuid: string,
  providerUuid: string,
  selectedTest: LabTest,
  selectedPendingOrder: PendingLabOrders[],
  ac: AbortController,
) => {
  const defaultVisitType = localStorage.getItem(defaultVisitTypeKey)
  let requestBody: BahmniEncounteRequestType
  if (providerUuid && providerUuid !== null) {
    requestBody = {
      locationUuid,
      patientUuid,
      encounterUuid: null,
      visitUuid: null,
      providers: [
        {
          uuid: providerUuid,
        },
      ],
      visitType: defaultVisitType,
      encounterTypeUuid: getEncounterTypeUuid(
        selectedTest,
        selectedPendingOrder,
      ),
    }
  } else {
    requestBody = {
      locationUuid,
      patientUuid,
      encounterUuid: null,
      visitUuid: null,
      visitType: defaultVisitType,
      encounterTypeUuid: getEncounterTypeUuid(
        selectedTest,
        selectedPendingOrder,
      ),
    }
  }
  return postApiCall(bahmniEncounterUrl, requestBody, ac)
}

const getEncounterTypeUuid = (
  selectedTest: LabTest,
  selectedPendingOrder: PendingLabOrders[],
): string => {
  const encounterTypeUuidlist = JSON.parse(
    localStorage.getItem(encounterTypeUuidsKey),
  )
  let encounterTypeUuid = encounterTypeUuidlist[1][encounterTypes[1]]
  if (isSelectedTestPresentInPendingOrder(selectedTest, selectedPendingOrder))
    encounterTypeUuid = encounterTypeUuidlist[0][encounterTypes[0]]
  return encounterTypeUuid
}

const isSelectedTestPresentInPendingOrder = (
  selectedTest: LabTest,
  selectedPendingOrder: PendingLabOrders[],
): boolean => {
  return (
    selectedPendingOrder.filter(
      pendingOrder => pendingOrder.conceptUuid === selectedTest.uuid,
    ).length === 1
  )
}
