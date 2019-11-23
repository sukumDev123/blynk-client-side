import React from 'react'
import './App.css'
import SwitchComponent from './components/switch/SwitchComponent'

class MessageWhenHave extends React.Component {
  componentWillMount() {
    this.props.messageStore.subscribe(
      () => {
        const { message, status, classEle } = this.props.messageStore.getState()
        this.setState({ text: message, status: status, class: classEle })
      },
      e => console.log({ e })
    )
    console.log({ l: this.props.messageStore })
  }
  constructor(props) {
    super(props)
    this.state = { text: 'test' }
  }
  render() {
    return <div className={this.state.class}>{this.state.text}</div>
  }
}
export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Control Switch</h1>
        <MessageWhenHave
          messageStore={this.props.messageStore}
        ></MessageWhenHave>
        <SwitchComponent
          messageStore={this.props.messageStore}
        ></SwitchComponent>
      </div>
    )
  }
}
