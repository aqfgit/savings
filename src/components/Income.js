import React from "react";
import Input from "./Input";
import Button from "./Button";
import { getLocalStorageItem } from '../utils/localStorage';

class Income extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <li>
          <span>{this.props.name} </span>
          <span>{this.props.value} / {this.props.timeUnit} </span>
        </li>
      </>
    );
  }
}

export default Income;
