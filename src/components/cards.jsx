import {React,useState} from 'react'

import '../styles/card.css'

function Cards() {
    
    const getData = async () => {
        let url = "https://www.dnd5eapi.co/api/2014/monsters/adult-bronze-dragon";
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

    const buildArray = async () => {
        let monsterArray = [];
        while (monsterArray.length < 13) {
            let monster = await getData();
            monsterArray.push(monster)
        }         
        console.log(monsterArray);
    }

    return (
        <div>
            <img />
            <h4 onClick={buildArray}>name</h4>
        </div>
    );
}
export default Cards;