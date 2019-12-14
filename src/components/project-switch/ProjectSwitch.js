import React, { useState, useEffect } from 'react'
import { getProfiles } from '../../services/fetch-datas'
import { Chart } from 'react-charts'
const handleDate = date => {
  return new Date(date).getHours()
}
const getGG = (setDataChart1, setDataChart2, setDataChart3, setDataChart4) => {
  getProfiles().then(d => {
    const { datas } = d
    if (datas.length) {
      const gaugeVariable = datas
      const g1 = gaugeVariable[0].values.map((d, ind) => [ind, d.value])
      const g3 = gaugeVariable[2].values.map((d, ind) => [ind, d.value])
      const g2 = gaugeVariable[1].values.map((d, ind) => [ind, d.value])
      const g4 = gaugeVariable[3].values.map((d, ind) => [ind, d.value])
      console.log({ g1 })
      setDataChart1(g1)
      setDataChart2(g2)
      setDataChart3(g3)
      setDataChart4(g4)
    }
  })
}

export default function ProjectSwitch() {
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
    getGG(setDataChart1, setDataChart2, setDataChart3, setDataChart4)
    // setInterval(
    //   () => getGG(setDataChart1, setDataChart2, setDataChart3, setDataChart4),
    //   5000
    // )
    setDataChart1([[0.0, 0.0]])
    setDataChart2([[0.0, 0.0]])
    setDataChart3([[0.0, 0.0]])
    setDataChart4([[0.0, 0.0]])
  }, [0])

  return (
    <div className="switch-div-status">
      <h5>Profile switch</h5>
      <div className="switch-graund">
        <div
          style={{
            width: '70%',
            height: '300px',
            margin: 'auto',
            padding: '20px'
          }}
        >
          <Chart
            data={[
              { label: 'Serice 1', data: dataChart1 },
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
