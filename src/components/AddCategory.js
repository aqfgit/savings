import React from "react";
import PropTypes from 'prop-types';
import Input from "./Input";
import Button from "./Button";
import Income from './Income';
import { textValueIsValid } from '../utils/inputValidation';


class AddCategory extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      inputValue: '',
      inputIsValid: false,
    };


    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
  }

  handleInputChange(value) {
    const isInputValid = textValueIsValid(value);
    this.setState({
      inputValue: value,
      inputIsValid: isInputValid,
    });
  }

  handleAddCategory() {
    if (this.state.inputIsValid) {
        this.props.addCategory(this.state.inputValue);
        console.log(1)
    }
  }


  render() {
    
    const border = {
      border: (this.state.inputIsValid) ? null : '1px solid red',
    };
    return (
      <>
        <span>
            Add category
            <Button onClick={()=> this.setState(prevState => ({isOpen: !prevState.isOpen}))} name={this.state.isOpen ? '-' : '+'} />
        </span>
        {
            this.state.isOpen && (
                <div>
                    <Input
                    inputValue={this.state.inputValue}
                    onChange={this.handleInputChange}
                    dataType="text"
                    style={border}
                    />
                    <Button onClick={this.handleAddCategory} name="Add category" />
                    <p>.</p>
                </div>)
        }
        </> 
    );
  }
}

AddCategory.propTypes = {
  addCategory: PropTypes.func.isRequired,
};

export default AddCategory;
