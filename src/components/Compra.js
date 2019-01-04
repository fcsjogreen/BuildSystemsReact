import React, { Component } from 'react';
//import { compra } from '../compra.json';
import { Link } from "react-router-dom";
import { Subscribe } from 'unstated';
import CounterContainer from '../container/ProductCounterContainer';
import './Compra.css';

import firebase from '../Firebase';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));

class Compra extends Component {

    constructor() {
        super();
        this.ref = firebase.firestore().collection('compra')
        this.state = {
            compra: [], //{producto, cantidad, subtotal}
            valor: 0,
            mensaje: <div class="alert alert-light" role="alert">
                        No ha comprado productos
                     </div>,
            carrito: false
        }
        this.handlePagar = this.handlePagar.bind(this);
    }


    componentDidMount() {
        const compra = [];       
        this.ref.get().then((querySnapshot) => {
            if(querySnapshot.empty){
                this.setState({carrito: false});
            }else{
                querySnapshot.forEach((doc) => {
                    const { producto, cantidad, subtotal } = doc.data();
                    compra.push({
                        key: doc.id,
                        doc,
                        producto,
                        cantidad,
                        subtotal
                    });
                });
                this.setState({ 
                    compra 
                });
                
                
                for (let i = 0; i < this.state.compra.length; i++) {
                    this.setState(prevState=>({valor: prevState.valor+this.state.compra[i].subtotal}));
                                   
                }

               
                
            }
            
            
        });

        
    }


    handlePagar(){
        for(let i=0; i<this.state.compra.length; i++){
            if(this.state.compra[i].key != 0){
                this.ref.doc(this.state.compra[i].key).delete().then(()=>{
                    console.log("Producto borrado");
                }).catch((error)=>{
                    console.log("Error al borrar el producto ", error);
                });
            }
        }
        this.setState({
            valor: 0,
            compra: [],
            mensaje: <div class="alert alert-light" role="alert">
                        No hay productos
                     </div>
        });
    }

    render() {
        let productos;
        
        if(this.state.compra.length === 1){
            productos = this.state.mensaje;
        }else{
            productos = this.state.compra.slice(1).map((compra, index) => {
                return (
                    <li key={index} className="list-group-item">
                        <div className="row">
                            <div className="col-3">
                                <img className="card-img-top img-carrito" src={images['' + compra.producto + '.jpg']} alt={compra.producto}></img>
                            </div>
                            <div className="col-9">
                                <h5 className="text-left text-capitalize font-weight-bold">{compra.producto}</h5>
                                <h6 className="text-left">Unidades: {compra.cantidad}</h6>
                            </div>
                        </div>
                        <h6 className="text-left mt-2">Subtotal: ${compra.subtotal}</h6>
                    </li>
                )
            })
        }
        
        
        return (

            <div className="Compra">
                <div className="container bg-white border border-dark  mt-5">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <ul className="list-group list-group-flush">
                                    {productos}
                                </ul>
                            </div>
                        </div>
                        <div className="col text-left">

                            <h1 className="text-dark">Total: {this.state.valor} </h1>
                            <Link to='/buscar'>
                                <button type="button" className="btn btn-primary btn-cancelar">Cancelar</button>                            
                            </Link>
                            <Link to='/buscar'>
                            <Subscribe to={[CounterContainer]}>
                                {
                                     counterContainer =>{
                                         return(<button onClick={(e)=>{this.handlePagar(); counterContainer.cero();}} type="button" className="btn btn-primary btn-pagar">Pagar</button>)
                                     }
                                }
                                
                            </Subscribe>
                                
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Compra;