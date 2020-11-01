import React, { useState } from "react";
import Example1 from "../examples/Example1.jsx";
import Example2 from "../examples/Example2.jsx";
import Example3 from "../examples/Example3.jsx";
import Example4 from "../examples/Example4.jsx";
import Example5 from "../examples/Example5.jsx";
import Example6 from "../examples/Example6.jsx";
import Example7 from "../examples/Example7.jsx";

import "./App.css";

// Demo Code to use Typing Component

const App = () => {
  const [key1, updateKey1] = useState("key1");
  const [key2, updateKey2] = useState("key2");
  const [key3, updateKey3] = useState("key3");
  const [key4, updateKey4] = useState("key4");
  const [key5, updateKey5] = useState("key5");
  const [key6, updateKey6] = useState("key6");
  const [key7, updateKey7] = useState("key7");

  return (
    <>
      <div className="example_container">
        <Example1 key={key1} resetFunc={() => updateKey1(key1.concat(1))} />
      </div>
      <div className="example_container">
        <Example2 key={key2} resetFunc={() => updateKey2(key2.concat(2))} />
      </div>
      <div className="example_container">
        <Example3 key={key3} resetFunc={() => updateKey3(key3.concat(3))} />
      </div>
      <div className="example_container">
        <Example4 key={key4} resetFunc={() => updateKey4(key4.concat(4))} />
      </div>
      <div className="example_container">
        <Example5 key={key5} resetFunc={() => updateKey5(key5.concat(5))} />
      </div>
      <div className="example_container">
        <Example6 key={key6} resetFunc={() => updateKey6(key6.concat(6))} />
      </div>
      <div className="example_container">
        <Example7 key={key7} resetFunc={() => updateKey7(key7.concat(7))} />
      </div>
    </>
  );
};

export { App };
