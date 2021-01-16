import { makeStyles } from "@material-ui/core";
import { Board } from "../../store/board/types";
import { BoardCard } from "../cards/BoardCard";

interface Props {
  boards: Board[]
}

const styles = makeStyles({
  root: {
    display: 'flex'
  }
})

export const BoardList = ({boards}: Props) => {
  const classes = styles()
  return (
    <div className={classes.root}>
      {boards.map((board) => 
        <BoardCard key={board.id} board={board} />
      )}
    </div>
  )
}