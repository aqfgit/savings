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

export {
    getLocalStorageItem,
    setLocalStorageItem,
    addDateToLocalStorage,
    getDateFromLocalStorage,
};