import {Dropdown} from 'carbon-components-react'
import React, {useEffect, useState} from 'react'
import useSWR from 'swr'
import {selfPatient} from '../constants'
import {usePendingLabOrderContext} from '../context/pending-orders-context'
import {useDoctorDetails} from '../context/upload-report-context'
import {DoctorsResponse} from '../types'
import {fetcher, getProvidersURL} from '../utils/lab-orders'

const DoctorListDropdown = () => {
  const {data: doctorsList, error: doctorsListError} = useSWR<
    DoctorsResponse,
    Error
  >(getProvidersURL, fetcher)

  const {selectedPendingOrder} = usePendingLabOrderContext()
  const [items, setItems] = useState([])
  const {doctor, setDoctor} = useDoctorDetails()

  useEffect(() => {
    if (selectedPendingOrder.length > 0) {
      const requestedBy = {
        uuid: selectedPendingOrder[0].providerUuid,
        person: {display: selectedPendingOrder[0].orderedBy},
      }
      setDoctor(requestedBy)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPendingOrder])

  useEffect(() => {
    const doctors = []
    doctors.push({person: {display: selfPatient}})
    doctorsList?.data?.results && doctors.push(...doctorsList.data.results)
    setItems(doctors)
  }, [doctorsList])

  const isProvidersListError = () =>
    doctorsListError && (
      <div>Something went wrong in fetching Doctor Names...</div>
    )

  return (
    <div>
      {isProvidersListError() ?? (
        <Dropdown
          id="doctor-list-dropdown"
          title="doctor list"
          items={items}
          itemToString={data => data.person?.display}
          label="Select a Doctor"
          onChange={({selectedItem}) => setDoctor(selectedItem)}
          selectedItem={doctor}
        />
      )}
    </div>
  )
}

export default DoctorListDropdown
