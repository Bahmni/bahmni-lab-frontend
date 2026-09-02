/*
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at https://www.bahmni.org/license/mplv2hd.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */

import React, {useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {BrowserRouter, Route} from 'react-router-dom'
import {SWRConfig} from 'swr'
import {
  labAppNamespace,
  labEntryHomePath,
  patientLabDetailsRoute,
  privilegeLabLite,
  spaRoot,
} from '../utils/constants'
import Home from '../home/home'
import {UnauthorisedResponse} from '../common/unauthorized-response/unauthorised-response'
import PatientLabDetails from './patient-lab-details/patient-lab-details'
import {UserHasAccess} from '@openmrs/esm-framework'
import {PendingLabOrdersProvider} from '../context/pending-orders-context'
import {LabTestResultsProvider} from '../context/lab-test-results-context'

const swrConfiguration = {
  // Maximum number of retries when the backend returns an error
  errorRetryCount: 3,
  revalidateOnFocus: false,
}

const Root: React.FC = () => {
  const {t} = useTranslation(labAppNamespace)

  /**
   * `--pageTitle` at build time bakes a static, English-only `<title>` into
   * the app shell HTML. Re-set it from the translation bundle so the browser
   * tab title tracks the locale, the same way `startLegacyLocaleSync` keeps
   * `<html lang>` in sync for the app's lifetime.
   */
  useEffect(() => {
    document.title = t('title', 'Lab Entry App')
  })

  return (
    <UserHasAccess
      privilege={privilegeLabLite}
      fallback={<UnauthorisedResponse />}
    >
      <main>
        <SWRConfig value={swrConfiguration}>
          <BrowserRouter basename={spaRoot}>
            <Route exact path={labEntryHomePath} component={Home} />
            <LabTestResultsProvider>
              <PendingLabOrdersProvider>
                <Route
                  exact
                  path={patientLabDetailsRoute}
                  component={PatientLabDetails}
                />
              </PendingLabOrdersProvider>
            </LabTestResultsProvider>
          </BrowserRouter>
        </SWRConfig>
      </main>
    </UserHasAccess>
  )
}

export default Root
