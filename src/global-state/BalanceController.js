import React from "react";
import Incomes from "../pages/incomes/Incomes";
import Spendings from "../pages/spendings/Spendings";
import Debts from "../pages/debts/Debts";
import Budgets from "../pages/budgets/Budgets";
import PageNotfound from "../pages/404/PageNotFound";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import { getLocalStorageItem, setLocalStorageItem } from "../utils/localStorage";
import {CategoriesProvider} from "./CategoriesContext";
import {SpendingsProvider} from "./SpendingsContext";

class BalanceController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: getLocalStorageItem("balance") || 0
    };

    this.addToBudget = this.addToBudget.bind(this);
    this.substractFromBudget = this.substractFromBudget.bind(this);
  }

  componentDidMount() {
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

  saveStateToLocalStorage() {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  addToBudget(value) {
    let intValue = parseInt(value);
    if (Number.isNaN(intValue)) {
      intValue = 0;
    }
    this.setState(prevState => ({
      balance: prevState.balance + intValue
    }));
  }

  substractFromBudget(price) {
    this.setState(prevState => ({
      balance: prevState.balance - price
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
              path={['/', '/incomes']}
              render={() => (
                <Incomes
                  addToBudget={this.addToBudget}
                  balance={this.state.balance}
                />
              )}
            />
            <Route
              path="/spendings"
              render={() => (
                <SpendingsProvider substractFromBudget={this.substractFromBudget} addToBudget={this.addToBudget}>
                  <CategoriesProvider>
                    <Spendings
                      substractFromBudget={this.substractFromBudget}
                      addToBudget={this.addToBudget}
                    />
                  </CategoriesProvider>
                </SpendingsProvider>
              )}
            />
            <Route
              path="/debts"
              render={() => (
                <Debts substractFromBudget={this.substractFromBudget} />
              )}
            />
            <Route
              path="/budgets"
              render={() => (
                <SpendingsProvider>
                  <CategoriesProvider>
                    <Budgets  />
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
