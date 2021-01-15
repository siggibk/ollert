import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { LoginDialog } from '../dialogs/LoginDialog'

export const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false)

  const handleClose = () => {
    setLoginOpen(false)
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <span></span>
      </div>
      <div className="navbar-right">
        <Button onClick={() => setLoginOpen(true)} variant="contained" color="primary">Login</Button>
      </div>
      <LoginDialog loginOpen={loginOpen} onClose={handleClose}/>
    </div>
  )
}