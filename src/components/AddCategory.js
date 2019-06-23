import React from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import Button from "./Button";
import { textValueIsValid } from "../utils/inputValidation";

class AddCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      inputValue: "",
      inputIsValid: false,
      recentlyAdded: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
  }

  handleInputChange(value) {
    const isInputValid = textValueIsValid(value);
    this.setState({
      inputValue: value,
      inputIsValid: isInputValid
    });
  }

  handleAddCategory() {
    if (this.state.inputIsValid) {
      this.props.addCategory(this.state.inputValue);

      this.setState(prevState => ({
        recentlyAdded: prevState.inputValue,
        inputValue: "",
        inputIsValid: false
      }));
    }
  }

  render() {
    const categories = this.props.categories;
    const categoriesList = categories.map(item => {
      return (
        <li key={item + "id"}>
          {item}{" "}
          <Button
            onClick={() => this.props.removeCategory(item)}
            name="delete"
          />
        </li>
      );
    });

    const border = {
      border: this.state.inputIsValid ? null : "1px solid red"
    };
    return (
      <>
        <span>
          Add category
          <Button
            onClick={() =>
              this.setState(prevState => ({ isOpen: !prevState.isOpen }))
            }
            name={this.state.isOpen ? "-" : "+"}
          />
        </span>
        {this.state.isOpen && (
          <>
            <div>{categoriesList}</div>
            <div>
              <Input
                inputValue={this.state.inputValue}
                onChange={this.handleInputChange}
                dataType="text"
                style={border}
              />
              <Button onClick={this.handleAddCategory} name="Add category" />
              {this.state.recentlyAdded && (
                <p>{this.state.recentlyAdded} category has been added.</p>
              )}
            </div>
          </>
        )}
      </>
    );
  }
}

AddCategory.propTypes = {
  addCategory: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
};

export default AddCategory;
