import React from 'react'
import PagoListNuevo from './Pago-list-nuevo'
import TableHeaderNuevo from './Table-Header-Nuevo'

import Importe from './Importe'
import FiltroFecha1 from './FiltroFecha1'
import ConceptoList from './Concepto-list'
import NumeroRecibo from './NumeroRecibo'
import '../App2.css';
import PropTypes from 'prop-types';

import Buscar from './Buscar';
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
      filtroNumeros: [],
      alumno: ''
    }
    this.conceptos = []
    this.alumno = ''
    this.importe = 0;
    this.BuscarNombre = this.BuscarNombre.bind(this);
    this.FiltrarNumeros = this.FiltrarNumeros.bind(this);
    this.SeleccionFechaDel = this.SeleccionFechaDel.bind(this);
    this.SeleccionFechaAl = this.SeleccionFechaAl.bind(this);
    this.Filtrar = this.Filtrar.bind(this);
    this.SeleccionConceptos = this.SeleccionConceptos.bind(this);
    this.Regresar = this.Regresar.bind(this);
    this.select = [];
    this.enviar=this.enviar.bind(this);
 
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
                <div className="row center-xs-4 block">
                  <h4 className="centrar margen_top espacio">Conceptos</h4>
                  <div className="scroll center-xs ">
                    <form action="#"><ConceptoList listado={this.state.conceptos} /></form>
                  </div>
                </div>
                <div className="centrar col-xs-5">
                  <h4 className="centrar margen_top">Recibo</h4>
                    <NumeroRecibo Numeros={this.FiltrarNumeros} />
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
          <div className="row center-xs centrar">
            <div className="center-xs-12 margin_top">
                <PagoListNuevo  funcion={this.Funcion} listado={this.state.pagocero}/>
            </div>
          </div>
          <div>
            <div>
              <div className="SplitPane row margin_top">
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
    swal("Actualizaciones!","","success");
    /*
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
  */
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
    alert("Filtros")


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
/*
  this.setState({
      pagocero: listado3,
      pagos: pagos
  },
    );*/
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
   
    console.log(checkbox_seleccionados);
   
    return checkbox_seleccionados;

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

   
      var listado1 =[];
    //antiguo link 
    //https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-client/updaterecaudaciones/listar/
    fetch('https://modulo-alumno-jdbc.herokuapp.com/recaudaciones/alumno/concepto/leer/restringido/'+nombre+'/'+apellido)
      .then((response) => {
        return response.json()
      })
      .then((pagos) => {
        //dgdg
      
      console.log("Listado de pagos recibidos");
      console.log(pagos);

      var listado1 =[];
      var opciones  = [];
      for (let i = 0; i< pagos.length; i++) {
        var listadoRec = { 
          idRec : 0,
          idAlum:0,
          apeNom:'',
          concepto:'',
          numero:'',
          nombre:'',
          moneda:'',
          importe:0,
          fecha:'',
          idPrograma:0,
          codigos:[],
          
        }
        listadoRec.idRec = pagos[i].idRec;
        listadoRec.idAlum = pagos[i].idAlum;
        listadoRec.apeNom= pagos[i].apeNom;
        listadoRec.concepto= pagos[i].concepto;
        listadoRec.numero = pagos[i].numero;
        listadoRec.nombre= pagos[i].nombre;
        listadoRec.moneda = pagos[i].moneda;
        listadoRec.importe = pagos[i].importe;
        listadoRec.fecha= pagos[i].fecha;
        listadoRec.idPrograma = pagos[i].idPrograma;
        listado1.push(listadoRec);
      }
     
  console.log("listado 1");
  console.log(listado1);
  
    //link anterior
    //http://modulo-alumno-jdbc.herokuapp.com/alumnoprograma/leer/
      for (let i = 0; i< listado1.length; i++) {
            var nombrefiltro = listado1[i].apeNom;
            var separador1 = " "; // un espacio en blanco
            var arregloDeSubCadenas1 = nombrefiltro.split(separador1);
            console.log("arreglo de subcadenas para alumno programa");
            var nombrenuevo1 = arregloDeSubCadenas1.join(" & ");
            console.log(nombrenuevo1);
            //ANTERIOR LINK:https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/alumnoprograma/leer/
            
            
            fetch('https://modulo-alumno-jdbc.herokuapp.com/alumno/alumnoprograma/programa/leer/restringido/'+nombrenuevo1)
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
                var label1 = alumnoprograma[j].codAlumno+"-"+alumnoprograma[j].apeNom+"/"+alumnoprograma[j].siglaPrograma;
                var option1 = {value: value1, label:label1};
                listado1[i].codigos.push(option1);
             
            
            }
            console.log("programa leido");
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
      }
        );
        console.log("listado de programa y codigo opciones despues de copiar el filtro");
        console.log(listado1);
    }
    )
    .catch(error => {
        // si hay algún error lo mostramos en consola
        console.error(error)
    });
  
    fetch('https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/concepto/leer/'+nombre+'/'+apellido)
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
FiltrarNumeros = (listaNumeros) => {
    console.log("Listado de numeros recibidos:")
    console.log(listaNumeros);
    this.setState({
      filtroNumeros: listaNumeros
     }) 
  }
}
export default AppNueva;
