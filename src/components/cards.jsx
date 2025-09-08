import React, { useEffect, useState } from "react";
import '../styles/card.css'

export default function Cards({ score, setScore, highScore, setHighScore }) {

  const [monsterArray, setMonsterArray] = useState([]);
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState([])

  useEffect(() => {
    const monsterNames = [
      "adult-bronze-dragon","air-elemental","animated-armor","basilisk","bandit",
      "bugbear","centaur","dire-wolf","djinni","drow","ghost","roc"
    ];

    (async () => {
      try {
        const results = await Promise.all(
          monsterNames.map(async (name) => {
            const m = await getData(name);
            if (!m) return null;
            return {
              name: m.name,
              image: m.image ? `https://www.dnd5eapi.co${m.image}` : null,
            };
          })
        );
        const shuffledArray = shuffleArray(results)
        setMonsterArray(shuffledArray);
      } catch (e) {
        setError(String(e.message || e));
      }
    })();
  }, []);

  const getData = async (name) => {
    const res = await fetch(`https://www.dnd5eapi.co/api/2014/monsters/${name}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  const shuffleArray = (array) => {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  
  if (error) return <div>Error: {error}</div>;
  if (!monsterArray.length) return <div>Loading…</div>;

  const handleClick = (name) => {
     if (clicked.includes(name)) {
        if (score > highScore) {
            setHighScore(score);
        }
        alert(`Game Over!\nScore: ${score}\nHighScore: ${highScore}`);
        resetGame();
        return;

    }
    setScore((s) => s + 1);
    setClicked((prev) => [...prev,name]);
    setTimeout(() => {setMonsterArray((prev) => shuffleArray(prev))}, 250);

  }

  const resetGame = () => {
    setClicked([]);
    setScore(0);
    setMonsterArray((prev) => shuffleArray(prev));
  }
  
  return (
    <div id="cardCtr">
      {monsterArray.map((m) => (
        <div key={m.name} className="card" onClick={() => handleClick(m.name)}>
          {m.image && <img className="cardImg" src={m.image} alt={m.name} />}
          <h4 className="cardText">{m.name}</h4>
        </div>
      ))}
    </div>
  );
}