import React, { useState } from "react";

function CalculatorApp() {
  const [operation, setOperation] = useState("addition");
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      operation,
      number1: parseFloat(number1),
      number2: parseFloat(number2),
    };

    try {
      const response = await fetch("http://localhost:8000/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
      } else {
        // Handle error response
        setResult("Error: Failed to fetch data from the server");
      }
    } catch (error) {
      // Handle network or other errors
      setResult("Error: " + error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 ">
      <h1 className="text-[100px]">Calculator</h1>
      <form
        className="flex flex-col justify-center items-center gap-10 text-[25px]"
        onSubmit={handleSubmit}
      >
        <label className="flex justify-center items-center gap-2">
          Operation:
          <select
            className="border border-black-300 rounded-lg"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="addition">Addition</option>
            <option value="subtraction">Subtraction</option>
            <option value="multiplication">Multiplication</option>
          </select>
        </label>
        <div className="flex flex-col justify-center items-center gap-5">
          <label className="flex gap-2">
            Enter Number 1:
            <input
              className="border w-[200px] border-black-300  px-2 rounded-lg"
              type="text"
              value={number1}
              placeholder="00"
              onChange={(e) => setNumber1(e.target.value)}
            />
          </label>

          <label className="flex gap-2">
            Enter Number 2:
            <input
              className="border border-black-300 px-2  w-[200px] rounded-lg"
              type="text"
              placeholder="00 "
              value={number2}
              onChange={(e) => setNumber2(e.target.value)}
            />
          </label>
        </div>
        <button
          className=" bg-blue-500  px-8 py-3 rounded-full text-white text-[20px]"
          type="submit"
        >
          Calculate
        </button>
      </form>
      {result !== null && (
        <p className="text-[15px] border  px-8 py-3 rounded-full  border-black-300 ">
          {" "}
          Result: {result}
        </p>
      )}
    </div>
  );
}

export default CalculatorApp;
