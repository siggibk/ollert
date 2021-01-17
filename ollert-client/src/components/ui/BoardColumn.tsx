import { Card, CardContent, Divider } from "@material-ui/core"
import { useDispatch } from "react-redux"
import { ColumnDetail, NewTask } from "../../store/board/types"
import { NewTaskInput } from "../inputs/NewTaskInput"
import { TaskItem } from "./TaskItem"

import taskRepository from '../../api/taskRepository'
import { addTask } from "../../store/board/actions"

interface Props {
  column: ColumnDetail
}

export const BoardColumn = ({column} : Props) => {
  const dispatch = useDispatch()

  const createNewTask = async (task: NewTask) => {
    console.log('create new task!')
    console.log(task.name)
    task.columnId = column.id
    try {
      const { data } = await taskRepository.create(task)
      dispatch(addTask(data))
    } catch (e) {
      console.log(e)
      console.log('Failed to add task')
    }
  }

  const taskList = () => {
    return (
      <div>
        {column.tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    )
  }

  const noTasks = () => {
    return (
      <span>No tasks yet</span>
    )
  }
  return (
    <Card className="column">
      <CardContent>
        <div className="column-title">
          {column.name} ({column.tasks.length} tasks)
          <Divider />
        </div>
        {column.tasks.length > 0 ?  taskList() : noTasks()}
        <div className="new-task">
          <NewTaskInput onSubmit={createNewTask} />
        </div>
      </CardContent>
    </Card>
  )
}