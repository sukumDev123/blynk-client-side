import React from 'react'

export default function ShowInformationThisSwitch(props) {
  const handleText = status =>
    status === '0' ? 'Closed switch' : 'Opened switch'
  const handleTextBtn = status => (status === '1' ? 'Close' : 'Open')
  return (
    <>
      <h3>
        The Switch pin's
        {' ' + props.pin}
      </h3>
      <h5> {handleText(props.information)}</h5>
      <button className="btn-switch-open" onClick={props.openThisSwitch}>
        {handleTextBtn(props.information)} this switch?
      </button>
    </>
  )
}
