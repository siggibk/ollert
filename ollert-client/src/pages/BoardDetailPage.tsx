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

  const currentBoard: BoardDetail | null = useSelector(
    (state: RootState) => state.board.currentBoard
  )

  const columns: ColumnDetail[] = useSelector(
    (state: RootState) => state.board.columns
  )

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
  }

  return (
    <Container>
      <h1>{currentBoard?.name}</h1>
      <div className="columns">
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((column: ColumnDetail) => (
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