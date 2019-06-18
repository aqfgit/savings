import React from "react";
import PropTypes from 'prop-types';
import Input from "./Input";
import Button from "./Button";
import Income from './Income';
import { numberValueIsValid } from '../utils/inputValidation';


class Budget extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      balanceInputValue: "",
      balanceInputIsValid: false,
    };


    this.handleBalanceInputChange = this.handleBalanceInputChange.bind(this);
    this.handleAddToBudget = this.handleAddToBudget.bind(this);
  }

  handleBalanceInputChange(value) {
    const isInputValid = numberValueIsValid(value)
    this.setState({
      balanceInputValue: value,
      balanceInputIsValid: isInputValid,
    });
  }

  handleAddToBudget() {
    if (!this.state.balanceInputIsValid) {
      return;
    }
    this.props.addToBudget(this.state.balanceInputValue);
    this.setState({
      balanceInputValue: '',
      balanceInputIsValid: false,
    });
  }

  render() {
    
    const inputBorder = {
      border: (this.state.balanceInputIsValid) ? null : '1px solid red',
    };
    return (
      <>
        <h2>My budget</h2>
        <Input
          inputValue={this.state.balanceInputValue}
          onChange={this.handleBalanceInputChange}
          dataType="number"
          style={inputBorder}
        />
        <Button onClick={this.handleAddToBudget} name="Add to budget" />
        <p>Balance: {this.props.balance}$</p>

        <Income addToBudget={this.props.addToBudget}/>
        </> 
        
    );
  }
}

Budget.propTypes = {
  balance: PropTypes.number.isRequired,
  addToBudget: PropTypes.func.isRequired,
};

export default Budget;
