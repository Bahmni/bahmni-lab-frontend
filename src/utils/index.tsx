import React from 'react'
import {BrowserRouter, Redirect} from 'react-router-dom'

export const unauthorisedResponse = (
  <BrowserRouter forceRefresh={true}>
    <Redirect to={'/unauthorized.html'} />
  </BrowserRouter>
)
