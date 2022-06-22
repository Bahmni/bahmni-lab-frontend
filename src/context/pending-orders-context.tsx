import React, {useState} from 'react'
import {PendingLabOrders} from '../types/index'

interface PendingLabOrderContextProps {
  selectedPendingOrder: PendingLabOrders[]
  setSelectedPendingOrder: Function
}

export const PendingOrdersContext = React.createContext<
  PendingLabOrderContextProps
>(null)

export const usePendingLabOrderContext = () => {
  const context = React.useContext(PendingOrdersContext)

  if (!context) {
    throw new Error(
      `usePendingLabOrderContext must be used within Pending Lab Orders scope`,
    )
  }
  return {
    selectedPendingOrder: context.selectedPendingOrder,
    setSelectedPendingOrder: context.setSelectedPendingOrder,
  }
}

const PendingLabOrdersProvider = ({children}) => {
  const [selectedPendingOrder, setSelectedPendingOrder] = useState<
    Array<PendingLabOrders>
  >([])

  const contextValue = {
    selectedPendingOrder: selectedPendingOrder,
    setSelectedPendingOrder: setSelectedPendingOrder,
  }
  return (
    <PendingOrdersContext.Provider value={contextValue}>
      {children}
    </PendingOrdersContext.Provider>
  )
}

export default PendingLabOrdersProvider
