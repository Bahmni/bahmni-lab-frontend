import {Tile} from 'carbon-components-react'
import React from 'react'
import {BrowserRouter, Redirect} from 'react-router-dom'
import * as BahmniLogo from '../assets/bahmniLogoFull.png'
import {privilegeLabLite} from '../constants'
import {UserHasAccess} from '../UserHasAccess.component'
import classes from './home.scss'
const Home = () => {
  const unauthorisedResponse = (
    <BrowserRouter forceRefresh={true}>
      <Redirect to={'/unauthorized.html'} />
    </BrowserRouter>
  )
  return (
    <UserHasAccess privilege={privilegeLabLite} fallback={unauthorisedResponse}>
      <div>
        <div className={classes.image}>
          <img src={BahmniLogo} alt="Bahmni Logo" height={100} width={400}/>
        </div>
        <Tile className={classes.welcomeText}>WELCOME TO LAB ENTRY</Tile>
        <Tile className={classes.helpText}>
          Please click on the search icon above to get started
        </Tile>
      </div>
    </UserHasAccess>
  )
}

export default Home
