import React from 'react'
import PagoListNuevo2 from './Pago-list-nuevo2'
import TableHeaderNuevo2 from './Table-Header-Nuevo2'
import Alumno from './Alumno'
import Importe from './Importe'
import FiltroFecha1 from './FiltroFecha1'
import ConceptoList from './Concepto-list'
import NumeroRecibo from './NumeroRecibo'
import '../App2.css';
import PropTypes from 'prop-types';
import Imprimir from './Imprimir';
import BuscarNuevo from './BuscarNuevo';
import {browserHistory} from 'react-router-3';
import SelectNuevo from './SelectNuevo';
import HEROES from './Data-Select';
import RECAUDACION from './Recaudacion-Data';
import swal from 'sweetalert'

const propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number
}

const defaultProps = {
  initialPage: 1
}

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
    this.alumno = ''
    this.importe = 0;
    
    this.BuscarNombre = this.BuscarNombre.bind(this);
    this.select = [];
    this.onChangePage = this.onChangePage.bind(this);
    this.seleccionar=this.seleccionar.bind(this);
    this.enviar=this.enviar.bind(this);
    this.Funcion=this.Funcion.bind(this);
    this.Asignar = this.Asignar.bind(this);
    this.Regresar = this.Regresar.bind(this);
    
  }
componentDidUpdate(){
    if(this.state.estado!=0){
      var checks=document.getElementsByClassName("checkbox1");
      /*console.log(checks[0].id);
      console.log(this.state.estado);
      checks[0].checked=true;*/

      for(let i=0;i<checks.length;i++){
         var id=checks[i].id;
         for(let j=0;j<this.state.pagocero.length;j++){
             var codigo=this.state.pagocero[j].idRec;
             if(this.state.pagocero[j].check==true){
               if(id==codigo){
                 checks[i].checked=true;

               }
             }
         
        }

        }
       }
       else{
         this.setState({estado:1})
        }
 }
  componentWillMount() {
    
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
            <div className=" col-xs-12 margen_top">
              <div className="margen3">
                <BuscarNuevo Busqueda={this.BuscarNombre} />
              </div>
            </div>  
          </div> 
          <hr />
            <div className="SplitPane row center-xs">
            <div className="center-xs-12">
              <table className=" total table ">
                <TableHeaderNuevo2/>
                <PagoListNuevo2  funcion={this.Funcion} listado={this.state.pagocero}/>
              </table>
              <div className="SplitPane row center-xs">  
                <button  onClick={this.Asignar} className="waves-effect waves-light btn-large botonazul2 center"type="submit">Asignar<i className="large material-icons left">check</i></button>
              </div>
            </div>
            </div>

        </div>
      )
  }
  Asignar=(e)=>{

    var check = [];
    var check2 = [];
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
      swal("Inserciones realizadas exitosamente!","","success");
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


/*
var aux = { 
  "idAlumno" : 69,
  "codAlumno" :"15207098",
  "idPrograma":8
}
    //probando insertar un alumnoalumnprograma
    fetch('https://modulo-alumno-jdbc.herokuapp.com/alumnoalumnoprograma/add',
    {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(
      aux
    )
  })
  .then((response) => {
    return response.json()
  })
  .then((pagos) => {
    if(pagos.idPrograma){
      swal("Inserciones realizadas exitosamente!","","success");
    }
      
    
    console.log("ALUMNO QUE HA SIDO INSERTADO");
    console.log(pagos);
  })
  .catch(error => {
    // si hay algún error lo mostramos en consola
    swal("Error al insertar!", "", "error");
    console.error(error)
  });
*/
  }


  Funcion(holas){
    console.log(holas);
    for(let j=0;j<this.state.pagocero.length;j++){
      if(holas==this.state.pagocero[j].idRec){
        if(this.state.pagocero[j].check==true){
          this.state.pagocero[j].check=false;
        }else{
          this.state.pagocero[j].check=true;
        }
      }
    }
    /* for(let i=0;i<selec.length;i++){
      var m=select[i];
      for(let j=0;j<this.state.pagocero;j++){
        if(m==this.state.pagocero[j].idRec){
          this.state.pagocero[j].check=true;
        }
      }
    } */

  }
seleccionar(){
  console.log("gg");
  var checks=document.getElementsByClassName("checkbox1");
  for (let i=0;i<checks.length;i++) {
            if(this.state.todos==false){
              checks[i].checked=true; 
              
            }
            else{
              checks[i].checked=false; 
             
            }
            
          

}
 if(this.state.todos==false){
          this.setState({
            todos:true
          })
          this.state.pagocero.map((pago)=>{
            pago.check=true;
          })
        }else{
          this.setState({
            todos:false
          })
          this.state.pagocero.map((pago)=>{
            pago.check=true;
          })
        }   


        
}
enviar(){
  console.log("lo que envio:");
  console.log(this.state.pagocero);
}
BuscarNombre(busqueda) {
    console.log("Nombre ingresado");
    console.log(busqueda.nombres);
    console.log("apellido ingresado");
    console.log(busqueda.apellidos);
    let nombre = busqueda.nombres;
    let apellido = busqueda.apellidos;
    this.setState({
      nombre: nombre,
      apellido:apellido
    });
    var listado1 =[];  
    fetch('http://modulo-alumno-jdbc.herokuapp.com/alumno/leer/'+nombre+'/'+apellido)
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
           // var nombrefiltro = "TRINIDAD ELIZABETH ABANTO MENDOZA";
            fetch('http://modulo-alumno-jdbc.herokuapp.com/alumnoprograma/leer/'+nombrefiltro)
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
                var label1 = alumnoprograma[j].codAlumno +"/"+ alumnoprograma[j].idPrograma;
               
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

  onChangePage(pageOfItems) {
    
    var total=[];
    var checkbox_selec=[];
    console.log("hola");
    var checks=document.getElementsByClassName("checkbox1");
   var checks_normales=Array.from(checks);
   checks_normales.map((checkbox)=>{
     if(checkbox.checked){
       checkbox_selec.push(checkbox.id);
       
     }
   });
   console.log(checkbox_selec);
   console.log(this.state.checkbox_);

   for(let i=0;i<checkbox_selec.length;i++){
    var id=checkbox_selec[i];
    for(let j=0;j<this.state.pagocero.length;j++){
      if(this.state.pagocero[j].idRec==id){
          total.push(this.state.pagocero[j]);
      }
    }
 }
    // update state with new page of items
    this.setState({ 
      checkbox_:total,
      pageOfItems: pageOfItems });

   
     
  }


}


class Paginacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentWillMount() {

    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }
  setPage(page) {
    var items = this.props.items;
    var pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    pager = this.getPager(items.length, page);

    // get new page of items from items array
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    this.setState({ pager: pager });

    // call change page function in parent component
    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    //var pages = _.range(startPage, endPage + 1);
    var pages = [];
    for (let i = 0; i < endPage; i++) {
      pages.push(startPage + i);
    }

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  render() {
    var pager = this.state.pager;

    return (
      <ul className="pagination row center-xs">
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(1)}>First</a>
        </li>
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage - 1)}><i class="material-icons">chevron_left</i></a>
        </li>
        {pager.pages.map((page, index) =>
          <li key={index + 28} className={pager.currentPage === page ? 'active' : ''}>
            <a onClick={() => this.setPage(page)}>{page}</a>
          </li>
        )}
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage + 1)}><i class="material-icons">chevron_right</i></a>
        </li>
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
        </li>
      </ul>
    );
  }
}
Paginacion.propTypes = propTypes;
Paginacion.defaultProps = defaultProps;

export default AppNueva;
