import React, { useState } from "react";
import { evaluate } from "mathjs";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const clearInput = () => {
    setInput("");
    setResult("");
  };

  const calculateResult = () => {
    try {
      setResult(evaluate(input).toString());
    } catch (err) {
      setResult("Error");
      console.error("Számítási hiba:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px", padding: "20px", borderRadius: "10px", background: "#ffffff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", width: "300px" }}>
      <h2 style={{ color: "#0073e6" }}>Számológép</h2>
      <input type="text" value={input} readOnly style={{ width: "100%", padding: "10px", fontSize: "18px", borderRadius: "5px", border: "2px solid #ccc", textAlign: "right" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginTop: "10px" }}>
        {["1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*", "C", "⌫", "0", "=", "/"].map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (btn === "=") calculateResult();
              else if (btn === "C") clearInput();
              else if (btn === "⌫") handleBackspace();
              else handleClick(btn);
            }}
            style={{ padding: "15px", fontSize: "20px", borderRadius: "5px", backgroundColor: "#0073e6", color: "white", border: "none", cursor: "pointer", transition: "all 0.3s ease-in-out" }}
          >
            {btn}
          </button>
        ))}
      </div>
      <h3 style={{ marginTop: "15px", color: "#0073e6" }}>Eredmény: {result}</h3>
    </div>
  );
};

export default Calculator;
