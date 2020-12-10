import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { textValueIsValid } from "../../utils/inputValidation";
import { CategoriesContext } from "../../global-state/CategoriesContext";

const initialFieldsState = {
  fieldsValues: {
    newCategory: '',
  },
  fieldsValid: {
    newCategory: false,
  },
};

const formValid = ({ fieldsValid, fieldsValues }) => {
  let valid = true;

  Object.values(fieldsValid).forEach(isValid => {
    if (!isValid) {
      valid = false;
      return;
    }
  });

  return valid;
};

class AddCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      ...initialFieldsState,
      recentlyAdded: null,
      showErrors: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    let fieldsValid = {...this.state.fieldsValid};
    if (name === "newCategory") {
      fieldsValid.newCategory = value.length > 0;
    }

    this.setState({
      fieldsValid,
      fieldsValues: { [name]: value },
    });
  }

  render() {

    const showNewCategoryError = !this.state.fieldsValid.newCategory && this.state.showErrors;
    const newCategoryErrorMessage = showNewCategoryError ? 'Name cant be blank' : null;

    return (
      <>
        <div style={{ border: "4px solid green" }}>
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
                      <form
                        onSubmit={e => {
                          const newCategory = this.state.fieldsValues.newCategory;
                          e.preventDefault();
                          if (context.isNameDuplicate(newCategory)) {
                            console.log('DUPLICATE NAME ', newCategory);
                            return;
                          }
                          if (formValid(this.state)) {
                            context.addCategory(
                              newCategory
                            );
                            this.setState(prevState => ({
                              recentlyAdded: newCategory,
                              ...initialFieldsState,
                              showErrors: false,
                            }));
                          } else {
                            console.log("INVALID FORM");
                            this.setState({showErrors: true});
                          }

                        }}
                        noValidate
                      >
                        <label htmlFor="category">New category</label>
                        <input
                          noValidate
                          value={this.state.fieldsValues.newCategory}
                          onChange={this.handleInputChange}
                          type="text"
                          name="newCategory"
                          style={{border: showNewCategoryError ? '1px solid red' : null}}
                        />
                        <button type="submit">Add category</button>
                      </form>
                      {this.state.recentlyAdded && (
                        <p>
                          {this.state.recentlyAdded} category has been added.
                        </p>
                      )}
                      <p>{newCategoryErrorMessage}</p>
                    </>
                  )}
                </CategoriesContext.Consumer>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

export default AddCategory;
