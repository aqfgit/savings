import React from "react";
import Budget from "./Budget";
import Spendings from "./Spendings";
import Debts from './Debts';
import PageNotfound from "./PageNotFound";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import { getLocalStorageItem } from '../utils/localStorage';


class BudgetController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: getLocalStorageItem('balance') || 0,
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
    const intValue= parseInt(value);
    this.setState(prevState => ({
      balance: prevState.balance + intValue,
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
                <Link to="/budget">Budget</Link>
              </li>
              <li>
                <Link to="/spendings">Spendings</Link>
              </li>
              <li>
                <Link to="/debts">Debts</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Budget
                addToBudget={this.addToBudget}
                balance={this.state.balance}
                />
              )}
            />
            <Route
              path="/budget"
              render={() => (
                <Budget
                  addToBudget={this.addToBudget}
                  balance={this.state.balance}
                />
              )}
            />
            <Route
              path="/spendings"
              render={() => (
                <Spendings
                  substractFromBudget={this.substractFromBudget}
                  addToBudget={this.addToBudget}
                />
              )}
            />
            <Route
              path="/debts"
              render={() => (
                <Debts
                substractFromBudget={this.substractFromBudget}
                />
              )}
            />
            <Route component={PageNotfound} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default BudgetController;
