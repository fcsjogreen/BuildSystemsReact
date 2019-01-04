import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import {Provider} from 'unstated';

import Buscar from './components/Buscar';
import Inicio from './components/Inicio';
import Producto from './components/Vista';
import Compra from './components/Compra';
import Navbar from './components/Navbar';

class App extends Component {  
  render() {   
    const LoginContainer = () => (
      <div className="container-fluid">
        <Route exat path="/" component={Inicio} />
      </div>
    )

    const DefaultContainer = () => (
      <div className="container">
        <Navbar />
        <Route exact path="/buscar" component={Buscar} />
        <Route exact path="/producto/:nombre/:precio/:cantidad" component={Producto} />
        <Route exact path="/compra" component={Compra} />
      </div>

    )

    return (
      <Provider>
      <Switch>
        <Route exact path="/" component={LoginContainer} />
        <Route component={DefaultContainer} />
      </Switch>
      </Provider>
    )
  }
}

export default App;
