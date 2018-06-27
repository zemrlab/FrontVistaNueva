import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class SelectNuevo2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      SelectedOption: ''
    }
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
    this.setState({ SelectedOption:''
      });
  }

  

 /*  componentDidUpdate(){
    this.setState({
      SelectedOption:''
    });
  } */




  render() {
  
    return (
      <span className="opcion2" id={this.state.SelectedOption.value}>
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