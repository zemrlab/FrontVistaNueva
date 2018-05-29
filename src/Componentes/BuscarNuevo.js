import React from 'react'

class BuscarNuevo extends React.Component {
  addNewFiltro(e) {
    e.preventDefault();
    var nombres = this.nombre.value.toUpperCase();
    var apellidos = this.apellidos.value;
    if(!nombres){
      alert("ingrese un nombre para buscar");
    }else{
      var busqueda = {nombres: nombres, apellidos :apellidos}
      this.props.Busqueda( busqueda);
    }
    
}  
 
  render() {
    return(
      <form onSubmit={(e) => this.addNewFiltro(e)}>
         <div className="SplitPane row">
            <div className="col-xs-4 margen_top">
            <input ref={ ( input ) => this.nombre = input } type="text" placeholder="Nombres" /> 
            <input ref={ ( input ) => this.apellidos= input } type="text" placeholder="Apellidos" />
            </div>
            <div className="col-xs-2 margen2">
              <button  className="waves-effect waves-light btn-large center"type="submit">Buscar<i className="large material-icons left">search</i></button>
            </div>
         </div>
        
        
        
      </form>
    )
  }
}

export default BuscarNuevo