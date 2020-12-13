import React from "react";
import { numberValueIsValid } from "../../utils/inputValidation";

class SetNewLimit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLimitValid: true,
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
      </>
    );
  }
}

SetNewLimit.propTypes = {};

export default SetNewLimit;
