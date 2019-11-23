import React from 'react'
import './SwitchComponent.css'
import {
  getDataFromAPIB,
  updateStatusOfSwitch
} from '../../services/fetch-datas'
import { ADDMESSAGE } from '../redux/message-store'
export default class SwitchComponent extends React.Component {
  componentWillMount() {
    this.handleDataFromApi()
  }
  constructor(props) {
    super(props)
    this.state = {
      pins: [],
      information: {
        status: []
      },
      showInfomationPosition: 0,
      btnOnClicked: ['clicked_active', '', '', '']
    }
  }
  handleDataFromApi = () =>
    getDataFromAPIB()
      .then(datas => {
        if (datas.statusPins.length > 0) {
          this.setState({
            information: { status: datas.statusPins },
            pins: datas.pins
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
    //TODO this is to show informarion switch from index
    const btnClass = this.state.btnOnClicked.map(() => '')
    btnClass[index] = 'clicked_active'
    this.setState({ showInfomationPosition: index, btnOnClicked: btnClass })
  }
  handleText = status => (status === '0' ? 'Closed switch' : 'Opened switch')
  handleTextBtn = status => (status === '1' ? 'Close' : 'Open')
  render() {
    return (
      <div className="switch-div">
        <div className="switch-button-div">
          <div className="switch-button">
            {this.state.pins.map((d, ind) => (
              <button
                key={d}
                className={
                  `${this.state.btnOnClicked[ind]} ` +
                  (this.state.information.status[ind] === '1'
                    ? 'opened'
                    : 'closed')
                }
                onClick={this.checkShowSwitchInformation.bind(this, ind)}
              >
                My Switch Pin's {d}
              </button>
            ))}
          </div>
        </div>
        <div className="switch-show-state">
          <h3>
            The Switch pin's
            {' ' + this.state.pins[this.state.showInfomationPosition]}
          </h3>
          <h5>
            {' '}
            {this.handleText(
              this.state.information.status[this.state.showInfomationPosition]
            )}
          </h5>
          <button
            className="btn-switch-open"
            onClick={this.openThisSwitch.bind(
              this,
              this.state.showInfomationPosition
            )}
          >
            {this.handleTextBtn(
              this.state.information.status[this.state.showInfomationPosition]
            )}{' '}
            this switch?
          </button>
        </div>
      </div>
    )
  }
}
