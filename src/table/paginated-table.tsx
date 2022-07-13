import {usePagination} from '@openmrs/esm-framework'
import {PatientChartPagination} from '@openmrs/esm-patient-common-lib'
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableSelectRowProps,
} from 'carbon-components-react'
import React, {useMemo} from 'react'
import useSWR from 'swr'
import {defaultPageSize, headers} from '../constants'
import {usePendingLabOrderContext} from '../context/pending-orders-context'
import {useOrderTypeUuidConfig} from '../hooks/useOrderTypeUuidConfig'
import {LabOrdersFetchResponse} from '../types'
import {fetcher, getPendingLabOrdersURL} from '../utils/api-utils'

const PaginatedTable = ({patientUuid, onButtonClick}) => {
  const {
    orderTypeUuidConfig,
    orderTypeUuidConfigError,
  } = useOrderTypeUuidConfig()

  const {data: pendingLabOrders, error: pendingLabOrderDataError} = useSWR<
    LabOrdersFetchResponse,
    Error
  >(getPendingLabOrdersURL(patientUuid, orderTypeUuidConfig), fetcher)

  const {
    selectedPendingOrder,
    setSelectedPendingOrder,
  } = usePendingLabOrderContext()

  const pendingLabOrderRows = useMemo(() => {
    return pendingLabOrders?.data?.map(pendingLabOrderRow => {
      return {
        id: pendingLabOrderRow.orderUuid,
        testName: pendingLabOrderRow.concept.name,
        date: new Date(pendingLabOrderRow.orderDate).toLocaleDateString(
          localStorage.getItem('i18nextLng'),
          {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
          },
        ),
        orderedBy: pendingLabOrderRow.provider,
        conceptUuid: pendingLabOrderRow.concept.uuid,
      }
    })
  }, [pendingLabOrders])

  const {results: paginatedPendingLabOrders, goTo, currentPage} = usePagination(
    pendingLabOrderRows,
    defaultPageSize,
  )

  return (
    <div title="paginated-table">
      {pendingLabOrderDataError ? (
        <div>Something went wrong in fetching pending lab orders...</div>
      ) : (
        pendingLabOrderRows?.length > 0 && (
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
                        disabled={onButtonClick}
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
                            const currentRow = pendingLabOrderRows.filter(
                              intialRow => intialRow.id === row.id,
                            )[0]
                            if (selected) {
                              setSelectedPendingOrder(prev => [
                                ...prev,
                                currentRow,
                              ])
                            } else {
                              setSelectedPendingOrder(
                                selectedPendingOrder.filter(
                                  tempRow => tempRow.id !== currentRow.id,
                                ),
                              )
                            }
                          }}
                          disabled={onButtonClick}
                          checked={isChecked(row)}
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
              totalItems={pendingLabOrderRows?.length}
              onPageNumberChange={({page}) => {
                goTo(page)
              }}
            />
          </>
        )
      )}
    </div>
  )

  function isChecked(row: TableSelectRowProps): boolean {
    return (
      selectedPendingOrder.filter(
        pendingOrderRow => pendingOrderRow.id === row.id,
      ).length == 1
    )
  }
}

export default PaginatedTable
