import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {SWRConfig} from 'swr'
import {
  labEntryHomePath,
  patientLabDetailsRoute,
  privilegeLabLite,
  spaRoot,
} from './constants'
import Home from './home/home'
import PatientLabDetails from './patient-lab-details/patient-lab-details'
import {unauthorisedResponse} from './unauthorised-response/unauthorised-response'
import {UserHasAccess} from './UserHasAccess.component'

const swrConfiguration = {
  // Maximum number of retries when the backend returns an error
  errorRetryCount: 3,
  revalidateOnFocus: false,
}

const Root: React.FC = () => {
  return (
    <UserHasAccess privilege={privilegeLabLite} fallback={unauthorisedResponse}>
      <main>
        <SWRConfig value={swrConfiguration}>
          <BrowserRouter basename={spaRoot}>
            <Route exact path={labEntryHomePath} component={Home} />
            <Route
              exact
              path={patientLabDetailsRoute}
              component={PatientLabDetails}
            />
          </BrowserRouter>
        </SWRConfig>
      </main>
    </UserHasAccess>
  )
}

export default Root
