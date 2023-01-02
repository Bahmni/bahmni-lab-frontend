import React, {useState} from 'react'
import {LabTest} from '../types/selectTest'

interface LabTestResultsContextProps {
  labTestResults: any
  setLabTestResults: Function
  labTestResultsError: Error
  setLabTestResultsError: Function
  setAllTestsAndPanels: Function
  allTestsAndPanels: Array<LabTest>
}

export const LabTestResultsContext = React.createContext<
  LabTestResultsContextProps
>(null)

const useLabTestResultsContext = () => {
  const context = React.useContext(LabTestResultsContext)

  if (!context) {
    throw new Error(`useLabTestResultsContext must be used within the scope`)
  }
  return {
    labTestResults: context.labTestResults,
    setLabTestResults: context.setLabTestResults,
    labTestResultsError: context.labTestResultsError,
    setLabTestResultsError: context.setLabTestResultsError,
  }
}

const useAllTestAndPanel = () => {
  const context = React.useContext(LabTestResultsContext)

  if (!context) {
    throw new Error(`useLabTestResultsContext must be used within the scope`)
  }
  return {
    allTestsAndPanels: context.allTestsAndPanels,
    setAllTestsAndPanels: context.setAllTestsAndPanels,
  }
}

const LabTestResultsProvider = ({children}) => {
  const [labTestResults, setLabTestResults] = useState<any>([])
  const [labTestResultsError, setLabTestResultsError] = useState<Error>()
  const [allTestsAndPanels, setAllTestsAndPanels] = useState<Array<LabTest>>([])

  const contextValue = {
    labTestResults: labTestResults,
    setLabTestResults: setLabTestResults,
    labTestResultsError: labTestResultsError,
    setLabTestResultsError: setLabTestResultsError,
    allTestsAndPanels,
    setAllTestsAndPanels,
  }
  return (
    <LabTestResultsContext.Provider value={contextValue}>
      {children}
    </LabTestResultsContext.Provider>
  )
}

export {LabTestResultsProvider, useLabTestResultsContext, useAllTestAndPanel}
