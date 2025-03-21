import { randomInteger } from './util.js';

const rate = document.querySelector('input[type="number"]');
const roulet = document.querySelector('.roulet');

function setRoulet() {
    const colors = {
        1: 'rgb(255, 0, 0)',
        2: 'rgb(0, 0, 0)',
    };

    return colors[randomInteger(1, 2)];
};

async function startRoulet() {
    let currentTime = 5;

    while (currentTime <= 700) {
        await new Promise(resolve => setTimeout(resolve, currentTime));
        roulet.classList.toggle('red');
        currentTime *= 1.1;
    }
    
    const rouletColor = setRoulet();
    const currentColor = window.getComputedStyle(roulet).getPropertyValue('background-color');
    if (rouletColor !== currentColor){
        roulet.classList.toggle('red');
    }

    return rouletColor;
};

const putHandler = async (evt, coins) => {
    evt.preventDefault();
    const rateValue = Number(rate.value);

    if (rateValue > coins) {
        alert('Ставка слишком высока');
        return;
    };

    const color = document.querySelector('input[type="radio"]:checked').value;
    const rouletColor = await startRoulet();

    return color === rouletColor? rateValue: -rateValue;
};

export {putHandler}
