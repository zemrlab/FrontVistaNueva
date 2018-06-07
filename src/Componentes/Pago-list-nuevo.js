import React from 'react'
import PagoRowNuevo from './Pago-row-nuevo'
import TableHeaderNuevo from './Table-Header-Nuevo'

class PagoListNuevo extends React.Component {

  render() {
    if(this.props.listado.length >0){
      return (
        <table className="table">
        <TableHeaderNuevo/>
        <tbody>
          {
            this.props.listado.map((pago) => {
              return <PagoRowNuevo Funciones={this.props.funcion} key={pago.idRec} 
                                  pago={ pago} />
            })
          }
        </tbody>
        </table>
    )
    }else{
      return <div className="mensaje centrar">No se encontraron datos</div>
    
  }
}
}

export default PagoListNuevo