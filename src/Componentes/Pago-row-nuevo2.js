import React from 'react';
import SelectNuevo2 from './SelectNuevo2';

class PagoRowNuevo2 extends React.Component {
  render() {
    return(
    <tr>
      <td className="td">{this.props.pago.apeNom}</td>
      <td className="td">{this.props.pago.idAlum}</td>
      <td className="td">{this.props.pago.codigo}</td>
      <td className="td">{this.props.pago.idFacultad}</td>
      <td className="td"><SelectNuevo2  listado = {this.props.pago.codigos}/></td>
	</tr>
    )
  }
}
//
//

//<td className="td">{this.props.pago.concepto}</td>
//<td className="td">{this.props.pago.facultad}</td>
//<td className="td">{this.props.pago.idRec}</td>

//<td className="td">{this.props.pago.alumno.idAlum}</td>
export default PagoRowNuevo2;