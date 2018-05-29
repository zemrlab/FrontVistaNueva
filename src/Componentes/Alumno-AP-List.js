import React from 'react'
import AlumnoAPRow from './Alumno-AP-Row'

class AlumnoAPList extends React.Component {

  render() {
    return (
        <tbody>
          {
            this.props.listado.map((alumnoAP) => {
              return <AlumnoAPRow  key={alumnoAP.toString()} 
              alumnoAP={ alumnoAP} />
            })
          }
        </tbody>
    )
  }
}

export default AlumnoAPList