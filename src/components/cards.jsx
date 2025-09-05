import {React} from 'react'

import '../styles/card.css'

function Cards() {
    
    const getData = async (character) => {
        let url = `https://www.dnd5eapi.co/api/2014/monsters/${character}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            return result
        } catch (error) {
            console.error(error.message);
        }
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]
        }
        return array;
    }

    const renderCards = async (array) => {
        const cardCtr = document.querySelector('#cardCtr')
        for (let item of array) {
            const card = document.createElement('div');
            const cardImg = document.createElement('img');
            const cardText = document.createElement('h4');
            cardImg.setAttribute('class', 'cardImg');
            cardImg.setAttribute('src', `${item.image}`);
            cardText.setAttribute('class', 'cardText');
            cardText.innerHTML = `${item.name}`;
            card.appendChild(cardImg);
            card.appendChild(cardText)
            cardCtr.appendChild(card);
        }
    }

    const buildArray = async () => {
        let monsterNames = ['adult-bronze-dragon', 'air-elemental', 'animated-armor', 'basilisk', 'bandit', 'bugbear', 'centaur', 'dire-wolf', 'djinni', 'drow', 'ghost', 'roc']
        let monsterArray = [];
        for (let monsterName of monsterNames) {
            let monster = await getData(monsterName);
            let monsterObj = {
                name: monster.name,
                image: `https://www.dnd5eapi.co${monster.image}` 
            }
            monsterArray.push(monsterObj)
        }             
        shuffleArray(monsterArray);
        renderCards(monsterArray);
    }

    return (
        <div id='cardCtr'>
            <img />
            <h4 onClick={buildArray}>name</h4>
        </div>
    );
}
export default Cards;