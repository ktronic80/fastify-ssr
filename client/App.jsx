import React, { useState } from "react";

export default function App() {
  const [counter, setCounter] = useState(0);

  return (
    <button onClick={() => { setCounter(counter + 1) }}>Counter: {counter}</button>
  )
}