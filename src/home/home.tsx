import { getCurrentUser, LoggedInUser } from '@openmrs/esm-framework'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import BahmniLogo from '../assets/bahmniLogoFull.png'
import {
  auditLogGlobalPropertyURL,
  auditLogURL, configUrl, encounterTypeUrl,
  fetcher,
  getPayloadForUserLogin,
  postApiCall
} from '../utils/api-utils'
import { isAuditLogEnabledKey, loggedInUserKey } from '../utils/constants'
import classes from './home.scss'
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

  const {data: configResponse} = useSWR(configUrl, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const {data: encounterTypeResponse} = useSWR(encounterTypeUrl, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  useEffect(() => {
    if (configResponse && !localStorage.getItem('defaultVisitType')) {
      localStorage.setItem(
        'defaultVisitType',
        configResponse.data.config.defaultVisitType,
      )
    }
    if (encounterTypeResponse && !localStorage.getItem('encounterTypeUuids')) {
      let encounterUuid = []
      encounterTypeResponse.data.results.map(res => {
        if (res.display === 'LAB_RESULT')
          encounterUuid.push({"LAB_RESULT": res.uuid})
        if (res.display === 'Patient Document')
          encounterUuid.push({"Patient Document": res.uuid})
      })
      if (encounterUuid.length > 0)
        localStorage.setItem('encounterUuids', JSON.stringify(encounterUuid))
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
