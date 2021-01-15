import { NewBoard } from '../store/board/types';
import client from './client'

// fix client returns Promise<T>
export default {
  create(payload: NewBoard) : any {
    return client.post('boards', payload)
  },
  getDetails(id: string) : any {
    return client.get(`boards/${id}/`)
  },
  getAll() : any {
    return client.get('boards/')
  },
  del(id: string) : any {
    return client.delete(`boards${id}/`)
  }
}