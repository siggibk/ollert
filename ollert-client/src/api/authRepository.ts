import { NewBoard } from '../store/board/types';
import { Login, Register } from '../store/user/types';
import client from './client'

// fix client returns Promise<T>
export default {
  login(payload: Login) : any {
    return client.post('accounts/token/', payload)
  },
  register(payload: Register) : any {
    return client.post('accounts/')
  }
}