import React from 'react'

export default function ButtonSwitch(props) {
  return (
    <button
      className={
        `${props.btnOnClicked} ` + (props.status === '1' ? 'opened' : 'closed')
      }
      onClick={props.checkShowSwitchInformation}
    >
      My Switch Pin's {props.pinVal}
    </button>
  )
}
