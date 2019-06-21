import React from "react";
import PropTypes from 'prop-types';
import Input from "./Input";
import Button from "./Button";
import { numberValueIsValid } from '../utils/inputValidation';


class DebtItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      valueInputIsValid: false,
    };

    this.handleValueInputChange = this.handleValueInputChange.bind(this);
    this.handlePayDebt = this.handlePayDebt.bind(this);

  }


  handleValueInputChange(value) {
    const isInputValid = numberValueIsValid(value)
    this.setState({
      inputValue: value,
      valueInputIsValid: isInputValid,
    });
  }

  handlePayDebt() {
    if (!this.state.valueInputIsValid) {
      return;
    }

    this.props.payDebt(this.props.id, this.state.inputValue);
  }

  isDebtPaid(moneyLeft) {
    if (moneyLeft <= 0) {
      return true;
    }
    return false;
  }

  render() {
    
    const valueInputBorder = {
      border: (this.state.valueInputIsValid) ? null : '1px solid red',
    };

    const moneyLeft = !this.isDebtPaid(this.props.moneyLeft) ? this.props.moneyLeft : 'Debt paid! :)';

    return (
      <>
      <h2>Incomes</h2>
        <span>{this.props.name} </span>
        <span>{moneyLeft} </span>
        
        {
          !this.isDebtPaid(this.props.moneyLeft) && (
            <>
              <Input
                inputValue={this.state.inputValue}
                onChange={this.handleValueInputChange}
                dataType="number"
                style={valueInputBorder}
              />
              <Button onClick={this.handlePayDebt} name="Pay" />
            </>
          )
        }
        <Button onClick={() => this.props.deleteDebt(this.props.id)} name="delete" />
      </>
    );
  }
}

DebtItem.propTypes = {
 
};

export default DebtItem;
