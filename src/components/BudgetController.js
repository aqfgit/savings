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
      inputValue: "",
      nameValue: "",
      categoryValue: "",
      priceValue: 0,
      expenses: [],
      incomes: [
        {
          name: 'Work',
          value: 1000,
          frequency: 1000,
        },
      ],
    };

    this.idCounter = 0;

    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleCategoryInputChange = this.handleCategoryInputChange.bind(this);
    this.handlePriceInputChange = this.handlePriceInputChange.bind(this);
    this.addExpense = this.addExpense.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.addToBudget = this.addToBudget.bind(this);
    this.substractFromBudget = this.substractFromBudget.bind(this);
  }

  

  componentDidMount() {
    const lastTime = getDateFromLocalStorage('lastTime') || new Date();
    const timeDiff = Math.round((new Date() - lastTime) / 1000) || 1;
    this.state.incomes.forEach((item) => {
      this.addToBudget(item.value * timeDiff);
      console.log(timeDiff)

      const incomes = this.state.incomes.slice();
      const currentIncome = incomes.find((income) => income.name === item.name);
      const interval = setInterval(() => {
        this.addToBudget(item.value);
        addDateToLocalStorage('lastTime', new Date());
      }, item.frequency);

      currentIncome.interval = interval;
      this.setState(prevState => ({
        incomes: incomes,
      }));
    });
  }

 
  handleInputChange(value) {
    const intValue = parseInt(value);
    this.setState({
      inputValue: intValue
    });
  }

  addToBudget(value=null) {

    const money = value ? value : this.state.inputValue;

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

  addExpense(name, category, price) {
    const expenses = this.state.expenses.slice();
    const id = this.idCounter;
    this.idCounter += 1;
    this.setState({
      expenses: expenses.concat({ name, category, price, id })
    },
    setLocalStorageItem('expenses', expenses.concat({ name, category, price, id })),
    );
    this.substractFromBudget(price);
  }

  handleNameInputChange(value) {
    this.setState({
      nameValue: value
    });
  }

  handleCategoryInputChange(value) {
    this.setState({
      categoryValue: value
    });
  }

  handlePriceInputChange(value) {
    const intValue = parseInt(value);
    this.setState({
      priceValue: intValue
    });
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
                  inputValue={this.setState.inputValue}
                  onChange={this.handleInputChange}
                  addToBudget={this.addToBudget}
                  balance={this.state.balance}
                />
              )}
            />
            <Route
              path="/budget"
              render={() => (
                <Budget
                  inputValue={this.setState.inputValue}
                  onChange={this.handleInputChange}
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
                  nameValue={this.state.nameValue}
                  categoryValue={this.state.categoryValue}
                  priceValue={this.state.priceValue}
                  handleNameInputChange={this.handleNameInputChange}
                  handlePriceInputChange={this.handlePriceInputChange}
                  handleCategoryInputChange={this.handleCategoryInputChange}
                  expenses={this.state.expenses}
                  addExpense={this.addExpense}
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
