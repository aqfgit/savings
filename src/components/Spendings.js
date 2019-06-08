import React from "react";
import Input from "./Input";
import Button from "./Button";
import { getLocalStorageItem, setLocalStorageItem} from '../utils/localStorage';

class Spendings extends React.Component {
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
            inputValue={this.props.nameValue}
            onChange={this.props.handleNameInputChange}
            label="Name"
            dataType="text"
          />
        </div>
        <div>
          <Input
            inputValue={this.props.categoryValue}
            onChange={this.props.handleCategoryInputChange}
            label="Category"
            dataType="text"
          />
        </div>
        <div>
          <Input
            inputValue={this.props.priceValue}
            onChange={this.props.handlePriceInputChange}
            label="Price"
            dataType="number"
          />
        </div>
        <Button
          onClick={() =>
            this.props.addExpense(
              this.props.nameValue,
              this.props.categoryValue,
              this.props.priceValue
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
