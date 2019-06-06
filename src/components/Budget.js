import React from 'react';
import InputForm from './InputForm';

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
                <InputForm inputValue={this.inputValue} onChange={this.handleInputChange} onClick={this.addToBudget}/>
                <p>Balance: {this.state.balance}$</p>
            </>
        );
    }
}

export default Budget;