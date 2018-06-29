import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class SelectNuevo2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      SelectedOption: '',
      lista_final:[]
    }
  }

  mostrarNombre=()=>{
    console.log(this.props.nombre)
    var listado1=[];
    fetch('https://modulo-alumno-jdbc.herokuapp.com/alumno/alumnoprograma/programa/listar/restringido/'+this.props.nombre)
          .then((response) => {
          return response.json()
          })
          .then((programa) => {
            

          
              
              var alumnoprograma = programa;
              var listadoOpcionesCodigos = [];
              var listadoOpcionesProgramas = [];
              
               
               for(let j = 0; j< alumnoprograma.length; j++){       
      
                  var value1 = j;
                  var label1 = alumnoprograma[j].codAlumno+"-"+alumnoprograma[j].apeNom+"/"+ alumnoprograma[j].idPrograma+"-"+alumnoprograma[j].siglaPrograma;
                  
                  var option1 = {value: value1, label:label1};
                  listado1.push(option1);
              }
              this.setState({
                lista_final:listado1
              });
              console.log(listado1);
           // }
          })
          .catch(error => {
          console.error(error)
          });
  }


  handleChange = (selectedOption) => {
    if(selectedOption != null){
      this.setState({ SelectedOption: selectedOption
    
    });
    }else{
      this.setState({ SelectedOption:''
      });
    } 
  }

  componentWillReceiveProps(){
    this.setState({ SelectedOption:'',
                    lista_final:[]
      });
  }
 /*  componentDidUpdate(){
    this.setState({
      SelectedOption:''
    });
  } */
  render() {
  
    return (
      <span className="opcion2" id={this.state.SelectedOption.value}/*  onClick={this.mostrarNombre} */>
      <Select    
        class="seleccionable"
        name="form-field-name"
        value={this.state.SelectedOption}
        onChange={this.handleChange}
        options={this.props.listado}
      ></Select>
      </span>
    );
  }
}

export default SelectNuevo2;


/*options={this.state.lista_final}*/