import React from 'react'
import PagoListNuevo2 from './Pago-list-nuevo2'
import TableHeaderNuevo2 from './Table-Header-Nuevo2'
import '../App2.css';
import BuscarNuevo from './BuscarNuevo';
import {browserHistory} from 'react-router-3';
import swal from 'sweetalert'

class AppNueva extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      conceptos : [],
      todos:false,
      nombre: '',
      apellido: '',
      checkbox_:[],
      filtros: [],
      pagocero: [],
      pagoOpciones:[],
      pagos: [],
      name: this.props.params.name,
      pageOfItems: [],
      estado:0,
      filtroDel:new String(""),
      filtroAl:new String(""),
      filtroNumeros: []
    }
    this.enviar=this.enviar.bind(this);

    this.BuscarNombre = this.BuscarNombre.bind(this);
    this.Asignar = this.Asignar.bind(this);
    this.Regresar = this.Regresar.bind(this);
}

Regresar=(e)=>{
    
    browserHistory.push('/');
    e.preventDefault();
    
}

  render() {
    
      return (
        <div className="">
          <h3>Estado de pagos
          <ul id="nav-mobile" class="right  hide-on-med-and-down">
              <li ><a className="seleccionar" onClick={this.Regresar} >Regresar<i className="material-icons right">reply</i></a></li>
          </ul>
          </h3>
          <hr />
          <div className="SplitPane row">
            <div className=" col-xs-12">
                <div>
                <BuscarNuevo Busqueda={this.BuscarNombre} />
              </div>
            </div>  
          </div> 
          <hr/>
            <div className="row center-xs centrar">
            <div className="center-xs-12 margin_top ">
              <div>
                <PagoListNuevo2  funcion={this.Funcion} listado={this.state.pagocero}/>
              </div>
              <div className="SplitPane row center-xs">  
                <button  onClick={this.Asignar} className="waves-effect waves-light btn-large botonazul2 center"type="submit">Asignar<i className="large material-icons left">check</i></button>
              </div>
            </div>
            </div>
            <footer>
            <div className="row center-xs centrar color">
            Realizado por Hardcode © 2018 
            </div>
            </footer>

        </div>
      )
  }
