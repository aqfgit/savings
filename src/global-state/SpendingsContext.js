import React from "react";
import {
  updateStateWithLocalStorage as utils_updateStateWithLocalStorage,
  saveStateToLocalStorage as utils_saveStateToLocalStorage,
} from "../utils/localStorage";

const SpendingsContext = React.createContext();

const STATE_ITEMS_TO_SAVE_IN_LOCAL_STORAGE = ["expenses", "idCounter"];

class SpendingsProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: [],
      idCounter: 0,
    };

    this.addExpense = this.addExpense.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
  }

  componentDidMount() {
    this.updateStateWithLocalStorage();

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

  addExpense({ name, category, account, price, quantity }) {
    const expenses = this.state.expenses.slice();
    const id = this.state.idCounter;
    const date = new Date().toUTCString();

    this.setState({
      id,
      expenses: expenses.concat({
        name,
        category,
        account,
        price,
        quantity,
        id,
        date,
      }),
      idCounter: id + 1,
    });
    this.props.substractFromBudget(price * quantity, account);
  }

  deleteExpense(id, cashback, quantity, account) {
    const expenses = this.state.expenses.slice();
    const updatedExpenses = expenses.filter((item) => item.id !== id);
    this.setState({
      expenses: updatedExpenses,
    });
    this.props.addToBudget(cashback * quantity, account);
  }

  render() {
    return (
      <SpendingsContext.Provider
        value={{
          state: this.state,
          addExpense: this.addExpense,
          deleteExpense: this.deleteExpense,
        }}
      >
        {this.props.children}
      </SpendingsContext.Provider>
    );
  }
}

export { SpendingsContext, SpendingsProvider };
