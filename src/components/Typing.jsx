import { useState, useEffect, useRef, useCallback, createElement } from "react";
import PropTypes from "prop-types";
import "./Typing.css";

/**
 * @function Typing
 * An UI Component to render typing-effect
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
 * @param {boolean} shouldDelete
 *  Should display delete animation
 * @param {number} deleteSpeed
 *  Delete speed in milliseconds
 * @param {number} blinkingSpeed
 *  Blinking speed of cursor in milliseconds
 * @param {boolean || number} disableBlinkingOnEnd
 *  Disable blinking on end or wait for a few blinks
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
    shouldDelete,
    deleteSpeed,
    blinkingSpeed,
    disableBlinkingOnEnd,
  } = props;

  let firstText = "";
  if (Array.isArray(text)) {
    // Checks if array of text is passed
    if (text.length === 0) {
      // If array is empty either ignore or throw error
      if (!suppressEmptyArray) {
        throw new Error("Text Array cannot be empty");
      } else {
        if (suppressEmptyArray && ignoreInitialDelay) {
          // Cannot suppressEmptyArray and ignoreInitialDelay
          throw new Error(
            "suppressEmptyArray and ignoreInitialDelay cannot be both true"
          );
        }
        firstText = ""; // If suppressEmptyArray is set
      }
    } else {
      firstText = text[0]; // Choose the first text in the array
    }
  } else {
    firstText = text; // If a string is passed
  }

  /******************* INITIAL CONFIGURATION *******************/
  const initialState = {
    index: 0,
    text: firstText,
    length: ignoreInitialDelay ? 1 : 0,
    isDeleting: false,
  };

  const [currentText, setCurrentText] = useState(initialState);
  const [isComplete, setIsComplete] = useState(false);

  const timer = useRef(null);

  // Unmounts the timer on component unmount
  const unmountTimer = () => {
    const timeoutInfo = timer.current;
    if (timeoutInfo) {
      // Checks if timer has been already been stopped
      timer.current = undefined;
      clearTimeout(timeoutInfo);
    }
  };

  // React Callback function used to update the rendered text
  const updateText = useCallback(() => {
    const currentTextContent = currentText.text;
    const currentTextLength = currentText.length;
    const currentIndex = currentText.index;

    if (currentTextContent.length === currentTextLength) {
      // Check if end of text has been reached
      if (Array.isArray(text)) {
        // If array go for the next text
        if (currentIndex >= text.length - 1) {
          // If it was the last text in the array
          setIsComplete(true);
          unmountTimer();
          return false;
        } else {
          if (shouldDelete) {
            // If shouldDelete is true, start deleting characters
            setCurrentText({
              ...currentText,
              length: currentTextLength - 1,
              isDeleting: true,
            }); // Start decrementing the length
          } else {
            setCurrentText({
              index: currentIndex + 1,
              text: text[currentIndex + 1],
              length: ignoreInitialDelay ? 1 : 0,
              isDeleting: false,
            });
          }
          return true;
        }
      } else {
        // If for a string, the entire text is covered unmount timer
        setIsComplete(true);
        unmountTimer();
        return false;
      }
    }
    if (currentTextLength === 0 && currentText.isDeleting) {
      // Entire text has been deleted then switch to the next text
      setCurrentText({
        index: currentIndex + 1,
        text: text[currentIndex + 1],
        length: ignoreInitialDelay ? 1 : 0,
        isDeleting: false,
      });
      return true;
    }
    if (currentText.isDeleting) {
      setCurrentText({ ...currentText, length: currentTextLength - 1 }); // Decrement the length in other case
    } else {
      setCurrentText({ ...currentText, length: currentTextLength + 1 }); // Increment the length in other case
    }
    return true;
  }, [currentText, text, shouldDelete, ignoreInitialDelay]);

  // Decide whether to set delete speed or type speed
  const setTimeOutSpeed = currentText.isDeleting ? deleteSpeed : typeSpeed;

  useEffect(() => {
    timer.current = setTimeout(updateText, setTimeOutSpeed);
    return unmountTimer;
  }, [updateText, setTimeOutSpeed]);

  const stringToRender = currentText.text.substr(0, currentText.length); // Slice a portion of the string

  /******************* STYLE CONFIGURATION *******************/

  let animationStyleConfig = "";

  if (isComplete) {
    if (typeof disableBlinkingOnEnd === "boolean") {
      // Check if a boolean value is passed
      if (disableBlinkingOnEnd) {
        // Disable blinking right away
        animationStyleConfig = `typing ${
          typeSpeed / 1000
        }s steps(20, end), stop-blink ${
          blinkingSpeed / 1000
        }s steps(1) infinite`;
      } else {
        // Do not disable blinking
        animationStyleConfig = `typing ${
          typeSpeed / 1000
        }s steps(20, end), blink ${blinkingSpeed / 1000}s steps(1) infinite`;
      }
    } else {
      // Blink for some time and then stop
      animationStyleConfig = `blink ${
        blinkingSpeed / 1000
      }s steps(1) infinite, stop-blink ${blinkingSpeed / 1000}s ${
        (disableBlinkingOnEnd * blinkingSpeed) / 1000
      }s steps(1) infinite
      `;
    }
  } else {
    // Animation is ongoing. Continue blinking
    animationStyleConfig = `typing ${typeSpeed / 1000}s steps(20, end), blink ${
      blinkingSpeed / 1000
    }s steps(1) infinite`;
  }

  const letterSpacingStyleConfig = `${letterSpacing}em`;

  const borderRightStyleConfig = `${cursorThickness}em solid ${cursorColor}`;

  const paddingRightStyleConfig = `${cursorPadding}em`;

  // Create a React element based on the html element or React Component supplied by the user
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
  element: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  styleClass: PropTypes.string,
  letterSpacing: PropTypes.number,
  cursorThickness: PropTypes.number,
  cursorColor: PropTypes.string,
  cursorPadding: PropTypes.number,
  deleteSpeed: PropTypes.number,
  shouldDelete: PropTypes.bool,
  blinkingSpeed: PropTypes.number,
  disableBlinkingOnEnd: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
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
  shouldDelete: true,
  deleteSpeed: 30,
  blinkingSpeed: 1000,
  disableBlinkingOnEnd: 3,
};

export { Typing };
