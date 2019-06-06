import React from 'react';

class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value)
    }
    
    handleClick() {
        this.props.onClick();
    }

    render() {
        return (
            <>
                <input type="number" value={this.props.inputValue} onChange={this.handleChange}/>
                <button onClick={this.handleClick}>Add to budget</button>
            </>
        );
    }
}

export default InputForm;