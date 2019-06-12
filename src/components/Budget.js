import React from "react";
import Input from "./Input";
import Button from "./Button";
import Income from './Income';

class Budget extends React.Component {

  render() {
    
   
    return (
      <>
        <h2>My budget</h2>
        <Input
          inputValue={this.props.balanceInputValue}
          onChange={this.props.handleBalanceInputChange}
          dataType="number"
        />
        <Button onClick={this.props.addToBudget} name="Add to budget" />
        <p>Balance: {this.props.balance}$</p>

        <Income addToBudget={this.props.addToBudget}/>
        </> 
        
    );
  }
}

export default Budget;
