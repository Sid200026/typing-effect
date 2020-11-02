import React from "react";
import { TypingStep } from "../components/TypingStep";
import "./Example5.css";

const sequence = [
  {
    content: "Six is less than five",
    config: {
      styleClass: "typing",
    },
  },
  {
    content: 400,
    config: {
      styleClass: "wrong", // Custom Style class
    },
  },
  {
    content: -14,
    config: {
      styleClass: "wrong",
      cursorColor: "red",
    },
  },
  {
    content: 200, // 200ms delay
    config: {
      styleClass: "typing",
    },
  },
  {
    content: "greater than five",
    config: {
      styleClass: "typing",
    },
  },
  {
    content: 100, // 200ms delay
    config: {
      styleClass: "typing",
    },
  },
];

const Example5 = (props) => (
  <>
    <h3 style={{textAlign: "center"}}>Fix your mistakes</h3>
    <TypingStep sequence={sequence} element="h4" styleClass="correct" />
    <a
      target="_blank"
      rel="noreferrer"
      href="https://github.com/Sid200026/typing-effect/blob/master/src/examples/Example5.jsx"
    >
      <button>View Code</button>
    </a>
    <button onClick={props.resetFunc}>Reset</button>
  </>
);

export default Example5;
