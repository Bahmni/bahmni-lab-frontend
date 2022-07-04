import {
  getCurrentUser,
  LoggedInUser,
  userHasAccess,
} from '@openmrs/esm-framework'
import React, {useEffect, useState} from 'react'

interface UserHasAccessProps {
  privilege: string
  unauthorisedChildren?: React.ReactNode | undefined
}

export const UserHasAccess: React.FC<UserHasAccessProps> = ({
  privilege,
  unauthorisedChildren,
  children,
}) => {
  const [user, setUser] = useState<LoggedInUser | null>(null)

  useEffect(() => {
    const subscription = getCurrentUser({
      includeAuthStatus: false,
    }).subscribe(setUser)
    return () => subscription.unsubscribe()
  }, [])

  if (user && userHasAccess(privilege, user)) {
    return <>{children}</>
  } else {
    return unauthorisedChildren ? <>{unauthorisedChildren}</> : null
  }
}
