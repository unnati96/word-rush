import React from 'react';

const Letter = (props) => {
  return (<button className={`ba b--dashed w3-l h3-l w2 h2 mr2 br4 bg-white ${props.clicked ? 'gray' : 'black'}`} disabled={props.clicked} onClick={() => props.clickHandler(props.index)}> {props.letter}</button>)

}

export default Letter;