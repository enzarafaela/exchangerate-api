import Swal from 'sweetalert2';
import './style.css';

const BASE_URL = 'https://v6.exchangerate-api.com/v6/';
const TOKEN = '556008083dde48782f18dfdd';

const titleCoins = document.querySelector('.title_coins');
const coins = document.querySelector('.coins');
const searchBtn = document.querySelector('.button_search');
const searchInput = document.querySelector('.input_search');

const riseError = (error) => {
    Swal.fire({
        title: 'Erro',
        text: error,
        icon: 'error',
    });
};

const createTitle = (baseCode) => {
    titleCoins.innerHTML = `<h2>Valores referentes a 1 ${baseCode}</h2>`;
    console.log(titleCoins);
};

const createElement = (element) => {
    const container = document.createElement('div');
    container.classList.add('currency__rate');
    container.innerHTML = `
        <span class="currency">${element[0]}:</span>
        <span class="value">${(element[1].toFixed(2).replace('.', ','))}</span>
    `;
    return container;
};

const createCoins = (data) => {
    data.forEach((element) => coins.appendChild(createElement(element)));
};

const clearRates = () => {
    titleCoins.innerHTML = '';
    coins.innerHTML = '';
};

const handleSearch = (event) => {
    event.preventDefault();

    try {
        validatedCoin(searchInput.value);
        findRates(searchInput.value);
    } catch (error) {
        riseError(error);
    }
};

const validatedCoin = (coin) => {
    if (!coin) {
        throw new Error ('Você precisa digitar uma moeda!');
    }
};

const findRates = (coin) => {
    return fetch(`${BASE_URL}${TOKEN}/latest/${coin}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error ('Moeda não encontrada!');
            }
            return response.json();
        })
        .then((data) => {
            const { conversion_rates } = data;
            clearRates();
            createTitle(searchInput.value);
            createCoins((Object.entries(conversion_rates)));
        })
        .catch((error) => riseError(error));
};

searchBtn.addEventListener('click', handleSearch);
