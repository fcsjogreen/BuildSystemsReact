import { Container } from 'unstated'

class CounterContainer extends Container {
  state = {
    count: 0
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 })
  }

  decrement = () => {
    this.setState({ count: this.state.count - 1 })
  }

  ceri = () =>{
    this.setState({count: 0})
  }
}

export default CounterContainer