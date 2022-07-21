import {LabOrdersFetchResponse} from '../types'

export const mockPendingLabOrdersResponse: LabOrdersFetchResponse = {
  data: [
    {
      concept: {
        name: 'Routine Blood',
        uuid: 'fe769568-16da-4d9e-9c99-fbed0a8a60f5',
      },
      orderDate: 1657188240000,
      orderUuid: 'abc-123',
      provider: 'Super Man',
      providerUuid:'1'
    },
    {
      concept: {
        name: 'Anaemia Panel',
        uuid: '5b0cdc41-7371-4c2f-a1e4-ed1bf7416a8d',
      },
      orderDate: 1657187934000,
      orderUuid: 'abd-123',
      provider: 'Super Man',
      providerUuid:'2'
    },
  ],
}

export const mockPendingLabOrdersErrorResponse = {
  message: 'Data not found',
  response: {
    status: 404,
    statusText: 'Not Found',
  },
}
export const mockEmptyPendingLabOrderResponse = {
  data: [],
}
