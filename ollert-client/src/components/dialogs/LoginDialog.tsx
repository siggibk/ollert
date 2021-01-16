import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, DialogActions, TextField, DialogContent } from '@material-ui/core'

type LoginDialogProps = {
  loginOpen: boolean,
  onClose?: () => void,
  onLoginSuccess?: () => void
}

export const LoginDialog = ({loginOpen = false, onClose} : LoginDialogProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const onLogin = () => {
    console.log(`Login: ${email} - ${password}`)
    // if success then call onLoginSuccess
  }

  return (
    <Dialog open={loginOpen} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            // autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onLogin} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
  )
}