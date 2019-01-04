import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import Producto from './Producto';
//import { productos } from '../productos.json';

import firebase from '../Firebase';

class Buscar extends Component{    

    constructor() {
        super();
        this.ref = firebase.firestore().collection('producto');
        this.state = {
            productos: [],
           misProductos:[],
           numProductos: "", 
           value: '',
           suggestions: []        
        };     
        
    }

    componentDidMount(){
        const productos = [];  
        this.ref.get().then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                const {nombre, cantidad, precio} = doc.data();           
                productos.push({
                    key: doc.id,
                    nombre,
                    cantidad,
                    precio
                });
            });
            this.setState({misProductos: productos, productos: productos});
            console.log(this.state.misProductos)
        });
    }

    getSuggestions(value){
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;      
        return inputLength === 0 ? [] : this.state.misProductos.filter(lang =>
          lang.nombre.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    renderSuggestion = suggestion => (
        <span class="text-dark"> 
          {suggestion.nombre}
        </span>
    );

    getSuggestionValue = suggestion => suggestion.producto;

    onChange = (event, { newValue }) => {
        this.setState({
          value: newValue
        });
    };
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: this.getSuggestions(value),
          misProductos: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: [],
          misProductos: this.state.productos

        });
    };

    render() {
        const { value, suggestions } = this.state;
        
        const productos = this.state.misProductos.map((producto, index) => {   
            
            return (
                <Producto index={index} pId={producto.key} nombre={producto.nombre} precio={producto.precio} cantidad={producto.cantidad} history={this.props.history}  />
            )
        })

        const inputProps = {
            placeholder: 'Buscar',
            value,
            onChange: this.onChange
        };
        
        return (
            <div className="Buscar">
            
            <div className="container mt-3">
            <div className="catalogo">
                <div className="card">
                    <div className="card-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-9">
                                    <h2 className="card-title">Catálogo</h2>
                                </div>
                                <div className="col-3 ">
                                    <div className="busqueda">
                                    <h6>¿Qué estás buscando?</h6>                                    
                                    <Autosuggest
                                        suggestions={suggestions}
                                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                        getSuggestionValue={this.getSuggestionValue}
                                        renderSuggestion={this.renderSuggestion}
                                        inputProps={inputProps}
                                    />
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr></hr>
                    <div className="container">
                        <div className="row mt-4">
                            {productos}                            
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>                       
        )

    }
}

export default Buscar;