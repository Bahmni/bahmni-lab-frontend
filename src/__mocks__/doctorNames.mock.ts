export const mockDoctorNames = {
  data: {
    results: [
      {
        uuid: '1',
        person: {
          display: 'admin - Super User',
        },
        attributes: [
          {
            display: 'practioner_role: Doctor',
            attributeType: [{retired: false}],
          },
        ],
      },
      {
        uuid: '2',
        person: {
          display: '7-5 - Dennis Kigen',
        },
      },
      {
        uuid: '3',
        person: {
          display: '8-3 - user',
        },
        attributes: [
          {
            display: 'practioner_role: Doctor',
            attributeType: [{retired: false}],
          },
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
  },
}
