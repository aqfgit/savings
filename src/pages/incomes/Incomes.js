import React from "react";
import PropTypes from "prop-types";
import Input from "../../components/Input";
import Button from "../../components/Button";
import IncomeSources from "./IncomeSources";
import { numberValueIsValid } from "../../utils/inputValidation";
import Balance from "./Balance";

class Incomes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      balanceInputValue: "",
      balanceInputIsValid: false
    };

    this.handleBalanceInputChange = this.handleBalanceInputChange.bind(this);
    this.handleAddToBudget = this.handleAddToBudget.bind(this);
  }

  handleBalanceInputChange(value) {
    const isInputValid = numberValueIsValid(value);
    this.setState({
      balanceInputValue: value,
      balanceInputIsValid: isInputValid
    });
  }

  handleAddToBudget() {
    if (!this.state.balanceInputIsValid) {
      return;
    }
    this.props.addToBudget(this.state.balanceInputValue);
    this.setState({
      balanceInputValue: "",
      balanceInputIsValid: false
    });
  }

  render() {
    return (
      <>
      <h2>Incomes</h2>
        <Balance addToBudget={this.props.addToBudget}
                  balance={this.props.balance}/>
        <IncomeSources addToBudget={this.props.addToBudget} />
      </>
    );
  }
}

Incomes.propTypes = {
  balance: PropTypes.number.isRequired,
  addToBudget: PropTypes.func.isRequired
};

export default Incomes;
