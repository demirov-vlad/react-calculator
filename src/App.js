import React from "react";
import './App.css';

// Arrays to hold numbers and operators.
const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const operators = ["/", "*", "-", "+"];

// Mapping of button values to their respective IDs.
const buttonsId = {
  7: "seven",
  8: "eight",
  9: "nine",
  4: "four",
  5: "five",
  6: "six",
  1: "one",
  2: "two",
  3: "three",
  0: "zero",
  "/": "divide",
  "*": "multiply",
  "-": "subtract",
  "+": "add",
};


// Define the main Calculator component.
function Calculator() {
  // Initialize state variables using React hooks
  const [lastPressed, setLastPressed] = React.useState(undefined);
  const [calculate, setCalculate] = React.useState("0");

  // Function to handle button clicks
  const handleClick = (innerText) => {
    switch (innerText) {
      case "AC": {
        // Clear the calculator display
        setCalculate("0");
        break;
      }
      case "=": {
        // Evaluate and display the calculated result
        let evaluated = eval(calculate);
        setCalculate(evaluated.toString());
        break;
      }
      case ".": {
        // Check if a decimal point can be added
        const splitted = calculate.split(/[+\-*/]/);
        const last = splitted.slice(-1)[0];

        if (!last.includes(".")) {
          setCalculate(calculate + ".");
        }
        break;
      }

      default: {
        let element = undefined;
        if (operators.includes(innerText)) {
          // Handle operators and their interactions with previous inputs
          if (operators.includes(lastPressed) && innerText !== "-") {
            const lastId = calculate
                .split("")
                .reverse()
                .findIndex((char) => char !== " " && numbers.includes(+char));
            element =
                calculate.slice(0, calculate.length - lastId) + `${innerText}`;
          } else {
            element = `${calculate}${innerText}`;
          }
        } else {
          // Handle digit inputs
          element = calculate === "0" ? innerText : calculate + innerText;
        }

        // Update the display value
        setCalculate(element);
      }
    }
    // Record the last button pressed
    setLastPressed(innerText);
  };

  // JSX rendering of the calculator UI
  return (
      <div className="calculator">
        <div id="display" className="display">
          {calculate}
        </div>
        <div className="numbers">
          <button className="clear" onClick={() => handleClick("AC")} id="clear">
            AC
          </button>
          {numbers.map((number) => (
              <button
                  className={`${number === 0 && "zero"}`}
                  key={number}
                  onClick={() => handleClick(number.toString())}
                  id={buttonsId[number]}
              >
                {number}
              </button>
          ))}
          <button onClick={() => handleClick(".")} id="decimal">
            .
          </button>
        </div>
        <div className="operators">
          {operators.map((operator) => (
              <button
                  key={operator}
                  onClick={() => handleClick(operator)}
                  id={buttonsId[operator]}
              >
                {operator}
              </button>
          ))}
          <button className="equal" onClick={() => handleClick("=")} id="equals">
            =
          </button>
        </div>
      </div>
  );
}

export default Calculator;
