import {usePagination} from '@openmrs/esm-framework'
import {PatientChartPagination} from '@openmrs/esm-patient-common-lib'
import {
  DataTable,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandedRow,
  TableExpandHeader,
  TableExpandRow,
  TableHead,
  TableHeader,
  TableRow,
} from 'carbon-components-react'
import React, {useEffect, useMemo} from 'react'
import useSWR, {mutate} from 'swr'
import {defaultPageSize, reportHeaders} from '../constants'
import ImagePreviewComponent from '../image-preview-component/image-preview-component'
import {
  ReportEntry,
  ReportResource,
  ReportTableFetchResponse,
  ReportTableRow,
} from '../types'
import {fetcher, getReportTableDataURL} from '../utils/lab-orders'
import classes from './report-table.component.scss'

const documentPath = '/document_images/'

function getReportUrl(reportsData: Array<ReportTableRow>, reportId: string) {
  const url = reportsData?.find(intialRow => intialRow.id === reportId)?.url

  return url ? `${documentPath}${url}` : ''
}

interface ReportTableProps {
  patientUuid: string
  reloadTableData?: boolean
}

const ReportTable = (props: ReportTableProps) => {
  const {patientUuid, reloadTableData} = props
  const reportTableDataUrl = getReportTableDataURL(patientUuid)

  useEffect(() => {
    if (reloadTableData) mutate(reportTableDataUrl)
  }, [reloadTableData, reportTableDataUrl])

  let {data: reports, error: reportsTableDataError} = useSWR<
    ReportTableFetchResponse,
    Error
  >(getReportTableDataURL(patientUuid), fetcher)

  const rows = useMemo(() => {
    const uniqueUploadedReports: Array<ReportEntry> = dedupe(
      reports?.data?.entry,
    )
    return uniqueUploadedReports
      ?.sort((reportEntry1, reportEntry2) => {
        return (
          new Date(reportEntry2.resource.issued).getTime() -
          new Date(reportEntry1.resource.issued).getTime()
        )
      })
      .map(row => {
        const title = row.resource.presentedForm[0].title

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
          file: title,
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
                                  {cell.value?.endsWith('pdf') ? (
                                    <Link
                                      href={getReportUrl(rows, row.id)}
                                      target={'_blank'}
                                    >
                                      {cell.value}
                                    </Link>
                                  ) : (
                                    <ImagePreviewComponent
                                      url={getReportUrl(rows, row.id)}
                                      fileName={cell.value}
                                    />
                                  )}
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

function url(resource: ReportResource) {
  return resource.presentedForm[0].url
}
function code(resource: ReportResource) {
  return resource.code.coding[0].display
}

function getUniqueReportUrls(diagnosticReport: ReportEntry[]) {
  return new Set<string>(diagnosticReport?.map(report => url(report.resource)))
}

function dedupe(diagnosticReport: Array<ReportEntry>) {
  return Array.from(getUniqueReportUrls(diagnosticReport)).map(reportUrl =>
    diagnosticReport.reduce<ReportEntry | undefined>((acc, curr) => {
      if (url(curr.resource) === reportUrl) {
        if (acc)
          acc.resource.code.coding[0].display = `${code(acc.resource)}, ${code(
            curr.resource,
          )}`
        else return curr
      }
      return acc
    }, undefined),
  )
}

export default ReportTable
