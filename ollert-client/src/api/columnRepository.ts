import { NewColumn, UpdateColumn } from '../store/board/types'
import client from './client'

// fix client returns Promise<T>
export default {
  create(payload: NewColumn) : Promise<any> {
    return client.post('columns', payload)
  },
  getDetails(id: string) : Promise<any> {
    return client.get(`columns/${id}/`)
  },
  del(id: string) : Promise<any> {
    return client.delete(`columns/${id}/`)
  },
  patch(id:string, payload: UpdateColumn) {
    return client.patch(`columns/${id}/`, payload)
  }
}