import React, {Component} from "react";
// import Cell from "./Cell";
import Row from "./Row";

import './Board.css';


/** Game board of Lights out.

 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: .25
  }

  constructor(props) {
    super(props);

    this.state ={
      hasWon: false,
      board: this.createBoard(),
    }
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    let row = [];
    const { nrows, ncols, chanceLightStartsOn} = this.props;

    for (let i = 0; i < nrows; i++) {
      row = [];
      for (let j = 0; j < ncols; j++) {
        row.push(Math.random() < chanceLightStartsOn)
      }
      board.push(row)
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround = (coord) => {
    let {ncols, nrows} = this.props;
    let {board, hasWon} = this.state;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y,x);
    flipCell(y,x-1);
    flipCell(y,x+1);
    flipCell(y-1,x);
    flipCell(y+1,x);

    let checkIfWon = () => {
      let count = 0;
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] === true && count++;
          }
        }
        count === 0 && (hasWon = true)
      }

    checkIfWon();

    this.setState({board, hasWon});

  // TODO: flip this cell and the cells around it

  // win when every cell is turned off
  // TODO: determine is the game has been won

  // this.setState({board, hasWon});
  }
  /** Render game board or winning message. */

  render() {
    const { board, hasWon } = this.state;
    return(
      hasWon === true ? <p>You won! </p> : 
      <div className='Board'>
        {
          board.map((row, index) => 
            <Row key={`row-${index}`} rowNo={index} cels={row} action={this.flipCellsAround}/>
          )
        }
      </div>
    )

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
  }
}


export default Board;
