import React, {useEffect, useState} from 'react'
import useSWR from 'swr'
import {DoctorDetailsData, DoctorsResponse} from '../types'
import {fetcher, getProvidersURL} from '../utils/lab-orders'
import {Dropdown} from 'carbon-components-react'
import {useDoctorDetails} from '../context/upload-report-context'
import {usePendingLabOrderContext} from '../context/pending-orders-context'
import {selfPatient} from '../constants'

const DoctorListDropdown = () => {
  const {data: providersList, error: providersListError} = useSWR<
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
        display: selectedPendingOrder[0].orderedBy,
      }
      setDoctor(requestedBy)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPendingOrder])

  useEffect(() => {
    const doctorsList = []
    doctorsList.push({display: selfPatient})
    providersList?.data?.results?.map(
      providerDetails =>
        isDoctor(providerDetails) && doctorsList.push(providerDetails),
    )
    setItems(doctorsList)
  }, [providersList])

  const isDoctor = (provider: DoctorDetailsData) => {
    if (provider.attributes?.length === 0) return false

    for (
      let providerAttributeIndex = 0;
      providerAttributeIndex < provider.attributes?.length;
      providerAttributeIndex++
    )
      if (
        provider.attributes[providerAttributeIndex].display.includes(
          'Is Doctor: true',
        ) &&
        !provider.attributes[providerAttributeIndex].attributeType.retired
      )
        return true

    return false
  }

  const isProvidersListError = () =>
    providersListError && (
      <div>Something went wrong in fetching Doctor Names...</div>
    )

  return (
    <div>
      {isProvidersListError() ?? (
        <Dropdown
          id="doctor-list-dropdown"
          title="doctor list"
          items={items}
          itemToString={data =>
            data.display ? data.display : data.person?.preferredName?.display
          }
          label="Select a Doctor"
          onChange={({selectedItem}) => setDoctor(selectedItem)}
          selectedItem={doctor}
        />
      )}
    </div>
  )
}

export default DoctorListDropdown
