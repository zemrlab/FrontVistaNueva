import React from 'react'
import PagoRowNuevo2 from './Pago-row-nuevo2'
import TableHeaderNuevo2 from './Table-Header-Nuevo2'

class PagoListNuevo2 extends React.Component {

  render() {
    if(this.props.listado.length >0){
      return (
        <table className="table">
        <TableHeaderNuevo2/>
        <tbody>
          {
            this.props.listado.map((pago) => {
              return <PagoRowNuevo2 Funciones={this.props.funcion} key={pago.toString()} 
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

export default PagoListNuevo2