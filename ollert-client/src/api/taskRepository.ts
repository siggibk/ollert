import { NewTask } from '../store/board/types'
import client from './client'

// fix client returns Promise<T>
export default {
  create(payload: NewTask) : Promise<any> {
    return client.post('tasks', payload)
  },
  del(id: string) : Promise<any> {
    return client.delete(`tasks/${id}/`)
  }
}