import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Subscribe } from 'unstated';
import CounterContainer from '../container/ProductCounterContainer';
//import { compra } from '../compra.json';

import firebase from '../Firebase';

class Navbar extends Component {
    
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('compra')
        this.state ={
            numero: 0,
            compra: []
        }
        this.gotoCompras = this.gotoCompras.bind(this);
    }

    gotoCompras(){        
        this.props.history.push('/');
    }

    componentDidMount() {
        const compra = [];
        let num = 0;
        this.ref.get().then((querySnapshot) => {
            if(querySnapshot.empty){
                this.setState({carrito: false});
            }else{
                querySnapshot.forEach((doc) => {
                    const { producto, cantidad, numero, subtotal } = doc.data();
                    compra.push({
                        key: doc.id,
                        doc,
                        producto,
                        cantidad,
                        numero,
                        subtotal
                    });
                });
                this.setState({ compra });
                num = this.state.compra.length-1;
                this.setState({numero: num})
            }          
        });        
    }
    
    

    render() {        
        return (
            <div className="Navbar">
                <div className="container ">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <a className="navbar-brand">La Bodega</a>
                        <ul className="navbar-nav botones">
                            <li className="nav-item">
                                <a className="nav-link">
                                    <img className="icono" src={require("../assets/baseline_apps_black_18dp.png")} />
                                </a>
                            </li>
                            <Link to="/compra">
                                <li className="nav-item">                            
                                    <a className="nav-link">
                                        <img  className="icono" src={require("../assets/baseline_shopping_cart_black_18dp.png")} />
                                        <Subscribe to={[CounterContainer]}>
                                            {
                                                counterContainer =>{
                                                    if(counterContainer.state.count===0){
                                                        return(<span className="badge badge-pill badge-danger"></span>)
                                                    }else{
                                                        return(<span className="badge badge-pill badge-danger">{counterContainer.state.count}</span>)
                                                    }}
                                            }
                                        </Subscribe>
                                    </a>                                                     
                                </li>
                            </Link>
                            <li className="nav-item">
                                <a className="nav-link">
                                    <img className="icono" src={require("../assets/baseline_save_alt_black_18dp.png")} />
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">
                                    <img className="icono" src={require("../assets/baseline_exit_to_app_black_18dp.png")}></img>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>


        )
    }
}

export default Navbar;