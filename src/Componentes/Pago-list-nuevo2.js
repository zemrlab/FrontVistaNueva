import React from 'react'
import PagoRowNuevo2 from './Pago-row-nuevo2'

class PagoListNuevo2 extends React.Component {

  render() {
    if(this.props.listado.length >0){
      return (
        <tbody>
          {
            this.props.listado.map((pago) => {
              return <PagoRowNuevo2 Funciones={this.props.funcion} key={pago.idRec} 
                                  pago={ pago} />
            })
          }
        </tbody>
    )
    }else{
      return <p className="text-center">No hay registros</p>
    }
    
  }
}

export default PagoListNuevo2