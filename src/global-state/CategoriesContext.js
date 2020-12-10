import React from 'react';
import { setLocalStorageItem } from '../utils/localStorage';


const CategoriesContext = React.createContext();

class CategoriesProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        }

        this.addCategory = this.addCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        this.isNameDuplicate = this.isNameDuplicate.bind(this);
    }

    
    componentWillMount() {
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
      const stateToUpdate = ["categories"];
      for (let key of stateToUpdate) {
        if (localStorage.hasOwnProperty(key)) {
          let value = localStorage.getItem(key);
  
          try {
            value = JSON.parse(value);
            this.setState({ [key]: value });
          } catch (e) {
            console.log(e)
          }
        }
      }
    }
  
    saveStateToLocalStorage() {
      console.log(1)

      const stateToUpdate = ["categories"];
      for (let key of stateToUpdate) {
      console.log(key, JSON.stringify(this.state[key]))
        localStorage.setItem(key, JSON.stringify(this.state[key]));
      }
    }

    addCategory(name) {
      this.setState(
        prevState => {
        return ({
          categories: prevState.categories.concat(name),
          addCategory: this.addCategory,
          removeCategory: this.removeCategory,
        })},
        );
    }

     

  removeCategory(name) {
    const categories = this.state.categories.slice();
    const updatedCategories = categories.filter(cat => cat !== name);
    this.setState(
      prevState => ({
        categories: updatedCategories
      }),
      // () => {
      //   const newCategory = this.changeCategory() || "";
      //   this.handleCategoryInputChange(newCategory);
      // }
    );
  }

  isNameDuplicate(name) {
    let isDuplicate = false;
    this.state.categories.forEach(item => {
      if (item === name) {
        isDuplicate = true;
        return;
      }
    });

    return isDuplicate;
  }

 
    
    render() {
       return <CategoriesContext.Provider value={{
         state: this.state,
         addCategory: this.addCategory,
         removeCategory: this.removeCategory,
         isNameDuplicate: this.isNameDuplicate,
       }}>
         {this.props.children}
       </CategoriesContext.Provider>
     }
   }

export {CategoriesContext, CategoriesProvider};