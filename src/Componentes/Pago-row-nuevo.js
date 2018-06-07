import React from 'react';
import SelectNuevo from './SelectNuevo';

class PagoRowNuevo extends React.Component {

  render() {
    return(
    <tr>
      <td className="td">{this.props.pago.idAlum.apeNom}</td>
      <td className="td">{this.props.pago.idConcepto.concepto.substr(0,3)+'-'+this.props.pago.idConcepto.concepto.substr(3,3) }</td>
			<td className="td">{this.props.pago.numero}</td>
      <td className="td">{this.props.pago.idAlum.idFacultad.nombre}</td>
      <td className="td">{this.props.pago.fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3-$2-$1')}</td>
      <td className="td">{this.props.pago.moneda}</td>
      <td className="td">{'S/. '+this.props.pago.importe}</td>
      <td className="td"><SelectNuevo  listado = {this.props.pago.codigos}/></td>
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
export default PagoRowNuevo;