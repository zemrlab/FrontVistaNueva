import React from 'react'

class AlumnoAPRow extends React.Component {
 

  render() {
    return(
    <tr>
      <td className="td">{this.props.alumnoAP.idAlumno}</td>
	    <td className="td">{this.props.alumnoAP.codAlumno}</td>	
      <td className="td">{this.props.alumnoAP.idPrograma}</td>
	  </tr>
    )
  }
}
//<td className="td">{this.props.pago.idRec}</td>
//<td className="td">{this.props.pago.alumno.idAlum}</td>
export default AlumnoAPRow;