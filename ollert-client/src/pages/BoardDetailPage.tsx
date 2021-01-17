import { Button, Container } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../store'

import BoardRepository from '../api/boardRepository'
import { setCurrentBoard } from '../store/board/actions'
import { BoardColumn } from '../components/ui/BoardColumn'
import columnRepository from '../api/columnRepository'
import { BoardDetail, ColumnDetail } from '../store/board/types'

interface Params {
  id: string
}

export const BoardDetailPage = () => {
  let { id } = useParams<Params>()
  const dispatch = useDispatch()

  // useEffect hook is called once on load and then when [deps] -> id changes
  useEffect(() => {
    const getDetails = async () => {
      try {
        // fetch board details
        const { data } = await BoardRepository.getDetails(id)
        // set current board
        dispatch(setCurrentBoard(data))
      } catch (e) {
        console.log(e)
        console.log('Couldnt get board details')
      }
    }
    getDetails()
  }, [id])

  const currentBoard: BoardDetail | null = useSelector(
    (state: RootState) => state.board.currentBoard
  )

  return (
    <Container>
      <h1>{currentBoard?.name}</h1>
      <div className="columns">
        {currentBoard?.columns.map((column: ColumnDetail) => (
          <BoardColumn key={column.id} column={column} />
        ))}
        <Button variant="contained" color="primary">
          New column
        </Button>
      </div>
    </Container>
  )
}