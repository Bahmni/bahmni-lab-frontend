import {usePagination} from '@openmrs/esm-framework'
import {PatientChartPagination} from '@openmrs/esm-patient-common-lib'
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableExpandHeader,
  TableHeader,
  TableBody,
  TableExpandRow,
  TableExpandedRow,
  TableCell,
  Link,
} from 'carbon-components-react'
import React, {useEffect, useMemo, useState} from 'react'
import useSWR, {mutate, SWRResponse} from 'swr'
import {reportHeaders, defaultPageSize} from '../constants'
import {ReportTableFetchResponse} from '../types'
import {fetcher, getReportTableDataURL} from '../utils/lab-orders'
import classes from './report-table.component.scss'

const ReportTable = props => {
  const {patientUuid, reloadTableData} = props
  const reportTableDataUrl = getReportTableDataURL(patientUuid)

  useEffect(() => {
    if (reloadTableData) mutate(reportTableDataUrl)
  }, [reloadTableData, reportTableDataUrl])

  let {data: reports, error: reportsTableDataError} = useSWR<
    ReportTableFetchResponse,
    Error
  >(reportTableDataUrl, fetcher)

  const rows = useMemo(() => {
    return reports?.data?.entry
      ?.sort((reportEntry1, reportEntry2) => {
        return (
          new Date(reportEntry2.resource.issued).getTime() -
          new Date(reportEntry1.resource.issued).getTime()
        )
      })
      .map(row => {
        return {
          id: row.resource.id,
          tests: row.resource.code.coding[0].display,
          url: row.resource.presentedForm[0].url,
          date: new Date(row.resource.issued).toLocaleDateString(
            localStorage.getItem('i18nextLng'),
            {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            },
          ),
          requester: '-',
          file: `${row.resource.presentedForm[0].title}`,
          conclusion: row.resource.conclusion ? row.resource.conclusion : '',
        }
      })
  }, [reports])

  const {results: paginatedReportsTable, goTo, currentPage} = usePagination(
    rows,
    defaultPageSize,
  )
  return (
    <div title="report-table">
      {reportsTableDataError ? (
        <div>Something went wrong in fetching Report tables...</div>
      ) : (
        <>
          <h4>Reports table</h4>
          <DataTable rows={paginatedReportsTable} headers={reportHeaders}>
            {({
              rows: dataTableRows,
              headers,
              getHeaderProps,
              getRowProps,
              getTableProps,
              getTableContainerProps,
            }) => (
              <TableContainer {...getTableContainerProps()}>
                <Table {...getTableProps()} className={classes.reportTable}>
                  <TableHead>
                    <TableRow>
                      <TableExpandHeader id="expand" />
                      {headers.map((header, i) => (
                        <TableHeader
                          id={header.header}
                          key={i}
                          {...getHeaderProps({header})}
                        >
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows?.length > 0 ? (
                      dataTableRows.map(row => (
                        <React.Fragment key={row.id}>
                          <TableExpandRow {...getRowProps({row})}>
                            {row.cells.map(cell => {
                              return cell.id.endsWith('file') ? (
                                <TableCell key={cell.id}>
                                  <Link
                                    href={
                                      rows?.find(
                                        intialRow => intialRow.id === row.id,
                                      )?.url
                                    }
                                    target={'_blank'}
                                  >
                                    {cell.value}
                                  </Link>
                                </TableCell>
                              ) : (
                                <TableCell key={cell.id}>
                                  {cell.value}
                                </TableCell>
                              )
                            })}
                          </TableExpandRow>
                          <TableExpandedRow colSpan={reportHeaders.length + 1}>
                            <div
                              style={{overflowWrap: 'anywhere'}}
                            >{`Report conclusion : ${
                              rows?.filter(
                                intialRow => intialRow.id === row.id,
                              )[0]?.conclusion
                            }`}</div>
                          </TableExpandedRow>
                        </React.Fragment>
                      ))
                    ) : (
                      <TableExpandedRow colSpan={reportHeaders.length + 1}>
                        No previous reports found for this patient
                      </TableExpandedRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DataTable>
          {rows?.length > 0 && (
            <PatientChartPagination
              pageNumber={currentPage}
              pageSize={defaultPageSize}
              currentItems={paginatedReportsTable?.length}
              totalItems={rows?.length}
              onPageNumberChange={({page}) => {
                goTo(page)
              }}
            />
          )}
        </>
      )}
    </div>
  )
}

// ReportTable.defaultProps = {
//   reloadData: true
// }

export default ReportTable
