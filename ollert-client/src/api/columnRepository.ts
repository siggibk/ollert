import { NewColumn } from '../store/board/types'
import client from './client'

// fix client returns Promise<T>
export default {
  create(payload: NewColumn) : any {
    return client.post('columns', payload)
  },
  getDetails(id: string) : any {
    return client.get(`columns/${id}/`)
  },
  del(id: string) : any {
    return client.delete(`columns${id}/`)
  }
}