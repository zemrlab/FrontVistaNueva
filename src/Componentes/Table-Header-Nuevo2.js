import React from 'react'

class TableHeaderNuevo2 extends React.Component {

  render() {
    return(
    <thead>
			<tr>      
                <th className="th">NOMBRE</th>
                <th className="th">FECHA</th>
                <th className="th">MONEDA</th>
                <th className="th">IMPORTE</th>
                <th className="th"> CODIGO  /  PROGRAMA  A ESCOGER </th>
       </tr>
	</thead>
    )
  }
}

export default TableHeaderNuevo2