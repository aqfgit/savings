import React from 'react';
import Input from './Input';
import Button from './Button';


class Spendings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expenses: [],
            nameValue: '',
            categoryValue: '',
            priceValue: 0,
        };

        this.handleNameInputChange = this.handleNameInputChange.bind(this);
        this.handleCategoryInputChange = this.handleCategoryInputChange.bind(this);
        this.handlePriceInputChange = this.handlePriceInputChange.bind(this);
    }

    addExpense(name, category, price) {
        const expenses = this.state.expenses.slice();

        this.setState({
            expenses: expenses.concat({name, category, price}),
        });
    }

    handleNameInputChange(value) {
        this.setState({
            nameValue: value,
        });
    }

    handleCategoryInputChange(value) {
        this.setState({
            categoryValue: value,
        });
    }

    handlePriceInputChange(value) {
        const intValue = parseInt(value);
        this.setState({
            priceValue: intValue,
        });
    }

    render() {
        return (
            <>
                <h2>Spendings</h2>
                <div>
                    <Input inputValue={this.state.nameValue} onChange={this.handleNameInputChange} label="Name" dataType="text" />
                </div>
                <div>
                    <Input inputValue={this.state.categoryValue} onChange={this.handleCategoryInputChange} label="Category" dataType="text" />
                </div>
                <div>
                    <Input inputValue={this.state.priceValue} onChange={this.handlePriceInputChange} label="Price" dataType="number"/>
                </div>
                <Button onClick={this.addToBudget} name="Add to budget" />
            </>
        );
    }
}

export default Spendings;