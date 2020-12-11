import React from "react";
import Incomes from "../pages/incomes/Incomes";
import Spendings from "../pages/spendings/Spendings";
import Debts from "../pages/debts/Debts";
import Budgets from "../pages/budgets/Budgets";
import PageNotfound from "../pages/404/PageNotFound";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import { CategoriesProvider } from "./CategoriesContext";
import { SpendingsProvider } from "./SpendingsContext";

class BalanceController extends React.Component {
  constructor(props) {
    super(props);
    /*[
      { name: "wallet", balance: 0 },
      { name: "card", balance: 0 },
    ],*/
    this.state = {
      balance: 0,
      accounts: [],
    };

    this.addToBudget = this.addToBudget.bind(this);
    this.substractFromBudget = this.substractFromBudget.bind(this);
    this.addAccount = this.addAccount.bind(this);
    this.removeAccount = this.removeAccount.bind(this);
    this.isNameDuplicate = this.isNameDuplicate.bind(this);
  }

  componentWillMount() {
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
    const stateToUpdate = ["balance", "accounts"];
    for (let key of stateToUpdate) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        let value = localStorage.getItem(key);

        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  saveStateToLocalStorage() {
    const stateToUpdate = ["balance", "accounts"];
    for (let key of stateToUpdate) {
      console.log(this.state.balance);
      console.log(key);

      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  addAccount(name) {
    const newAccount = { name, balance: 0 };
    this.setState((prevState) => {
      return {
        accounts: prevState.accounts.concat(newAccount),
      };
    });
  }

  removeAccount(name) {
    const accounts = this.state.accounts.slice();
    const updatedAccounts = accounts.filter((acc) => acc.name !== name);
    this.setState(
      () => ({
        accounts: updatedAccounts,
      })
      // () => {
      //   const newCategory = this.changeCategory() || "";
      //   this.handleCategoryInputChange(newCategory);
      // }
    );
  }

  isNameDuplicate(name) {
    let isDuplicate = false;
    this.state.accounts.forEach((item) => {
      if (item.name === name) {
        isDuplicate = true;
        return;
      }
    });

    return isDuplicate;
  }

  addToBudget(value, account) {
    let intValue = parseInt(value);
    if (Number.isNaN(intValue)) {
      intValue = 0;
    }
    const accounts = this.state.accounts.map((item) => {
      if (item.name.toLowerCase() === account.toLowerCase()) {
        return { name: item.name, balance: item.balance + intValue };
      }
      return item;
    });
    this.setState((prevState) => ({
      balance: prevState.balance + intValue,
      accounts,
    }));
  }

  substractFromBudget(price, account) {
    const accounts = this.state.accounts.map((item) => {
      if (item.name === account) {
        return { name: item.name, balance: item.balance - price };
      }
      return item;
    });
    this.setState((prevState) => ({
      balance: prevState.balance - price,
      accounts,
    }));
  }

  render() {
    return (
      <>
        <h1>Personal Spendings App</h1>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/incomes">Incomes</Link>
              </li>
              <li>
                <Link to="/spendings">Spendings</Link>
              </li>
              <li>
                <Link to="/debts">Debts</Link>
              </li>
              <li>
                <Link to="/budgets">Budgets</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route
              exact
              path={["/", "/incomes"]}
              render={() => (
                <Incomes
                  addToBudget={this.addToBudget}
                  balance={this.state.balance}
                  accounts={this.state.accounts}
                  addAccount={this.addAccount}
                  removeAccount={this.removeAccount}
                  isNameDuplicate={this.isNameDuplicate}
                />
              )}
            />
            <Route
              path="/spendings"
              render={() => (
                <SpendingsProvider
                  substractFromBudget={this.substractFromBudget}
                  addToBudget={this.addToBudget}
                >
                  <CategoriesProvider>
                    <Spendings
                      substractFromBudget={this.substractFromBudget}
                      accounts={this.state.accounts}
                      addToBudget={this.addToBudget}
                    />
                  </CategoriesProvider>
                </SpendingsProvider>
              )}
            />
            <Route
              path="/debts"
              render={() => (
                <Debts
                  substractFromBudget={this.substractFromBudget}
                  accounts={this.state.accounts}
                />
              )}
            />
            <Route
              path="/budgets"
              render={() => (
                <SpendingsProvider>
                  <CategoriesProvider>
                    <Budgets />
                  </CategoriesProvider>
                </SpendingsProvider>
              )}
            />
            <Route component={PageNotfound} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default BalanceController;
