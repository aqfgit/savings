import React from "react";

class SpendingsByDate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {this.props.expenses
              .filter(this.props.dateCondition)
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.name} </td>
                  <td>{item.category} </td>
                  <td>{item.price} </td>
                  <td>{item.quantity} </td>
                  <td>
                    <button
                      onClick={() => {
                        this.props.deleteExpense(
                          item.id,
                          item.price,
                          item.quantity,
                          item.account
                        );
                        this.props.addToCategorySpent(
                          item.category,
                          -item.price
                        );
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  }
}

SpendingsByDate.propTypes = {};

export default SpendingsByDate;
