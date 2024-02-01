import React from 'react'

export default function TrendingSVG(props) {
  return (
    <svg height={props.height} width={props.width} fill={props.fill ?? "white"} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <title></title>
            <g dataName="Layer 97" id="Layer_97">
            <path d="M16,30A10,10,0,0,1,6,20C6,17,7.93,5.33,8,4.84a1,1,0,0,1,1.92-.21l2.85,7.13,2.25-9a1,1,0,0,1,1.94,0l2.25,9,2.85-7.13A1,1,0,0,1,24,4.84C24.07,5.33,26,17,26,20A10,10,0,0,1,16,30ZM9.42,8.73C8.83,12.49,8,18.13,8,20a8,8,0,0,0,16,0c0-1.87-.83-7.51-1.42-11.27l-2.65,6.64a1,1,0,0,1-1,.63,1,1,0,0,1-.9-.76L16,7.12l-2,8.12a1,1,0,0,1-.9.76,1,1,0,0,1-1-.63Z"></path>
            <path d="M20.94,21.35a1,1,0,0,0-1.48-.75A2.9,2.9,0,0,1,18,21a3,3,0,0,1-3-2.61,1,1,0,0,0-.54-.76,1,1,0,0,0-.94,0A5,5,0,1,0,21,22,4.46,4.46,0,0,0,20.94,21.35Z"></path>
            <path d="M24.51,22.91,24,19.23c0,2.25-4.15,6.12-8,6.12s-8.35-5.22-7.91-6.9L7,19.21c0,.3,0,.57,0,.79a9,9,0,0,0,17.51,2.91Z"></path>
            </g>
        </g>
    </svg>
  )
}
