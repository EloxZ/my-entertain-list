import React from 'react'

export default function ClockSVG(props) {
  return (
    <svg height={props.height} width={props.width} fill={props.fill ?? "white"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" xmlSpace="preserve" stroke="#ffffff">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M50,20c-16.5,0-30,13.5-30,30s13.5,30,30,30s30-13.5,30-30S66.5,20,50,20z M50,74c-13.2,0-24-10.8-24-24 s10.8-24,24-24s24,10.8,24,24S63.2,74,50,74z"></path> </g> <g> <path d="M53,48.8V36c0-1.1-0.9-2-2-2h-2c-1.1,0-2,0.9-2,2v14c0,0.8,0.3,1.6,0.9,2.1l9.6,9.6c0.8,0.8,2,0.8,2.8,0 l1.4-1.4c0.8-0.8,0.8-2,0-2.8L53,48.8z"></path> </g> </g> </g></svg>
  )
}
