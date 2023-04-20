import {FetchResponse} from '@openmrs/esm-framework'
import {PendingLabOrders} from '../../types'
import {LabTest} from '../../types/selectTest'
import {
  postApiCall,
  saveDiagnosticReportURL,
  uploadDocumentURL,
} from '../../utils/api-utils'
import {uploadedDocumentEncounterType} from '../../utils/constants'
import {getTestName} from '../../utils/helperFunctions'

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
  encounter?: {reference: string}
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
    encounterTypeName: uploadedDocumentEncounterType,
    fileType: fileType.split('/')[0],
    format: extension,
    patientUuid: patientUuid,
  }
}

export function saveDiagnosticReport(
  encounter,
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
  const selectedPendingOrderTest = getSelectedPendingOrderTests(
    selectedTest,
    selectedPendingOrder,
  )
  if (selectedPendingOrderTest.length === 1)
    basedOn = [
      {
        identifier: {value: selectedPendingOrderTest[0].id},
        reference: 'ServiceRequest',
        display: getTestName(selectedTest),
      },
    ]
  const requestBody: DiagnosticReportRequestType = {
    resourceType: 'DiagnosticReport',
    status: 'final',
    code: {
      coding: [
        {
          code: selectedTest.uuid,
          display: getTestName(selectedTest),
        },
      ],
    },
    subject: {
      reference: 'Patient/' + patientUuid,
    },
    issued: reportDate,
    presentedForm: [{url: uploadFileUrl, title: uploadedFileName}],
  }
  if (reportConclusion) {
    requestBody.conclusion = reportConclusion
  }
  if (selectedPendingOrderTest.length === 1) {
    requestBody.basedOn = basedOn
  }
  if (performerUuid) {
    requestBody.performer = [
      {
        reference: 'Practitioner/' + performerUuid,
      },
    ]
  }
  if (encounter && encounter.encounterUuid) {
    requestBody.encounter = {
      reference: `Encounter/${encounter.encounterUuid}`,
    }
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

const getSelectedPendingOrderTests = (
  selectedTest: LabTest,
  selectedPendingOrder: PendingLabOrders[],
): PendingLabOrders[] => {
  return selectedPendingOrder.filter(
    pendingOrder => pendingOrder.conceptUuid === selectedTest.uuid,
  )
}
