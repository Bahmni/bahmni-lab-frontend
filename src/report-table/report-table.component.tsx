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
import {ReportEntry, ReportTableFetchResponse} from '../types'
import {fetcher, getReportTableDataURL} from '../utils/lab-orders'
import classes from './report-table.component.scss'

function getUrl(rows, row) {
  return rows?.find(intialRow => intialRow.id === row.id)?.url
}

const ReportTable = props => {
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
    const uniqueUploadedReports: Array<ReportEntry> = mergeMultipleTestsBasedOnUploadedFile(
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
                                      href={getUrl(rows, row)}
                                      target={'_blank'}
                                    >
                                      {cell.value}
                                    </Link>
                                  ) : (
                                    <ImagePreviewComponent
                                      url={getUrl(rows, row)}
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

const mergeMultipleTestsBasedOnUploadedFile = (
  diagnosticReports: Array<ReportEntry>,
): Array<ReportEntry> => {
  const documentUrls: Array<string> = []
  const uniqueDiagnosticReports: Array<ReportEntry> = []
  for (let index = 0; index < diagnosticReports?.length; index++) {
    const diagnosticReport: ReportEntry = diagnosticReports[index]
    const documentUrl: string = diagnosticReport.resource.presentedForm[0].url
    if (documentUrls.includes(documentUrl)) {
      const existingReports: Array<ReportEntry> = uniqueDiagnosticReports.filter(
        report => report.resource.presentedForm[0].url === documentUrl,
      )
      if (existingReports.length === 1) {
        existingReports[0].resource.code.coding[0].display = `${existingReports[0].resource.code.coding[0].display}, ${diagnosticReport.resource.code.coding[0].display}`
      }
    } else {
      documentUrls.push(documentUrl)
      uniqueDiagnosticReports.push(diagnosticReport)
    }
  }
  return uniqueDiagnosticReports
}

export default ReportTable
