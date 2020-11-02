import React from "react";
import { Typing } from "../components/Typing";

const Example1 = (props) => (
  <>
    <h3>Basic Example</h3>
    <Typing text="typing-effect is a React Component made with ❤️" />
    <a
      target="_blank"
      rel="noreferrer"
      href="https://github.com/Sid200026/typing-effect/blob/master/src/examples/Example1.jsx"
    >
      <button>View Code</button>
    </a>
    <button onClick={() => props.resetFunc()}>Reset</button>
  </>
);

export default Example1;
