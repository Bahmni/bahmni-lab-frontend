import {ExtensionSlot, usePatient} from '@openmrs/esm-framework'
import {
  Button,
  DataTable,
  InlineLoading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
} from 'carbon-components-react'
import React from 'react'
import {Link, RouteComponentProps} from 'react-router-dom'
import useSWR from 'swr'
import {labOrderUuid, headers} from '../constants'
import Loader from '../loader/loader.component'
import styles from './patient-lab-details.scss'
import {openmrsFetch} from '@openmrs/esm-framework'
import AddFilled16 from '@carbon/icons-react/lib/add/16'

interface PatientParamsType {
  patientUuid: string
}

const PatientLabDetails: React.FC<RouteComponentProps<PatientParamsType>> = ({
  match,
}) => {
  const {patientUuid} = match.params
  const {isLoading, patient, error} = usePatient(patientUuid)

  const fetcher = url =>
    openmrsFetch(url, {
      method: 'GET',
    })
  const {data: pendingLabOrders, error: labOrderDataError, isValidating} = useSWR<
    any,
    Error
  >(
    `/ws/rest/v1/order?patient=${patientUuid}&orderType=${labOrderUuid}&v=default`,
    fetcher,
  )
  const rows = pendingLabOrders?.data?.results.map(row => {
    return {
      id: row.uuid,
      testName: row.display,
      date: new Date(row.dateActivated).toLocaleDateString(
        localStorage.getItem('i18nextLng'),
        {year: 'numeric', month: 'long', day: '2-digit'},
      ),
      orderedBy: row.orderer.display,
    }
  })

  const renderPendingOrdersTable = () =>
    isValidating ? (
      <InlineLoading />
    ) : labOrderDataError ? (
      <div>Something went wrong: {error.message}</div>
    ) : (
      <>
        <h4>Pending Lab Orders</h4>
        <DataTable rows={rows} headers={headers}>
          {({rows, headers, getSelectionProps}) => (
            <Table>
              <TableHead>
                <TableRow>
                  <TableSelectAll {...getSelectionProps()} />
                  {headers.map(header => (
                    <TableHeader>{header.header}</TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    <TableSelectRow {...getSelectionProps({row})} />
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DataTable>{' '}
      </>
    )

  return (
    <main className={styles.chartContainer}>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>Something went wrong: {error.message}</div>
      ) : (
        <div>
          <div>
            <aside>
              <ExtensionSlot
                extensionSlotName="patient-header-slot"
                state={{
                  patient,
                  patientUuid: patient.id,
                  hideActionsOverflow: true,
                }}
              />
            </aside>
          </div>
          <br></br>
          <br></br>
          <div>{renderPendingOrdersTable()}</div>
          <br></br>
          <br></br>
          <Link
            to={{
              pathname: '/patient/' + patient.id + '/report',
              state: {patient},
            }}
          >
            <Button renderIcon={AddFilled16}>Upload Report</Button>
          </Link>
        </div>
      )}
    </main>
  )
}

export default PatientLabDetails
