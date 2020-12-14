import React from "react";
import { formValid } from "../../utils/inputValidation";

const initialFieldsState = {
  fieldsValues: {
    newAccount: "",
  },
  fieldsValid: {
    newAccount: false,
  },
};

class AddAccount extends React.Component {
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
    if (name === "newAccount") {
      fieldsValid.newAccount = value.length > 0;
    }

    this.setState({
      fieldsValid,
      fieldsValues: { [name]: value },
    });
  }

  render() {
    const showNewAccountError =
      !this.state.fieldsValid.newAccount && this.state.showErrors;
    const newAccountErrorMessage = showNewAccountError
      ? "Name cant be blank"
      : null;

    return (
      <>
        <div style={{ border: "4px solid green" }}>
          <span>
            Add account
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
                {this.props.accounts.map((item) => (
                  <li key={item.name + "id"}>
                    {item.name}{" "}
                    <button onClick={() => this.props.removeAccount(item.name)}>
                      Delete
                    </button>
                  </li>
                ))}
              </div>
              <div>
                <>
                  <form
                    onSubmit={(e) => {
                      const newAccount = this.state.fieldsValues.newAccount;
                      e.preventDefault();
                      if (this.props.isNameDuplicate(newAccount)) {
                        console.log("DUPLICATE NAME ", newAccount);
                        return;
                      }
                      if (formValid(this.state)) {
                        this.props.addAccount(newAccount);
                        this.setState(() => ({
                          recentlyAdded: newAccount,
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
                    <label htmlFor="newAccount">New account</label>
                    <input
                      noValidate
                      value={this.state.fieldsValues.newAccount}
                      onChange={this.handleInputChange}
                      type="text"
                      name="newAccount"
                      id="newAccount"
                      style={{
                        border: showNewAccountError ? "1px solid red" : null,
                      }}
                    />
                    <button type="submit">Add account</button>
                  </form>
                  {this.state.recentlyAdded && (
                    <p>{this.state.recentlyAdded} account has been added.</p>
                  )}
                  <p>{newAccountErrorMessage}</p>
                </>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

export default AddAccount;
