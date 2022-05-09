import React from 'react'
import {render, screen} from '@testing-library/react'
import HomeButton from './home-button'
import {bahmniHomePath, labHomePath} from '../constants'
import userEvent from '@testing-library/user-event'

describe('home button', () => {
  beforeEach(() => {
    window = Object.create(window)

    Object.defineProperty(window, 'location', {
      value: {
        href: '',
      },
    })
  })

  it('should show the home button', () => {
    render(<HomeButton />)
    expect(
      screen.getByRole('button', {
        name: /Home/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Home')).toBeInTheDocument()
    // by classname
    expect(
      screen.getByLabelText('Home').getElementsByTagName('svg'),
    ).toBeTruthy()
  })

  it('should route to home path', () => {
    process.env.NODE_ENV = 'production'

    render(<HomeButton />)

    userEvent.click(screen.getByLabelText('Home'))
    expect(window.location.href).toEqual(bahmniHomePath)
  })

  it('should route to lab home when node environment is update to development', () => {
    process.env.NODE_ENV = 'development'

    render(<HomeButton />)

    userEvent.click(screen.getByLabelText('Home'))
    expect(window.location.href).toEqual(labHomePath)
  })
})
