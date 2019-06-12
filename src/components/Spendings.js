import React from "react";
import Input from "./Input";
import Button from "./Button";
import { getLocalStorageItem, setLocalStorageItem} from '../utils/localStorage';

class Spendings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameValue: "",
      categoryValue: "",
      priceValue: 0,
      expenses: [],
    };

    this.idCounter = 0;

    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleCategoryInputChange = this.handleCategoryInputChange.bind(this);
    this.handlePriceInputChange = this.handlePriceInputChange.bind(this);
    this.addExpense = this.addExpense.bind(this);

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
    this.setState({
      priceValue: intValue
    });
  }

  render() {
    const history = getLocalStorageItem('expenses') || [];
    const historyList = history.map(item => {
      return (
        <li key={item.id}>
          <span>{item.name} </span>
          <span>{item.price}$ </span>
          <span>{item.category}</span>
        </li>
      );
    });
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
