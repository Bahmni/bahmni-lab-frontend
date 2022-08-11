import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import HomeButton from './home-button'

describe('home button', () => {
  beforeEach(() => {
    window = Object.create(window)

    Object.defineProperty(window, 'location', {
      value: {
        href: '',
      },
    })
  })

  afterEach(() => jest.clearAllMocks())

  it('should show the home button on navigation header', () => {
    render(<HomeButton />)
    expect(
      screen.getByRole('button', {
        name: /Home/i,
      }),
    ).toBeInTheDocument()
  })

  it('should route to home path when user clicks on home button', () => {
    render(<HomeButton />)

    userEvent.click(screen.getByLabelText('Home'))
    expect(window.location.href).toEqual('/bahmni/home')
  })

})
