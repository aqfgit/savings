import React from "react";
import Input from "./Input";
import Button from "./Button";
import Income from './Income';

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
    const intValue = parseInt(value);
    const isInputValid = !isNaN(intValue)
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
    console.log(inputBorder)
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

export default Budget;
