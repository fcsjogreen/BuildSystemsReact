import React, { Component } from 'react';
import firebase from '../Firebase';
import './Producto.css';
import { Subscribe } from 'unstated';
import CounterContainer from '../container/ProductCounterContainer';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));

class Producto extends Component {   
    
    constructor(props) {
        super(props);
        this.refCompra = firebase.firestore().collection('compra');
        this.state = {
            pId: this.props.pId,
            nombre: this.props.nombre,
            cantidad: this.props.cantidad,            
            precio: this.props.precio,
            id: this.props.key,
            numProductos: 0

        };
        this.handleVerMas = this.handleVerMas.bind(this)
        this.handleNumber = this.handleNumber.bind(this);
        this.handleAnadir = this.handleAnadir.bind(this);
        console.log(this.state.pId);
    }


    handleAnadir(){
        const numero = this.state.numProductos;
        const nombre = this.state.nombre;
        const precio = this.state.precio;
        const cantidad = this.state.cantidad - numero;
        const subtotal =this.state.precio*numero
        const updateRef = firebase.firestore().collection('producto').doc(this.state.pId);
        updateRef.set({
            nombre,
            precio,
            cantidad
        }).then(()=>{
            console.log("Producto actualizado");
        }).catch((error)=>{
            console.log("Error actualizando producto",error);
        });
        this.refCompra.add({
            producto: nombre,
            cantidad: numero,
            subtotal: subtotal

        })
        this.setState({
            cantidad: cantidad
        })

        
       
    }

    handleNumber(e) {
        
        if (this.state.numProductos < this.props.cantidad) {
           
            if (e.target.id === 'increment') {

                this.setState(prevState => ({
                    numProductos: prevState.numProductos + 1
                   
                }));
            }
        }
        if (this.state.numProductos > 0) {
            if (e.target.id === 'decrement') {

                this.setState(prevState => ({
                    numProductos: prevState.numProductos - 1
                    
                }));
            }
        }
     }

    handleVerMas(){
        this.props.history.push({
            pathname: '/producto/'+this.state.nombre+'/'+this.state.precio+'/'+this.state.cantidad+''
        });
    }

    render() {
        return (
            
            <div className="Producto col-3">
                <div className="card mt-4">
                    <img src={images['' + this.props.nombre + '.jpg']} className="card-img-top rounded imagen"></img>
                    <div className="card-body">
                        <h5 className="card-title text-left text-capitalize font-weight-bold">{this.props.nombre}</h5>
                        <h6 className="card-text text-left">Precio: ${this.state.precio}</h6>
                        <h6 className="card-text text-left">Unidades disponibles: {this.state.cantidad} </h6>
                        <div className="row">
                            <div className="col-5">                                
                                <button onClick={this.handleVerMas} type="button" className="btn btn-primary ver-mas">Ver más</button>    
                            </div>
                            <div className="col-4 text-center">
                                <Subscribe to={[CounterContainer]}>
                                {
                                    counterContainer =>{
                                         return(<button onClick={(e)=>{
                                             if(this.state.numProductos>0){
                                                counterContainer.increment(); this.handleAnadir()
                                             }}} type="button" className="btn  btn-primary anadir">Añadir</button>)
                                    }
                                }                                
                                </Subscribe>
                            </div>

                            <div className="col-3  ">
                                <div className="Spinner-Control  d-flex flex-nowrap ">
                                    <div className="Spinner-Value-Container">
                                        <div id="RoundSpinner" className="Spinner-Value">
                                            {this.state.numProductos}
                                        </div>
                                    </div>
                                    <div className="Spinner-UpDown">
                                        <div className="Spinner-Button-Container">
                                            <div className="Spinner-Button border" id="increment" onClick={this.handleNumber}>
                                                &#x25B2;
                                            </div>
                                        </div>
                                        <div className="Spinner-Button-Container">
                                            <div className="Spinner-Button border" id="decrement" onClick={this.handleNumber}>
                                                &#x25BC;
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default Producto;