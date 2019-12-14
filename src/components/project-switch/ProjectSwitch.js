import React, { useState, useEffect } from 'react'
import { getProfiles } from '../../services/fetch-datas'
import { Chart } from 'react-charts'
const getGG = (
  setGauge,
  setDataChart1,
  dataChart1,
  setDataChart2,
  dataChart2,
  setDataChart3,
  dataChart3,
  setDataChart4,
  dataChart4
) => {
  getProfiles().then(d => {
    const gaugeVariable = d.response.widgets.filter(d => d.type === 'GAUGE')
    setGauge(gaugeVariable)
    const g1 = gaugeVariable[0].value
    const g2 = gaugeVariable[1].value
    const g3 = gaugeVariable[2].value
    const g4 = gaugeVariable[3].value
    let newArray1 = dataChart1
    let newArray2 = dataChart2
    let newArray3 = dataChart3
    let newArray4 = dataChart4
    newArray1.push([dataChart1.length, g1])
    newArray2.push([dataChart2.length, g2])
    newArray3.push([dataChart3.length, g3])
    newArray4.push([dataChart4.length, g4])
    setDataChart1(newArray1)
    setDataChart2(newArray2)
    setDataChart3(newArray3)
    setDataChart4(newArray4)
  })
}

export default function ProjectSwitch() {
  const [gauge, setGauge] = useState([])
  const [dataChart1, setDataChart1] = useState([[0, 0]])
  const [dataChart2, setDataChart2] = useState([[0, 0]])
  const [dataChart3, setDataChart3] = useState([[0, 0]])
  const [dataChart4, setDataChart4] = useState([[0, 0]])

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  useEffect(() => {
    // setInterval(() => {
    //   //   getGG(
    //   //     setGauge,
    //   //     setDataChart1,
    //   //     dataChart1,
    //   //     setDataChart2,
    //   //     dataChart2,
    //   //     setDataChart3,
    //   //     dataChart3,
    //   //     setDataChart4,
    //   //     dataChart4
    //   //   )
    //   setDataChart1([[0, 0]])
    //   setDataChart2([[0, 0]])
    //   setDataChart3([[0, 0]])
    //   setDataChart4([[0, 0]])
    // }, 1000)
  }, [0])

  return (
    <div className="switch-div-status">
      <h5>Profile switch</h5>
      <div className="switch-graund">
        <div>
          {gauge.map((d, ind) => (
            <h5 key={ind}>
              value: {d.value} pin: {[12, 13, 14, 15][d.pin]}
            </h5>
          ))}
        </div>
        <div
          style={{
            width: '100%',
            height: '300px',
            margin: 'auto'
          }}
        >
          <Chart
            data={[
              { label: 'S1', data: dataChart1 },
              { label: 'S2', data: dataChart2 },
              { label: 'S3', data: dataChart3 },
              { label: 'S4', data: dataChart4 }
            ]}
            axes={axes}
          />
        </div>
        {/* <button onClick={whenLoadData}>Load data</button> */}
      </div>
    </div>
  )
}
