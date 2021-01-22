import axios from 'axios'
import { authHeader } from '../helpers/auth-header'

export default axios.create({
  baseURL: 'http://localhost:5000/api/',
  withCredentials: true,
  headers: authHeader()
})
