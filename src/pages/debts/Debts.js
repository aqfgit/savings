import React from "react";
import PropTypes from "prop-types";
import DebtItem from "./DebtItem";
import { numberValueIsValid } from "../../utils/inputValidation";
import Select from "../../components/Select";
import {
  updateStateWithLocalStorage as utils_updateStateWithLocalStorage,
  saveStateToLocalStorage as utils_saveStateToLocalStorage,
} from "../../utils/localStorage";

const STATE_ITEMS_TO_SAVE_IN_LOCAL_STORAGE = ["debts", "idCounter"];

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
    let fieldsValid = { ...this.state.fieldsValid };
    let fieldsValues = { ...this.state.fieldsValues };
    if (accounts) {
      fieldsValues.account = accounts[0].name;
      fieldsValid.account = true;
      this.setState({
        fieldsValues,
        fieldsValid,
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
    utils_updateStateWithLocalStorage(
      this.setState.bind(this),
      STATE_ITEMS_TO_SAVE_IN_LOCAL_STORAGE
    );
  }

  saveStateToLocalStorage() {
    utils_saveStateToLocalStorage(
      this.state,
      STATE_ITEMS_TO_SAVE_IN_LOCAL_STORAGE
    );
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
        account: this.state.fieldsValues.account,
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
    this.props.substractFromBudget(money - rest, debts[index].account);

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
            account={item.account}
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
          <Select
            value={this.state.fieldsValues.account}
            handleInputChange={this.handleInputChange}
            name="account"
            id="debtsAccounts"
            label="Accounts:"
            array={this.props.accounts}
          />
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
