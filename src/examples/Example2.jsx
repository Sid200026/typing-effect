import React from "react";
import { Typing } from "../components/Typing";

const Example2 = (props) => (
  <>
    <h3>Multiple Text</h3>
    <Typing
      text={[
        "Type some sentences",
        "Then Delete them",
        "Try this cool library out !!",
      ]}
    />
    <a
      target="_blank"
      rel="noreferrer"
      href="https://github.com/Sid200026/typing-effect/blob/master/src/examples/Example2.jsx"
    >
      <button>View Code</button>
    </a>
    <button onClick={props.resetFunc}>Reset</button>
  </>
);

export default Example2;
