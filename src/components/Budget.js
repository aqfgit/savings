import React from "react";
import Input from "./Input";
import Button from "./Button";
import { getLocalStorageItem } from '../utils/localStorage';

class Budget extends React.Component {
  render() {
    return (
      <>
        <h2>My budget</h2>
        <Input
          inputValue={this.props.inputValue}
          onChange={this.props.onChange}
          dataType="number"
        />
        <Button onClick={this.props.addToBudget} name="Add to budget" />
        <p>Balance: {getLocalStorageItem('balance') || 0}$</p>
      </>
    );
  }
}

export default Budget;
