import React from "react";
import PropTypes from "prop-types";
import IncomeSources from "./IncomeSources";
import Balance from "./Balance";
import AddAccount from "./AddAccount";

class Incomes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h2>Incomes</h2>
        <Balance
          addToBudget={this.props.addToBudget}
          balance={this.props.balance}
          accounts={this.props.accounts}
        />
        <IncomeSources
          addToBudget={this.props.addToBudget}
          accounts={this.props.accounts}
        />
        <AddAccount
          accounts={this.props.accounts}
          addAccount={this.props.addAccount}
          removeAccount={this.props.removeAccount}
          isNameDuplicate={this.props.isNameDuplicate}
        />
      </>
    );
  }
}

Incomes.propTypes = {
  balance: PropTypes.number.isRequired,
  addToBudget: PropTypes.func.isRequired,
};

export default Incomes;
