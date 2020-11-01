import React from "react";
// import { Typing } from "../components/Typing.jsx";
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
        typeSpeed={40}
        ignoreInitialDelay={false}
        suppressEmptyArray
        element="h3"
        letterSpacing={0.01}
        cursorThickness={0.12}
        cursorColor="black"
        deleteSpeed={30}
        blinkingSpeed={1000}
        disableBlinkingOnEnd={false}
      />
      {/* <Typing
        text={[
          "lorem ipsum solor dot amet",
          "Lol me lorem ipsum solor dot amet",
        ]}
        typeSpeed={70}
        ignoreInitialDelay={false}
        suppressEmptyArray
        element="h2"
        styleClass="special_class"
        letterSpacing={0.01}
        cursorThickness={0.12}
        cursorColor="red"
        deleteSpeed={50}
        blinkingSpeed={1000}
        disableBlinkingOnEnd={5}
      /> */}
    </>
  );
};

export { App };
