import Cards from './cards.jsx'
import '../styles/content.css'
function Content({ score, setScore, highScore, setHighScore }) {

    return <>
            <p>Click on one of the below images, don't click the same image twice!</p>
            <p>Score points for each unique image clicked</p>
            <div>
                <Cards 
                score={score}
                setScore={setScore}
                highScore={highScore}
                setHighScore={setHighScore}
                />
            </div>
    </>

}
export default Content