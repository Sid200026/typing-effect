import React from "react";
import PropTypes from "prop-types";
import { initialConfig } from "./lib/config";
import { TypingStep as LibTypingStep } from "./lib/TypingStep.jsx";

/**
 * @class TypingStep
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
class TypingStep extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    const { sequence } = this.props;
    return <LibTypingStep {...this.props} key={sequence} />;
  }
}

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
