import {usePagination} from '@openmrs/esm-framework'
import {PatientChartPagination} from '@openmrs/esm-patient-common-lib'
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableSelectAll,
  TableHeader,
  TableBody,
  TableSelectRow,
  TableCell,
} from 'carbon-components-react'
import React, {useMemo} from 'react'
import useSWR from 'swr'
import {headers, defaultPageSize} from '../constants'
import {LabOrdersFetchResponse} from '../types'
import {fetcher, getPendingLabOrdersURL} from '../utils/api-utils'

const PaginatedTable = ({
  patientUuid,
  selectedPendingTestDispatch,
  setRemovedRow,
  selectedPendingTest,
}) => {
  const {data: pendingLabOrders, error: pendingLabOrderDataError} = useSWR<
    LabOrdersFetchResponse,
    Error
  >(getPendingLabOrdersURL(patientUuid), fetcher)

  const rows = useMemo(() => {
    return pendingLabOrders?.data?.results?.reverse().map(row => {
      return {
        id: row.uuid,
        testName: row.display,
        date: new Date(row.dateActivated).toLocaleDateString(
          localStorage.getItem('i18nextLng'),
          {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
          },
        ),
        orderedBy: row.orderer.display,
        conceptUuid: row.concept.uuid,
      }
    })
  }, [pendingLabOrders])

  const {results: paginatedPendingLabOrders, goTo, currentPage} = usePagination(
    rows,
    defaultPageSize,
  )

  return (
    <div title="paginated-table">
      {pendingLabOrderDataError ? (
        <div>Something went wrong in fetching pending lab orders...</div>
      ) : (
        rows?.length > 0 && (
          <>
            <h4>Pending Lab Orders</h4>
            <DataTable rows={paginatedPendingLabOrders} headers={headers}>
              {({
                rows: dataTableRows,
                headers,
                getSelectionProps,
                getHeaderProps,
              }) => (
                <Table title="lab-order-table">
                  <TableHead>
                    <TableRow>
                      <TableSelectAll
                        {...getSelectionProps()}
                        indeterminate={selectedPendingTest.length > 0}
                      />
                      {headers.map(header => (
                        <TableHeader {...getHeaderProps({header})}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataTableRows.map(row => (
                      <TableRow key={row.id}>
                        <TableSelectRow
                          {...getSelectionProps({row})}
                          onChange={selected => {
                            const currentRow = rows.filter(
                              intialRow => intialRow.id === row.id,
                            )[0]
                            if (selected) {
                              selectedPendingTestDispatch({
                                type: 'checked',
                                currentRow: currentRow,
                              })
                              setRemovedRow({})
                            } else {
                              selectedPendingTestDispatch({
                                type: 'unchecked',
                                currentRow: currentRow,
                                setRemovedRow: setRemovedRow,
                              })
                            }
                          }}
                          checked={
                            selectedPendingTest.filter(
                              tempRow => tempRow.id === row.id,
                            ).length > 0
                          }
                        />
                        {row.cells.map(cell => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </DataTable>
            <PatientChartPagination
              pageNumber={currentPage}
              pageSize={defaultPageSize}
              currentItems={paginatedPendingLabOrders?.length}
              totalItems={rows?.length}
              onPageNumberChange={({page}) => {
                goTo(page)
              }}
            />
          </>
        )
      )}
    </div>
  )
}

export default PaginatedTable
