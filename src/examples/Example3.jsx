import React from "react";
import { Typing } from "../components/Typing.jsx";

const Example3 = (props) => (
  <>
    <h3>Smart Backspace</h3>
    <Typing
      text={[
        "Winner of Football World Cup 2018 is France",
        "Winner of Football World Cup 2014 is Germany",
        "Winner of Cricket World Cup 2019 is England",
        "Winner of Cricket World Cup 2015 is Australia",
      ]}
      smartBackspace
    />
    <a
      target="_blank"
      rel="noreferrer"
      href="https://github.com/Sid200026/typing-effect/blob/master/src/examples/Example3.jsx"
    >
      <button>View Code</button>
    </a>
    <button onClick={props.resetFunc}>Reset</button>
  </>
);

export default Example3;
