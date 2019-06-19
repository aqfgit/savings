import React from 'react';
import PropTypes from 'prop-types';


class Select extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    

    handleChange(e) {
        this.props.onChange(e.target.value)
    }
    
    render() {
        const border = this.props.style.border || null;

        return (
            <>
                <select id="select" value={this.props.inputValue} onChange={this.handleChange} style={{border}} >
                    {this.props.children}
                </select>
                <label>{this.props.label}</label>
            </>
        );
    }
}

Select.propTypes = {
    inputValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
}

export default Select;