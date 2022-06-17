import React, {useMemo, useState} from 'react'
import useSWR from 'swr'
import {DoctorsResponse} from '../types'
import {fetcher, getDoctorsURL} from '../utils/lab-orders'
import {Dropdown} from 'carbon-components-react'
import {useDoctorDetails} from '../context/upload-report-context'

const DoctorListDropdown = () => {
  const {data: doctorList, error: DoctorListError} = useSWR<
    DoctorsResponse,
    Error
  >(getDoctorsURL, fetcher)

  const [items, setItems] = useState([])
  const [doctorMap, setDoctorMap] = useState(null)
  const {doctorName, setDoctorName, setPerformerUuid} = useDoctorDetails()

  useMemo(() => {
    let map = new Map<string, string>()
    let arr = []
    map.set('Self', null)
    arr.push('Self')
    doctorList?.data?.results?.map(doctorDetails => {
      map.set(doctorDetails.display, doctorDetails.uuid)
      arr.push(doctorDetails.display)
    })
    setDoctorMap(map)
    setItems(arr)
  }, [doctorList])

  const updateDoctorDetails = selectedItem => {
    setDoctorName(selectedItem)
    setPerformerUuid(doctorMap.get(selectedItem))
  }

  return (
    <div>
      {DoctorListError ? (
        <div>Something went wrong in fetching Doctor Names...</div>
      ) : (
        <Dropdown
          id="doctor-list-dropdown"
          title="doctor list"
          items={items}
          label="Please select the doctor name"
          onChange={({selectedItem}) => updateDoctorDetails(selectedItem)}
          selectedItem={doctorName}
        ></Dropdown>
      )}
    </div>
  )
}

export default DoctorListDropdown
