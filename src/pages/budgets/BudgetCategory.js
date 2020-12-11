import React from "react";
import { numberValueIsValid } from "../../utils/inputValidation";

class BudgetCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      changeLimit: false,
      isLimitValid: false,
      limitValue: 0,
    };

    this.handleLimitInputChange = this.handleLimitInputChange.bind(this);
  }

  handleLimitInputChange(e) {
    const isInputValid = numberValueIsValid(e.target.value);
    this.setState({
      limitValue: e.target.value,
      isLimitValid: isInputValid,
    });
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
              {this.props.category.limit
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
            <div>
              <label htmlFor={`change${this.props.category.name}Limit`}>
                New limit:
              </label>
              <input
                id={`change${this.props.category.name}Limit`}
                type="number"
                value={this.state.limitValue}
                onChange={this.handleLimitInputChange}
              />
              <button
                onClick={() => {
                  if (!this.state.isLimitValid) return;
                  this.props.changeCategoryLimit(
                    this.props.category.name,
                    this.state.limitValue
                  );
                }}
              >
                Set new limit
              </button>
            </div>
          ) : null}
        </li>
      </>
    );
  }
}

BudgetCategory.propTypes = {};

export default BudgetCategory;
