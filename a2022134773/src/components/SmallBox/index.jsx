import './SmallBox.css';


export function SmallBox({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );

}

 

  