// eslint-disable-next-line no-import-assign
import React from "react";
import PropTypes from "prop-types";

import AddCategory from "./AddCategory";

import { CategoriesContext } from "../../global-state/CategoriesContext";
import { SpendingsContext } from "../../global-state/SpendingsContext";

const initialFieldsState = {
  fieldsValues: {
    name: "",
    category: "",
    account: "",
    price: 0,
    quantity: 1,
  },
  fieldsValid: {
    name: false,
    price: false,
    quantity: true,
    category: false,
    account: false,
  },
};

const formValid = ({ fieldsValid }) => {
  let valid = true;

  Object.values(fieldsValid).forEach((isValid) => {
    if (!isValid) {
      valid = false;
      return;
    }
  });

  return valid;
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

    fieldsValues.category = categories[0];
    fieldsValid.category = true;
    fieldsValues.account = accounts[0].name;
    fieldsValid.account = true;

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
            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (formValid(this.state)) {
                  context.addExpense(this.state.fieldsValues);
                } else {
                  console.log("INVALID FORM");
                  this.setState({ showErrors: true });
                }
              }}
              noValidate
            >
              <div>
                <input
                  value={this.state.fieldsValues.name}
                  onChange={this.handleInputChange}
                  name="name"
                  type="text"
                  style={nameInputBorder}
                />
              </div>
              <div>
                <select
                  value={this.state.fieldsValues.category}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputChange}
                  name="category"
                  style={categoryInputBorder}
                >
                  <CategoriesContext.Consumer>
                    {(context) =>
                      context.state.categories.map((item) => {
                        return (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        );
                      })
                    }
                  </CategoriesContext.Consumer>
                </select>
              </div>
              <div>
                <select
                  value={this.state.fieldsValues.account}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputChange}
                  style={accountsInputBorder}
                  name="account"
                >
                  {this.props.accounts.map((account) => (
                    <option key={account.name} value={account.name}>
                      {account.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  value={this.state.fieldsValues.price}
                  onChange={this.handleInputChange}
                  name="price"
                  type="number"
                  style={priceInputBorder}
                />
              </div>
              <div>
                <input
                  value={this.state.fieldsValues.quantity}
                  onChange={this.handleInputChange}
                  name="quantity"
                  type="number"
                  style={quantityInputBorder}
                />
              </div>
              <button type="submit" name="Add an expense">
                Add an expense
              </button>
            </form>
          )}
        </SpendingsContext.Consumer>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <SpendingsContext.Consumer>
              {(context) =>
                context.state.expenses.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name} </td>
                    <td>{item.category} </td>
                    <td>{item.price}$ </td>
                    <td>{item.quantity} </td>
                    <td>
                      <button
                        onClick={() =>
                          context.deleteExpense(
                            item.id,
                            item.price,
                            item.quantity,
                            item.account
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              }
            </SpendingsContext.Consumer>
          </tbody>
        </table>
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
