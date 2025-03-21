import { COSTS } from "./const";
import { getData, resetData, setData } from "./data";
import { putHandler } from "./casino";

const mainButton = document.querySelector('.click');
const points = document.querySelector('.points');
const doubleButton = document.querySelector('.double-click');
const autoClickButton = document.querySelector('.auto-click');
const reset = document.querySelector('.reset');
const updateIntervalButton = document.querySelector('.update-interval');
const updateIntervalCostText = document.querySelector('.cost');
const shopButton = document.querySelector('.shop-button');
const modal = document.querySelector('.modal-bg');
const closeModal = document.querySelector('.close-modal');
const form = document.querySelector('form');

let count = getData('count');
let strong = getData('strong');
// let strong = 100;
let isAutoClickButtonActive = getData('autoclick');

let intervalId = null;
let autoClickTime = getData('autoclickTime');
let updateIntervalCount = getData('updateCount');
let isUptadeDisabled = getData('update'); 

points.textContent = count;

if (isAutoClickButtonActive) {
  startAutoclick();
};

function updatePoints(value = 0) {
  count += value;
  setData('count', count);
  points.textContent = count;

  if (strong === 1 && count >= COSTS.DOUBLE_BUTTON) {
      doubleButton.disabled = false;
  }else{
      doubleButton.disabled = true;
  };
  
  if (!isAutoClickButtonActive && count >= COSTS.AUTO_CLICK) {
      autoClickButton.disabled = false;
  }else{
      autoClickButton.disabled = true;
  };

  if (
    !isUptadeDisabled && 
    updateIntervalCostText.textContent <= count && 
    isAutoClickButtonActive
  ) {
    updateIntervalButton.disabled = false;
  }else {
    updateIntervalButton.disabled = true;
  }
};

function startAutoclick() {
  intervalId = setTimeout(function timeout () {
      updatePoints(1);
      intervalId = setTimeout(timeout, autoClickTime);
  }, autoClickTime);
};

const mainButtonClickHandler = () => {
  updatePoints(strong);
};

const doubleButtonClickHandler = () => {
  strong = 2;
  setData('strong', strong);
  updatePoints(-COSTS.DOUBLE_BUTTON);
};

const autoClickButtonClickHandler = () => {
  intervalId = setTimeout(function timeout () {
      updatePoints(1);
      intervalId = setTimeout(timeout, autoClickTime);
  }, autoClickTime);

  isAutoClickButtonActive = 1;
  setData('autoclick', 1);
  updatePoints(-COSTS.AUTO_CLICK);
};

const resetHandler = () => {
  count = Number(resetData('count'));
  strong = Number(resetData('strong'));
  isAutoClickButtonActive = resetData('autoclick');

  updatePoints();
  clearTimeout(intervalId);
};

const updateIntervalButtonClickHandler = () => {
  if (updateIntervalCount === 3) {
    updateIntervalButton.disabled = true;
    isUptadeDisabled = setData('update', 1);
    updateIntervalCostText.textContent = '-';
    return;
  };

  let updateCost = Number(updateIntervalCostText.textContent);
  updatePoints(-updateCost);
  updateIntervalCostText.textContent = updateCost * 2;
  autoClickTime -= 1000;
  updateIntervalCount ++;
  setData('updateCount', updateIntervalCount);
};

const shopButtonClickHandler = () => {
  modal.classList.remove('hidden');
};

const closeModalHandler = () => {
  modal.classList.add('hidden');
};

mainButton.addEventListener('click', mainButtonClickHandler);
doubleButton.addEventListener('click', doubleButtonClickHandler);
autoClickButton.addEventListener('click', autoClickButtonClickHandler);
reset.addEventListener('click', resetHandler);
updateIntervalButton.addEventListener('click', updateIntervalButtonClickHandler);
shopButton.addEventListener('click', shopButtonClickHandler);
closeModal.addEventListener('click', closeModalHandler);
form.addEventListener('submit', async (evt) => {
    const value = await putHandler(evt, count);
    updatePoints(value);
});
