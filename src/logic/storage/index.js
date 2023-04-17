export const saveGameToStorage = ({ board, turn }) => {
  console.log("valor de boad y turn despues: ", board,turn)
  window.localStorage.setItem("board",JSON.stringify(board))
  window.localStorage.setItem("turn", turn)
}

export const resetGameToStorage = () => {
  window.localStorage.clear()
}