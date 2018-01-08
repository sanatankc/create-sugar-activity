import React from 'react'
import { render } from 'react-dom'
import App from './App'
import ToolBar from './components/ToolBar'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 1
    }
  }
  render () {
    return (
      <div>
        <ToolBar
          onIncrement={() => {
            this.setState(prev => ({counter: prev.counter + 1}))
          }}
          onDecrement={() => {
            this.setState(prev => ({counter: prev.counter - 1}))
          }}
        />
        <div id='canvas'>
          <App counter={this.state.counter} />
        </div>
      </div>
    )
  }
}

render(<Main/>, document.getElementById('app'))
