import { useState, useEffect, useRef, useCallback, createElement } from "react";
import PropTypes from "prop-types";
import { injectKeyFrame } from "../util/injectStyle";
import "./Typing.css";

/*
 * A UI Component
 */
const Typing = (props) => {
  const {
    text,
    suppressEmptyArray,
    timeDelay,
    ignoreInitialDelay,
    element: htmlElement,
    styleClass,
    letterSpacing,
    cursorThickness,
    cursorColor,
  } = props;

  let firstText = "";
  if (Array.isArray(text)) {
    if (text.length === 0) {
      if (!suppressEmptyArray) {
        throw new Error("Text Array cannot be empty");
      } else {
        if (suppressEmptyArray && ignoreInitialDelay) {
          throw new Error(
            "suppressEmptyArray and ignoreInitialDelay cannot be both true"
          );
        }
        firstText = "";
      }
    } else {
      firstText = text[0];
    }
  } else {
    firstText = text;
  }

  /******************* INITIAL CONFIGURATION *******************/
  const initialState = {
    index: 0,
    text: firstText,
    length: ignoreInitialDelay ? 1 : 0,
  };

  const [currentText, setCurrentText] = useState(initialState);

  const timer = useRef(null);

  // Unmounts the timer on component unmount and
  const unmountTimer = () => {
    const timeoutInfo = timer.current;
    if (timeoutInfo) {
      // Checks if timer has been already been stopped
      timer.current = undefined;
      clearTimeout(timeoutInfo);
    }
  };

  const updateText = useCallback(() => {
    const currentTextContent = currentText.text;
    const currentTextLength = currentText.length;
    if (currentTextContent.length === currentTextLength) {
      if (Array.isArray(text)) {
        const currentIndex = currentText.index;
        if (currentIndex >= text.length - 1) {
          unmountTimer();
          return false;
        } else {
          setCurrentText({
            index: currentIndex + 1,
            text: text[currentIndex + 1],
            length: ignoreInitialDelay ? 1 : 0,
          });
          return true;
        }
      } else {
        return false;
      }
    } else {
      setCurrentText({ ...currentText, length: currentTextLength + 1 });
      return true;
    }
  }, [currentText, text, ignoreInitialDelay]);

  useEffect(() => {
    timer.current = setTimeout(updateText, timeDelay);
    return unmountTimer;
  }, [updateText, timeDelay]);

  // Injects the keyframes on initial render
  useEffect(() => {
    const keyframes = [
      {
        "border-color": ["transparent", "black", "transparent"],
      },
    ];
    injectKeyFrame(keyframes);
  }, []); // To make it behave like componentDidMount

  const stringToRender = currentText.text.substr(0, currentText.length); // Slice a portion of the string

  /******************* STYLE CONFIGURATION *******************/
  const animationStyleConfig = `typing ${timeDelay / 1000}s steps(20, end)`;

  const letterSpacingStyleConfig = `${letterSpacing}em`;

  const borderRightStyleConfig = `${cursorThickness}em solid ${cursorColor}`;

  // Create a React element based on the html element supplied by the user
  const reactElement = createElement(
    htmlElement,
    {
      className: `${styleClass}`,
    },
    <span
      id="typing-effect__sid200026__text" // Should always be unique
      style={{
        animation: animationStyleConfig,
        letterSpacing: letterSpacingStyleConfig,
        borderRight: borderRightStyleConfig,
      }}
    >
      {stringToRender}
    </span>
  );

  return <div className="typing-effect__typewriter">{reactElement}</div>;
};

/******************* PROP VALIDATION *******************/

Typing.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  timeDelay: PropTypes.number,
  suppressEmptyArray: PropTypes.bool,
  ignoreInitialDelay: PropTypes.bool,
  element: PropTypes.string,
  styleClass: PropTypes.string,
  letterSpacing: PropTypes.number,
  cursorThickness: PropTypes.number,
  cursorColor: PropTypes.string,
};

Typing.defaultProps = {
  timeDelay: 50,
  suppressEmptyArray: false,
  ignoreInitialDelay: true,
  element: "h4",
  styleClass: "",
  letterSpacing: 0.05,
  cursorThickness: 0.15,
  cursorColor: "black",
};

export { Typing };
