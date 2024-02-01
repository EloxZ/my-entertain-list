import React from 'react'

export default function StreamingSVG(props) {
  return (
    <svg height={props.height} width={props.width} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
    fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" 
    strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Streaming</title> <g id="🖥-Landing" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> 
    <g id="Artboard" transform="translate(-74.000000, -195.000000)"> 
    <g id="Streaming" transform="translate(74.000000, 195.000000)">
         <rect id="Rectangle" x="0" y="0" height={props.height} width={props.width}> </rect> 
         <path d="M8.46448,15.5354 C6.51186,13.5828 6.51186,10.417 8.46448,8.46436" id="Path" stroke={props.fill ?? "white"} strokeWidth="2" strokeLinecap="round"> </path>
         <path d="M5.63605,18.3637 C2.12133,14.8489 2.12133,9.15046 5.63605,5.63574" id="Path" stroke={props.fill ?? "white"} strokeWidth="2" strokeLinecap="round"> </path>
         <path d="M15.5355,8.42893 C17.4881,10.3816 17.4881,13.5474 15.5355,15.5" id="Path" stroke={props.fill ?? "white"} strokeWidth="2" strokeLinecap="round"> </path>
         <path d="M18.364,5.57188 C21.8787,9.0866 21.8787,14.7851 18.364,18.2998" id="Path" stroke={props.fill ?? "white"} strokeWidth="2" strokeLinecap="round"> </path>
         <circle id="Oval" stroke={props.fill ?? "white"} strokeWidth="2" strokeLinecap="round" cx="12" cy="12" r="1"> </circle> </g> </g> </g> </g></svg>
  )
}
