import React, {useEffect, useState} from 'react'
import BahmniLogo from '../assets/bahmniLogoFull.png'
import {
  isAuditLogEnabledKey,
  loggedInUserKey,
  privilegeLabLite,
} from '../constants'
import {UserHasAccess} from '../UserHasAccess.component'
import {unauthorisedResponse} from '../unauthorised-response/unauthorised-response'
import classes from './home.scss'
import {LoggedInUser, getCurrentUser} from '@openmrs/esm-framework'
import useSWR from 'swr'
import {
  auditLogGlobalPropertyURL,
  fetcher,
  getPayloadForUserLogin,
  postApiCall,
  auditLogURL,
} from '../utils/api-utils'
interface AuditLogResponse {
  data: boolean
}
const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null)

  let {data: auditLogEnabledResponse, error: auditLogResponseError} = useSWR<
    AuditLogResponse,
    Error
  >(auditLogGlobalPropertyURL, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  useEffect(() => {
    const subscription = getCurrentUser({
      includeAuthStatus: false,
    }).subscribe(setLoggedInUser)
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (auditLogEnabledResponse?.data && loggedInUser) {
      const ac = new AbortController()
      const auditMessagePayload = getPayloadForUserLogin(loggedInUser.username)
      postApiCall(auditLogURL, auditMessagePayload, ac)
      localStorage.setItem(loggedInUserKey, loggedInUser.username)
      localStorage.setItem(isAuditLogEnabledKey, 'true')
    }
  }, [auditLogEnabledResponse, loggedInUser])

  return (
    <UserHasAccess privilege={privilegeLabLite} fallback={unauthorisedResponse}>
      <div>
        <div className={classes.image}>
          <img src={BahmniLogo} alt="Bahmni Logo" />
        </div>
        <span className={classes.welcomeText}>WELCOME TO LAB ENTRY</span>
        <span className={classes.helpText}>
          Please click on the search icon above to get started
        </span>
      </div>
    </UserHasAccess>
  )
}

export default Home
