import React, {useEffect, useState} from 'react'
import {SWRConfig} from 'swr'
import {BrowserRouter, Route} from 'react-router-dom'
import {
  patientLabDetailsRoute,
  spaRoot,
  privilegeLabLite,
  loggedInUserKey,
} from './constants'
import PatientLabDetails from './patient-lab-details/patient-lab-details'
import {UserHasAccess} from './UserHasAccess.component'
import {InlineNotification} from 'carbon-components-react/lib/components/Notification'
import {
  auditLogURL,
  getPayloadForUserLogin,
  postApiCall,
} from './utils/api-utils'
import {getCurrentUser, LoggedInUser} from '@openmrs/esm-framework'

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
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null)

  useEffect(() => {
    const subscription = getCurrentUser({
      includeAuthStatus: false,
    }).subscribe(setLoggedInUser)
    return () => subscription.unsubscribe()
  }, [])

  if (loggedInUser) {
    const ac = new AbortController()
    const auditMessagePayload = getPayloadForUserLogin(loggedInUser.username)
    postApiCall(auditLogURL, auditMessagePayload, ac)
    localStorage.setItem(loggedInUserKey, loggedInUser.username)
  }

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
