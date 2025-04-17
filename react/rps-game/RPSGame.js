import React, { useState } from "react";

const choices = ["Kő", "Papír", "Olló"];

const RPSGame = () => {
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");

  const playGame = (choice) => {
    setPlayerChoice(choice);
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);

    if (choice === randomChoice) {
      setResult("Döntetlen!");
    } else if (
      (choice === "Kő" && randomChoice === "Olló") ||
      (choice === "Papír" && randomChoice === "Kő") ||
      (choice === "Olló" && randomChoice === "Papír")
    ) {
      setResult("Nyertél!");
    } else {
      setResult("Vesztettél!");
    }
  };

  return (
    <div>
      <h2>Kő-Papír-Olló</h2>
      <div>
        {choices.map((choice) => (
          <button key={choice} onClick={() => playGame(choice)}>
            {choice}
          </button>
        ))}
      </div>
      <h3>Te: {playerChoice}</h3>
      <h3>Gép: {computerChoice}</h3>
      <h3>Eredmény: {result}</h3>
    </div>
  );
};

export default RPSGame;
