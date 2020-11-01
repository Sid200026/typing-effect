import React from "react";
import { TypingStep } from "../components/TypingStep.jsx";

const sequence = [
  {
    content: "Typing-Effect provides to fucntionality",
  },
  {
    content: 100, // 100ms delay
  },
  {
    content: -16, // Delete 16 characters
  },
  {
    content: 200, // 200ms delay
  },
  {
    content: "two components : \n1. <Typing />\n2. <TypingStep />",
  },
];

const Example4 = (props) => (
  <>
    <h3>Step-Wise Typing</h3>
    <TypingStep sequence={sequence} />
    <a
      target="_blank"
      rel="noreferrer"
      href="https://github.com/Sid200026/typing-effect/blob/master/src/examples/Example4.jsx"
    >
      <button>View Code</button>
    </a>
    <button onClick={props.resetFunc}>Reset</button>
  </>
);

export default Example4;
