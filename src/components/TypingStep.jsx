import React from "react";
import { TypingStep as LibTypingStep } from "./lib/TypingStep.jsx";

/**
 *
 * An utility React Component that automatically sets the property of the actual TypingStep Component
 * Although setting key unnecessarily can cause perfomance issues, typing-effect library is mostly
 * designed for static usage. Even for dynamic usage, it won't have a deep DOM tree structure to
 * re-render everytime.
 */

const TypingStep = (props) => {
  return <LibTypingStep {...props} key={Math.random()} />;
};

export { TypingStep };
