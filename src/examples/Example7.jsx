import React from "react";
import { TypingStep } from "../components/TypingStep.jsx";

const sequence = [
  {
    content: "foo@bar:~$ ",
    config: {
      typeSpeed: 0,
    },
  },
  {
    content: "git clone https://github.com/Sid200026/typing-effect.git\n",
  },
  {
    content: "Cloning into 'typing-effect'...\n",
    config: {
      typeSpeed: 20,
    },
  },
  {
    content: "foo@bar:~$ ",
    config: {
      typeSpeed: 0,
    },
  },
  {
    content: "cd typing-effect/\n",
  },
  {
    content: "foo@bar:~$ ",
    config: {
      typeSpeed: 0,
    },
  },
  {
    content: "npm install\n",
  },
  {
    content: "foo@bar:~$ ",
    config: {
      typeSpeed: 0,
    },
  },
  {
    content: "npm start",
  },
];

const Example7 = (props) => (
  <>
    <h3 style={{ textAlign: "center" }}>Development Installation</h3>
    <TypingStep sequence={sequence} element="p" typeSpeed={60} />
    <a
      target="_blank"
      rel="noreferrer"
      href="https://github.com/Sid200026/typing-effect/blob/master/src/examples/Example7.jsx"
    >
      <button>View Code</button>
    </a>
    <button onClick={props.resetFunc}>Reset</button>
  </>
);

export default Example7;
