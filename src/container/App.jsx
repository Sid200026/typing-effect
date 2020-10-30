import React from "react";
import { Typing } from "../components/Typing.jsx";

const App = () => {
  return (
    <Typing
      text={["lorem ipsum solor dot amet", "Lol me"]}
      timeDelay={50}
      ignoreInitialDelay={false}
      suppressEmptyArray
      element="h2"
      styleClass="lolme"
      letterSpacing={0.05}
      cursorThickness={0.12}
    />
  );
};

export { App };
