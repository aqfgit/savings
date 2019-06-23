import React from "react";
import PropTypes from 'prop-types';
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import AddCategory from './AddCategory';
import { textValueIsValid, numberValueIsValid } from '../utils/inputValidation';

class Spendings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameValue: "",
      categoryValue: "",
      priceValue: 0,
      quantityValue: 1,
      expenses: [],
      categories: [],
      idCounter: 0,
      priceInputIsValid: false,
      quantityInputIsValid: true,
      nameInputIsValid: false,
      categoryInputIsValid: false,
    };

    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleCategoryInputChange = this.handleCategoryInputChange.bind(this);
    this.handlePriceInputChange = this.handlePriceInputChange.bind(this);
    this.handleQuantityInputChange = this.handleQuantityInputChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
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
    const stateToUpdate = ['expenses', 'categories', 'idCounter'];
    for (let key of stateToUpdate) {
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
    const stateToUpdate = ['expenses', 'categories', 'idCounter'];
    for (let key of stateToUpdate) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  addCategory(name) {
    const isCategoriesEmpty = !this.state.categories.length;
    this.setState(prevState => ({
      categories: prevState.categories.concat(name),
    }),
    () => {
      if (isCategoriesEmpty) {
        const newCategory = this.changeCategory();
        this.handleCategoryInputChange(newCategory);
      }
    });
  }

  removeCategory(name) {
    const categories = this.state.categories.slice();
    const updatedCategories = categories.filter(cat => cat !== name);
    this.setState(prevState => ({
      categories: updatedCategories,
    }),
    () => {
      const newCategory = this.changeCategory() || '';
      this.handleCategoryInputChange(newCategory);
    });
  }

  changeCategory() {
    const categories = this.state.categories.slice();
    let newCategory = null;
    categories.forEach(item => newCategory = item);
    return newCategory;
  }

  addExpense(name, category, value, quantity) {
    if (!this.state.priceInputIsValid || !this.state.nameInputIsValid || !this.state.categoryInputIsValid) {
      return;
    }
    const price = parseInt(value);
    const expenses = this.state.expenses.slice();

    const id = this.state.idCounter;
    this.setState({
      id,
      expenses: expenses.concat({ name, category, price, quantity, id }),
      idCounter: id + 1,
      priceValue: '',
      nameValue: '',
      quantityValue: 1,
      priceInputIsValid: false,
      nameInputIsValid: false,
      quantityInputIsValid: true,
    });
    this.props.substractFromBudget(price);
  }

  deleteExpense(id, cashback) {
    const expenses = this.state.expenses.slice();
    const updatedExpenses = expenses.filter(item => item.id !== id);
    this.setState({
      expenses: updatedExpenses,
    });
    this.props.addToBudget(cashback)
  }

  handleNameInputChange(name) {
    const isInputValid = textValueIsValid(name);
    this.setState({
      nameValue: name,
      nameInputIsValid: isInputValid
    });
  }

  handleCategoryInputChange(name) {
    const isInputValid = textValueIsValid(name);
    this.setState({
      categoryValue: name,
      categoryInputIsValid: isInputValid
    });
  }

  handlePriceInputChange(value) {
    const isInputValid = numberValueIsValid(value)
    this.setState({
      priceValue: value,
      priceInputIsValid: isInputValid
    });
  }

  handleQuantityInputChange(value) {
    const isInputValid = numberValueIsValid(value)
    this.setState({
      quantityValue: value,
      quantityInputIsValid: isInputValid
    });
  }

  render() {
    const history = this.state.expenses;
    const historyList = history.map(item => {
      return (
        <li key={item.id}>
            <span>{item.name} </span>
            <span>{item.category} </span>
            <span>{item.price}$ </span>
            <span>{item.quantity} </span>
            <span><button onClick={() => this.deleteExpense(item.id, item.price)}>Delete</button></span>
          </li>
      );
    });

    const categoryOptions = this.state.categories.map(item => {
      return (
        <option key={item} value={item}>{item}</option>
      )
    })

    const priceInputBorder = {
      border: (this.state.priceInputIsValid) ? null : '1px solid red',
    };
    const quantityInputBorder = {
      border: (this.state.quantityInputIsValid) ? null : '1px solid red',
    };
    const categoryInputBorder = {
      border: (this.state.categoryInputIsValid) ? null : '1px solid red',
    };
    const nameInputBorder = {
      border: (this.state.nameInputIsValid) ? null : '1px solid red',
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
            style={nameInputBorder}
          />
        </div>
        <div>
          <Select
            inputValue={this.state.categoryValue}
            onChange={this.handleCategoryInputChange}
            label="Category"
            style={categoryInputBorder}
          >
            {categoryOptions}
          </Select>
          <AddCategory addCategory={this.addCategory} categories={this.state.categories} removeCategory={this.removeCategory}/>
        </div>
        <div>
          <Input
            inputValue={this.state.priceValue}
            onChange={this.handlePriceInputChange}
            label="Price"
            dataType="number"
            style={priceInputBorder}
          />
        </div>
        <div>
          <Input
            inputValue={this.state.quantityValue}
            onChange={this.handleQuantityInputChange}
            label="Quantity"
            dataType="number"
            style={quantityInputBorder}
          />
        </div>
        <Button
          onClick={() =>
            this.addExpense(
              this.state.nameValue,
              this.state.categoryValue,
              this.state.priceValue,
              this.state.quantityValue
            )
          }
          name="Add an expense"
        />

        <ul>{historyList}</ul>
      </>
    );
  }
}

Spendings.propTypes = {
  addToBudget: PropTypes.func.isRequired,
  substractFromBudget: PropTypes.func.isRequired,
}

export default Spendings;
