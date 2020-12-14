import React from "react";
import { CategoriesContext } from "../../global-state/CategoriesContext";
import { formValid } from "../../utils/inputValidation";

const initialFieldsState = {
  fieldsValues: {
    newCategory: "",
  },
  fieldsValid: {
    newCategory: false,
  },
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
    let fieldsValid = { ...this.state.fieldsValid };
    if (name === "newCategory") {
      fieldsValid.newCategory = value.length > 0;
    }

    this.setState({
      fieldsValid,
      fieldsValues: { [name]: value },
    });
  }

  render() {
    const showNewCategoryError =
      !this.state.fieldsValid.newCategory && this.state.showErrors;
    const newCategoryErrorMessage = showNewCategoryError
      ? "Name cant be blank"
      : null;

    return (
      <>
        <div style={{ border: "4px solid green" }}>
          <span>
            Add category
            <button
              onClick={() =>
                this.setState((prevState) => ({ isOpen: !prevState.isOpen }))
              }
            >
              {this.state.isOpen ? "-" : "+"}
            </button>
          </span>
          {this.state.isOpen && (
            <>
              <div>
                <CategoriesContext.Consumer>
                  {(context) =>
                    context.state.categories.map((item) => (
                      <li key={item.name + "id"}>
                        {item.name}{" "}
                        <button
                          onClick={() => context.removeCategory(item.name)}
                        >
                          Delete
                        </button>
                      </li>
                    ))
                  }
                </CategoriesContext.Consumer>
              </div>
              <div>
                <CategoriesContext.Consumer>
                  {(context) => (
                    <>
                      <form
                        onSubmit={(e) => {
                          const newCategory = this.state.fieldsValues
                            .newCategory;
                          e.preventDefault();
                          if (context.isNameDuplicate(newCategory)) {
                            console.log("DUPLICATE NAME ", newCategory);
                            return;
                          }
                          if (formValid(this.state)) {
                            context.addCategory(newCategory);
                            this.setState(() => ({
                              recentlyAdded: newCategory,
                              ...initialFieldsState,
                              showErrors: false,
                            }));
                          } else {
                            console.log("INVALID FORM");
                            this.setState({ showErrors: true });
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
                          style={{
                            border: showNewCategoryError
                              ? "1px solid red"
                              : null,
                          }}
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
