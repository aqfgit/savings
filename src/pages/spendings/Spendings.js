// eslint-disable-next-line no-import-assign
import React from "react";
import PropTypes from "prop-types";

import AddCategory from "./AddCategory";

import { CategoriesContext } from "../../global-state/CategoriesContext";
import { SpendingsContext } from "../../global-state/SpendingsContext";
import SpendingsByDate from "./SpendingsByDate";
import { formValid } from "../../utils/inputValidation";
import Select from "../../components/Select";

const initialFieldsState = {
  fieldsValues: {
    name: "",
    category: "",
    account: "",
    price: 0,
    quantity: 1,
    dateDay: new Date(),
    dateMonth: new Date(),
  },
  fieldsValid: {
    name: false,
    price: false,
    quantity: true,
    category: false,
    account: false,
  },
};

class Spendings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialFieldsState,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const categories = this.context.state.categories;
    const accounts = this.props.accounts;

    let fieldsValid = { ...this.state.fieldsValid };
    let fieldsValues = { ...this.state.fieldsValues };

    if (categories.length) {
      fieldsValues.category = categories[0].name;
      fieldsValid.category = true;
    }
    if (accounts.length) {
      fieldsValues.account = accounts[0].name;
      fieldsValid.account = true;
    }

    this.setState({
      fieldsValid,
      fieldsValues,
    });
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    let fieldsValid = { ...this.state.fieldsValid };
    let fieldsValues = { ...this.state.fieldsValues };
    switch (name) {
      case "name":
        fieldsValid.name = value.length > 0;
        break;
      case "price":
        fieldsValid.price = parseInt(value) > 0;
        break;
      case "quantity":
        fieldsValid.quantity = parseInt(value) > 0;
        break;
      case "category":
        fieldsValid.category = value.length > 0;
        break;
      case "account":
        fieldsValid.account = value.length > 0;
        break;
      case "dateDay":
        break;
      case "monthDay":
        break;

      default:
        break;
    }
    fieldsValues[name] = value;
    this.setState({
      fieldsValid,
      fieldsValues,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (formValid(this.state)) {
      this.addExpense(this.state.fieldsValues);
    } else {
      console.log("INVALID FORM");
      this.setState({ showErrors: true });
    }
  }

  render() {
    const { fieldsValid } = this.state;

    const priceInputBorder = {
      border: fieldsValid.price ? null : "1px solid red",
    };
    const quantityInputBorder = {
      border: fieldsValid.quantity ? null : "1px solid red",
    };
    const categoryInputBorder = {
      border: fieldsValid.category ? null : "1px solid red",
    };
    const accountsInputBorder = {
      border: fieldsValid.account ? null : "1px solid red",
    };
    const nameInputBorder = {
      border: fieldsValid.name ? null : "1px solid red",
    };

    return (
      <>
        <h2>Spendings</h2>
        <AddCategory />
        <SpendingsContext.Consumer>
          {(context) => (
            <CategoriesContext.Consumer>
              {(categoriesContext) => (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    if (formValid(this.state)) {
                      context.addExpense(this.state.fieldsValues);
                      categoriesContext.addToCategorySpent(
                        this.state.fieldsValues.category,
                        this.state.fieldsValues.price *
                          this.state.fieldsValues.quantity
                      );
                    } else {
                      console.log("INVALID FORM");
                      this.setState({ showErrors: true });
                    }
                  }}
                  noValidate
                >
                  <div>
                    <label htmlFor="expenseName">Name:</label>
                    <input
                      value={this.state.fieldsValues.name}
                      onChange={this.handleInputChange}
                      name="name"
                      type="text"
                      style={nameInputBorder}
                      id="expenseName"
                    />
                  </div>
                  <div>
                    <CategoriesContext.Consumer>
                      {(context) => (
                        <Select
                          value={this.state.fieldsValues.category}
                          handleInputChange={this.handleInputChange}
                          name="category"
                          id="spendingsCategory"
                          label="Category:"
                          array={context.state.categories}
                          border={categoryInputBorder}
                        />
                      )}
                    </CategoriesContext.Consumer>
                  </div>
                  <div>
                    <Select
                      value={this.state.fieldsValues.account}
                      handleInputChange={this.handleInputChange}
                      name="account"
                      id="spendingsAccount"
                      label="Account:"
                      array={this.props.accounts}
                      border={accountsInputBorder}
                    />
                  </div>
                  <div>
                    <label htmlFor="expenseSpent">Spent:</label>
                    <input
                      value={this.state.fieldsValues.price}
                      onChange={this.handleInputChange}
                      name="price"
                      type="number"
                      style={priceInputBorder}
                      id="expenseSpent"
                    />
                  </div>
                  <div>
                    <label htmlFor="expenseQuantity">Quantity:</label>
                    <input
                      value={this.state.fieldsValues.quantity}
                      onChange={this.handleInputChange}
                      name="quantity"
                      type="number"
                      style={quantityInputBorder}
                      id="expenseQuantity"
                    />
                  </div>
                  <button type="submit" name="Add an expense">
                    Add an expense
                  </button>
                </form>
              )}
            </CategoriesContext.Consumer>
          )}
        </SpendingsContext.Consumer>
        <h2>
          {new Date(this.state.fieldsValues.dateDay).toLocaleDateString() ==
          new Date().toLocaleDateString()
            ? "Todays"
            : null}{" "}
          ({new Date(this.state.fieldsValues.dateDay).toLocaleDateString()})
          spendings:{" "}
        </h2>
        <label htmlFor="changeDay">Change day</label>
        <input
          value={this.state.fieldsValues.dateDay}
          onChange={this.handleInputChange}
          name="dateDay"
          type="date"
        />
        <SpendingsContext.Consumer>
          {(spendingsContext) => (
            <CategoriesContext.Consumer>
              {(categoriesContext) => (
                <SpendingsByDate
                  expenses={spendingsContext.state.expenses}
                  deleteExpense={spendingsContext.deleteExpense}
                  addToCategorySpent={categoriesContext.addToCategorySpent}
                  dateCondition={(item) => {
                    return (
                      new Date(item.date).toLocaleDateString() ===
                      new Date(
                        this.state.fieldsValues.dateDay
                      ).toLocaleDateString()
                    );
                  }}
                />
              )}
            </CategoriesContext.Consumer>
          )}
        </SpendingsContext.Consumer>
        <h2>
          {new Date(this.state.fieldsValues.dateMonth).toLocaleString("en-us", {
            month: "long",
          })}{" "}
          spendings
        </h2>
        <label htmlFor="changeDay">Change month</label>
        <input
          value={this.state.fieldsValues.dateMonth}
          onChange={this.handleInputChange}
          name="dateMonth"
          type="month"
        />
        <SpendingsContext.Consumer>
          {(spendingsContext) => (
            <CategoriesContext.Consumer>
              {(categoriesContext) => (
                <SpendingsByDate
                  expenses={spendingsContext.state.expenses}
                  deleteExpense={spendingsContext.deleteExpense}
                  addToCategorySpent={categoriesContext.addToCategorySpent}
                  dateCondition={(item) => {
                    return (
                      new Date(item.date).getUTCMonth() ===
                      new Date(this.state.fieldsValues.dateMonth).getUTCMonth()
                    );
                  }}
                />
              )}
            </CategoriesContext.Consumer>
          )}
        </SpendingsContext.Consumer>
        <h2>All time spendings</h2>

        <SpendingsContext.Consumer>
          {(spendingsContext) => (
            <CategoriesContext.Consumer>
              {(categoriesContext) => (
                <SpendingsByDate
                  expenses={spendingsContext.state.expenses}
                  deleteExpense={spendingsContext.deleteExpense}
                  addToCategorySpent={categoriesContext.addToCategorySpent}
                  dateCondition={(item) => {
                    return (
                      new Date(item.date).getUTCMonth() ===
                      new Date().getUTCMonth()
                    );
                  }}
                />
              )}
            </CategoriesContext.Consumer>
          )}
        </SpendingsContext.Consumer>
      </>
    );
  }
}

Spendings.contextType = CategoriesContext;

Spendings.propTypes = {
  addToBudget: PropTypes.func.isRequired,
  substractFromBudget: PropTypes.func.isRequired,
};

export default Spendings;
