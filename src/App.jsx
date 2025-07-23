import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [gameResult, setGameResult] = useState('');

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // satırlar
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // sütunlar
      [0, 4, 8], [2, 4, 6] // çaprazlar
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setShowModal(false);
    setGameResult('');
  };

  // Oyun sonucu kontrol et
  useEffect(() => {
    const winner = calculateWinner(board);
    const isBoardFull = board.every(square => square !== null);
    
    if (winner) {
      setGameResult(`🎉 ${winner} Kazandı! 🎉`);
      setTimeout(() => setShowModal(true), 500);
    } else if (isBoardFull) {
      setGameResult('🤝 Berabere! 🤝');
      setTimeout(() => setShowModal(true), 500);
    }
  }, [board]);

  const winner = calculateWinner(board);
  const isBoardFull = board.every(square => square !== null);
  
  let status;
  if (winner) {
    status = `🏆 Kazanan: ${winner}`;
  } else if (isBoardFull) {
    status = '🤝 Berabere!';
  } else {
    status = `🎯 Sıra: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="app">
      <div className="game-container">
        <h1 className="game-title">⚡ XOX Oyunu ⚡</h1>
        <div className="status">{status}</div>
        
        <div className="board">
          {board.map((square, index) => (
            <button
              key={index}
              className={`square ${square ? 'filled' : ''} ${square === 'X' ? 'x-player' : square === 'O' ? 'o-player' : ''}`}
              onClick={() => handleClick(index)}
            >
              <span className="square-content">{square}</span>
            </button>
          ))}
        </div>
        
        <button className="reset-button" onClick={resetGame}>
          🔄 Yeniden Başla
        </button>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Oyun Bitti!</h2>
            <p className="modal-message">{gameResult}</p>
            <div className="modal-buttons">
              <button className="modal-button play-again" onClick={resetGame}>
                🎮 Tekrar Oyna
              </button>
              <button className="modal-button close" onClick={() => setShowModal(false)}>
                ❌ Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;