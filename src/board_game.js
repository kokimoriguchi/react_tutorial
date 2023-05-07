import { useState } from "react";

//propsとしてvalueとonSquareClickを受け取るようにしているSquare関数。button表している。
//クリックされるとGame関数にstate更新要求している形
export function Square({value, onSquareClick}) {
  return(
    <button className="square" onClick={onSquareClick}>{value}</button>
  )
}

//Array.fill は、配列の全要素に同じ値を設定する関数です。 以下の例では、9個の数値配列を生成して値nullで初期化しています。
//['O', null, 'X', 'X', 'X', 'O', 'O', null, null]この形がsquare変数に入っている。初期値は中身null。
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  //iで受け取った引数をslice関数で一致した配列の部分取り出しnextSquares変数に入れる。
  //その配列にXを入れて新しいsetSquares関数の引数としてnextSquaresを返す。
  //xIsNext変数がtrueであればxを返す初期値trueなので必ずx。最後にtrue反転させるために!で次はfalseになる。
  //最初のIFでsquaresがnullじゃないもしくはcalculateWinnerがtrueであれば関数抜けるようにしている
  function handleClick(i){
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  //勝敗決める関数呼び出して次進むのかどうかの判断
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  //squaresで配列を取りどの四角が押されたかの判別している。その結果のvalueは各squareに格納。
  //onSquareClickにはhandleClick関数を投げる実行結果が返ってくる。この二つのpropsがSquareのprops引数になる。
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

//勝敗決める関数
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}