import React from "react";
import PropTypes from "prop-types";
import SetNewLimit from "./SetNewLimit";

class BudgetCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      changeLimit: false,
    };
  }

  resetCategoryBudgetLimitIfItsNewMonth() {
    const FIRST_DAY_OF_THE_MONTH = 1;
    if (
      new Date().getUTCDate() === FIRST_DAY_OF_THE_MONTH &&
      !this.props.category.monthlyBudgetReset
    ) {
      this.props.setBudgetLimitReset(this.props.category.name, true);
      this.props.resetCategorySpent(this.props.category.name);
    } else if (new Date().getUTCDate() > FIRST_DAY_OF_THE_MONTH) {
      this.props.setBudgetLimitReset(this.props.category.name, false);
    }
  }

  componentDidMount() {
    this.resetCategoryBudgetLimitIfItsNewMonth();
  }

  render() {
    return (
      <>
        <li key={this.props.category.name}>
          {this.props.category.name}
          {<div>{this.props.category.spent}</div>}
          {
            <div>
              Limit:{" "}
              {this.props.category.limit > 0
                ? this.props.category.limit
                : "No limit set"}
              {this.props.category.spent > this.props.category.limit ? (
                <p style={{ color: "red" }}>LIMIT EXCEEDED</p>
              ) : null}
            </div>
          }
          {
            <button
              onClick={() => {
                this.setState((prevState) => ({
                  changeLimit: !prevState.changeLimit,
                }));
              }}
            >
              Change budget limit of {this.props.category.name}
            </button>
          }
          {this.state.changeLimit ? (
            <SetNewLimit
              category={this.props.category}
              changeCategoryLimit={this.props.changeCategoryLimit}
            />
          ) : null}
        </li>
      </>
    );
  }
}

BudgetCategory.propTypes = {
  category: PropTypes.object.isRequired,
  changeCategoryLimit: PropTypes.func.isRequired,
  resetCategorySpent: PropTypes.func.isRequired,
  setBudgetLimitReset: PropTypes.func.isRequired,
};

export default BudgetCategory;
