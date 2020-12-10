import React from 'react';


const SpendingsContext = React.createContext();

class SpendingsProvider extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          expenses: [],
          idCounter: 0
        };
    
        this.addExpense = this.addExpense.bind(this);
        this.deleteExpense = this.deleteExpense.bind(this);
      }

      componentDidMount() {
        this.updateStateWithLocalStorage();
    
        window.addEventListener(
          "beforeunload",
          this.saveStateToLocalStorage.bind(this)
        );
      }
    
      componentWillUnmount() {
        window.removeEventListener(
          "beforeunload",
          this.saveStateToLocalStorage.bind(this)
        );
    
        this.saveStateToLocalStorage();
      }

      updateStateWithLocalStorage() {
        const stateToUpdate = ["expenses", "idCounter"];
        for (let key of stateToUpdate) {
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
        const stateToUpdate = ["expenses", "idCounter"];
        for (let key of stateToUpdate) {
          localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
      }
  
      addExpense({name, category, price, quantity}) {

        const expenses = this.state.expenses.slice();
    
        const id = this.state.idCounter;
        this.setState({
          id,
          expenses: expenses.concat({ name, category, price, quantity, id }),
          idCounter: id + 1,
        });
        this.props.substractFromBudget(price*quantity);
      }
    
      deleteExpense(id, cashback, quantity) {
        const expenses = this.state.expenses.slice();
        const updatedExpenses = expenses.filter(item => item.id !== id);
        this.setState({
          expenses: updatedExpenses
        });
        this.props.addToBudget(cashback * quantity);
      }
    
    
    render() {
       return <SpendingsContext.Provider value={{
         state: this.state,
         addExpense: this.addExpense,
         deleteExpense: this.deleteExpense,
       }}>
         {this.props.children}
       </SpendingsContext.Provider>
     }
   }

export {SpendingsContext, SpendingsProvider};