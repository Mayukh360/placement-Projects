import React, { useRef, useState } from "react";

export default function Calculator() {
  const [enteredNumber1, setEnteredNumber1] = useState();
  const [enteredNumber2, setEnteredNumber2] = useState();
  const [result, setResult] = useState('');

  const changeHandler1 = (event) => {
    setEnteredNumber1(event.target.value);
  };
  const changeHandler2 = (event) => {
    setEnteredNumber2(event.target.value);
  };

  const addhandler = () => {
    console.log(enteredNumber1, enteredNumber2);
    setResult(parseInt(enteredNumber1) + parseInt(enteredNumber2));
   
  };
  const minushandler=()=>{
    setResult(parseInt(enteredNumber1) - parseInt(enteredNumber2));
  }
  const multiplehandler=()=>{
    setResult(parseInt(enteredNumber1) * parseInt(enteredNumber2));
  }
  const dividehandler=()=>{
    setResult(parseInt(enteredNumber1) / parseInt(enteredNumber2));
  }
  return (
    <div>
      <div>
        <label>Number 1</label>
        <input type="number" onChange={changeHandler1} />
        <label>Number 2</label>
        <input type="number" onChange={changeHandler2} />
      </div>
      <button onClick={addhandler}>+</button>
      <button onClick={minushandler}>-</button>
      <button onClick={multiplehandler}>X</button>
      <button onClick={dividehandler}>/</button>
      <h4>{result}</h4>
    </div>
  );
}
