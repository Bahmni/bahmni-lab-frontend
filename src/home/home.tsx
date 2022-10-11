import {getCurrentUser, LoggedInUser} from '@openmrs/esm-framework'
import React, {useEffect, useState} from 'react'
import useSWR from 'swr'
import BahmniLogo from '../assets/bahmniLogoFull.png'
import {
  auditLogGlobalPropertyURL,
  auditLogURL,
  configUrl,
  swrOptions,
  encounterTypeUrl,
  fetcher,
  getPayloadForUserLogin,
  postApiCall,
} from '../utils/api-utils'
import {
  defaultVisitTypeKey,
  encounterTypeUuidsKey,
  isAuditLogEnabledKey,
  loggedInUserKey,
} from '../utils/constants'
import classes from './home.scss'
interface AuditLogResponse {
  data: boolean
}
const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null)

  let {data: auditLogEnabledResponse, error: auditLogResponseError} = useSWR<
    AuditLogResponse,
    Error
  >(auditLogGlobalPropertyURL, fetcher, swrOptions)

  const {data: configResponse} = useSWR(configUrl, fetcher, swrOptions)

  const {data: encounterTypeResponse} = useSWR(
    encounterTypeUrl,
    fetcher,
    swrOptions,
  )

  useEffect(() => {
    if (configResponse && !localStorage.getItem(defaultVisitTypeKey)) {
      localStorage.setItem(
        defaultVisitTypeKey,
        configResponse.data.config.defaultVisitType,
      )
    }
    if (encounterTypeResponse && !localStorage.getItem(encounterTypeUuidsKey)) {
      let encounterUuid = []
      encounterTypeResponse.data.results.map(res => {
        if (res.display === 'LAB_RESULT')
          encounterUuid.push({LAB_RESULT: res.uuid})
        if (res.display === 'Patient Document')
          encounterUuid.push({'Patient Document': res.uuid})
      })
      if (encounterUuid.length > 0)
        localStorage.setItem(
          encounterTypeUuidsKey,
          JSON.stringify(encounterUuid),
        )
    }
  }, [configResponse, encounterTypeResponse])

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
    <div>
      <div className={classes.image}>
        <img src={BahmniLogo} alt="Bahmni Logo" />
      </div>
      <span className={classes.welcomeText}>WELCOME TO LAB ENTRY</span>
      <span className={classes.helpText}>
        Please click on the search icon above to get started
      </span>
    </div>
  )
}

export default Home
