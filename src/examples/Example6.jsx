import React from "react";
import { TypingStep } from "../components/TypingStep";
import { HUMAN_TYPING_SPEED } from "../components/constants";
import "./Example6.css";

const sequence = [
  {
    content: "#include<iostream>\n\n",
  },
  {
    content: "using namespace std;\n",
  },
  {
    content: "int main() {\n",
  },
  {
    content: 'cout << "Hello World";\n',
  },
  {
    content: "return 0;\n",
  },
  {
    content: "}",
  },
];

const Example6 = (props) => (
  <>
    <h3 style={{ textAlign: "center" }}>Hello World in Cpp</h3>
    <TypingStep
      sequence={sequence}
      element="p"
      typeSpeed={HUMAN_TYPING_SPEED}
      styleClass="code"
    />
    <a
      target="_blank"
      rel="noreferrer"
      href="https://github.com/Sid200026/typing-effect/blob/master/src/examples/Example6.jsx"
    >
      <button>View Code</button>
    </a>
    <button onClick={props.resetFunc}>Reset</button>
  </>
);

export default Example6;
