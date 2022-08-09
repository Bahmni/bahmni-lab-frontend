import React, {useEffect, useState} from 'react'
import styles from './home-button.scss'
import Home24 from '@carbon/icons-react/lib/home/24'
import {
  homePath,
  isAuditLogEnabledKey,
  isAuditLogPostedKey,
  loggedInUserKey,
} from '../constants'
import {HeaderGlobalAction} from 'carbon-components-react'
import {
  auditLogGlobalPropertyURL,
  auditLogURL,
  fetcher,
  getPayloadForUserLogin,
  postApiCall,
} from '../utils/api-utils'
import {getCurrentUser, LoggedInUser} from '@openmrs/esm-framework'
import useSWR from 'swr'

interface AuditLogResponse {
  data: boolean
}

const HomeButton = () => {
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null)

  let {data: auditLogEnabledResponse, error: auditLogResponseError} = useSWR<
    AuditLogResponse,
    Error
  >(auditLogGlobalPropertyURL, fetcher)

  useEffect(() => {
    const subscription = getCurrentUser({
      includeAuthStatus: false,
    }).subscribe(setLoggedInUser)
    return () => subscription.unsubscribe()
  }, [])

  if (
    auditLogEnabledResponse?.data &&
    loggedInUser &&
    !localStorage.getItem(isAuditLogPostedKey)
  ) {
    const ac = new AbortController()
    const auditMessagePayload = getPayloadForUserLogin(loggedInUser.username)
    postApiCall(auditLogURL, auditMessagePayload, ac)
    localStorage.setItem(loggedInUserKey, loggedInUser.username)
    localStorage.setItem(isAuditLogPostedKey, 'true')
    localStorage.setItem(isAuditLogEnabledKey, 'true')
  }

  return (
    <HeaderGlobalAction
      aria-label="Home"
      className={styles.headerGlobalBarButton}
      onClick={() => {
        window.location.href = homePath
      }}
    >
      <Home24 className={styles.home} />
    </HeaderGlobalAction>
  )
}

export default HomeButton
