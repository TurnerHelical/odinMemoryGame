import '../styles/header.css'

function Header({score, highScore}) {
    return <>
        <div id="titleCtr">
            <h1>Odin Memory</h1>
        </div>
        <div id="pointsCtr">
            <h3>Points</h3>
            <p>Score:{score}</p>
            <p>Best Score:{highScore}</p>
        </div>
        </>;
}

export default Header