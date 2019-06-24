import React from 'react';


const CategoriesContext = React.createContext();

class CategoriesProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        }

        this.addCategory = this.addCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
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
      const stateToUpdate = ["categories"];
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
      const stateToUpdate = ["categories"];
      for (let key of stateToUpdate) {
        localStorage.setItem(key, JSON.stringify(this.state[key]));
      }
    }

    addCategory(name) {
      // const isCategoriesEmpty = !this.state.categories.length;
      this.setState(
        prevState => ({
          categories: prevState.categories.concat(name),
          addCategory: this.addCategory,
          removeCategory: this.removeCategory,
        }),
        // () => {
        //   if (isCategoriesEmpty) {
        //     const newCategory = this.changeCategory();
        //     this.handleCategoryInputChange(newCategory);
        //   }
        // }
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

  // changeCategory() {
  //   const categories = this.state.categories.slice();
  //   let newCategory = null;
  //   categories.forEach(item => (newCategory = item));
  //   return newCategory;
  // }
    
    render() {
       return <CategoriesContext.Provider value={{
         state: this.state,
         addCategory: this.addCategory,
         removeCategory: this.removeCategory,
       }}>
         {this.props.children}
       </CategoriesContext.Provider>
     }
   }

export {CategoriesContext, CategoriesProvider};