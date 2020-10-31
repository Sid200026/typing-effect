import React from "react";
// import { Typing } from "../components/Typing.jsx";
import { TypingStep } from "../components/TypingStep.jsx";
import "./App.css";

// Demo Code to use Typing Component

const App = () => {
  return (
    <>
      <TypingStep
        sequence={[
          { content: "Hey how re u" },
          { content: -4 },
          { content: 300 },
          { content: " are you doing." },
        ]}
        typeSpeed={60}
        ignoreInitialDelay={false}
        suppressEmptyArray
        element="h3"
        // styleClass="special_class"
        letterSpacing={0.01}
        cursorThickness={0.12}
        cursorColor="black"
        deleteSpeed={60}
        blinkingSpeed={1000}
        disableBlinkingOnEnd={5}
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
