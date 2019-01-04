import { Container } from 'unstated'


class CounterContainer extends Container {
  state = {
    count: 0
  }

  
  setCount =(num) =>{
    this.setState({count: num}) 
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 })
  }

  decrement = () => {
    this.setState({ count: this.state.count - 1 })
  }

  cero = () =>{
    this.setState({count: 0})
  }
}

export default CounterContainer