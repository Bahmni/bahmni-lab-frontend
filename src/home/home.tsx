import {getCurrentUser, LoggedInUser} from '@openmrs/esm-framework'
import React, {useEffect, useState} from 'react'
import {
  DataTable,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Loading,
} from 'carbon-components-react'
import {Link} from 'react-router-dom'
import useSWR from 'swr'
import {useCookies} from 'react-cookie'
import BahmniLogo from '../assets/bahmniLogoFull.png'
import {
  auditLogGlobalPropertyURL,
  auditLogURL,
  swrOptions,
  fetcher,
  getPayloadForUserLogin,
  postApiCall,
  activePatientWithLabOrdersURL,
} from '../utils/api-utils'
import {
  isAuditLogEnabledKey,
  loggedInUserKey,
  userLocationKey,
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

  const [cookies] = useCookies()
  const location = cookies[userLocationKey]
  const {data: patients, error: responseErrorFromSWR} = useSWR(
    activePatientWithLabOrdersURL(location?.uuid),
    fetcher,
    swrOptions,
  )
  const headers = [
    {
      key: 'identifier',
      header: 'Patient Id',
    },
    {
      key: 'name',
      header: 'Patient Name',
    },
  ]
  const renderPatientTable = () => {
    console.log('patients', patients)
    if (patients && Array.isArray(patients.data) && patients.data.length > 0) {
      return (
        <div className={classes.homeContainer}>
          <TableContainer>
            <h2>Patient List</h2>
            <TableToolbar>
              <TableToolbarContent></TableToolbarContent>
            </TableToolbar>

            <Table role="table">
              <TableHead role="columnheader">
                <TableRow>
                  {headers.map(header => (
                    <TableHeader key={header.key}>{header.header}</TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.data.map(patient => (
                  <TableRow key={patient.identifier}>
                    <TableCell>
                      <Link to={`/patient/${patient.uuid}`}>
                        {patient.identifier}
                      </Link>
                    </TableCell>
                    <TableCell>{patient.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )
    } else {
      return <p>No patients found.</p>
    }
  }

  return (
    <div className={classes.homeContainer}>
      <div className={classes.image}>
        <img src={BahmniLogo} alt="Bahmni Logo" />
      </div>
      <h1 className={classes.welcomeText}>WELCOME TO LAB ENTRY</h1>
      <span className={classes.helpText}>
        Please click on the search icon above to get started
      </span>
      {renderPatientTable()}
    </div>
  )
}

export default Home
