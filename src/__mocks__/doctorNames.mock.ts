export const mockDoctorNames = {
  data: {
    results: [
      {
        display: 'self',
      },
      {
        uuid: '1',
        display: 'admin - Super User',
        attributes: [
          {display: 'Is Doctor: true', attributeType: [{retired: false}]},
        ],
      },
      {
        uuid: '2',
        display: '7-5 - Dennis Kigen',
      },
      {
        uuid: '3',
        display: '',
        person: {
          preferredName: {display: '8-3 - user'},
        },
        attributes: [
          {display: 'Is Doctor: true', attributeType: [{retired: false}]},
        ],
      },
      {
        uuid: '4',
        display: 'user',
        attributes: [],
      },
    ],
  },
}

export const mockDoctorsListErrorResponse = {
  message: 'Data not found',
  response: {
    status: 404,
    statusText: 'Not Found',
  }
}