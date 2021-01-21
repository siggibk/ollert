import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { LoginDialog } from '../dialogs/LoginDialog'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { User } from '../../store/user/types'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false)

  // redux state
  const loggedIn: boolean = useSelector(
    (state: RootState) => state.user.loggedIn
  )
  const user: User | null = useSelector(
    (state: RootState) => state.user.user
  )

  const handleClose = () => {
    setLoginOpen(false)
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to=''>
          <Button color="primary" size="large">Ollert</Button>
        </Link>
      </div>
      <div className="navbar-right">
        <Button onClick={() => setLoginOpen(true)} variant="contained" color="primary">Login</Button>
      </div>
      <LoginDialog loginOpen={loginOpen} onClose={handleClose}/>
    </div>
  )
}