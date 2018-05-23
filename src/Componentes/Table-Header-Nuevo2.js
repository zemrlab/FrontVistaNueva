import React from 'react'

class TableHeaderNuevo2 extends React.Component {

  render() {
    return(
    <thead>
			<tr>      
                <th className="th">NOMBRE</th>
                <th className="th">IDALUMNO</th>
                <th className="th">CODIGO</th>
                <th className="th">FACULTAD</th>    
                <th className="th1"> CODIGO  /  PROGRAMA  A ESCOGER </th>
       </tr>
	</thead>
    )
  }
}

export default TableHeaderNuevo2