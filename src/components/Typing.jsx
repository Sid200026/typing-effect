import { useState, useEffect, useRef, useCallback, createElement } from "react";
import PropTypes from "prop-types";
import "./Typing.css";

/**
 * A UI Component to render typing-effect
 * 
 * @param {string || array} text
 *  A string or an array of string to be displayed
 * @param {boolean} suppressEmptyArray
 *  Decides whether to throw an error if empty array is passed
 * @param {number} typeSpeed
 *  Typing speed in milliseconds
 * @param {boolean} ignoreInitialDelay
 *  Whether to start with empty render or first letter already rendered
 * @param {string || React Element} element
 *  HTML Element or an user defined React Component
 * @param {string} styleClass
 *  Optional style class to be passed along with the text
 * @param {number} letterSpacing
 *  Space between each letter
 * @param {number} cursorThickness
 *  Thickness of the cursor
 * @param {string} cursorColor
 *  Color of the cursor
 * @param {number} cursorPadding
 *  Distance between last word and cursor
 *
 */
const Typing = (props) => {
  const {
    text,
    suppressEmptyArray,
    typeSpeed,
    ignoreInitialDelay,
    element: htmlElement,
    styleClass,
    letterSpacing,
    cursorThickness,
    cursorColor,
    cursorPadding,
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
    timer.current = setTimeout(updateText, typeSpeed);
    return unmountTimer;
  }, [updateText, typeSpeed]);

  const stringToRender = currentText.text.substr(0, currentText.length); // Slice a portion of the string

  /******************* STYLE CONFIGURATION *******************/
  const animationStyleConfig = `typing ${
    typeSpeed / 1000
  }s steps(20, end), blink 1s steps(1) infinite`;

  const letterSpacingStyleConfig = `${letterSpacing}em`;

  const borderRightStyleConfig = `${cursorThickness}em solid ${cursorColor}`;

  const paddingRightStyleConfig = `${cursorPadding}em`;

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
        paddingRight: paddingRightStyleConfig,
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
  typeSpeed: PropTypes.number,
  suppressEmptyArray: PropTypes.bool,
  ignoreInitialDelay: PropTypes.bool,
  element: PropTypes.oneOf([PropTypes.string, PropTypes.element]),
  styleClass: PropTypes.string,
  letterSpacing: PropTypes.number,
  cursorThickness: PropTypes.number,
  cursorColor: PropTypes.string,
  cursorPadding: PropTypes.number,
};

Typing.defaultProps = {
  typeSpeed: 50,
  suppressEmptyArray: false,
  ignoreInitialDelay: true,
  element: "h4",
  styleClass: "",
  letterSpacing: 0.0,
  cursorThickness: 0.15,
  cursorColor: "black",
  cursorPadding: 0.1,
};

export { Typing };
