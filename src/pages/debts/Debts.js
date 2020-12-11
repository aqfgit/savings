import React from "react";
import PropTypes from "prop-types";
import Input from "../../components/Input";
import Button from "../../components/Button";
import DebtItem from "./DebtItem";
import {
  numberValueIsValid,
  textValueIsValid,
} from "../../utils/inputValidation";

class Debts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      debts: [],
      inputName: "",
      inputValue: "",
      inputAccount: "",
      idCounter: 0,
      valueInputIsValid: false,
      nameInputIsValid: false,
      accountInputIsValid: false,
    };

    this.handleValueInputChange = this.handleValueInputChange.bind(this);
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleAccountInputChange = this.handleAccountInputChange.bind(this);

    this.addDebt = this.addDebt.bind(this);
    this.deleteDebt = this.deleteDebt.bind(this);
    this.payDebt = this.payDebt.bind(this);
  }

  componentDidMount() {
    this.updateStateWithLocalStorage();

    const accounts = this.props.accounts;
    if (accounts) {
      this.setState({
        inputAccount: accounts[0].name,
        accountInputIsValid: true,
      });
    }

    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    this.saveStateToLocalStorage();
  }

  updateStateWithLocalStorage() {
    const stateToUpdate = ["debts", "idCounter"];
    for (let key of stateToUpdate) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        let value = localStorage.getItem(key);

        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    const stateToUpdate = ["debts", "idCounter"];
    for (let key of stateToUpdate) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  handleValueInputChange(value) {
    const isInputValid = numberValueIsValid(value);
    this.setState({
      inputValue: value,
      valueInputIsValid: isInputValid,
    });
  }

  handleNameInputChange(name) {
    const isInputValid = textValueIsValid(name);
    this.setState({
      inputName: name,
      nameInputIsValid: isInputValid,
    });
  }

  handleAccountInputChange(e) {
    const isInputValid = textValueIsValid(e.target.value);
    this.setState({
      inputAccount: e.target.value,
      accountInputIsValid: isInputValid,
    });
  }

  addDebt() {
    const value = this.state.inputValue;
    const intValue = parseInt(value);

    if (!this.state.valueInputIsValid || !this.state.nameInputIsValid) {
      return;
    }

    const id = this.state.idCounter;

    this.setState((prevState) => ({
      debts: prevState.debts.concat({
        id,
        name: this.state.inputName,
        initialMoney: intValue,
        moneyPaid: 0,
      }),
      idCounter: id + 1,
      inputValue: "",
      inputName: "",
      valueInputIsValid: false,
      nameInputIsValid: false,
    }));
  }

  deleteDebt(id) {
    const debts = this.state.debts.slice();
    const updatedDebts = debts.filter((item) => item.id !== id);
    this.setState({
      debts: updatedDebts,
    });
  }

  payDebt(id, money) {
    const intMoney = parseInt(money);
    const debts = this.state.debts.slice();
    const index = debts.findIndex((item) => item.id === id);
    debts[index].moneyPaid += intMoney;
    const newMoneyPaid = debts[index].moneyPaid;
    const initialMoney = debts[index].initialMoney;
    const rest = newMoneyPaid <= initialMoney ? 0 : newMoneyPaid - initialMoney;
    this.props.substractFromBudget(money - rest, this.state.inputAccount);

    this.setState({
      debts,
    });
  }

  render() {
    const valueInputBorder = {
      border: this.state.valueInputIsValid ? null : "1px solid red",
    };

    const nameInputBorder = {
      border: this.state.nameInputIsValid ? null : "1px solid red",
    };

    const debts = this.state.debts;
    const debtsList = debts.map((item) => {
      return (
        <tr key={item.id}>
          <DebtItem
            id={item.id}
            name={item.name}
            initialMoney={item.initialMoney}
            moneyPaid={item.moneyPaid}
            payDebt={this.payDebt}
            deleteDebt={this.deleteDebt}
          />
        </tr>
      );
    });

    return (
      <>
        <h2>Debts</h2>
        <Input
          inputValue={this.state.inputName}
          onChange={this.handleNameInputChange}
          dataType="text"
          style={nameInputBorder}
        />
        <Input
          inputValue={this.state.inputValue}
          onChange={this.handleValueInputChange}
          dataType="number"
          style={valueInputBorder}
        />
        <div>
          <select
            value={this.state.inputAccount}
            onChange={this.handleAccountInputChange}
            onBlur={this.handleAccountInputChange}
            name="account"
          >
            {this.props.accounts.map((account) => (
              <option key={account.name} value={account.name}>
                {account.name}
              </option>
            ))}
          </select>
        </div>
        <Button onClick={this.addDebt} name="Add debt" />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Money</th>
            </tr>
          </thead>
          <tbody>{debtsList}</tbody>
        </table>
      </>
    );
  }
}

Debts.propTypes = {
  substractFromBudget: PropTypes.func.isRequired,
};

export default Debts;
