import React from 'react'

const setText = data => {
  const d = new Date(data.switch_time)
  const dateShow = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
  return (
    <div>
      <h5>status {data.statue}</h5>
      <h5>time latest : {dateShow}</h5>
    </div>
  )
}

export default function ButtonSwitch(props) {
  const { status, infor } = props.information
  return (
    <div
      className={
        `${props.btnOnClicked} ` +
        (status[props.index] === '1' ? 'opened' : 'closed')
      }
      onClick={props.checkShowSwitchInformation}
    >
      My Switch Pin's {props.pinVal}
      <br></br>
      {props.information.infor.length ? setText(infor[props.index]) : 'null'}
    </div>
  )
}
