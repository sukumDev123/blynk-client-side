import Axios from 'axios'
const host = 'http://localhost:8080/api/bylink'
function fetchGetData(d) {
  return Axios.get(`${host}/bylinkGet?status=${d}`)
}
function fetchPostData(status0or1, pinNumber) {
  return Axios({
    method: 'POST',
    data: {
      status: status0or1,
      pin: pinNumber
    },
    url: `${host}/bylinkPost`
  })
}

export function updateStatusOfSwitch(status0or1, pinNumber) {
  return new Promise((res, rej) => {
    if (pinNumber) {
      fetchPostData(status0or1, pinNumber)
        .then(() => res(true))
        .catch(e => rej(e))
    } else {
      return rej(false)
    }
  })
}
export function getDataFromAPIB() {
  return new Promise((res, rej) => {
    const pinDef = [12, 13, 14, 15]
    const fetchD = pinDef.map(d => fetchGetData(d))
    Promise.all(fetchD)
      .then(dataFromApi => {
        const statusOfSwitch = dataFromApi
          .filter(echOfData => echOfData.data.status === 200)
          .map(eachOfData => JSON.parse(eachOfData.data.response)[0])
        res({
          pins: pinDef,
          statusPins: statusOfSwitch
        })
      })
      .catch(e => rej(e))
  })
}
