import React from "react";
import { Typing } from "../components/Typing.jsx";

const App = () => {
  return (
    <Typing
      text={["lorem ipsum solor dot amet", "Lol me"]}
      typeSpeed={50}
      ignoreInitialDelay={false}
      suppressEmptyArray
      element="h2"
      styleClass="lolme"
      letterSpacing={0.01}
      cursorThickness={0.12}
    />
  );
};

export { App };
