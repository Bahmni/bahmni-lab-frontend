import {ExtensionSlot, usePatient} from '@openmrs/esm-framework'
import {render, screen} from '@testing-library/react'
import React from 'react'
import {when} from 'jest-when'
import PatientLabDetails from './patient-lab-details'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'

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
      <BrowserRouter>
        <PatientLabDetails
          match={matchParams}
          history={undefined}
          location={undefined}
        />
      </BrowserRouter>,
    )
    expect(screen.queryByText(/loading \.\.\./i)).not.toBeInTheDocument()
    expect(
      screen.getByText(/Extension slot name : patient\-header\-slot/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/State : \{"patient":\{"id":"1"\},"patientuuid":"1"\}/i),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /upload report/i,
      }),
    ).toBeInTheDocument()

    userEvent.click(screen.getByText('Upload Report'))
    expect(global.window.location.href).toMatch('/patient/1/report')
  })
})
