import React from 'react'
import {SWRConfig} from 'swr'
import {BrowserRouter, Route} from 'react-router-dom'
import {patientLabDetailsRoute, spaRoot, privilegeLabLite} from './constants'
import PatientLabDetails from './patient-lab-details/patient-lab-details'
import {UserHasAccess} from './UserHasAccess.component'
import {InlineNotification} from 'carbon-components-react/lib/components/Notification'

const swrConfiguration = {
  // Maximum number of retries when the backend returns an error
  errorRetryCount: 3,
  revalidateOnFocus: false,
}
const unauthorisedResponse = (
  <div className="omrs-inline-notifications-container">
    <InlineNotification
      title="Unauthorised"
      subtitle="You are unauthorised to view this page. Please contact your administrator"
      kind="error"
    />
  </div>
)

const Root: React.FC = () => {
  return (
    <UserHasAccess
      privilege={privilegeLabLite}
      unauthorisedResponse={unauthorisedResponse}
    >
      <main>
        <SWRConfig value={swrConfiguration}>
          <BrowserRouter basename={spaRoot}>
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
