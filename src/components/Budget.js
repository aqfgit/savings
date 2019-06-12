import React from "react";
import Input from "./Input";
import Button from "./Button";
import Income from './Income';
import { getLocalStorageItem } from '../utils/localStorage';

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
        <p>Balance: {getLocalStorageItem('balance') || 0}$</p>

        <Income addToBudget={this.props.addToBudget}/>
        </> 
        
    );
  }
}

export default Budget;
