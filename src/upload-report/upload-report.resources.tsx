import {FetchResponse, PatientUuid} from '@openmrs/esm-framework'
import {PendingLabOrders} from '../types'
import {LabTest} from '../types/selectTest'
import {
  postApiCall,
  saveDiagnosticReportURL,
  uploadDocumentURL,
} from '../utils/api-utils'

interface UploadFileRequestType {
  content: string
  encounterTypeName: string
  fileType: string
  format: string
  patientUuid: PatientUuid
}

interface UploadFileResponseType {
  url: string
}

interface ReferenceRequestType {
  reference: string
}

export interface BasedOnType {
  reference: string
  display: string
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
  issued: Date
  conclusion: string
  presentedForm: {
    url: string
    title: string
  }
  basedOn: Array<BasedOnType>
  performer?: ReferenceRequestType
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
  const isPendingOrderInPayload =
    selectedPendingOrder.filter(
      pendingOrder => pendingOrder.conceptUuid === selectedTest.uuid,
    ).length == 1
  let basedOn: Array<BasedOnType> = null
  if (isPendingOrderInPayload)
    basedOn = [
      {
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
    issued: reportDate,
    conclusion: reportConclusion,
    presentedForm: {
      url: uploadFileUrl,
      title: uploadedFileName,
    },
    basedOn,
  }
  if (performerUuid) {
    requestBody.performer = {
      reference: 'Practitioner/' + performerUuid,
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
