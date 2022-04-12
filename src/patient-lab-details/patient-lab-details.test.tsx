import {ExtensionSlot, usePatient} from '@openmrs/esm-framework'
import {render, screen} from '@testing-library/react'
import React from 'react'
import {when} from 'jest-when'
import PatientLabDetails from './patient-lab-details'
<<<<<<< HEAD
<<<<<<< HEAD:src/patient-lab-details/patient-lab-details.test.tsx
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
=======
>>>>>>> e7b7712 (BAH-1503 | Refactor. rename patient lab chart component and url to patient lab details):src/patient-lab-chart/patient-lab-chart.test.tsx
=======
import {MemoryRouter} from 'react-router'
>>>>>>> 9e8b733 (BAH-1503 | Add. create an Upload reports button to navigate to report upload screen)

const mockPatientUuid = '1'
const matchParams = {
  isExact: true,
  params: {patientUuid: `${mockPatientUuid}`},
  path: '',
  url: '',
}

describe('Patient lab details', () => {
  it('should show loader if call for patient data is in progress', () => {
    when(usePatient)
      .calledWith(mockPatientUuid)
      .mockReturnValue({
        isLoading: true,
      })
    render(
      <PatientLabDetails
        match={matchParams}
        history={undefined}
        location={undefined}
      />,
    )
    expect(screen.getByText(/loading \.\.\./i)).toBeInTheDocument()
  })

  it('should show error message when usePatient call fails', () => {
    when(usePatient)
      .calledWith(mockPatientUuid)
      .mockReturnValue({
        error: {message: 'unable to fetch patient data'},
      })
    render(
      <PatientLabDetails
        match={matchParams}
        history={undefined}
        location={undefined}
      />,
    )
    expect(screen.queryByText(/loading \.\.\./i)).not.toBeInTheDocument()
    expect(
      screen.getByText(/Something went wrong: unable to fetch patient data/i),
    ).toBeInTheDocument()
  })

  it('should show patient information in the patient header slot when usePatient call succeeds', () => {
    when(usePatient)
      .calledWith(mockPatientUuid)
      .mockReturnValue({
        patient: {id: mockPatientUuid},
      })
    when(ExtensionSlot).mockImplementation((props: any) => {
      return (
        <>
          <div>Extension slot name : {props.extensionSlotName} </div>
          <div>State : {JSON.stringify(props.state)}</div>
        </>
      )
    })
    render(
<<<<<<< HEAD
<<<<<<< HEAD:src/patient-lab-details/patient-lab-details.test.tsx
      <BrowserRouter>
=======
      <MemoryRouter>
>>>>>>> 9e8b733 (BAH-1503 | Add. create an Upload reports button to navigate to report upload screen)
        <PatientLabDetails
          match={matchParams}
          history={undefined}
          location={undefined}
        />
<<<<<<< HEAD
      </BrowserRouter>,
=======
      <PatientLabDetails
        match={matchParams}
        history={undefined}
        location={undefined}
      />,
>>>>>>> e7b7712 (BAH-1503 | Refactor. rename patient lab chart component and url to patient lab details):src/patient-lab-chart/patient-lab-chart.test.tsx
=======
      </MemoryRouter>,
>>>>>>> 9e8b733 (BAH-1503 | Add. create an Upload reports button to navigate to report upload screen)
    )
    expect(screen.queryByText(/loading \.\.\./i)).not.toBeInTheDocument()
    expect(
      screen.getByText(/Extension slot name : patient\-header\-slot/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /State : \{"patient":\{"id":"1"\},"patientuuid":"1","hideActionsOverflow":true\}/i,
      ),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /upload report/i,
      }),
    ).toBeInTheDocument()
<<<<<<< HEAD

    userEvent.click(screen.getByText('Upload Report'))
    expect(global.window.location.href).toMatch('/patient/1/report')
=======
>>>>>>> 9e8b733 (BAH-1503 | Add. create an Upload reports button to navigate to report upload screen)
  })
})
