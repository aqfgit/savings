import React from "react";
import PropTypes from "prop-types";
import { numberValueIsValid } from "../../utils/inputValidation";
import Select from "../../components/Select";

class Balance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldsValues: {
        balance: "",
        account: "",
      },
      fieldsValid: {
        balance: false,
        account: false,
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddToBudget = this.handleAddToBudget.bind(this);
  }

  componentDidMount() {
    const accounts = this.props.accounts;
    let fieldsValid = { ...this.state.fieldsValid };
    let fieldsValues = { ...this.state.fieldsValues };

    if (accounts.length) {
      fieldsValues.account = accounts[0].name;
      fieldsValid.account = true;
      this.setState({
        fieldsValues,
        fieldsValid,
      });
    }
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    let fieldsValid = { ...this.state.fieldsValid };
    let fieldsValues = { ...this.state.fieldsValues };
    switch (name) {
      case "account":
        fieldsValid.account = value.length > 0 && numberValueIsValid(value);
        break;
      case "balance":
        fieldsValid.balance = parseInt(value) > 0;
        break;
      default:
        break;
    }

    fieldsValues[name] = value;
    this.setState({
      fieldsValid,
      fieldsValues,
    });
  }

  handleAddToBudget() {
    let fieldsValid = { ...this.state.fieldsValid };
    let fieldsValues = { ...this.state.fieldsValues };

    this.props.addToBudget(
      this.state.fieldsValues.balance,
      this.state.fieldsValues.account
    );

    fieldsValues.balance = "";
    fieldsValid.balance = false;
    this.setState({
      fieldsValues,
      fieldsValid,
    });
  }

  render() {
    const inputBorder = {
      border: this.state.fieldsValid.balance ? null : "1px solid red",
    };
    return (
      <>
        <h3>Balance</h3>
        <label htmlFor="balance">
          Add to {this.state.fieldsValues.account}
        </label>
        <input
          value={this.state.fieldsValues.balance}
          onChange={this.handleInputChange}
          type="number"
          name="balance"
          style={inputBorder}
          id="balance"
        />
        <Select
          value={this.state.fieldsValues.account}
          handleInputChange={this.handleInputChange}
          name="account"
          id="balanceAccount"
          label="Accounts:"
          array={this.props.accounts}
        />
        <button onClick={this.handleAddToBudget}>Add to budget</button>
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
