import React from "react";
import PropTypes from "prop-types";
import { numberValueIsValid } from "../../utils/inputValidation";

class DebtItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldsValues: {
        pay: 0,
      },
      fieldsValid: {
        pay: false,
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePayDebt = this.handlePayDebt.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    let fieldsValid = { ...this.state.fieldsValid };
    let fieldsValues = { ...this.state.fieldsValues };
    switch (name) {
      case "pay":
        fieldsValid.pay = parseInt(value) >= 0 && numberValueIsValid(value);
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

  handlePayDebt() {
    if (!this.state.fieldsValid.pay) {
      return;
    }
    this.props.payDebt(this.props.id, this.state.fieldsValues.pay);
  }

  isDebtPaid(moneyPaid) {
    if (moneyPaid >= this.props.initialMoney) {
      return true;
    }
    return false;
  }

  render() {
    const valueInputBorder = {
      border: this.state.fieldsValid.pay ? null : "1px solid red",
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
              <label htmlFor={this.props.id}>Pay:</label>
              <input
                style={{ valueInputBorder }}
                id={this.props.id}
                name="pay"
                type="number"
                value={this.state.fieldsValues.pay}
                onChange={this.handleInputChange}
              />
            </td>

            <td>
              <button onClick={this.handlePayDebt}>Pay</button>
            </td>
          </>
        )}
        <td>
          <button onClick={() => this.props.deleteDebt(this.props.id)}>
            Delete
          </button>
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
  deleteDebt: PropTypes.func.isRequired,
};

export default DebtItem;
