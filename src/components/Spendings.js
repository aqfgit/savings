import React from 'react';
import Input from './Input';

class Spendings extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <h2>Spendings</h2>
                <Input inputValue={this.inputValue} onChange={this.handleInputChange} onClick={this.addToBudget} name="Add to budget" />
            </>
        );
    }
}

export default Spendings;