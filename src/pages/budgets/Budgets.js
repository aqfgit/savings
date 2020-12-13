import React from "react";
import { numberValueIsValid } from "../../utils/inputValidation";
import { CategoriesContext } from "../../global-state/CategoriesContext";
import BudgetCategory from "./BudgetCategory";

class Budgets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      balanceInputValue: "",
      balanceInputIsValid: false,
    };

    this.handleBalanceInputChange = this.handleBalanceInputChange.bind(this);
    this.handleAddToBudget = this.handleAddToBudget.bind(this);
  }

  handleBalanceInputChange(value) {
    const isInputValid = numberValueIsValid(value);
    this.setState({
      balanceInputValue: value,
      balanceInputIsValid: isInputValid,
    });
  }

  handleAddToBudget() {
    if (!this.state.balanceInputIsValid) {
      return;
    }
    this.props.addToBudget(this.state.balanceInputValue);
    this.setState({
      balanceInputValue: "",
      balanceInputIsValid: false,
    });
  }

  render() {
    return (
      <>
        <h2>Budgets</h2>

        <ul>
          <CategoriesContext.Consumer>
            {(categoriesContext) =>
              categoriesContext.state.categories.map((item) => (
                <BudgetCategory
                  key={item.name}
                  category={item}
                  changeCategoryLimit={categoriesContext.changeCategoryLimit}
                  resetCategorySpent={categoriesContext.resetCategorySpent}
                  setBudgetLimitReset={categoriesContext.setBudgetLimitReset}
                />
              ))
            }
          </CategoriesContext.Consumer>
        </ul>
      </>
    );
  }
}

Budgets.propTypes = {};

export default Budgets;
