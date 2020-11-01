import React from "react";
import { Typing as LibTyping } from "./lib/Typing.jsx";

/**
 *
 * An utility React Component that automatically sets the property of the actual Typing Component
 * Although setting key unnecessarily can cause perfomance issues, typing-effect library is mostly
 * designed for static usage. Even for dynamic usage, it won't have a deep DOM tree structure to
 * re-render everytime.
 */

const Typing = (props) => {
  return <LibTyping {...props} key={Math.random()} />;
};

export { Typing };
