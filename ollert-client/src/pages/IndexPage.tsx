import React from 'react'
import { Container } from '@material-ui/core'
import NewTaskInput from '../components/inputs/NewTaskInput'

export const IndexPage = () => {
  return (
    <Container>
      <h1>Index page</h1>
      <NewTaskInput />
    </Container>
  )
}