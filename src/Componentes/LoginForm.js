import React from 'react';
import {browserHistory} from 'react-router-3';
import { Link } from 'react-router-3';
import swal from 'sweetalert'


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombres : '',
      isValid : false,
      alumnos: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.VistaNueva = this.VistaNueva.bind(this);
  
  }


  onSubmit=(e)=>{
    
    console.log(this.state.nombres);
   //https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-client/alumno/leer/
    var nombreValidado = this.ValidarNombre(this.state.nombres);
    var nombres = this.state.nombres.toUpperCase();
    if(nombreValidado){
        fetch('https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/alumno/leer/'+nombres)
            .then((response) => {
            return response.json()
            })
            .then((alumno) => {
              if(alumno.idAlum != null){
                this.setState({ alumnos: alumno});
                console.log(this.state.alumnos)
                if(this.state.alumnos.apeNom.toUpperCase() == this.state.nombres.toUpperCase()){
                  console.log("Hola")
                  this.setState({isValid: true})
                }
                if (this.state.isValid) {
                 swal("Bienvenido!", this.state.alumnos.apeNom , "success").then(
                    browserHistory.push('/'+this.state.nombres.toUpperCase())
                 );
                
                 
                }
              }
              else{
                swal("Wrong!", "Datos ingresados incorrectos!", "error");
              }

            })
            .catch(error => {
            // si hay algún error lo mostramos en consola
                swal("Wrong!", "Datos ingresados incorrectos!", "error");
                console.error(error)
            });
        

    }
    e.preventDefault();
    
  }
  VistaNueva=(e)=>{
    
    browserHistory.push('/vista/nueva');
    console.log("Vista nueva");
    e.preventDefault();
    
  }

  VistaNueva2=(e)=>{
    
    browserHistory.push('/vista/nueva2');
    console.log("Vista nueva 2");
    e.preventDefault();
    
  }
  VistaTablaCreada=(e)=>{
    
    browserHistory.push('/vista/Tabla');
    console.log("Vista nueva 2");
    e.preventDefault();
    
  }
  ValidarNombre(nombres){
    if(!nombres){
      alert("Ingrese un nombre");
      return false;
    }else{
      return true;
    }
  }

  onChange(e) {
    this.setState({nombres: e.target.value});
  }

  render() {
    const { nombres, isLoading,isValid } = this.state;

    return (
      <div className="">
      <h3>Módulo consulta de recibos
         <ul id="nav-mobile" class="right  hide-on-med-and-down">
              <li ><a className="seleccionar" href="https://siga-fisi.herokuapp.com/dashboard" >Vista Principal<i className="material-icons right">launch</i></a></li>
          </ul>
      </h3>
      <nav>
    <div class="nav-wrapper azul">
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a onClick={this.VistaNueva} >VistaNueva</a></li>
        <li><a onClick={this.VistaNueva2} >VistaNueva2</a></li>
        <li><a onClick={this.VistaTablaCreada} >Ver tabla</a></li>
      </ul>
    </div>
  </nav>
      <div className="vista">
      <div className="grupo">
      <h4 className="center h4"><b>Consulte</b></h4>
      <form>
          <div className="center datos">
            <div>
            <i className="material-icons">person</i>
            </div>
            <b>Nombres y Apellidos:</b>
            <div className="center">
            <input type="text" maxlength="100"  value={this.state.nombres} onChange={this.onChange} />
            </div>
           <button type="submit" onClick={this.onSubmit} className="btn btn-primary btn-lg">CONSULTAR</button>
          </div>
    
      </form>
      </div>
      
      </div>
      <footer>
            <div className="row center-xs centrar color">
            Realizado por Hardcode © 2018 
            </div>
            </footer>
      </div>
    );
  }
}

export default LoginForm;