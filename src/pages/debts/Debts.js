import React from "react";
import PropTypes from "prop-types";
import DebtItem from "./DebtItem";
import { numberValueIsValid } from "../../utils/inputValidation";

class Debts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      debts: [],
      fieldsValues: {
        name: "",
        value: "",
        account: "",
      },
      fieldsValid: {
        name: false,
        value: false,
        account: false,
      },

      idCounter: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);

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

  handleInputChange(e) {
    const { name, value } = e.target;
    let fieldsValid = { ...this.state.fieldsValid };
    let fieldsValues = { ...this.state.fieldsValues };
    switch (name) {
      case "name":
        fieldsValid.name = value.length > 0;
        break;
      case "value":
        fieldsValid.value = parseInt(value) > 0 && numberValueIsValid(value);
        break;
      case "account":
        fieldsValid.account = value.length > 0;
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

  addDebt() {
    let fieldsValid = { ...this.state.fieldsValid };
    let fieldsValues = { ...this.state.fieldsValues };
    const value = fieldsValues.value;
    const intValue = parseInt(value);

    if (!fieldsValid.value || !fieldsValid.name) {
      return;
    }

    const id = this.state.idCounter;

    fieldsValues.value = "";
    fieldsValues.name = "";
    fieldsValid.value = false;
    fieldsValid.name = false;

    this.setState((prevState) => ({
      debts: prevState.debts.concat({
        id,
        name: this.state.fieldsValues.name,
        initialMoney: intValue,
        moneyPaid: 0,
      }),
      idCounter: id + 1,
      fieldsValues,
      fieldsValid,
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
    this.props.substractFromBudget(
      money - rest,
      this.state.fieldsValues.account
    );

    this.setState({
      debts,
    });
  }

  render() {
    const valueInputBorder = {
      border: this.state.fieldsValid.value ? null : "1px solid red",
    };

    const nameInputBorder = {
      border: this.state.fieldsValid.name ? null : "1px solid red",
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
        <label htmlFor="nameInput">Debt name:</label>
        <input
          style={{ nameInputBorder }}
          id="nameInput"
          name="name"
          type="text"
          value={this.state.fieldsValues.name}
          onChange={this.handleInputChange}
        />
        <label htmlFor="valueInput">Owned:</label>
        <input
          style={{ valueInputBorder }}
          id="valueInput"
          name="value"
          type="number"
          value={this.state.fieldsValues.value}
          onChange={this.handleInputChange}
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
        <button onClick={this.addDebt}>Add debt</button>
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
  accounts: PropTypes.array.isRequired,
};

export default Debts;
