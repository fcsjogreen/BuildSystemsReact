import React, { Component } from 'react';

import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import './Inicio.css';


import firebase from '../Firebase';

class Inicio extends Component{
    
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('usuarios')
        
        this.state = {
            usuarios: [],
            valid: <p className="text-rigth"></p>
                     
        }
        this.validateLogin = this.validateLogin.bind(this);
    }

    

    componentDidMount(){      
        const usuarios = [];  
        this.ref.get().then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
               
                const {nombre, contrasena} = doc.data();           
                usuarios.push({
                    key: doc.id,
                    doc,
                    nombre,
                    contrasena
                });
            });
            this.setState({usuarios});
            
        });
        
        
    }
    

    validateLogin(){        
        
        console.log(this.state.usuarios)  
        const user = document.getElementById('correo').value;
        const password = document.getElementById('contrasena').value;        
        if( user && password){
            for(let i= 0; i<this.state.usuarios.length; i++){
                if(user === this.state.usuarios[i].nombre && password === this.state.usuarios[i].contrasena){                    
                    
                    this.props.history.push({
                        pathname: '/buscar'
                    });
                }
            }
            return this.setState({valid: <p className="text-left" style={{color: 'red'}}>Usuario no encontrado</p>})
        }
       
       
    }

    render(){       
        
        
        return(
            <div className="Inicio container-fluid fondo">
            <div className="formulario">
            <h1>Inicio de sesión</h1>
                <form>
                    <div className="form-group">
                        <p id="label-correo" className="text-left">Correo Electronico</p>
                        <Tooltip placement="bottomLeft" trigger={['focus']} overlay={<span>Por favor ingresar correo electrónico</span>}>
                        <input name="username" type="email" className="form-control" id="correo" ></input>
                        </Tooltip>
                    </div>
                    <div className="form-group">
                        <p id="label-contrasena" className="text-left">Contraseña</p>
                        <Tooltip placement="bottomLeft" trigger={['focus']} overlay={<span>Por favor ingresar contraseña</span>}>
                        <input name="password" type="password" className="form-control" id="contrasena" ></input>
                        </Tooltip>                      
                        {this.state.valid}
                    </div>
                   
                    <div className="boton-ingresar">
                       
                            <button type="button" className="btn-primary" onClick={this.validateLogin} >Ingresar</button>
                        
                    </div>
                </form>
            </div>
                
            </div>
            
        )
    }
}

export default Inicio;