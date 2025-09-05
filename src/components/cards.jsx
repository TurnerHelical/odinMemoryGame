import {React} from 'react'

import '../styles/card.css'

function Cards() {

    const monsterArray = [];
    const clickedCards = [];

    window.onload = async () => {
        let monsterNames = ['adult-bronze-dragon', 'air-elemental', 'animated-armor', 'basilisk', 'bandit', 'bugbear', 'centaur', 'dire-wolf', 'djinni', 'drow', 'ghost', 'roc']
        
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

    const gameplay = () => {
        if (clickedCards.includes(`${this.value}`)) {
            alert('You lose');
        } else {
            //score + 1
            clickedCards.push(`${this.value}`);
            console.log(clickedCards);
        }
    }

    const showArray = () => {
        console.log(monsterArray);
    }
    

    const renderCards = async (array) => {
        const cardCtr = document.querySelector('#cardCtr')
        for (let item of array) {
            const card = document.createElement('div');
            const cardImg = document.createElement('img');
            const cardText = document.createElement('h4');
            card.addEventListener('click', gameplay);
            card.setAttribute('value', `${item.name}`)
            cardImg.setAttribute('class', 'cardImg');
            cardImg.setAttribute('src', `${item.image}`);
            cardText.setAttribute('class', 'cardText');
            cardText.innerHTML = `${item.name}`;
            card.appendChild(cardImg);
            card.appendChild(cardText)
            cardCtr.appendChild(card);
        }
    }

        

    return (
        <div id='cardCtr'>
            <button onClick={showArray}>Show</button>
        </div>
        
    );
}
export default Cards;