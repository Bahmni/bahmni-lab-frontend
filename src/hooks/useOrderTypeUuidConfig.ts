import {useEffect} from 'react'
import useSWR from 'swr'
import createPersistedState from 'use-persisted-state'
import {orderTypeUuidKey, labOrderType} from '../utils/constants'
import {OrderTypeFetchResponse, OrderType} from '../types'
import {getOrderTypeUuid, fetcher} from '../utils/api-utils'
const useOrderTypeUuidConfigState = createPersistedState<string>(
  orderTypeUuidKey,
)

interface OrderTypeUuidConfigProps {
  orderTypeUuidConfig: string
  orderTypeUuidConfigError: any
}

export const useOrderTypeUuidConfig = (): OrderTypeUuidConfigProps => {
  const [
    orderTypeUuidConfig,
    setOrderTypeUuidConfig,
  ] = useOrderTypeUuidConfigState()
  const {data: orderTypes, error} = useSWR<OrderTypeFetchResponse, Error>(
    getOrderTypeUuid,
    fetcher,
  )
  useEffect(() => {
    if (orderTypes) {
      const LabOrderType: OrderType = orderTypes?.data?.results?.find(
        orderType => orderType?.display === labOrderType,
      )
      setOrderTypeUuidConfig(LabOrderType?.uuid)
    }
  }, [orderTypes])
  return {
    orderTypeUuidConfig,
    orderTypeUuidConfigError: error,
  }
}
