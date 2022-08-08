import React from 'react'
import BahmniLogo from '../assets/bahmniLogoFull.png'
import { privilegeLabLite } from '../constants'
import { UserHasAccess } from '../UserHasAccess.component'
import { unauthorisedResponse } from '../utils'
import classes from './home.scss'
const Home = () => {
  return (
    <UserHasAccess privilege={privilegeLabLite} fallback={unauthorisedResponse}>
      <div>
        <div className={classes.image}>
          <img src={BahmniLogo} alt="Bahmni Logo" />
        </div>
        <span className={classes.welcomeText}>WELCOME TO LAB ENTRY</span>
        <span className={classes.helpText}>
          Please click on the search icon above to get started
        </span>
      </div>
    </UserHasAccess>
  )
}

export default Home
