import React from 'react';
import SVG from './SVG';

export default function SandwichMenu (props) {
  const { menuIsOpened = true, onClick, attr, style = {} } = props;

  const sandwich = (
    <SVG onClick={onClick} attr="sandwich" style={style}>
      <rect width="100%" height={2} y={2} />
      <rect width="80%" height="2px" y={9} />
      <rect width="100%" height="2px" y={16} />
    </SVG>
  );

  const arrowStyle = {
    marginLeft: '-5px', 
  }
  
  const arrow = (
    <i className="material-icons" style={arrowStyle} onClick={onClick}>
      {attr === "modal" && window.innerWidth >= 600 ? 'close' : 'arrow_back'}
    </i>
  );

  return menuIsOpened ? arrow : sandwich;
}
