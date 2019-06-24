import React from "react";
import PropTypes from "prop-types";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { numberValueIsValid } from "../../utils/inputValidation";
import {CategoriesContext} from "../../global-state/CategoriesContext";

class Budgets extends React.Component {
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
      <h2>Budgets</h2>
      <CategoriesContext.Consumer>
          {context => (
              <span>{context.state.categories}</span>
          )}
      </CategoriesContext.Consumer>
      </>
    );
  }
}


Budgets.propTypes = {
 
};

export default Budgets;