import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { Board } from "../../store/board/types";
import { BoardCard } from "../cards/BoardCard";
import { NewBoardCard } from "../cards/NewBoardCard";
import { NewBoardDialog } from "../dialogs/NewBoardDialog";

interface Props {
  boards: Board[]
}

const styles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  }
})

export const BoardList = ({boards}: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleClose = () => {
    setDialogOpen(false)
  }
  const classes = styles()
  return (
    <div className={classes.root}>
      <NewBoardCard onClick={() => setDialogOpen(true)} />
      <NewBoardDialog isOpen={dialogOpen} onClose={handleClose} />
      {boards.map((board) => 
        <BoardCard key={board.id} board={board} />
      )}
    </div>
  )
}