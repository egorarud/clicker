import { COSTS } from "./const";
import { getData, resetData, setData } from "./data";

const mainButton = document.querySelector('.click');
const points = document.querySelector('.points');
const doubleButton = document.querySelector('.double-click');
const autoClickButton = document.querySelector('.auto-click');
const reset = document.querySelector('.reset');
const updateIntervalButton = document.querySelector('.update-interval');
const updateIntervalCostText = document.querySelector('.cost');

let count = getData('count');
let strong = getData('strong');
let isAutoClickButtonActive = getData('autoclick');

let intervalId = null;
let autoClickTime = 4000;
let updateIntervalCount = 0;

points.textContent = count;

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
};

const mainButtonClickHandler = () => updatePoints(strong);

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
  switch (updateIntervalCount) {
      case 0:
          updatePoints(-COSTS.UPDATE_INTERVAL);
          updateIntervalCostText.textContent = Number(updateIntervalCostText.textContent) * 2;
          break;

      case 1:
          updatePoints(-COSTS.UPDATE_INTERVAL);
          updateIntervalCostText.textContent = Number(updateIntervalCostText.textContent) * 2;
          break;

      case 2:
          
          break;
  };
};

mainButton.addEventListener('click', mainButtonClickHandler);
doubleButton.addEventListener('click', doubleButtonClickHandler);
autoClickButton.addEventListener('click', autoClickButtonClickHandler);
reset.addEventListener('click', resetHandler);