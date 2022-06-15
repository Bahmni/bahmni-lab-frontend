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
  const {doctor, setDoctor} = useDoctorDetails()

  useMemo(() => {
    let arr = []
    arr.push({display: 'Self'})
    doctorList?.data?.results?.map(doctorDetails => {
      arr.push(doctorDetails)
    })
    setItems(arr)
  }, [doctorList])

  const updateDoctorDetails = selectedItem => {
    setDoctor(selectedItem)
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
          itemToString={data => data.display}
          label="Please select the doctor name"
          onChange={({selectedItem}) => updateDoctorDetails(selectedItem)}
          selectedItem={doctor}
        ></Dropdown>
      )}
    </div>
  )
}

export default DoctorListDropdown