Asignar=(e)=>{

    var check = [];
    var opcionesSeleccionadas = [];
    var listadoAlumnoPrograma = [];
    

    check = document.getElementsByClassName("opcion2");
    console.log("Elementos seleccionado")
    console.log(check);
    console.log("seleccionados codigos");
    for (var item of check) {
     opcionesSeleccionadas.push(item.id);
     console.log("item recibido");
     console.log(item.id);
    }
    
 
    var listado2 = this.state.pagocero;
    console.log("listado 2");
    console.log(listado2);
    
    for (let i = 0; i < listado2.length; i++) {
        var index = opcionesSeleccionadas[i];
        console.log("indice")
        console.log(index);
        if(!index){
           listadoAlumnoPrograma.push(null);
        }else{
           var ap = listado2[i].alumnoPrograma[index];
           listadoAlumnoPrograma.push(ap);
        }
    }
    console.log("listado de alumnos programas");
    console.log(listadoAlumnoPrograma);
    
    var pagoinsertar = [];
    var PagosActualizados = this.state.pagocero;

    for (let i = 0; i < PagosActualizados.length; i++) {
        var ap = listadoAlumnoPrograma[i];
        if(ap != null){
          var listadoRec = { 
          "idAlumno" : PagosActualizados[i].idAlum,
          "codAlumno" :ap.codAlumno,
          "idPrograma":ap.idPrograma
        }
        pagoinsertar.push(listadoRec);
        }
    }
    console.log("alumno-alumno programa generado a insertar");
    console.log(pagoinsertar)


    for (let i = 0; i < pagoinsertar.length; i++) {
      //llamar servicio insertar alumno alumno-programa
      fetch('https://modulo-alumno-jdbc.herokuapp.com/alumnoalumnoprograma/add',
    {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(
      pagoinsertar[i]
    )
  })
  .then((response) => {
    return response.json()
  })
  .then((pagos) => {
    if(pagos){
      swal("Asignado exitosamente!","","success");
    }
    console.log("ALUMNO QUE HA SIDO INSERTADO");
    console.log(pagos);
  })
  .catch(error => {
    // si hay algún error lo mostramos en consola
    
      swal("Ya ha sido registrado!", "", "error");
    console.error(error)
  });
  
    }
}
enviar(){
  console.log("lo que envio:");
  console.log(this.state.pagocero);
}
BuscarNombre(busqueda) {
    console.log("Nombre ingresado");
    console.log(busqueda.nombres);
    let nombre = busqueda.nombres;
    var separador = " "; // un espacio en blanco
    var arregloDeSubCadenas = nombre.split(separador);
    console.log("arreglo de subcadenas");
    var nombrenuevo = arregloDeSubCadenas.join(" & ");
    console.log(nombrenuevo);

    this.setState({
      nombre: nombre
    });
    var listado1 =[];  
    fetch('http://modulo-alumno-jdbc.herokuapp.com/alumno/leer/restringido/'+nombrenuevo)
      .then((response) => {
        return response.json()
      })
      .then((pagos) => {
      
      console.log("Listado de pagos recibidos");
      console.log(pagos);

      var listado1 =[];
      var opciones  = [];
      for (let i = 0; i< pagos.length; i++) {
        var listadoRec = { 
          idAlum : '',
          apeNom:'',
          codigo:'',
          dni:'',
          idFacultad:'',
          codigos:[]
        }
        listadoRec.idAlum = pagos[i].idAlum;
        listadoRec.apeNom = pagos[i].apeNom;
        listadoRec.codigo = pagos[i].codigo;
        listadoRec.dni = pagos[i].dni;
        listadoRec.idFacultad = pagos[i].idFacultad;
        listado1.push(listadoRec); 
      }
     
      console.log(nombrefiltro);

      for (let i = 0; i< listado1.length; i++) {
            var nombrefiltro = listado1[i].apeNom;
            var separador1 = " "; // un espacio en blanco
            var arregloDeSubCadenas1 = nombrefiltro.split(separador1);
            console.log("arreglo de subcadenas para alumno programa");
            var nombrenuevo1 = arregloDeSubCadenas1.join(" & ");
            console.log(nombrenuevo1);
           // var nombrefiltro = "TRINIDAD ELIZABETH ABANTO MENDOZA";
            fetch('http://modulo-alumno-jdbc.herokuapp.com/alumnoprograma/leer/restringido/'+nombrenuevo1)
            .then((response) => {
            return response.json()
            })
            .then((programa) => {
            var alumnoprograma = programa;
            //listado1[i].alumnoPrograma = 
            var listadoOpcionesCodigos = [];
            var listadoOpcionesProgramas = [];
            console.log("ALUMNO PROGRAM RECIBIDO");
            console.log(alumnoprograma);
            console.log("longitud del array alumno programa recibido")
            console.log(alumnoprograma.length);

            listado1[i].alumnoPrograma = programa;
             
             for(let j = 0; j< alumnoprograma.length; j++){       
    
                var value1 = j;
                var label1 = alumnoprograma[j].codAlumno+"-"+alumnoprograma[j].nomAlumno+" "+alumnoprograma[j].apePaterno +" "+alumnoprograma[j].apeMaterno +"/"+ alumnoprograma[j].idPrograma;
               
                var option1 = {value: value1, label:label1};
                listado1[i].codigos.push(option1);
                //listadoOpcionesCodigos.push(option1);
                /*
                console.log("listado de opciones de codigos");
                var value2 = j;
                var label2 = alumnoprograma[j].programa.nomPrograma;
                var option2 = {value: value2, label:label2};
                listado1[i].programas.push(option2);
                */
               // listadoOpcionesProgramas.push(option2);    
            
            }
            console.log("programa leido");
            /*
            if(alumnoprograma.length == 0){
              var value1 = "codigo";
              var label1 = "No hay coincidencias";
              var option1 = {value: value1, label:label1};
              listado1[i].codigos.push(option1);
            }
            */
            console.log(programa);
            })
            .catch(error => {
            console.error(error)
            });
      }

      this.setState({
          pagocero: listado1,
          pagos: pagos
      },
        );
        console.log("listado de alumno y codigo programa que se muestra en la tabla");
        console.log(listado1);
    }
    )
    .catch(error => {
        // si hay algún error lo mostramos en consola
        swal("Error!", "", "error");
        console.error(error)
    });
}


}
export default AppNueva;
