import './App.css'
import  Header  from './components/header'
import Content from './components/content'
import { React, useState } from 'react'

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  return (
    <>
      <header>
        <Header score={score} highScore={highScore}/>
      </header>
      <main>
        <Content 
          score={score}
          setScore={setScore}
          highScore={highScore}
          setHighScore={setHighScore}
        />
      </main>
    </>
  )
}

export default App
