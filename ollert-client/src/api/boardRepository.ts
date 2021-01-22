import { NewBoard } from '../store/board/types';
import client from './client'

// fix client returns Promise<T>
export default {
  create(payload: NewBoard) : Promise<any> {
    return client.post('boards', payload)
  },
  getDetails(id: string) : Promise<any> {
    return client.get(`boards/${id}/`)
  },
  getAll() : Promise<any> {
    return client.get('boards/')
  },
  delete(id: string) : Promise<any> {
    return client.delete(`boards/${id}/`)
  }
}