import { Button, Card, CardActions, CardContent, makeStyles, Menu, MenuItem, Typography } from "@material-ui/core";
import { MoreHorizOutlined } from "@material-ui/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import boardRepository from "../../api/boardRepository";
import { deleteBoard } from "../../store/board/actions";
import { Board, DeleteBoard } from "../../store/board/types";

interface Props {
  board: Board
}

const styles = makeStyles({
  root: {
    width: 250,
    marginRight: '2rem',
    marginBottom: '2rem'
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  actionIcon: {
    '&:hover': {
      cursor: 'pointer'
     },
  }
})

export const BoardCard = ({board}: Props) => {
  const classes = styles()
  const dispatch = useDispatch()

  const boardLink = `boards/${board.id}`
  const [actionAnchorEl, setActionAnchorEl] = useState(null)
  const [actionMenuOpen, setActionMenuOpen] = useState(false)

  const handleDelete = async () => {
    const deletePayload: DeleteBoard = {
      id: board.id
    }

    await boardRepository.delete(board.id)
    dispatch(deleteBoard(deletePayload))
  }

  const handleActionClick = (e: any) => {
    setActionAnchorEl(e.currentTarget)
    setActionMenuOpen(true)
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography color="textSecondary">
          {board.name}
        </Typography>
        <MoreHorizOutlined className={classes.actionIcon} onClick={handleActionClick} />
        <Menu
            keepMounted
            anchorEl={actionAnchorEl}
            open={actionMenuOpen}
            onClose={() => setActionMenuOpen(false)}
          >
          <MenuItem onClick={handleDelete}>Delete board</MenuItem>
        </Menu>
      </CardContent>
      <CardActions>
        <Link to={boardLink}>
          <Button color="primary" size="small">Details</Button>
        </Link>
      </CardActions>
    </Card>
  )
}