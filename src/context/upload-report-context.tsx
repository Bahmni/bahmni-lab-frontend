import React, {useState} from 'react'
import {LabTest} from '../types/selectTest'

interface UploadReportContextProps {
  selectedFile: File
  setSelectedFile: Function
  selectedTests: LabTest[]
  setSelectedTests: Function
  doctorName: string
  setDoctorName: Function
  performerUuid: string
  setPerformerUuid: Function
}
const UploadReportContext = React.createContext<UploadReportContextProps>(null)

function useSelectedFile() {
  const context = React.useContext(UploadReportContext)

  if (!context) {
    throw new Error(`useSelectedFile must be used within a Upload Report scope`)
  }
  return {
    selectedFile: context.selectedFile,
    setSelectedFile: context.setSelectedFile,
  }
}

function useDoctorDetails() {
  const context = React.useContext(UploadReportContext)
  return {
    doctorName: context.doctorName,
    setDoctorName: context.setDoctorName,
    performerUuid: context.performerUuid,
    setPerformerUuid: context.setPerformerUuid,
  }
}

function useSelectedTests() {
  const context = React.useContext(UploadReportContext)

  if (!context) {
    throw new Error(
      `useSelectedTests must be used within a Upload Report scope`,
    )
  }
  return {
    selectedTests: context.selectedTests,
    setSelectedTests: context.setSelectedTests,
  }
}

function UploadReportProvider({children}) {
  const [doctorName, setDoctorName] = useState<string>()
  const [selectedFile, setSelectedFile] = useState<File>()
  const [selectedTests, setSelectedTests] = React.useState<LabTest[]>([])
  const [performerUuid, setPerformerUuid] = useState<string>()

  const value = {
    selectedFile,
    setSelectedFile,
    selectedTests,
    setSelectedTests,
    doctorName,
    setDoctorName,
    performerUuid,
    setPerformerUuid,
  }

  return (
    <UploadReportContext.Provider value={value}>
      {children}
    </UploadReportContext.Provider>
  )
}

export {
  UploadReportProvider,
  useSelectedTests,
  useSelectedFile,
  useDoctorDetails,
  UploadReportContext,
}
