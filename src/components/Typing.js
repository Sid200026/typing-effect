import React from "react";
import PropTypes from "prop-types";
import { initialConfig } from "./config";
import { Typing as LibTyping } from "./LibTyping";

class Typing extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    const { text } = this.props;
    return <LibTyping {...this.props} key={text} />;
  }
}

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
  smartBackspace: PropTypes.bool,
};

Typing.defaultProps = {
  typeSpeed: initialConfig.typeSpeed,
  suppressEmptyArray: initialConfig.suppressEmptyArray,
  ignoreInitialDelay: initialConfig.ignoreInitialDelay,
  element: initialConfig.element,
  styleClass: initialConfig.styleClass,
  letterSpacing: initialConfig.letterSpacing,
  cursorThickness: initialConfig.cursorThickness,
  cursorColor: initialConfig.cursorColor,
  cursorPadding: initialConfig.cursorPadding,
  shouldDelete: initialConfig.shouldDelete,
  deleteSpeed: initialConfig.deleteSpeed,
  blinkingSpeed: initialConfig.blinkingSpeed,
  disableBlinkingOnEnd: initialConfig.disableBlinkingOnEnd,
  smartBackspace: initialConfig.smartBackspace,
};

export { Typing };
