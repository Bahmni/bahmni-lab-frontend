import {userHasAccess, useSession} from '@openmrs/esm-framework'
import React from 'react'
import {BrowserRouter, Redirect} from 'react-router-dom'
import {privilegeLabLite} from '../../utils/constants'

export const UnauthorisedResponse = () => {
  const {user} = useSession()

  return user && !userHasAccess(privilegeLabLite, user) ? (
    <BrowserRouter forceRefresh={true}>
      <Redirect to={'/unauthorized.html'} />
    </BrowserRouter>
  ) : null
}
