import { Container } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Board } from '../shared/types'
import { RootState } from '../store'

interface Params {
  id: string
}

export const BoardDetailPage = () => {
  let { id } = useParams<Params>()

  const board: Board | null = useSelector(
    (state: RootState) => state.board.currentBoard
  )
  // for each board.columns
  // -> Column component (drag n drop)
  // use effect
  // useCallback

  return (
    <Container>
      <h1>Board details {id} {board?.name}</h1>
    </Container>
  )
}