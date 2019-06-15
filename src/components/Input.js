import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    

    handleChange(e) {
        console.log(e.target.value)
        this.props.onChange(e.target.value)
    }
    
    render() {
        const border = this.props.style ? this.props.style.border : null;
        
        return (
            <>
                <input type={this.props.dataType} value={this.props.inputValue} onChange={this.handleChange} style={{border}} />
                <label>{this.props.label}</label>
            </>
        );
    }
}

export default Input;