import { Button, Card, CardActions, CardContent, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Board } from "../../store/board/types";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { AddBox, AddCircleOutlineOutlined, AddOutlined } from "@material-ui/icons";
import { useState } from "react";
import { NewBoardDialog } from "../dialogs/NewBoardDialog";

interface Props {
  onClick: () => void
}

const styles = makeStyles({
  root: {
    '&:hover': {
      cursor: 'pointer'
     },
    width: 250,
    marginRight: '2rem',
    marginBottom: '2rem',
    backgroundColor: '#E5E7F5'
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 16
  },
  title: {
    marginLeft: '0.25rem'
  }
})

export const NewBoardCard = ({onClick}: Props) => {
  const classes = styles()
  return (
    <Card className={classes.root} onClick={onClick}>
      <CardContent className={classes.content}>
      <AddBox color="primary" />
        <Typography color="textSecondary" className={classes.title}>
          Create a new board
        </Typography>
      </CardContent>
    </Card>
  )
}