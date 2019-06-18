import React from 'react';
import PropTypes from 'prop-types';


class Button extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick();
    }

    render() {
        return (
            <>
                <button onClick={this.handleClick}>{this.props.name}</button>
            </>
        );
    }
}

Button.propTypes = {
    handleClick: PropTypes.func,
    name: PropTypes.string,
};

export default Button;