import React from 'react';
import './ResetButton.css';

export default function ResetButton({ onResetClick }) {
  return (
    <button className="reset" onClick={onResetClick}>New Game</button>
  );
}
