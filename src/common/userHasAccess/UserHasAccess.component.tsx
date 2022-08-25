import {
  getCurrentUser,
  LoggedInUser,
  userHasAccess,
} from '@openmrs/esm-framework'
import React, {useEffect, useState} from 'react'

interface UserHasAccessProps {
  privilege: string
  fallback?: React.ReactNode | undefined
}

export const UserHasAccess: React.FC<UserHasAccessProps> = ({
  privilege,
  fallback,
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
    return fallback && user ? <>{fallback}</> : null
  }
}
