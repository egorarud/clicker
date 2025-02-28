import { DEFAULT_VALUES } from "./const";

function getData(key) {
    if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, DEFAULT_VALUES[key])
    }
    
    return Number(localStorage.getItem(key));
};

function resetData(key) {
    localStorage.setItem(key, DEFAULT_VALUES[key]);
    return getData(key);
};

function setData(key, value) {localStorage.setItem(key, value)};

export { getData, resetData, setData }