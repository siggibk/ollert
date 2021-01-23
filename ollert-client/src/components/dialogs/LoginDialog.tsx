import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, DialogActions, TextField, DialogContent } from '@material-ui/core'
import authRepository from '../../api/authRepository'
import { Login, Register } from '../../store/user/types'
import { useHistory } from 'react-router-dom'

type LoginDialogProps = {
  loginOpen: boolean,
  onClose?: () => void,
  onLoginSuccess?: () => void
}

export const LoginDialog = ({loginOpen = false, onClose} : LoginDialogProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  const history = useHistory()

  const onLogin = async () => {
    const payload: Login = {
      email: email,
      password: password
    }

    const { data } = await authRepository.login(payload)
    localStorage.setItem('jwt-tkn', data.access)
    history.go(0)
  }

  const onRegister = async () => {
    const payload: Register = {
      email: email,
      password: password
    }

    const { data } = await authRepository.register(payload)
    localStorage.setItem('jwt-tkn', data.access)
    history.go(0)
  }

  return (
    <Dialog open={loginOpen} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{isRegister ? 'Register' : 'Login'}</DialogTitle>
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
          <Button size="small" onClick={() => setIsRegister(!isRegister)} color="secondary">
            {isRegister ? 'Already have an account? Login' : 'Dont have an account? Register'}
          </Button>
          <Button onClick={() => isRegister ? onRegister() : onLogin()} color="primary">
            {isRegister ? 'Register' : 'Login'}
          </Button>
        </DialogActions>
      </Dialog>
  )
}