import React from "react";
import PropTypes from "prop-types";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const border = this.props.style.border || null;

    return (
      <>
        <input
          type={this.props.dataType}
          value={this.props.inputValue}
          onChange={this.handleChange}
          style={{ border }}
          required="required"
        />
        <label>{this.props.label}</label>
      </>
    );
  }
}

Input.propTypes = {
  inputValue: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  dataType: PropTypes.string.isRequired,
  border: PropTypes.object
};

export default Input;
