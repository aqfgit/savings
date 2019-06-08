function getLocalStorageItem(name) {
    const item = JSON.parse(localStorage.getItem(name));
    return item;
}

function setLocalStorageItem(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}

export {
    getLocalStorageItem,
    setLocalStorageItem,
};