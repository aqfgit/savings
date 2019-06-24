import React from "react";
import Incomes from "../pages/incomes/Incomes";
import Spendings from "../pages/spendings/Spendings";
import Debts from "../pages/debts/Debts";
import Budgets from "../pages/budgets/Budgets";
import PageNotfound from "../pages/404/PageNotFound";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import { getLocalStorageItem } from "../utils/localStorage";
import {CategoriesProvider} from "./CategoriesContext";

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
    const intValue = parseInt(value);
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
                <CategoriesProvider>
                  <Spendings
                    substractFromBudget={this.substractFromBudget}
                    addToBudget={this.addToBudget}
                  />
                </CategoriesProvider>
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
                <CategoriesProvider>
                  <Budgets  />
                </CategoriesProvider>
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
