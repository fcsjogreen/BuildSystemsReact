import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Vista.css';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));

class Vista extends Component {
    constructor(props){
        super(props);
        this.state = {
            nombre: this.props.match.params.nombre,
            cantidad: this.props.match.params.cantidad,            
            precio: this.props.match.params.precio

        };
    }


    render() {
        return (
            <div className="Vista container">
            <div className="card">
                <div className="card-title">
                    <h1 className="text-dark">{this.state.nombre}</h1>
                    <hr></hr>
                </div>
                <div className="card-body">
                    
                    <div className="row">
                        <div className="col">
                            <img src={images['' + this.state.nombre + '.jpg']}  alt="producto" className="card-img-top img-thumbnail img-producto" ></img>
                        </div>
                        <div className="col datos">
                            <p className="text-dark">Precio: $ {this.state.precio}</p>
                            <p className="text-dark">Unidades: {this.state.cantidad}</p>
                        </div>
                    </div>
                    <Link to='/buscar'>
                    <button type="button" className="btn btn-primary btn-atras float-left">Atrás</button>
                    </Link>
                </div>
            </div>
            </div>
            
        )

    }
}

export default Vista;