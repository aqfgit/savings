import React from "react";
import Input from "./Input";
import Button from "./Button";

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
        <p>Balance: {this.props.balance}$</p>
      </>
    );
  }
}

export default Budget;
