import React from "react";

const CategoriesContext = React.createContext();

class CategoriesProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };

    this.addCategory = this.addCategory.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.isNameDuplicate = this.isNameDuplicate.bind(this);
    this.addToCategorySpent = this.addToCategorySpent.bind(this);
    this.changeCategoryLimit = this.changeCategoryLimit.bind(this);
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
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        let value = localStorage.getItem(key);

        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }

  saveStateToLocalStorage() {
    console.log(1);

    const stateToUpdate = ["categories"];
    for (let key of stateToUpdate) {
      console.log(key, JSON.stringify(this.state[key]));
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  addCategory(name) {
    const categoryObj = { name, spent: 0, limit: null };
    this.setState((prevState) => {
      return {
        categories: prevState.categories.concat(categoryObj),
        addCategory: this.addCategory,
        removeCategory: this.removeCategory,
      };
    });
  }

  addToCategorySpent(name, money) {
    console.log(name);

    const categories = this.state.categories.slice();
    const updatedCategories = categories.map((cat) => {
      if (cat.name === name) {
        const catCopy = Object.assign({}, cat);
        catCopy.spent += parseInt(money);
        console.log(2);
        return catCopy;
      }
      return cat;
    });
    this.setState({ categories: updatedCategories });
  }

  changeCategoryLimit(name, newLimit) {
    const categories = this.state.categories.slice();
    const updatedCategories = categories.map((cat) => {
      if (cat.name === name) {
        const catCopy = Object.assign({}, cat);
        catCopy.limit = newLimit;
        return catCopy;
      }
      return cat;
    });
    this.setState({ categories: updatedCategories });
  }

  removeCategory(name) {
    const categories = this.state.categories.slice();
    const updatedCategories = categories.filter((cat) => cat.name !== name);
    this.setState(
      () => ({
        categories: updatedCategories,
      })
      // () => {
      //   const newCategory = this.changeCategory() || "";
      //   this.handleCategoryInputChange(newCategory);
      // }
    );
  }

  isNameDuplicate(name) {
    let isDuplicate = false;
    this.state.categories.forEach((item) => {
      if (item.name === name) {
        isDuplicate = true;
        return;
      }
    });

    return isDuplicate;
  }

  render() {
    return (
      <CategoriesContext.Provider
        value={{
          state: this.state,
          addCategory: this.addCategory,
          removeCategory: this.removeCategory,
          isNameDuplicate: this.isNameDuplicate,
          addToCategorySpent: this.addToCategorySpent,
          changeCategoryLimit: this.changeCategoryLimit,
        }}
      >
        {this.props.children}
      </CategoriesContext.Provider>
    );
  }
}

export { CategoriesContext, CategoriesProvider };
