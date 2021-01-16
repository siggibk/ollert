import React from 'react'
import { Button, Container } from '@material-ui/core'
import NewTaskInput from '../components/inputs/NewTaskInput'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { Board } from '../store/board/types'

import BoardRepository from '../api/boardRepository'
import { addBoards } from '../store/board/actions'
import { BoardList } from '../components/lists/BoardList'

export const IndexPage = () => {
  const dispatch = useDispatch()

  const boards: Board[] = useSelector(
    (state: RootState) => state.board.boards
  )

  const fetchBoards = async () => {
    try {
      const { data } = await BoardRepository.getAll()
      dispatch(addBoards(data))
    } catch (e) {
      console.log('Failed to fetch boards!')
      console.log(e)
    }
  }

  return (
    <Container>
      <h1>Index page</h1>
      <NewTaskInput />
      <Button variant="contained" color="secondary" onClick={fetchBoards}>Fetch boards!</Button>
      <h2>Boards length</h2>
      {boards.length}
      <h2>All boards</h2>
      <BoardList boards={boards} />
    </Container>
  )
}