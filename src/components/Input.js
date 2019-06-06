import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value)
    }
    
   

    render() {
        return (
            <>
                <input type="number" value={this.props.inputValue} onChange={this.handleChange} type={this.props.dataType}/>
                <label>{this.props.label}</label>
            </>
        );
    }
}

export default Input;