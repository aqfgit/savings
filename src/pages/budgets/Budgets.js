import React from "react";
import { CategoriesContext } from "../../global-state/CategoriesContext";
import BudgetCategory from "./BudgetCategory";

class Budgets extends React.Component {
  constructor(props) {
    super(props);
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
