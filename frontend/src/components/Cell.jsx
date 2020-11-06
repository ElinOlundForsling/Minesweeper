import React from 'react';

const Cell = ({ revealed, mine, flagged, cellNum, id }) => {
  const display = () => {
    if (flagged) {
      return <i className='fa fa-flag' aria-hidden='true' id={id}></i>;
    } else if (!revealed) {
      return '';
    } else if (mine) {
      return <i className='fa fa-bomb' aria-hidden='true' id={id}></i>;
    } else if (cellNum === 0) {
      return '';
    } else {
      return cellNum;
    }
  };
  return <span id={id}>{display()}</span>;
};

export default Cell;
