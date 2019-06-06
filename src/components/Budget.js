import React from 'react';
import Input from './Input';
import Button from './Button';

class Budget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            balance: 0,
            inputValue: 0,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.addToBudget = this.addToBudget.bind(this);
    }

    handleInputChange(value) {
        const intValue = parseInt(value);
        this.setState({
            inputValue: intValue,
        });
    }

    addToBudget() {
        this.setState((prevState) => ({
            balance: prevState.balance + prevState.inputValue,
        }));
    }

    render() {
        return (
            <>
                <h2>My budget</h2>
                <Input inputValue={this.inputValue} onChange={this.handleInputChange} />
                <Button onClick={this.addToBudget} name="Add to budget" />
                <p>Balance: {this.state.balance}$</p>
            </>
        );
    }
}

export default Budget;