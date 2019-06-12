import React from "react";
import Budget from "./Budget";
import Spendings from "./Spendings";
import PageNotfound from "./PageNotFound";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import { getLocalStorageItem, setLocalStorageItem, addDateToLocalStorage, getDateFromLocalStorage} from '../utils/localStorage';

class BudgetController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: getLocalStorageItem('balance') || 0,
      balanceInputValue: "",
    };


    this.handleBalanceInputChange = this.handleBalanceInputChange.bind(this);
    this.addToBudget = this.addToBudget.bind(this);
    this.substractFromBudget = this.substractFromBudget.bind(this);
  }



  handleBalanceInputChange(value) {
    const intValue = parseInt(value);
    this.setState({
      balanceInputValue: intValue,
    });
  }

  addToBudget(value=null) {

    const money = value ? value : this.state.balanceInputValue;

    this.setState(prevState => ({
      balance: prevState.balance + money
    }),
    setLocalStorageItem('balance', this.state.balance + money),
    );
  }

  substractFromBudget(price) {
    this.setState(prevState => ({
      balance: prevState.balance - price
    }),
    setLocalStorageItem('balance', this.state.balance - this.state.priceValue),
    );
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
            </ul>
          </nav>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Budget
                balanceInputValue={this.state.balanceInputValue}
                handleBalanceInputChange={this.handleBalanceInputChange}
                addToBudget={this.addToBudget}
                balance={this.state.balance}
                />
              )}
            />
            <Route
              path="/budget"
              render={() => (
                <Budget
                  balanceInputValue={this.state.balanceInputValue}
                  handleBalanceInputChange={this.handleBalanceInputChange}
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
