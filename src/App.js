import React from 'react'
import './App.css'
import SwitchComponent from './components/switch/SwitchComponent'
import ProjectSwitch from './components/project-switch/ProjectSwitch'
class MessageWhenHave extends React.Component {
  componentWillMount() {
    this.props.messageStore.subscribe(
      () => {
        const { message, status, classEle } = this.props.messageStore.getState()
        this.setState({ text: message, status: status, class: classEle })
      },
      e => {
        console.log({ e })
      }
    )
  }
  constructor(props) {
    super(props)
    this.state = { text: '' }
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
        <div className="component-2">
          <SwitchComponent
            messageStore={this.props.messageStore}
          ></SwitchComponent>
          <ProjectSwitch></ProjectSwitch>
        </div>
      </div>
    )
  }
}
