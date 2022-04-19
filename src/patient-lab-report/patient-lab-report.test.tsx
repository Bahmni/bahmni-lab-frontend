import {ExtensionSlot} from '@openmrs/esm-framework'
import {render, screen} from '@testing-library/react'
import React from 'react'
import {when} from 'jest-when'
import PatientLabReport from './patient-lab-report'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'

describe('Patient lab details', () => {
  it('should show patient information in the patient header slot when usePatient call succeeds', () => {
    when(ExtensionSlot).mockImplementation((props: any) => {
      return (
        <>
          <div>Extension slot name : {props.extensionSlotName} </div>
          <div>State : {JSON.stringify(props.state)}</div>
        </>
      )
    })

    const history = createMemoryHistory()
    const state = {patient: {id: '1'}}
    history.push('/', state)

    render(
      <Router history={history}>
        <PatientLabReport />
      </Router>,
    )

    expect(
      screen.getByText(/Extension slot name : patient\-header\-slot/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /State : \{"patient":\{"id":"1"\},"patientuuid":"1","hideActionsOverflow":true\}/i,
      ),
    ).toBeInTheDocument()
  })
})
