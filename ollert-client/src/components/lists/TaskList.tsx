import { Task } from "../../store/board/types";
import { TaskItem } from "../ui/TaskItem";

interface Props {
  tasks: Task[],
  children: any
}
export const TaskList = ({tasks, children} : Props) => {

  return (
    <div>
      {tasks.map((task, idx) => (
        <TaskItem key={task.id} task={task} index={idx} />
      ))}
      {children}
    </div>
  )
}