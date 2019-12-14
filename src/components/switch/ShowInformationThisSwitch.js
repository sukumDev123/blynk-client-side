import React from 'react'

export default function ShowInformationThisSwitch(props) {
  const [timeShow, setTime] = React.useState('')

  const handleText = status =>
    status === '0' ? 'Closed switch' : 'Opened switch'
  const handleTextBtn = status => (status === '1' ? 'Close' : 'Open')
  const handleTime = tt => Math.round((+new Date() - +new Date(tt)) / 1000 / 60)

  // setInterval(() => {
  console.log(handleTime(props.timeLatest), new Date(props.timeLatest))
  // if (props.timeLatest) setTime(handleTime(props.timeLatest))
  // }, 1000)

  return (
    <>
      <h3>
        The Switch pin's
        {' ' + props.pin}
      </h3>
      <h5> {timeShow} </h5>
      <h5> {handleText(props.information)}</h5>
      <button className="btn-switch-open" onClick={props.openThisSwitch}>
        {handleTextBtn(props.information)} this switch?
      </button>
    </>
  )
}
