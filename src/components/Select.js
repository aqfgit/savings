import React from "react";
import PropTypes from "prop-types";

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e);
  }

  render() {
    const border = this.props.border || null;

    return (
      <>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <select
          value={this.props.value}
          onChange={this.props.handleInputChange}
          onBlur={this.props.handleInputChange}
          name={this.props.name}
          id={this.props.id}
          style={{ border }}
        >
          {this.props.array.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </>
    );
  }
}

Select.propTypes = {
  array: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Select;
