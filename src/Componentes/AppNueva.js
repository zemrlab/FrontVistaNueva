import React from 'react'
import PagoListNuevo from './Pago-list-nuevo'
import TableHeaderNuevo from './Table-Header-Nuevo'
import Alumno from './Alumno'
import Importe from './Importe'
import FiltroFecha1 from './FiltroFecha1'
import ConceptoList from './Concepto-list'
import NumeroRecibo from './NumeroRecibo'
import '../App2.css';
import PropTypes from 'prop-types';
import Imprimir from './Imprimir';
import Buscar from './Buscar';
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
    this.conceptos = []
    this.alumno = ''
    this.importe = 0;
    this.FiltrarFecha = this.FiltrarFecha.bind(this);
    this.BuscarNombre = this.BuscarNombre.bind(this);
    this.FiltrarNumeros = this.FiltrarNumeros.bind(this);
    this.filtrarConcepto = this.filtrarConcepto.bind(this);
    this.SeleccionFechaDel = this.SeleccionFechaDel.bind(this);
    this.SeleccionFechaAl = this.SeleccionFechaAl.bind(this);
    this.Filtrar = this.Filtrar.bind(this);
    this.SeleccionConceptos = this.SeleccionConceptos.bind(this);
    this.Regresar = this.Regresar.bind(this);

    this.select = [];
    this.onChangePage = this.onChangePage.bind(this);
    this.seleccionar=this.seleccionar.bind(this);
    this.enviar=this.enviar.bind(this);
    this.Funcion=this.Funcion.bind(this);
    this.Asignar = this.Asignar.bind(this);
    
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
          <h3>Estado de pagos  <ul id="nav-mobile" class="right  hide-on-med-and-down">
              <li ><a className="seleccionar" onClick={this.Regresar} >Regresar<i className="material-icons right">reply</i></a></li>
          </ul></h3>
         
          <hr />
          <div className="SplitPane row">
            <div className=" col-xs-4 margen_top">
              <div className="margen">
                <Buscar Busqueda={this.BuscarNombre} />
              </div>
            </div>

            <div className=" col-xs-8 ">
              <div className="center-xs-12 margen_top">
              <h5>Filtros</h5>
              </div>
              <div className="SplitPane row">
                <div className="inline col-xs-3">
                  <div>
                    <label>Del:</label>
                    <FiltroFecha1 Fechas={this.SeleccionFechaDel} />
                  </div>
                  <div>
                    <label>Al:</label>
                    <FiltroFecha1 Fechas={this.SeleccionFechaAl} />
                  </div>
                </div >
                <div className="row center-xs-4 block ">
                  <h4 className=" centrar margen_top espacio">Conceptos</h4>
                  <div className="scroll center-xs ">
                    <form action="#"><ConceptoList listado={this.state.conceptos} /></form>
                  </div>
                </div>
                <div className="centrar col-xs-5">
                  <h4 className="centrar margen_top">Recibo</h4>
                  <div>
                    <NumeroRecibo Numeros={this.FiltrarNumeros} />
                  </div>
                </div>
                <div className="SplitPane row">
                <div className="row center-xs-12">
                <button onClick={this.Filtrar}  className="waves-effect waves-light btn-large botonazul2 right" type="submit">Filtrar<i className="large material-icons left">check</i></button>
                </div>
              </div>
              </div>
              
            </div>   
          </div> 
          <hr />
            <div className="SplitPane row center-xs">
            <div className="center-xs-12">
              <table className=" total table ">
                <TableHeaderNuevo/>
                <PagoListNuevo  funcion={this.Funcion} listado={this.state.pagocero}/>
              </table>
              <div className="row">
                <div className="col-xs-7">
                </div>
                <div className="col-xs-5">
                  <Importe importe={this.CalcularImporte()} />
                </div>
              </div>
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
    

    check = document.getElementsByClassName("opcion");

    console.log("seleccionados codigos");
    for (var item of check) {
     opcionesSeleccionadas.push(item.id);
     console.log("item recibido");
     console.log(item.id);
    }
    /*
    check2 = document.getElementsByClassName("opcionPrograma");

    console.log("seleccionados programas");
    for (var item of check2) {
     console.log(item.id);
    }*/
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
            console.log("ap");
            console.log(ap);
        }
    
    }
    console.log("listado alumno programa");
    console.log(listadoAlumnoPrograma);
    var PagosActualizados = this.state.pagos;
    for (let i = 0; i < PagosActualizados.length; i++) {
        var ap = listadoAlumnoPrograma[i];
        if(ap != null){
          PagosActualizados[i].alumnoPrograma = ap;
        }
    }
    console.log("pagos actualizados");
    console.log(PagosActualizados);
    
    fetch('https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-client/updaterecaudaciones/actualizar',
    {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(
     PagosActualizados
    )
  })
  .then((response) => {
    return response.json()
  })
  .then((pagos) => {
    if(pagos == 1){
      swal("Recaudaciones actualizadas exitosamente!","","success");
    }else{
      swal("Error al actualizar recaudaciones!", "", "error");
    }
  })
  .catch(error => {
    // si hay algún error lo mostramos en consola
    console.error(error)
  });
    /*

    for (let i = 0; i < this.conceptos.length; i++) {
      idconcepto.push(this.conceptos[i].idConcepto);
    }
    */


  }

  Filtrar=(e)=>{
    var concep = [];
    concep = this.SeleccionConceptos();
    console.log("conceptos con check recibidos")
    console.log(concep);
    console.log(concep.length);
    console.log("filtro del recibido")
    console.log(this.state.filtroDel);
    console.log("filtro al recibido")
    console.log(this.state.filtroAl);
    console.log("listado de numeros recibidos")
    console.log(this.state.filtroNumeros);
    console.log(this.state.filtroNumeros.length);

    var filtrodel = this.state.filtroDel;

    var filtroal = this.state.filtroAl;

    if(filtrodel.length == 0){
      console.log("no hay del ")
      filtrodel = "0000-00-00";
      console.log(filtrodel)
    }
    if(filtroal.length == 0){
      console.log("no hay al");
      filtroal = "9999-12-12";
      console.log(filtroal)
    }


    fetch('https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-client/updaterecaudaciones/listar/filtrar',
    {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(
      /*
      {
        "nombres":"JOSE CARLOS",
        "apellidos":"ACOSTA BRAVO",
        "fechaInicial":"0000-00-00",
        "fechaFinal":"9999-12-12",
        "conceptos":["210011"],
        "recibos":["8500588"]
     }*/
   
      {
        "nombres":this.state.nombre,
        "apellidos":this.state.apellido,
        "fechaInicial": filtrodel,
        "fechaFinal": filtroal,
        "conceptos":concep,
        "recibos":this.state.filtroNumeros
      }
      /*
      {
        "nom_ape": "RAUL NAUPARI QUIROZ",
        "fechaInicial": "0000-00-00",
        "fechaFinal": "9999-12-12",
        "conceptos": ["210011"],
        "recibos":["10509204","10509205"]
      }*/
      
    )
})
.then((response) => {
  return response.json()
})
.then((pagos) => {
  console.log("Listado de pagos recibidos");
  console.log(pagos);

  var listado3 =[];
  var opciones  = [];
  for (let i = 0; i< pagos.length; i++) {
    var listadoRec = { 
      alumnoPrograma: null,
      autoseguro: '',
      ave :'',
      carnet:'',
      devolTran:'',
      fecha:'',
      idAlum : [],
      idConcepto:[],
      idRec:'',
      idRegistro:[],
      importe:'',
      moneda:'',
      numero:'',
      observacion:'',
      validado:'',
      codigos:[]//,
      //programas:[]
    }
    listadoRec.alumnoPrograma = pagos[i].alumnoPrograma;
    listadoRec.autoseguro = pagos[i].autoseguro;
    listadoRec.ave= pagos[i].ave;
    listadoRec.carnet = pagos[i].carnet;
    listadoRec.devolTran = pagos[i].devolTran;
    listadoRec.fecha = pagos[i].fecha;
    listadoRec.idAlum = pagos[i].idAlum;
    listadoRec.idConcepto = pagos[i].idConcepto;
    listadoRec.idRec = pagos[i].idRec;
    listadoRec.idRegistro = pagos[i].idRegistro;
    listadoRec.importe = pagos[i].importe;
    listadoRec.moneda = pagos[i].moneda;
    listadoRec.numero = pagos[i].numero;
    listadoRec.observacion = pagos[i].observacion;
    listadoRec.validado = pagos[i].validado;
    listado3.push(listadoRec); 
  }
 
  console.log(nombrefiltro);

  for (let i = 0; i< listado3.length; i++) {
        var nombrefiltro = listado3[i].idAlum.apeNom;
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

        listado3[i].alumnoPrograma = programa;
         
         for(let j = 0; j< alumnoprograma.length; j++){       

            var value1 = j;
            var label1 = alumnoprograma[j].codAlumno +"/"+ alumnoprograma[j].idPrograma;
           
            var option1 = {value: value1, label:label1};
            listado3[i].codigos.push(option1);
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
          listado3[i].codigos.push(option1);
          //listadoOpcionesCodigos.push(option1);
          /*
          console.log("listado de opciones de codigo en caso no tener programas");
          var value2 = "programa";
          var label2 = "Programa1";
          var option2 = {value: value2, label:label2};
          //listadoOpcionesProgramas.push(option2);
          listado1[i].programas.push(option2);
     
        }*/
        console.log(programa);
        })
        .catch(error => {
        // si hay algún error lo mostramos en consola
        console.error(error)
        });
  }

  this.setState({
      pagocero: listado3,
      pagos: pagos
  },
    );
    console.log("listado de programa y codigo opciones despues de copiar el filtro");
    console.log(listado3);
})
.catch(error => {
  // si hay algún error lo mostramos en consola
  console.error(error)
});

  }
  SeleccionFechaDel(Fecha) {
    console.log(Fecha);
    var fecha1 = new String(Fecha);
    console.log("fecha del");
    console.log(fecha1);
    this.setState({filtroDel: fecha1});
    
  }
  SeleccionFechaAl(Fecha) {
    console.log(Fecha);
    var fecha1 = new String(Fecha);
    console.log("fecha al");
    console.log(fecha1);
    this.setState({filtroAl: fecha1});
    
  }
  SeleccionConceptos(){

    var idconcepto = [];
    var checkbox_seleccionados = [];
    var check = [];
    var seleccionados = 0;
    var arrayfiltrado = [];
    check = document.getElementsByClassName("clase_concepto");


    for (var item of check) {
      if (item.checked) {
        checkbox_seleccionados.push(item.name);
      }
    }
    /*

    for (let i = 0; i < this.conceptos.length; i++) {
      idconcepto.push(this.conceptos[i].idConcepto);
    }
    */
    console.log(checkbox_seleccionados);
   
    return checkbox_seleccionados;

  }

  OpcionSeleccionadaModelo(opcion) {
    if(opcion != null){
    
    console.log("opcion seleccionada modelo");
    console.log(opcion);
    //this.setState({modelo: opcion.value});
    }
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
CalcularImporte() {
    
    let pagos = this.state.pagocero;
    let importe = 0;
    for (var indice in pagos) {
      importe = importe + pagos[indice].importe;
    }
    return importe;
}
BuscarNombre(busqueda) {
    let nombres = busqueda.nombres;
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
    //creo el array de opciones
   
      var listado1 =[];/*
      var opciones  = [];
      for (let i = 0; i< RECAUDACION.length; i++) {
        var listadoRec = { idRec: 0,concepto: '',numero:'',facultad:'', fecha: '',moneda : 0 ,importe: 0,
        codigo :[],programa :[]
        }
        listadoRec.idRec = RECAUDACION[i].idRec;
        listadoRec.concepto = RECAUDACION[i].concepto;
        listadoRec.numero = RECAUDACION[i].numero;
        listadoRec.facultad = RECAUDACION[i].facultad;
        listadoRec.fecha = RECAUDACION[i].fecha;
        listadoRec.moneda = RECAUDACION[i].moneda;
        listadoRec.importe = RECAUDACION[i].importe;

        var listadoOpciones = RECAUDACION[i].codigo;
        var listadoProgramas = RECAUDACION[i].programa;
        var listadoOpcionesOpciones = [];
        var listadoOpcionesProgramas = [];

        for(let j = 0; j<listadoOpciones.length; j++){
          var value = listadoOpciones[j];
          var label = listadoOpciones[j];
          var option = {value: value, label:label};
          listadoOpcionesOpciones.push(option);
        }
        for(let j = 0; j<listadoProgramas.length; j++){
          var value = listadoProgramas[j]
          var label = listadoProgramas[j];
          var option = {value: value, label:label};
          listadoOpcionesProgramas.push(option);
          }
        listadoRec.codigo.push(listadoOpcionesOpciones);
        listadoRec.programa.push(listadoOpcionesProgramas);
        listado1.push(listadoRec);
        
      }

     console.log("listado de programa y codigo opciones");
     console.log(listado1);
     

    //creo el array de opciones
    this.setState({
      pagocero: listado1,
      pagoOpciones:listado1
    });*/
    
    fetch('https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-client/updaterecaudaciones/listar/'+nombre+'/'+apellido)
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
          alumnoPrograma: null,
          autoseguro: '',
          ave :'',
          carnet:'',
          devolTran:'',
          fecha:'',
          idAlum : [],
          idConcepto:[],
          idRec:'',
          idRegistro:[],
          importe:'',
          moneda:'',
          numero:'',
          observacion:'',
          validado:'',
          codigos:[]//,
          //programas:[]
        }
        listadoRec.alumnoPrograma = pagos[i].alumnoPrograma;
        listadoRec.autoseguro = pagos[i].autoseguro;
        listadoRec.ave= pagos[i].ave;
        listadoRec.carnet = pagos[i].carnet;
        listadoRec.devolTran = pagos[i].devolTran;
        listadoRec.fecha = pagos[i].fecha;
        listadoRec.idAlum = pagos[i].idAlum;
        listadoRec.idConcepto = pagos[i].idConcepto;
        listadoRec.idRec = pagos[i].idRec;
        listadoRec.idRegistro = pagos[i].idRegistro;
        listadoRec.importe = pagos[i].importe;
        listadoRec.moneda = pagos[i].moneda;
        listadoRec.numero = pagos[i].numero;
        listadoRec.observacion = pagos[i].observacion;
        listadoRec.validado = pagos[i].validado;
        listado1.push(listadoRec); 
      }
     
      console.log(nombrefiltro);

      for (let i = 0; i< listado1.length; i++) {
            var nombrefiltro = listado1[i].idAlum.apeNom;
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
            if(alumnoprograma.length == 0){
              var value1 = "codigo";
              var label1 = "No hay coincidencias";
              var option1 = {value: value1, label:label1};
              listado1[i].codigos.push(option1);
              //listadoOpcionesCodigos.push(option1);
              /*
              console.log("listado de opciones de codigo en caso no tener programas");
              var value2 = "programa";
              var label2 = "Programa1";
              var option2 = {value: value2, label:label2};
              //listadoOpcionesProgramas.push(option2);
              listado1[i].programas.push(option2);*/
         
            }
            console.log(programa);
            })
            .catch(error => {
            // si hay algún error lo mostramos en consola
            console.error(error)
            });
      }

      this.setState({
          pagocero: listado1,
          pagos: pagos
      },
        );
        console.log("listado de programa y codigo opciones despues de copiar el filtro");
        console.log(listado1);
    }
    )
    .catch(error => {
        // si hay algún error lo mostramos en consola
        console.error(error)
    });
  
    fetch('https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-client/concepto/leer/'+nombre+'/'+apellido)
      .then((response) => {
        return response.json()
      })
      .then((conceptos) => {
        this.setState({
          conceptos: conceptos
      });
      console.log("Conceptos recibidos de los nombres ingresados");
      console.log(this.state.conceptos);
      })
      .catch(error => {
        // si hay algún error lo mostramos en consola
        console.error(error)
      });


}



  FiltrarFecha(Fechas) {
    var filtrado = [];
    console.log(Fechas.del);
    console.log(Fechas.al);
    var del = new String(Fechas.del);
    var al = new String(Fechas.al);
    var nombres = this.state.name;
    fetch('https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-client/recaudaciones/listar/' + nombres + '/' + del + '/' + al)
      .then((response) => {
        return response.json()
      })
      .then((pagos) => {
        if (pagos.length == 0) {
          alert("No hay registros de pago en este rango de fechas");
          //this.setState({pagocero: []})
          filtrado = this.state.pagos;
          console.log(filtrado);
          
        }
        else {pagos.map((pago)=>{
          pago.check=false;
        });
          filtrado = pagos;
          console.log(filtrado);
          var checkado=document.getElementsByName("chekado");
          var normals=Array.from(checkado);
          for(let i=0;i<normals;i++){
            
            for(let j=0;j<this.state.pagocero;j++){
              if(normals[i].id==this.state.pagocero[j].idRec){
                  this.state.pagocero[j].check=true;
              }
              else{
                this.state.pagocero[j].check=false;
              }
            }
          }
          console.log(this.state.pagocero);

        }


        this.filtrarConcepto(filtrado);


      })
      .catch(error => {
        // si hay algún error lo mostramos en consola
        console.error(error)
      });

  }

  FiltrarNumeros = (listaNumeros) => {
   
 
    console.log("Listado de numeros recibidos:")
    console.log(listaNumeros);
    this.setState({
      filtroNumeros: listaNumeros
     }) 
       //this.setState({
     // filtros: listaNumeros
    //})

    /* 
    
    var listaNumeros_seleccionados = listaNumeros;
    var arrayfiltrado=[];
    console.log(listaNumeros_seleccionados);


    for(let i=0;i<listaNumeros_seleccionados.length;i++){
      var numeroactual=listaNumeros_seleccionados[i];
      for(let j=0;j<this.state.pagos.length;j++){
          var numero_seleccionado=this.state.pagos[j].numero;
          if(numero_seleccionado==numeroactual){
            arrayfiltrado.push(this.state.pagos[j]);
          }

      }
    }
    
    console.log(arrayfiltrado);
   
    if(listaNumeros_seleccionados.length==0){
      alert("Ingrese uno o mas numeros de recibos")
      
    }
    else{ 
      if(arrayfiltrado.length == 0){
        alert("No hay registro con los numeros de voucher ingresados");
      }
      else{
        console.log(arrayfiltrado);
        this.setState({
        pagocero : arrayfiltrado
          })
      }
    }
    
    
    
    */
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


  filtrarConcepto = (filtrado) => {
    console.log(filtrado);
    var idconcepto = [];
    var checkbox_seleccionados = [];
    var check = [];
    var seleccionados = 0;
    var arrayfiltrado = [];
    check = document.getElementsByClassName("clase_concepto");


    for (var item of check) {
      if (item.checked) {
        checkbox_seleccionados.push(item.name);
      }
    }

    for (let i = 0; i < this.conceptos.length; i++) {
      idconcepto.push(this.conceptos[i].idConcepto);
    }



    console.log(checkbox_seleccionados);




    //var arrayflitrado=this.state.pagos.filter(pago => pago.concepto.idConcepto===5);
    if (checkbox_seleccionados.length == 0) {

      arrayfiltrado = filtrado;
    }
    else {
      for (let i = 0; i < checkbox_seleccionados.length; i++) {
        var conceptoactual = checkbox_seleccionados[i];
        for (let j = 0; j < filtrado.length; j++) {
          var concepto_seleccionado = filtrado[j].concepto.idConcepto;
          if (concepto_seleccionado == conceptoactual) {
            arrayfiltrado.push(filtrado[j]);
          }

        }
      }

      if (arrayfiltrado.length == 0) {
        arrayfiltrado = filtrado;
      }
      console.log(arrayfiltrado);



    }







    var numero_codigos = this.state.filtros;
    console.log(numero_codigos);
    var filtrofinal = [];

    var listaNumeros_seleccionados = numero_codigos;

    console.log(listaNumeros_seleccionados);




    console.log(arrayfiltrado);

    if (listaNumeros_seleccionados.length == 0) {
      
      this.setState({
        pagocero: arrayfiltrado
      })


    }
    else {
      if (arrayfiltrado.length == 0) {
        
        this.setState({
          pagocero: arrayfiltrado
        })
      }
      else {

        for (let i = 0; i < listaNumeros_seleccionados.length; i++) {
          var numeroactual = listaNumeros_seleccionados[i];
          for (let j = 0; j < arrayfiltrado.length; j++) {
            var numero_seleccionado = arrayfiltrado[j].numero;
            if (numero_seleccionado == numeroactual) {
              filtrofinal.push(arrayfiltrado[j]);
            }

          }
        }

        if (filtrofinal.length == 0) {
          alert("No hay registros.Se volverán a cargar todos")
          this.setState({
            pagocero: this.state.pagos
          })
        } else {
          this.setState({
            pagocero: filtrofinal
          })
        }

       
        console.log(arrayfiltrado);
        console.log(this.state.pagocero);

      }
    }

    

  }

    




  /*
    FiltrarCodigo(codigo) {
      
      fetch('https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-client/pago/listar/'+ codigo)
        .then((response) => {
          return response.json()
        })
        .then((pagos) => {
          this.setState({ pagos: pagos })
        })
  
  
      let id = codigo;
      var alumnosfiltrados = this.state.alumnos.filter((alumno) => alumno.alumno.idAlumno === id)
      console.log(alumnosfiltrados);
      this.setState({ alumnos: alumnosfiltrados })
      
  
  
      let id = this.codigo;
      let greaterTen = [];
  
      for (let i = 0; i<this.state.alumnos.length; i++) {
        var currentNumber = this.state.alumnos[i];
        if (currentNumber.alumno.idAlumno === id) {
         greaterTen.push(currentNumber)
        }
      }
      this.solicitudesfiltradas = greaterTen;
      console.log(this.solicitudesfiltradas);
    }*/


    


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








  /*
    FiltrarCodigo(codigo) {
      
      fetch('https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-client/pago/listar/'+ codigo)
        .then((response) => {
          return response.json()
        })
        .then((pagos) => {
          this.setState({ pagos: pagos })
        })
  
  
      let id = codigo;
      var alumnosfiltrados = this.state.alumnos.filter((alumno) => alumno.alumno.idAlumno === id)
      console.log(alumnosfiltrados);
      this.setState({ alumnos: alumnosfiltrados })
      
  
  
      let id = this.codigo;
      let greaterTen = [];
  
      for (let i = 0; i<this.state.alumnos.length; i++) {
        var currentNumber = this.state.alumnos[i];
        if (currentNumber.alumno.idAlumno === id) {
         greaterTen.push(currentNumber)
        }
      }
      this.solicitudesfiltradas = greaterTen;
      console.log(this.solicitudesfiltradas);
    }*/


}
Paginacion.propTypes = propTypes;
Paginacion.defaultProps = defaultProps;

export default AppNueva;
