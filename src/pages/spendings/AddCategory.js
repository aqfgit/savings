import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { textValueIsValid } from "../../utils/inputValidation";
import { CategoriesContext } from "../../global-state/CategoriesContext";

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
            <div>
              <CategoriesContext.Consumer>
                {context =>
                  context.state.categories.map(item => (
                    <li key={item + "id"}>
                      {item}{" "}
                      <Button
                        onClick={() => context.removeCategory(item)}
                        name="delete"
                      />
                    </li>
                  ))
                }
              </CategoriesContext.Consumer>
            </div>
            <div>
              <CategoriesContext.Consumer>
                {context => (
                  <>
                    <Input
                      inputValue={this.state.inputValue}
                      onChange={this.handleInputChange}
                      dataType="text"
                      style={border}
                    />
                    <Button
                      onClick={() => {
                        if (this.state.inputIsValid) {
                          context.addCategory(this.state.inputValue);
                          this.setState(prevState => ({
                            recentlyAdded: prevState.inputValue,
                            inputValue: "",
                            inputIsValid: false
                          }));
                        }
                      }}
                      name="Add category"
                    />
                    {this.state.recentlyAdded && (
                      <p>{this.state.recentlyAdded} category has been added.</p>
                    )}
                  </>
                )}
              </CategoriesContext.Consumer>
            </div>
          </>
        )}
      </>
    );
  }
}

export default AddCategory;
