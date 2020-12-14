import React from "react";
import PropTypes from "prop-types";
import { numberValueIsValid } from "../../utils/inputValidation";

class SetNewLimit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldsValues: {
        limit: 0,
      },
      fieldsValid: {
        limit: true,
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    let fieldsValid = { ...this.state.fieldsValid };
    let fieldsValues = { ...this.state.fieldsValues };
    switch (name) {
      case "limit":
        fieldsValid.limit = parseInt(value) >= 0 && numberValueIsValid(value);
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

  render() {
    return (
      <>
        <div>
          <label htmlFor={`change${this.props.category.name}Limit`}>
            New limit:
          </label>
          <input
            id={`change${this.props.category.name}Limit`}
            name="limit"
            type="number"
            value={this.state.fieldsValues.limit}
            onChange={this.handleInputChange}
          />
          <button
            onClick={() => {
              if (!this.state.fieldsValid.limit) return;
              this.props.changeCategoryLimit(
                this.props.category.name,
                this.state.fieldsValues.limit
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

SetNewLimit.propTypes = {
  category: PropTypes.object.isRequired,
  changeCategoryLimit: PropTypes.func.isRequired,
};

export default SetNewLimit;
