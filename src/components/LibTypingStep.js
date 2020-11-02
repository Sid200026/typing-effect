import React, {
  useState,
  useRef,
  createElement,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import { initialConfig } from "./config";
import "./TypingStep.css";

/**
 * @function TypingStep
 * An UI Component to render fully customisable Typing Effect
 *
 * @param {string || array} sequence
 *  An array of commands to be executed
 *      @param {string || number} content
 *          The command to be executed.
 *          * String denotes add command
 *          * Positive number denotes delay command
 *          * Negative number denotes number of characters to delete
 *      @param {object} config
 *          Set of local configurations that overrides global config
 *             @param {number} typeSpeed
 *             @param {string} styleClass
 *             @param {number} letterSpacing
 *             @param {number} cursorThickness
 *             @param {string} cursorColor
 *             @param {number} cursorPadding
 *             @param {number} deleteSpeed
 *             @param {number} blinkingSpeed
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
 *  Distance between last word and cursors
 * @param {number} deleteSpeed
 *  Delete speed in milliseconds
 * @param {number} blinkingSpeed
 *  Blinking speed of cursor in milliseconds
 * @param {boolean || number} disableBlinkingOnEnd
 *  Disable blinking on end or wait for a few blinks
 */

// Commands that can be executed
const ACTIONS = {
  ADD: "ADD",
  DELETE: "DELETE",
  DELAY: "DELAY",
};

const TypingStep = (props) => {
  const {
    sequence,
    typeSpeed,
    ignoreInitialDelay,
    element: htmlElement,
    styleClass,
    letterSpacing,
    cursorThickness,
    cursorColor,
    cursorPadding,
    deleteSpeed,
    blinkingSpeed,
    disableBlinkingOnEnd,
  } = props;

  // Cannot pass empty array
  if (sequence.length === 0) {
    throw new Error("Sequence cannot be an empty array");
  }
  // First argument must be a string
  if (typeof sequence[0].content !== "string") {
    throw new Error("First command must be string");
  }
  // Initial State for sequence configuration
  const initialState = {
    index: 0,
    information: sequence[0],
    length: ignoreInitialDelay ? 1 : 0,
  };
  const initialText = ignoreInitialDelay ? sequence[0].content.charAt(0) : "";
  // Current text that is to be rendered
  const [currentText, setCurrentText] = useState(initialText);
  // Current sequence that is being executed
  const [currentContent, setCurrentContent] = useState(initialState);
  // Whether execution has been completed
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

  /******************* Current Command *******************/

  const getCurrentCommand = (content) => {
    if (typeof content === "string") {
      return ACTIONS.ADD; // String means add command
    } else {
      if (content > 0) {
        return ACTIONS.DELAY; // Positive number means delay
      } else {
        return ACTIONS.DELETE; // Negative number means delete
      }
    }
  };

  const { content } = currentContent.information;

  let CURRENT_COMMAND = getCurrentCommand(content);

  /******************* Current Speed *******************/
  // Local value takes precedence over global values
  let currentTimeOutSpeed = undefined;
  switch (CURRENT_COMMAND) {
    case ACTIONS.ADD: {
      currentTimeOutSpeed = typeSpeed; // Global value
      if (currentContent.information.hasOwnProperty("config")) {
        const { config } = currentContent.information;
        if (config.hasOwnProperty("typeSpeed")) {
          // Check if local value is passed
          const { typeSpeed: currentSequenceTypeSpeed } = config;
          currentTimeOutSpeed = currentSequenceTypeSpeed;
        }
      }
      break;
    }
    case ACTIONS.DELAY: {
      const { information } = currentContent;
      currentTimeOutSpeed = information.content;
      break;
    }
    case ACTIONS.DELETE: {
      currentTimeOutSpeed = deleteSpeed;
      if (currentContent.information.hasOwnProperty("config")) {
        const { config } = currentContent.information;
        if (config.hasOwnProperty("deleteSpeed")) {
          // local value takes precedence
          const { deleteSpeed: currentSequenceDeleteSpeed } = config;
          currentTimeOutSpeed = currentSequenceDeleteSpeed;
        }
      }
      break;
    }
    default: {
      currentTimeOutSpeed = 0; // Should not occur
    }
  }

  // Utility function to change the command
  const switchCommand = useCallback(() => {
    const { index: currentIndex } = currentContent;
    if (currentIndex === sequence.length - 1) {
      // End of commands
      unmountTimer();
      setIsComplete(true);
    } else {
      // Goto next command
      setCurrentContent({
        index: currentIndex + 1,
        information: sequence[currentIndex + 1],
        length: 0, // No need to ignore firstCommandDelay here
      });
    }
  }, [currentContent, sequence]);

  // Function to add text from the current command or switch to the next command
  const addText = useCallback(() => {
    const {
      information: currentCommand,
      length: currentLength,
    } = currentContent;
    if (currentLength === currentCommand.content.length) {
      // If the current command has finished
      switchCommand();
    } else {
      setCurrentContent({ ...currentContent, length: currentLength + 1 });
      const currentString = currentText.concat(
        currentCommand.content.charAt(currentLength) // Concat the current letter
      );
      setCurrentText(currentString); // Update the current string
    }
  }, [currentContent, currentText, switchCommand]);

  // Function to delay execution of the next command
  const delay = useCallback(() => {
    switchCommand(); // The delay is already over by the time this function is called
  }, [switchCommand]);

  // Function to delete text based on the current command
  const deleteText = useCallback(() => {
    const {
      information: currentCommand,
      length: currentLength,
    } = currentContent;
    if (currentLength === Math.abs(currentCommand.content)) {
      switchCommand();
    } else if (currentText.length === 0) {
      // Trying to delete on an empty string
      /* eslint no-console: ["error", { allow: ["warn"] }] */
      console.warn("Trying to delete on an empty string");
      switchCommand();
    } else {
      setCurrentContent({ ...currentContent, length: currentLength + 1 });
      const currentString = currentText.slice(0, currentText.length - 1); // Remove the last character
      setCurrentText(currentString);
    }
  }, [currentContent, currentText, switchCommand]);

  // Decides how to execute the current command
  const executeCommand = useCallback(() => {
    switch (CURRENT_COMMAND) {
      case ACTIONS.ADD: {
        addText();
        break;
      }
      case ACTIONS.DELAY: {
        delay();
        break;
      }
      case ACTIONS.DELETE: {
        deleteText();
        break;
      }
      default: {
        /* eslint no-console: ["error", { allow: ["warn"] }] */
        console.warn("Command not defined"); // Erroneous condition that shouldn't occur
      }
    }
  }, [addText, deleteText, delay, CURRENT_COMMAND]);

  // Execute the command based on the timeout speed
  useEffect(() => {
    timer.current = setTimeout(executeCommand, currentTimeOutSpeed);
    return unmountTimer;
  }, [currentTimeOutSpeed, executeCommand]);

  const stringToRender = currentText;

  /******************* LOCAL CONFIGURATION *******************/

  let typeSpeedCurrent = typeSpeed;
  let blinkingSpeedCurrent = blinkingSpeed;
  let letterSpacingCurrent = letterSpacing;
  let cursorThicknessCurrent = cursorThickness;
  let cursorColorCurrent = cursorColor;
  let cursorPaddingCurrent = cursorPadding;
  let styleClassCurrent = styleClass;

  // Override global configuration if provided
  if (currentContent.information.hasOwnProperty("config")) {
    const { config } = currentContent.information;
    if (config.hasOwnProperty("typeSpeed")) {
      typeSpeedCurrent = config.typeSpeed;
    }
    if (config.hasOwnProperty("blinkingSpeed")) {
      blinkingSpeedCurrent = config.blinkingSpeed;
    }
    if (config.hasOwnProperty("letterSpacing")) {
      letterSpacingCurrent = config.letterSpacing;
    }
    if (config.hasOwnProperty("cursorThickness")) {
      cursorThicknessCurrent = config.cursorThickness;
    }
    if (config.hasOwnProperty("cursorColor")) {
      cursorColorCurrent = config.cursorColor;
    }
    if (config.hasOwnProperty("cursorPadding")) {
      cursorPaddingCurrent = config.cursorPadding;
    }
    if (config.hasOwnProperty("styleClass")) {
      styleClassCurrent = config.styleClass;
    }
  }

  /******************* STYLE CONFIGURATION *******************/

  let animationStyleConfig = "";

  if (isComplete) {
    // Set to global properties on completion
    typeSpeedCurrent = typeSpeed;
    blinkingSpeedCurrent = blinkingSpeed;
    letterSpacingCurrent = letterSpacing;
    cursorThicknessCurrent = cursorThickness;
    cursorColorCurrent = cursorColor;
    cursorPaddingCurrent = cursorPadding;
    styleClassCurrent = styleClass;
    if (typeof disableBlinkingOnEnd === "boolean") {
      // Check if a boolean value is passed
      if (disableBlinkingOnEnd) {
        // Disable blinking right away
        animationStyleConfig = `typing ${
          typeSpeedCurrent / 1000
        }s steps(20, end), stop-blink ${
          blinkingSpeedCurrent / 1000
        }s steps(1) infinite`;
      } else {
        // Do not disable blinking
        animationStyleConfig = `typing ${
          typeSpeedCurrent / 1000
        }s steps(20, end), blink ${
          blinkingSpeedCurrent / 1000
        }s steps(1) infinite`;
      }
    } else {
      // Blink for some time and then stop
      animationStyleConfig = `blink ${
        blinkingSpeedCurrent / 1000
      }s steps(1) infinite, stop-blink ${blinkingSpeedCurrent / 1000}s ${
        (disableBlinkingOnEnd * blinkingSpeedCurrent) / 1000
      }s steps(1) infinite
      `;
    }
  } else {
    // Animation is ongoing. Continue blinking
    animationStyleConfig = `typing ${
      typeSpeedCurrent / 1000
    }s steps(20, end), blink ${blinkingSpeedCurrent / 1000}s steps(1) infinite`;
  }

  const letterSpacingStyleConfig = `${letterSpacingCurrent}em`;

  const borderRightStyleConfig = `${cursorThicknessCurrent}em solid ${cursorColorCurrent}`;

  const paddingRightStyleConfig = `${cursorPaddingCurrent}em`;

  // Create a React element based on the html element or React Component supplied by the user

  const typeWriterText = () => {
    return stringToRender
      .split("\n")
      .filter((ele) => ele.length !== 0)
      .map((ele, index, array) => {
        const returnBorderProperty = () => {
          if (index + 1 === array.length) {
            return borderRightStyleConfig;
          } else {
            return "transparent";
          }
        };
        const reactElement = createElement(
          htmlElement,
          {
            className: `${styleClassCurrent}`,
            key: `${index}`,
          },
          <span
            id="typing-effect__sid200026__text__step" // Should always be unique
            style={{
              animation: animationStyleConfig,
              letterSpacing: letterSpacingStyleConfig,
              borderRight: returnBorderProperty(),
              paddingRight: paddingRightStyleConfig,
            }}
          >
            {ele}
          </span>
        );
        return reactElement;
      });
  };

  return (
    <div className=".typing-effect__typewriter__typing_step">
      {typeWriterText()}
    </div>
  );
};

/******************* PROP VALIDATION *******************/

TypingStep.propTypes = {
  sequence: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      config: PropTypes.shape({
        typeSpeed: PropTypes.number,
        styleClass: PropTypes.string,
        letterSpacing: PropTypes.number,
        cursorThickness: PropTypes.number,
        cursorColor: PropTypes.string,
        cursorPadding: PropTypes.number,
        deleteSpeed: PropTypes.number,
        blinkingSpeed: PropTypes.number,
      }),
    })
  ).isRequired,
  ignoreInitialDelay: PropTypes.bool,
  disableBlinkingOnEnd: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  typeSpeed: PropTypes.number,
  element: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  styleClass: PropTypes.string,
  letterSpacing: PropTypes.number,
  cursorThickness: PropTypes.number,
  cursorColor: PropTypes.string,
  cursorPadding: PropTypes.number,
  deleteSpeed: PropTypes.number,
  blinkingSpeed: PropTypes.number,
};

TypingStep.defaultProps = {
  typeSpeed: initialConfig.typeSpeed,
  ignoreInitialDelay: initialConfig.ignoreInitialDelay,
  element: initialConfig.element,
  styleClass: initialConfig.styleClass,
  letterSpacing: initialConfig.letterSpacing,
  cursorThickness: initialConfig.cursorThickness,
  cursorColor: initialConfig.cursorColor,
  cursorPadding: initialConfig.cursorPadding,
  deleteSpeed: initialConfig.deleteSpeed,
  blinkingSpeed: initialConfig.blinkingSpeed,
  disableBlinkingOnEnd: initialConfig.disableBlinkingOnEnd,
};

export { TypingStep };
