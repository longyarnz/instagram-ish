import React from 'react'

export default function Spinner(props) {
  const styleA = { 
    position: ' absolute', 
    top: '-8px', 
    transform: 'translate3d(0px, 0px, 0px)', 
    opacity: 0.35
  };

  const styleB = {
    position: ' absolute', 
    width: '25px', 
    height: '17.5px', 
    transformOrigin: 'left center 0px', 
    borderRadius: '8px', 
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 1px',
    background: 'rgb(172, 207, 41)'
  }

  return (
    <div>
        <div className="spinner" role="progressbar" style={{ position: ' absolute', width: '0px', zIindex: 2000000000, left: props.left, top: props.top }}>
          <div style={{ ...styleA, animation: 'opacity-50-35-0-13 0.909091s linear 0s infinite normal none running' }}>
            <div style={{ transform: 'rotate(0deg) translate(52.5px, 0px)', ...styleB }}>
            </div>
          </div>
          <div style={{ ...styleA, animation: 'opacity-50-35-1-13 0.909091s linear 0s infinite normal none running' }}>
            <div style={{ transform: 'rotate(27deg) translate(52.5px, 0px)', ...styleB }}>
            </div>
          </div>
          <div style={{ ...styleA, animation: 'opacity-50-35-2-13 0.909091s linear 0s infinite normal none running' }}>
            <div style={{ transform: 'rotate(55deg) translate(52.5px, 0px)', ...styleB }}>
            </div>
          </div>
          <div style={{ ...styleA, animation: 'opacity-50-35-3-13 0.909091s linear 0s infinite normal none running' }}>
            <div style={{ transform: 'rotate(83deg) translate(52.5px, 0px)', ...styleB }}>
            </div>
          </div>
          <div style={{ ...styleA, animation: 'opacity-50-35-4-13 0.909091s linear 0s infinite normal none running' }}>
            <div style={{ transform: 'rotate(110deg) translate(52.5px, 0px)', ...styleB }}>
            </div>
          </div>
          <div style={{ ...styleA, animation: 'opacity-50-35-5-13 0.909091s linear 0s infinite normal none running' }}>
            <div style={{ transform: 'rotate(138deg) translate(52.5px, 0px)', ...styleB }}>
            </div>
          </div>
          <div style={{ ...styleA, animation: 'opacity-50-35-6-13 0.909091s linear 0s infinite normal none running' }}>
            <div style={{ transform: 'rotate(166deg) translate(52.5px, 0px)', ...styleB }}>
            </div>
          </div>
          <div style={{ ...styleA, animation: 'opacity-50-35-7-13 0.909091s linear 0s infinite normal none running' }}>
            <div style={{ transform: 'rotate(193deg) translate(52.5px, 0px)', ...styleB }}>
            </div>
          </div>
          <div style={{ ...styleA, animation: 'opacity-50-35-8-13 0.909091s linear 0s infinite normal none running' }}>
            <div style={{ transform: 'rotate(221deg) translate(52.5px, 0px)', ...styleB }}>
            </div>
          </div>
          <div style={{ ...styleA, animation: 'opacity-50-35-9-13 0.909091s linear 0s infinite normal none running' }}>
            <div style={{ transform: 'rotate(249deg) translate(52.5px, 0px)', ...styleB }}>
            </div>
          </div>
          <div style={{ ...styleA, animation: 'opacity-50-35-10-13 0.909091s linear 0s infinite normal none running' }}>
            <div style={{ transform: 'rotate(276deg) translate(52.5px, 0px)', ...styleB }}>
            </div>
          </div>
          <div style={{ ...styleA, animation: 'opacity-50-35-11-13 0.909091s linear 0s infinite normal none running' }}>
            <div style={{ transform: 'rotate(304deg) translate(52.5px, 0px)', ...styleB }}>
            </div>
          </div>
          <div style={{ ...styleA, animation: 'opacity-50-35-12-13 0.909091s linear 0s infinite normal none running' }}>
            <div style={{ transform: 'rotate(332deg) translate(52.5px, 0px)', ...styleB }}>
            </div>
          </div>
        </div>
      </div>
  )
}
