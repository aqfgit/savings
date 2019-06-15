import React from "react";
import Input from "./Input";
import Button from "./Button";

class Spendings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameValue: "",
      categoryValue: "",
      priceValue: 0,
      expenses: [],
      idCounter: 0,
      priceInputIsValid: false,
    };

    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleCategoryInputChange = this.handleCategoryInputChange.bind(this);
    this.handlePriceInputChange = this.handlePriceInputChange.bind(this);
    this.addExpense = this.addExpense.bind(this);

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
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
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
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  addExpense(name, category, value) {
    const price = parseInt(value);
    if (isNaN(price)) {
      return;
    }
    const expenses = this.state.expenses.slice();

    const id = this.state.idCounter;
    this.setState({
      id,
      expenses: expenses.concat({ name, category, price, id }),
      idCounter: id + 1,
      priceValue: '',
      priceInputIsValid: false,
    });
    this.props.substractFromBudget(price);
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
    const isInputValid = !isNaN(intValue)
    this.setState({
      priceValue: value,
      priceInputIsValid: isInputValid
    });
  }

  render() {
    const history = this.state.expenses;
    const historyList = history.map(item => {
      return (
        <li key={item.id}>
          <span>{item.name} </span>
          <span>{item.price}$ </span>
          <span>{item.category}</span>
        </li>
      );
    });

    const inputBorder = {
      border: (this.state.priceInputIsValid) ? null : '1px solid red',
    };

    return (
      <>
        <h2>Spendings</h2>
        <div>
          <Input
            inputValue={this.state.nameValue}
            onChange={this.handleNameInputChange}
            label="Name"
            dataType="text"
          />
        </div>
        <div>
          <Input
            inputValue={this.state.categoryValue}
            onChange={this.handleCategoryInputChange}
            label="Category"
            dataType="text"
          />
        </div>
        <div>
          <Input
            inputValue={this.state.priceValue}
            onChange={this.handlePriceInputChange}
            label="Price"
            dataType="number"
            style={inputBorder}
          />
        </div>
        <Button
          onClick={() =>
            this.addExpense(
              this.state.nameValue,
              this.state.categoryValue,
              this.state.priceValue
            )
          }
          name="Add an expense"
        />

        <ul>{historyList}</ul>
      </>
    );
  }
}

export default Spendings;
