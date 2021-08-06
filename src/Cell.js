import React from 'react'
import "./Cell.css"

const Cell = props => {
  let classes = "Cell" + (props.isLit ? " Cell-lit" : "");
  return (
      <div className={classes} onClick={() => {props.action(`${props.coord}`)}} />
  )
}

export default Cell;