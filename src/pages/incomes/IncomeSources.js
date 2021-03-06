import React from "react";
import PropTypes from "prop-types";
import {
  getLocalStorageItem,
  getDateFromLocalStorage,
  addDateToLocalStorage,
} from "../../utils/localStorage";
import { numberValueIsValid, formValid } from "../../utils/inputValidation";
import Select from "../../components/Select";
import {
  updateStateWithLocalStorage as utils_updateStateWithLocalStorage,
  saveStateToLocalStorage as utils_saveStateToLocalStorage,
} from "../../utils/localStorage";

const STATE_ITEMS_TO_SAVE_IN_LOCAL_STORAGE = ["incomes", "idCounter"];

class IncomeSources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incomes: getLocalStorageItem("incomes") || [],
      idCounter: 0,
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
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.addIncome = this.addIncome.bind(this);
  }

  incomesAccountForTimeOffline() {
    const lastTime = getDateFromLocalStorage("lastIncomeUpadte") || new Date();
    const timeDiff = Math.round((new Date() - lastTime) / 1000) || 1;

    this.state.incomes.forEach((item) => {
      this.props.addToBudget(timeDiff * item.value, item.account);

      const incomes = this.state.incomes.slice();
      const currentIncome = incomes.find((income) => income.name === item.name);
      const interval = setInterval(() => {
        this.props.addToBudget(item.value, item.account);
        addDateToLocalStorage("lastIncomeUpadte", new Date());
      }, item.frequency);

      currentIncome.interval = interval;
      this.setState(() => ({
        incomes: incomes,
      }));
    });
  }

  componentDidMount() {
    this.updateStateWithLocalStorage();
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

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

    this.incomesAccountForTimeOffline();
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    addDateToLocalStorage("lastIncomeUpadte", new Date());
    this.state.incomes.forEach((item) => {
      clearInterval(item.interval);
    });

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

  addIncome() {
    const value = this.state.fieldsValues.value;
    const intValue = parseInt(value);

    if (!formValid(this.state)) {
      return;
    }
    const account = this.state.fieldsValues.account;
    const interval = setInterval(() => {
      this.props.addToBudget(value, account);
      addDateToLocalStorage("lastIncomeUpadte", new Date());
    }, 1000);

    const id = this.state.idCounter;
    let fieldsValid = { ...this.state.fieldsValid };
    let fieldsValues = { ...this.state.fieldsValues };
    (fieldsValues.value = ""),
      (fieldsValues.name = ""),
      (fieldsValid.value = false);
    fieldsValid.name = false;

    this.setState((prevState) => ({
      incomes: prevState.incomes.concat({
        id,
        name: this.state.fieldsValues.name,
        account: this.state.fieldsValues.account,
        value: intValue,
        frequency: 1000,
        timeUnit: "second",
        interval: interval,
      }),
      idCounter: id + 1,
      fieldsValues,
      fieldsValid,
    }));
  }

  deleteIncome(id) {
    const incomes = this.state.incomes.slice();
    incomes.forEach((item) => {
      if (item.id === id) {
        clearInterval(item.interval);
        return;
      }
    });

    const updatedIncomes = incomes.filter((item) => item.id !== id);
    this.setState({
      incomes: updatedIncomes,
    });
  }

  render() {
    const incomes = this.state.incomes.slice();
    const incomesList = incomes.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.name} </td>
          <td>
            {item.value} / {item.timeUnit}{" "}
          </td>
          <td>
            <button onClick={() => this.deleteIncome(item.id)}>delete</button>
          </td>
        </tr>
      );
    });

    const valueInputBorder = {
      border: this.state.fieldsValid.value ? null : "1px solid red",
    };

    const nameInputBorder = {
      border: this.state.fieldsValid.name ? null : "1px solid red",
    };

    return (
      <>
        <h3>Income sources</h3>
        <label htmlFor="incomesName">Name:</label>
        <input
          value={this.state.fieldsValues.name}
          onChange={this.handleInputChange}
          type="text"
          style={nameInputBorder}
          id="incomesName"
          name="name"
        />
        <label htmlFor="incomesValue">Ammount:</label>
        <input
          value={this.state.fieldsValues.value}
          onChange={this.handleInputChange}
          type="number"
          style={valueInputBorder}
          id="incomesValue"
          name="value"
        />
        <Select
          value={this.state.fieldsValues.account}
          handleInputChange={this.handleInputChange}
          name="account"
          id="incomesAccount"
          label="Accounts:"
          array={this.props.accounts}
        />
        <button onClick={this.addIncome}>Add income</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Money</th>
            </tr>
          </thead>
          <tbody>{incomesList}</tbody>
        </table>
      </>
    );
  }
}

IncomeSources.propTypes = {
  addToBudget: PropTypes.func.isRequired,
  accounts: PropTypes.array.isRequired,
};

export default IncomeSources;
