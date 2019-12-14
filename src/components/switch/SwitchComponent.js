import React from 'react'
import './SwitchComponent.css'
import {
  getDataFromAPIB,
  updateStatusOfSwitch,
  getAllInformationSwitch
} from '../../services/fetch-datas'
import { ADDMESSAGE } from '../redux/message-store'
import ShowInformationThisSwitch from './ShowInformationThisSwitch'
import ButtonSwitch from './ButtonSwitch'

export default class SwitchComponent extends React.Component {
  componentWillMount() {
    this.handleDataFromApi()
    this.handleDataFromApiInformation()
  }
  constructor(props) {
    super(props)
    this.state = {
      pins: [],
      information: {
        status: []
      },
      timeLatest: '',
      datInfor: [],
      showInfomationPosition: 0,
      btnOnClicked: ['clicked_active', '', '', '']
    }
  }
  handleDataFromApiInformation = () => {
    getAllInformationSwitch().then(datas => {
      this.datInfor = datas
    })
  }
  handleDataFromApi = () =>
    getDataFromAPIB()
      .then(datas => {
        if (datas.statusPins.length > 0) {
          this.setState({
            information: { status: datas.statusPins },
            pins: datas.pins
          })
        } else {
          this.props.messageStore.dispatch({
            type: ADDMESSAGE.type,
            payload: 'it have not pins.',
            classEle: 'err'
          })
        }
      })
      .catch(e => {
        this.props.messageStore.dispatch({
          type: ADDMESSAGE.type,
          payload: 'ERROR, Something are wrong or server maybe closing now.',
          classEle: 'err'
        })
      })

  openThisSwitch(index) {
    //TODO this to put update some of switch open
    const setStatus = this.state.information.status[index] === '0' ? 1 : 0
    const pinOfThisSwitch = this.state.pins[index]
    updateStatusOfSwitch(setStatus, pinOfThisSwitch)
      .then(d => {
        this.handleDataFromApi()
        this.props.messageStore.dispatch({
          type: ADDMESSAGE.type,
          payload: `Updating switch pin's ${pinOfThisSwitch} succesed.`,
          classEle: 'success'
        })
      })
      .catch(e => {
        this.props.messageStore.dispatch({
          type: ADDMESSAGE.type,
          payload: 'ERROR, Something are wrong or server maybe closing now.',
          classEle: 'err'
        })
      })
  }
  checkShowSwitchInformation(index) {
    const dataInformation = this.datInfor.filter(
      d => parseInt(d.name_switch) === this.state.pins[index]
    )[0]

    //TODO this is to show informarion switch from index
    const btnClass = this.state.btnOnClicked.map(() => '')
    btnClass[index] = 'clicked_active'

    this.setState({
      showInfomationPosition: index,
      btnOnClicked: btnClass,
      timeLatest: dataInformation.switch_time
    })
  }

  render() {
    const {
      pins,
      information,
      showInfomationPosition,
      timeLatest,
      btnOnClicked
    } = this.state
    return (
      <div className="switch-div">
        <div className="switch-button-div">
          <div className="switch-button">
            {pins.map((d, ind) => (
              <ButtonSwitch
                key={ind}
                pinVal={d}
                status={information.status[ind]}
                btnOnClicked={btnOnClicked[ind]}
                checkShowSwitchInformation={this.checkShowSwitchInformation.bind(
                  this,
                  ind
                )}
              ></ButtonSwitch>
            ))}
          </div>
        </div>
        <div className="switch-show-state">
          <ShowInformationThisSwitch
            timeLatest={timeLatest}
            pin={pins[showInfomationPosition]}
            information={information.status[showInfomationPosition]}
            openThisSwitch={this.openThisSwitch.bind(
              this,
              showInfomationPosition
            )}
          />
        </div>
      </div>
    )
  }
}
