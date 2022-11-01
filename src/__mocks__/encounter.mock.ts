import {BahmniEncounterResponseType} from '../types'

export const mockBahmniEncounterResponse: BahmniEncounterResponseType = {
  data: {
    bahmniDiagnoses: [],
    observations: [],
    accessionNotes: [],
    encounterType: 'Patient Document',
    visitType: null,
    patientId: 'GAN5678',
    reason: null,
    patientProgramUuid: null,
    visitUuid: 'visitUuid123',
    patientUuid: '123',
    associatedToPatientProgram: false,
    encounterTypeUuid: 'PatientdocumentUuid',
    visitTypeUuid: 'visitTypeUuidc1b75',
    drugOrders: [],
    locationUuid: 'locationuuid123',
    encounterDateTime: 1664200113000,
    encounterUuid: 'encounterUuid567',
    disposition: null,
    locationName: 'General Ward',
    orders: [],
    providers: [],
    context: {},
    extensions: {
      mdrtbSpecimen: [],
    },
  },
}

export const mockBahmniEncounterRequest = {
  labResult: {
    locationUuid: 'locationuuid123',
    patientUuid: '123',
    encounterUuid: null,
    visitUuid: null,
    providers: [{uuid: '1'}],
    visitType: 'OPD',
    encounterTypeUuid: 'LabResultUuid',
  },
  patientDocument: {
    locationUuid: 'locationuuid123',
    patientUuid: '123',
    encounterUuid: null,
    visitUuid: null,
    visitType: 'OPD',
    encounterTypeUuid: 'PatientdocumentUuid',
  },
}

export const mockBahmniEncounterErrorResponse = {
  message: 'Internal Server Error',
  response: {
    status: 500,
    statusText: 'Internal Server Error',
  },
}

export const mockEncounterTypeResponse = {
  data: {
    results: [
      {
        uuid: 'LabResultUuid',
        display: 'LAB_RESULT',
        links: [
          {
            rel: 'self',
            uri:
              'http://localhost/openmrs/ws/rest/v1/encountertype/82024e00-3f10-11e4-adec-0800271c1b75',
            resourceAlias: 'encountertype',
          },
        ],
      },
      {
        uuid: 'PatientdocumentUuid',
        display: 'Patient Document',
        links: [
          {
            rel: 'self',
            uri:
              'http://localhost/openmrs/ws/rest/v1/encountertype/82367e09-3f10-11e4-adec-0800271c1b75',
            resourceAlias: 'encountertype',
          },
        ],
      },
    ],
  },
}
