// Injects keyframes dynamically to the text
const injectKeyFrame = (style) => {
  const styleElement = document.querySelector(
    "#typing-effect__sid200026__text" // Should always be unique
  );

  const options = {
    id: "blink-caret",
    duration: 1,
    iterations: Infinity,
  };

  styleElement.animate(style, options);
};

export { injectKeyFrame };
