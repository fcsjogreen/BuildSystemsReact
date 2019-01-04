import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './App';
import Buscar from './components/Buscar';
import Inicio from './components/Inicio';
import Producto from './components/Vista';
import Compra from './components/Compra';
import Navbar from './components/Navbar';


const AppRoutes =() =>
<App>
    <Switch>
        <Route exact path="/" component={LoginContainer} />
        <Route component={DefaultContainer} />
    </Switch>
</App>;

const LoginContainer = () => (
    <div className="container-fluid">      
      <Route exat path="/" component={Inicio} />
    </div>
)

const DefaultContainer = () =>(
    <div className="container">
        <Navbar />
        <Route exact path="/buscar" component={Buscar} />
        <Route exact path="/producto/:nombre/:precio/:cantidad" component={Producto} />
        <Route exact path="/compra" component={Compra} />
    </div>
    
)

export default AppRoutes;