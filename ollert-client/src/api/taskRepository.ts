import { NewTask, UpdateTask } from '../store/board/types'
import client from './client'

// fix client returns Promise<T>
export default {
  create(payload: NewTask) : Promise<any> {
    return client.post('tasks', payload)
  },
  delete(id: string) : Promise<any> {
    return client.delete(`tasks/${id}/`)
  },
  patch(id:string, payload: UpdateTask): Promise<any> {
    return client.patch(`tasks/${id}/`, payload)
  }
}