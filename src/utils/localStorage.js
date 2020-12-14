function getLocalStorageItem(name) {
  const item = JSON.parse(localStorage.getItem(name));
  return item;
}

function setLocalStorageItem(name, value) {
  localStorage.setItem(name, JSON.stringify(value));
}

function addDateToLocalStorage(name, date) {
  localStorage.setItem(name, date);
}

function getDateFromLocalStorage(name) {
  return Date.parse(localStorage.getItem(name));
}

function updateStateWithLocalStorage(setState, stateToUpdate) {
  console.log(setState);
  for (let key of stateToUpdate) {
    if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
      let value = localStorage.getItem(key);

      try {
        value = JSON.parse(value);
        setState({ [key]: value });
      } catch (e) {
        console.error(e);
      }
    }
  }
}

function saveStateToLocalStorage(state, stateToUpdate) {
  console.log(state);
  for (let key of stateToUpdate) {
    localStorage.setItem(key, JSON.stringify(state[key]));
  }
}

export {
  getLocalStorageItem,
  setLocalStorageItem,
  addDateToLocalStorage,
  getDateFromLocalStorage,
  updateStateWithLocalStorage,
  saveStateToLocalStorage,
};
