import { Button, Container } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../store'
import boardRepository from '../api/boardRepository'
import columnRepository from '../api/columnRepository'
import taskRepository from '../api/taskRepository'
import { addColumn, moveTask, setCurrentBoard, updateTask } from '../store/board/actions'
import { BoardColumn } from '../components/ui/BoardColumn'
import { BoardDetail, ColumnDetail, MoveTask, NewColumn, UpdateTask } from '../store/board/types'
import { DragDropContext } from 'react-beautiful-dnd'
interface Params {
  id: string
}

// find better place for these interfaces
/* interface DraggableResult {
  destination: DestinationResult
  draggableId: string,
  source: SourceResult
} */

export const BoardDetailPage = () => {
  let { id } = useParams<Params>()
  const dispatch = useDispatch()

  // useEffect hook is called once on load and then when [deps] -> id changes
  useEffect(() => {
    const getDetails = async () => {
      try {
        // fetch board details
        const { data } = await boardRepository.getDetails(id)
        // set current board
        dispatch(setCurrentBoard(data))
      } catch (e) {
        console.log(e)
        console.log('Couldnt get board details')
      }
    }
    getDetails()
  }, [id])

  const createNewColumn = async () => {
    console.log(`Create new column for ${currentBoard!.id}`)
    const column: NewColumn = {
      boardId: currentBoard!.id
    }

    try {
      const { data } = await columnRepository.create(column)
      dispatch(addColumn(data))
    } catch (e) {
      console.log('Failed to create column')
      console.log(e)
    }
  }

  const currentBoard: BoardDetail | null = useSelector(
    (state: RootState) => state.board.currentBoard
  )

  // gets called when task has been dragged somewhere
 /*  {
    "draggableId": "1aa21108-1eda-4f1b-9af3-22e514e8257b",
    "type": "DEFAULT",
    "source": {
      "index": 0,
      "droppableId": "af1a97e3-ca4b-4bc3-98a2-1e6132840789"
    },
    "reason": "DROP",
    "mode": "FLUID",
    "destination": {
      "droppableId": "3b34de88-f187-4cdd-88a6-820e7463b8bc",
      "index": 0
    },
    "combine": null
  } */

  // TODO not any: Define interfaces as DraggableResult
  const onDragEnd = async (result: any) => {
    console.log(result)
    const {draggableId, source, destination} = result
    if (!destination) {
      return
    }

    const taskDto: UpdateTask = {
      columnId: destination.droppableId,
      // relativeOrder: destination.index
    }

    const moveTaskObj: MoveTask = {
      taskId: draggableId,
      source: {
        index: source.index,
        columnId: source.droppableId
      },
      destination: {
        index: destination.index,
        columnId: destination.droppableId
      }
    }
    dispatch(moveTask(moveTaskObj))

    /*

    columns: [1,2,3]
    tasks: {
      1: [{rlPos: 1}, {rlPos: 4}],
      2: [{rlPos}]
    }
    const moveTask: MoveTask = {
      taskId: droppableId,
      source: {
        index: 1,
        columnId: 1
      },
      destination: {
        index: 2,
        columnId: 3
      }
    }

    tasks[col].filter()
    */
    // remove [source.index] from source column
    // insert draggableId into [destination.index]
    // get destination[destIndex-1].relativePos + destination[destIndex+1] / 2
    
    // update state before doing the API call for better ui responsiveness
    /* dispatch(updateTask({...taskDto, id: draggableId}))

    try {
      // update task column
      await taskRepository.patch(draggableId, taskDto)
    } catch (e) {
      // Update failed, reverse change in state
      taskDto.columnId = source.droppableId
      dispatch(updateTask({...taskDto, id: draggableId}))
      console.log('Failed to update task after dnd')
      console.log(e)
    } */
  }

  return (
    <Container>
      <h1>{currentBoard?.name}</h1>
      <div className="columns">
        <DragDropContext onDragEnd={onDragEnd}>
          {currentBoard?.columns.map((column: ColumnDetail) => (
            <BoardColumn key={column.id} column={column} />
          ))}
        </DragDropContext>
        <Button onClick={createNewColumn} variant="contained" color="primary">
          New column
        </Button>
      </div>
    </Container>
  )
}