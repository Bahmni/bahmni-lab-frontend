import Home24 from '@carbon/icons-react/lib/home/24'
import {HeaderGlobalAction} from 'carbon-components-react'
import React from 'react'
import {bahmniHomePath} from '../utils/constants'
import styles from './home-button.scss'
import {useTranslation} from 'react-i18next'

const HomeButton = () => {
  const {t} = useTranslation()
  return (
    <HeaderGlobalAction
      aria-label={t('HOME_BUTTON_LABEL', 'Home')}
      className={styles.headerGlobalBarButton}
      onClick={() => {
        window.location.href = bahmniHomePath
      }}
    >
      <Home24 className={styles.home} />
    </HeaderGlobalAction>
  )
}

export default HomeButton
