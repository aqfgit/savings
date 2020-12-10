import React from "react";
import PropTypes from "prop-types";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { numberValueIsValid } from "../../utils/inputValidation";

class Balance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      balanceInputValue: "",
      balanceInputIsValid: false
    };

    this.handleBalanceInputChange = this.handleBalanceInputChange.bind(this);
    this.handleAddToBudget = this.handleAddToBudget.bind(this);
  }

  handleBalanceInputChange(value) {
    const isInputValid = numberValueIsValid(value);
    this.setState({
      balanceInputValue: value,
      balanceInputIsValid: isInputValid
    });
  }

  handleAddToBudget() {
    
    this.props.addToBudget(this.state.balanceInputValue);
    this.setState({
      balanceInputValue: "",
      balanceInputIsValid: false
    });
  }

  render() {
    const inputBorder = {
      border: this.state.balanceInputIsValid ? null : "1px solid red"
    };
    return (
      <>
        <h3>Balance</h3>
        <Input
          inputValue={this.state.balanceInputValue}
          onChange={this.handleBalanceInputChange}
          dataType="number"
          style={inputBorder}
        />
        <Button onClick={this.handleAddToBudget} name="Add to budget" />
        <p>My Balance: {this.props.balance}$</p>

      </>
    );
  }
}

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  addToBudget: PropTypes.func.isRequired
};

export default Balance;
