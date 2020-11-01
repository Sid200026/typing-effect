import React from "react";
import { Typing } from "../components/Typing.jsx";
import { TypingStep } from "../components/TypingStep.jsx";
import "./App.css";

// Demo Code to use Typing Component

const App = () => {
  const sequence = [
    { content: "Hey how re\n u doin", config: { cursorColor: "orange" } },
    { content: 130 },
    { content: -10 },
    { content: 250 },
    { content: " are you doing." },
  ];
  return (
    <>
      <TypingStep
        sequence={sequence}
      />
      <Typing
        text={[
          "I'm a full stack web developer",
          "I'm a cyber security enthusiast",
          "I'm an open-source enthusiast",
        ]}
      />
    </>
  );
};

export { App };
