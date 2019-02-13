import React from 'react';

export default function SVG(props) {
  const text = "Sorry, your browser does not support this technology!";
  const { click, children: c = text, attr, style = {} } = props;
  return (
    <div className="svg" style={style}>
      <svg onClick={click} className={attr}>
        {c}
      </svg>
    </div>
  )
}