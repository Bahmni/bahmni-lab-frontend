import {Dropdown} from 'carbon-components-react'
import React, {useEffect, useState} from 'react'
import useSWR from 'swr'
import {selfPatient} from '../../utils/constants'
import {usePendingLabOrderContext} from '../../context/pending-orders-context'
import {useDoctorDetails} from '../../context/upload-report-context'
import {DoctorsResponse} from '../../types'
import {fetcher, getProvidersURL} from '../../utils/lab-orders'
import {useTranslation} from 'react-i18next'

const DoctorListDropdown = () => {
  const {t} = useTranslation()
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
      <div>
        {t(
          'DOCTOR_NAME_ERROR',
          'Something went wrong in fetching Doctor Names...',
        )}
      </div>
    )

  return (
    <div>
      {isProvidersListError() ?? (
        <Dropdown
          id="doctor-list-dropdown"
          title={t('DOCTOR_LIST', 'doctor list')}
          items={items}
          itemToString={data => data.person?.display}
          label={t('SELECT_DOCTOR', 'Select a Doctor')}
          onChange={({selectedItem}) => setDoctor(selectedItem)}
          selectedItem={doctor}
        />
      )}
    </div>
  )
}

export default DoctorListDropdown
