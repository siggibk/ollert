import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import { LoginDialog } from '../dialogs/LoginDialog'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { User } from '../../store/user/types'
import { Link } from 'react-router-dom'
import { tokenSet } from '../../helpers/token-set'
import authRepository from '../../api/authRepository'
import { setUser } from '../../store/user/actions'

export const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false)
  const dispatch = useDispatch()

  const user: User | null = useSelector(
    (state: RootState) => state.user.user
  )
  
  const initiateUser = async () => {
    console.log('Get me and more')
    const { data } : { data: User } = await authRepository.getMe()
    dispatch(setUser(data))
  }

  const handleClose = () => {
    setLoginOpen(false)
  }

  const loginButton = () => {
    return (
      <Button onClick={() => setLoginOpen(true)} variant="contained" color="primary">Login</Button>
    )
  }

  useEffect(() => {
    if (tokenSet()) {
      initiateUser()
    }
  }, [])

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to=''>
          <Button color="primary" size="large">Ollert</Button>
        </Link>
      </div>
      <div className="navbar-right">
        {user ? user.email : loginButton()}
      </div>
      <LoginDialog loginOpen={loginOpen} onClose={handleClose}/>
    </div>
  )
}