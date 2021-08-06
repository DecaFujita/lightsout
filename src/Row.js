import React from 'react';
import Cell from './Cell';

import './Row.css';

const Row = props => (
     <div className="Row">
        {props.cels.map((cel,index) => (<Cell action={props.action} key={`${props.rowNo}-${index}`} coord={`${props.rowNo}-${index}`} isLit={cel}  />))}
    </div>
);

export default Row;