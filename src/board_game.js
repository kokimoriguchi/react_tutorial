export default function Game() {
  return (
    <>
      <div className="board-row">
        <Square value='1'/>
        <Square value='2'/>
        <Square />
      </div>
      <div className="board-row">
        <Square value=""/>
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}

//propsとしてvalueを受け取りreturnで表示している。
export function Square({value}) {
  return  <button className="square">{value}</button>
}