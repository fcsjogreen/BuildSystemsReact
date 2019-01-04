import React, { Component } from 'react';


import Navbar from './Navbar';

import Compra from './Compra';


import './Bodega.css'

import { productos } from '../productos.json';

class Bodega extends Component {

    constructor() {
        super();             
        this.state = {
            numProductos: ""
        };
        
    } 
    
    
    render() {
        
        return (
            <div className="Bodega">
                <Navbar  />
                <Compra  />           
            </div>
            
            
        )

    }
}

export default Bodega;