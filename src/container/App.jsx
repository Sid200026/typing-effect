import React from "react";
import { Typing } from "../components/Typing.jsx";
import "./App.css";

// Demo Code to use Typing Component

const App = () => {
  return (
    <>
      <Typing
        text={[
          "lorem ipsum solor dot amet",
          "Lol me lorem ipsum solor dot amet",
        ]}
        typeSpeed={10}
        ignoreInitialDelay={false}
        suppressEmptyArray
        element="h2"
        styleClass="special_class"
        letterSpacing={0.01}
        cursorThickness={0.12}
        cursorColor="red"
        deleteSpeed={10}
        blinkingSpeed={1000}
        disableBlinkingOnEnd={5}
      />
    </>
  );
};

export { App };
