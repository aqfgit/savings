import React from "react";
import {
  updateStateWithLocalStorage as utils_updateStateWithLocalStorage,
  saveStateToLocalStorage as utils_saveStateToLocalStorage,
} from "../utils/localStorage";

const CategoriesContext = React.createContext();

const STATE_ITEMS_TO_SAVE_IN_LOCAL_STORAGE = ["categories"];

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
    this.resetCategorySpent = this.resetCategorySpent.bind(this);
    this.setBudgetLimitReset = this.setBudgetLimitReset.bind(this);
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
    utils_updateStateWithLocalStorage(
      this.setState.bind(this),
      STATE_ITEMS_TO_SAVE_IN_LOCAL_STORAGE
    );
  }

  saveStateToLocalStorage() {
    utils_saveStateToLocalStorage(
      this.state,
      STATE_ITEMS_TO_SAVE_IN_LOCAL_STORAGE
    );
  }

  addCategory(name) {
    const categoryObj = {
      name,
      spent: 0,
      limit: null,
      monthlyBudgetReset: false,
    };
    this.setState((prevState) => {
      return {
        categories: prevState.categories.concat(categoryObj),
        addCategory: this.addCategory,
        removeCategory: this.removeCategory,
      };
    });
  }

  addToCategorySpent(name, money) {
    this.setState((state) => {
      const categories = state.categories.slice();
      const updatedCategories = categories.map((cat) => {
        if (cat.name === name) {
          const catCopy = Object.assign({}, cat);
          catCopy.spent += parseInt(money);
          return catCopy;
        }
        return cat;
      });
      return { categories: updatedCategories };
    });
  }

  changeCategoryLimit(name, newLimit) {
    this.setState((state) => {
      const categories = state.categories.slice();
      const updatedCategories = categories.map((cat) => {
        if (cat.name === name) {
          const catCopy = Object.assign({}, cat);
          catCopy.limit = newLimit;
          return catCopy;
        }
        return cat;
      });
      return { categories: updatedCategories };
    });
  }

  setBudgetLimitReset(name, bool) {
    this.setState((state) => {
      const categories = state.categories.slice();
      const updatedCategories = categories.map((cat) => {
        if (cat.name === name) {
          const catCopy = Object.assign({}, cat);
          catCopy.monthlyBudgetReset = bool;
          return catCopy;
        }
        return cat;
      });
      return { categories: updatedCategories };
    });
  }

  resetCategorySpent(name) {
    this.setState((state) => {
      const categories = state.categories.slice();
      const updatedCategories = categories.map((cat) => {
        if (cat.name === name) {
          const catCopy = Object.assign({}, cat);
          catCopy.spent = 0;
          return catCopy;
        }
        return cat;
      });
      return { categories: updatedCategories };
    });
  }

  removeCategory(name) {
    const categories = this.state.categories.slice();
    const updatedCategories = categories.filter((cat) => cat.name !== name);
    this.setState(() => ({
      categories: updatedCategories,
    }));
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
          resetCategorySpent: this.resetCategorySpent,
          setBudgetLimitReset: this.setBudgetLimitReset,
        }}
      >
        {this.props.children}
      </CategoriesContext.Provider>
    );
  }
}

export { CategoriesContext, CategoriesProvider };
