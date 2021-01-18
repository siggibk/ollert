import { Button, Container } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../store'
import boardRepository from '../api/boardRepository'
import columnRepository from '../api/columnRepository'
import taskRepository from '../api/taskRepository'
import { addColumn, setCurrentBoard, updateTask } from '../store/board/actions'
import { BoardColumn } from '../components/ui/BoardColumn'
import { BoardDetail, ColumnDetail, NewColumn, UpdateTask } from '../store/board/types'
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
  const onDragEnd = async ({draggableId, source, destination}: any) => {
    console.log('On drag end!')
    console.log('Draggable id aka task')
    console.log(draggableId)
    
    console.log('From source aka column and what index')
    console.log(`
      from column ${source.droppableId} idx ${source.index} to ${destination.droppableId} at idx ${destination.index}
    `)

    const taskDto: UpdateTask = {
      columnId: destination.droppableId
    }

    // update state before doing the API call for better ui responsiveness
    dispatch(updateTask({...taskDto, id: draggableId}))
    
    try {
      // update task column
      await taskRepository.patch(draggableId, taskDto)
    } catch (e) {
      // Update failed, reverse change in state
      taskDto.columnId = source.droppableId
      dispatch(updateTask({...taskDto, id: draggableId}))
      console.log('Failed to update task after dnd')
      console.log(e)
    }

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