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
    };

  this.idCounter = 0;

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
    console.log(timeDiff)
    
    this.state.incomes.forEach((item) => {
      this.props.addToBudget(item.value * timeDiff);

      const incomes = this.state.incomes.slice();
      const currentIncome = incomes.find((income) => income.name === item.name);
      const interval = setInterval(() => {
        this.props.addToBudget(item.value);
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
    this.setState({
      inputValue: intValue,
    });
  }

  handleNameInputChange(name) {
    this.setState({
      inputName: name,
    });
  }

  addIncome() {
    const interval = setInterval(() => {
      this.props.addToBudget(this.state.inputValue);
      addDateToLocalStorage('lastTime', new Date());
    }, 1000);

    const id = this.idCounter;
    this.idCounter += 1;

    this.setState(prevState => ({
      incomes: prevState.incomes.concat({
        id: id,
        name: this.state.inputName,
        value: this.state.inputValue,
        frequency: 1000,
        timeUnit: 'second',
        interval: interval,
      })
    }),
    
    );
  }

  render() {
    const incomes = this.state.incomes.slice() ;
    const incomesList = incomes.map(item => {
      return (
        <li key={item.id}>
          <span>{item.name} </span>
          <span>{item.value} / {item.timeUnit} </span>
        </li>
      );
    });

    return (
      <>
      <h2>Incomes</h2>
        <Input
          inputValue={this.state.inputName}
          onChange={this.handleNameInputChange}
          dataType="text"
        />
        <Input
          inputValue={this.state.inputValue}
          onChange={this.handleValueInputChange}
          dataType="number"
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
