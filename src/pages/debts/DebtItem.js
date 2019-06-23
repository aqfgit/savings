import React from "react";
import PropTypes from "prop-types";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { numberValueIsValid } from "../../utils/inputValidation";

class DebtItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
      valueInputIsValid: false
    };

    this.handleValueInputChange = this.handleValueInputChange.bind(this);
    this.handlePayDebt = this.handlePayDebt.bind(this);
  }

  handleValueInputChange(value) {
    const isInputValid = numberValueIsValid(value);
    this.setState({
      inputValue: value,
      valueInputIsValid: isInputValid
    });
  }

  handlePayDebt() {
    if (!this.state.valueInputIsValid) {
      return;
    }
    this.props.payDebt(this.props.id, this.state.inputValue);
  }

  isDebtPaid(moneyPaid) {
    if (moneyPaid >= this.props.initialMoney) {
      return true;
    }
    return false;
  }

  render() {
    const valueInputBorder = {
      border: this.state.valueInputIsValid ? null : "1px solid red"
    };

    const moneyPaid = !this.isDebtPaid(this.props.moneyPaid)
      ? this.props.moneyPaid
      : this.props.initialMoney;

    return (
      <>
        <td>{this.props.name} </td>
        <td>
          {moneyPaid} / {this.props.initialMoney}{" "}
        </td>

        {!this.isDebtPaid(this.props.moneyPaid) && (
          <>
            <td>
              <Input
                inputValue={this.state.inputValue}
                onChange={this.handleValueInputChange}
                dataType="number"
                style={valueInputBorder}
              />
            </td>
            <td>
              <Button onClick={this.handlePayDebt} name="Pay" />
            </td>
          </>
        )}
        <td>
          <Button
            onClick={() => this.props.deleteDebt(this.props.id)}
            name="delete"
          />
        </td>
      </>
    );
  }
}

DebtItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  initialMoney: PropTypes.number.isRequired,
  moneyPaid: PropTypes.number.isRequired,
  payDebt: PropTypes.func.isRequired,
  deleteDebt: PropTypes.func.isRequired
};

export default DebtItem;
