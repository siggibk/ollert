import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, DialogActions, TextField, DialogContent } from '@material-ui/core'
import authRepository from '../../api/authRepository'
import { Login } from '../../store/user/types'
import { useHistory } from 'react-router-dom'

type LoginDialogProps = {
  loginOpen: boolean,
  onClose?: () => void,
  onLoginSuccess?: () => void
}

export const LoginDialog = ({loginOpen = false, onClose} : LoginDialogProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const onLogin = async () => {
    console.log(`Login: ${email} - ${password}`)
    const payload: Login = {
      email: email,
      password: password
    }

    const { data } = await authRepository.login(payload)
    localStorage.setItem('jwt-tkn', data.access)
    history.go(0)
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