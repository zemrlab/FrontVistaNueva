import React from 'react'

class AlumnoAPRow extends React.Component {
 

  render() {
    return(
    <tr>
      <td className="td">{this.props.alumnoAP.id_alumno}</td>
	  <td className="td">{this.props.alumnoAP.cod_alumno}</td>	
      <td className="td">{this.props.alumnoAP.id_programa}</td>
	  </tr>
    )
  }
}
//<td className="td">{this.props.pago.idRec}</td>
//<td className="td">{this.props.pago.alumno.idAlum}</td>
export default AlumnoAPRow;