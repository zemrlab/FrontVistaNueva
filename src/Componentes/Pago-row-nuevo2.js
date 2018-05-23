import React from 'react';
import SelectNuevo from './SelectNuevo';
import SelectPrograma from './SelectPrograma';
import HEROES from './Data-Select';
import HEROES1 from './Data-Select1';

class PagoRowNuevo2 extends React.Component {
  
  colocar=()=>{
    var hola=document.getElementById(this.props.pago.idRec);
    console.log(hola.id);
    var holas=hola.id;
    this.props.Funciones(holas);
   /*  var selec=[];
   var check=document.getElementsByClassName("checkbox1");
    var normal=Array.from(check);
    for(let i=0; i<normal.length;i++){
      if(normal[i].checked==true){
        selec.push(normal[i].id);
      }
    } 
    console.log(selec);

     */

    

    }
  

  render() {
    return(
    <tr>
      <td className="td">{this.props.pago.idAlum.apeNom}</td>
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
export default PagoRowNuevo2;