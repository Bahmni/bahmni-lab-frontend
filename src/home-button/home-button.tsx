import React from 'react'
import styles from './home-button.scss'
import HomeFilled24 from '@carbon/icons-react/lib/Home/24'
import {labHomePath, bahmniHomePath} from '../constants'
import {HeaderGlobalAction} from 'carbon-components-react'

const HomeButton = () => {
  return (
    <HeaderGlobalAction
      aria-label="Home"
      className={styles.headerGlobalBarButton}
      onClick={() => {
        window.location.href =
          process.env.NODE_ENV === 'development' ? labHomePath : bahmniHomePath
      }}
    >
      <HomeFilled24 className={styles.home} />
    </HeaderGlobalAction>
  )
}

export default HomeButton
