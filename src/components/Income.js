import React from "react";
import Input from "./Input";
import Button from "./Button";
import { getLocalStorageItem, getDateFromLocalStorage, addDateToLocalStorage } from '../utils/localStorage';

class Income extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incomes: getLocalStorageItem('incomes'),
      inputName: '',
      inputValue: '',
      idCounter: 0,
      valueInputIsValid: false,
      nameInputIsValid: false,
    };

  this.handleValueInputChange = this.handleValueInputChange.bind(this);
  this.handleNameInputChange = this.handleNameInputChange.bind(this);
  this.addIncome = this.addIncome.bind(this);
  }

  componentDidMount() {
    this.updateStateWithLocalStorage();
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    const lastTime = getDateFromLocalStorage('lastIncomeUpadte') || new Date();
    const timeDiff = Math.round((new Date() - lastTime) / 1000) || 1;

    this.state.incomes.forEach((item) => {
      this.props.addToBudget(timeDiff * item.value);

      const incomes = this.state.incomes.slice();
      const currentIncome = incomes.find((income) => income.name === item.name);
      const interval = setInterval(() => {
        this.props.addToBudget(item.value);
         addDateToLocalStorage('lastIncomeUpadte', new Date());
      }, item.frequency);

      currentIncome.interval = interval;
      this.setState(prevState => ({
        incomes: incomes,
      }));
    });
  }


  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    addDateToLocalStorage('lastIncomeUpadte', new Date());
    this.state.incomes.forEach((item) => {
      clearInterval(item.interval);
    });

    this.saveStateToLocalStorage();
  }

  updateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);

        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  
  handleValueInputChange(value) {
    const intValue = parseInt(value);
    const isInputValid = !isNaN(intValue)
    this.setState({
      inputValue: value,
      valueInputIsValid: isInputValid,
    });
  }

  handleNameInputChange(name) {
    const isInputValid = (name === '') ? false : true;
    this.setState({
      inputName: name,
      nameInputIsValid: isInputValid,
    });
  }

  addIncome() {
    const value = this.state.inputValue;
    const intValue= parseInt(value);

    if (!this.state.valueInputIsValid || !this.state.nameInputIsValid) {
      return;
    }
    const interval = setInterval(() => {
      this.props.addToBudget(value);
      addDateToLocalStorage('lastIncomeUpadte', new Date());
    }, 1000);

    const id = this.state.idCounter;

    this.setState(prevState => ({
      incomes: prevState.incomes.concat({
        id,
        name: this.state.inputName,
        value: intValue,
        frequency: 1000,
        timeUnit: 'second',
        interval: interval,
      }),
      idCounter: id + 1,
      inputValue: '',
      inputName: '',
      valueInputIsValid: false,
      nameInputIsValid: false,
    }));
  }

  deleteIncome(id) {
    const incomes = this.state.incomes.slice();
    incomes.forEach(item => {
      if (item.id === id) {
        clearInterval(item.interval);
        return;
      } 
    });

    const updatedIncomes = incomes.filter(item => item.id !== id);
    this.setState({
      incomes: updatedIncomes,
    });
  }

  render() {
    const incomes = this.state.incomes.slice() ;
    const incomesList = incomes.map(item => {
      return (
        <li key={item.id}>
          <span>{item.name} </span>
          <span>{item.value} / {item.timeUnit} </span>
          <span><button onClick={() => this.deleteIncome(item.id)}>delete</button></span>
        </li>
      );
    });

    const valueInputBorder = {
      border: (this.state.valueInputIsValid) ? null : '1px solid red',
    };

    const nameInputBorder = {
      border: (this.state.nameInputIsValid) ? null : '1px solid red',
    };

    return (
      <>
      <h2>Incomes</h2>
        <Input
          inputValue={this.state.inputName}
          onChange={this.handleNameInputChange}
          dataType="text"
          style={nameInputBorder}
        />
        <Input
          inputValue={this.state.inputValue}
          onChange={this.handleValueInputChange}
          dataType="number"
          style={valueInputBorder}
        />
        <Button onClick={this.addIncome} name="Add income" />
        <ul>
            {incomesList}
        </ul>
      </>
    );
  }
}

export default Income;
