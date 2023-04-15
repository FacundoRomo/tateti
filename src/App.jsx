import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './component/Square/Square'
import { TURNS } from './constantes'
import { checkWinner, checkEndGame } from "./logic/board"
import { WinnerModal } from './component/WinnerModal/WinnerModal'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem("board")
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() =>{
    const turnFromLocalStorage = window.localStorage.getItem("turn")
    return turnFromLocalStorage ? turnFromLocalStorage : TURNS.X
  })
  const [winner, setWinner]= useState(null)

  

  const updateBoard = (index) =>{
    if (board[index] || winner) return
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    const newBoard=[...board]
    newBoard[index]= turn
    setBoard(newBoard)
    window.localStorage.setItem("board", JSON.stringify(newBoard))
    window.localStorage.setItem("turn", newTurn)
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      setWinner(newWinner)
      confetti()
    }else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.clear()
  }


  return(
  <main className="board">
    <h1>Ta te ti</h1>
    <button onClick={resetGame}>Empezar de nuevo</button>
    <section className="game">
      {
        board.map((_ , index) =>{
          return(
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
          )
        })
      }
    </section>
    <section className="turn">
      <Square isSelected={turn === TURNS.X}>
        {TURNS.X}
      </Square>
      <Square isSelected={turn===TURNS.O}>
        {TURNS.O}
      </Square>
    </section>
    <WinnerModal 
    resetGame={resetGame}
    winner={winner} />
  </main>
  
)}

export default App
