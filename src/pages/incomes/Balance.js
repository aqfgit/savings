import React from "react";
import PropTypes from "prop-types";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  textValueIsValid,
  numberValueIsValid,
} from "../../utils/inputValidation";

class Balance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      balanceInputValue: "",
      accountInputValue: "",
      accountInputIsValid: false,
      balanceInputIsValid: false,
    };

    this.handleBalanceInputChange = this.handleBalanceInputChange.bind(this);
    this.handleAccountsInputChange = this.handleAccountsInputChange.bind(this);
    this.handleAddToBudget = this.handleAddToBudget.bind(this);
  }

  componentDidMount() {
    const accounts = this.props.accounts;
    if (accounts) {
      this.setState({
        accountInputValue: accounts[0].name,
        accountInputIsValid: true,
      });
    }
  }

  handleBalanceInputChange(value) {
    const isInputValid = numberValueIsValid(value);
    this.setState({
      balanceInputValue: value,
      balanceInputIsValid: isInputValid,
    });
  }

  handleAccountsInputChange(e) {
    const isInputValid = textValueIsValid(e.target.value);
    this.setState({
      accountInputValue: e.target.value,
      accountInputIsValid: isInputValid,
    });
  }

  handleAddToBudget() {
    console.log(this.state.accountInputValue);
    this.props.addToBudget(
      this.state.balanceInputValue,
      this.state.accountInputValue
    );
    this.setState({
      balanceInputValue: "",
      balanceInputIsValid: false,
    });
  }

  render() {
    const inputBorder = {
      border: this.state.balanceInputIsValid ? null : "1px solid red",
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
        <select
          onChange={this.handleAccountsInputChange}
          onBlur={this.handleAccountsInputChange}
          value={this.state.accountInputValue}
        >
          {this.props.accounts.map((account) => (
            <option key={account.name} value={account.name}>
              {account.name}
            </option>
          ))}
        </select>
        <Button onClick={this.handleAddToBudget} name="Add to budget" />
        <p>My Balance: {this.props.balance}$</p>
        <p>Accounts: </p>
        <ul>
          {this.props.accounts.map((account) => {
            return (
              <li key={account.name}>
                {account.name} {account.balance}
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  addToBudget: PropTypes.func.isRequired,
};

export default Balance;
