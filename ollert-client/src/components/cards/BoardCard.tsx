import { Button, Card, CardActions, CardContent, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Board } from "../../store/board/types";

interface Props {
  board: Board
}

const styles = makeStyles({
  root: {
    width: 250,
    marginRight: '2rem'
  }
})

export const BoardCard = ({board}: Props) => {
  const classes = styles()
  const boardLink = `boards/${board.id}`

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography color="textSecondary">
          {board.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={boardLink}>
          <Button color="primary" size="small">Details</Button>
        </Link>
      </CardActions>
    </Card>
  )
}