# Typing-Effect

[![Netlify Status](https://api.netlify.com/api/v1/badges/9b3ccc0b-5eb9-4a14-a66f-b8b9a66dfcc5/deploy-status)](https://app.netlify.com/sites/typing-effect-sid200026/deploys)
<img src="https://img.shields.io/badge/typing--effect-react-lightblue" alt="React" />
[![npm version](https://badge.fury.io/js/typing-effect-reactjs.svg)](https://badge.fury.io/js/typing-effect-reactjs)
<img src="https://img.shields.io/npm/dm/typing-effect-reactjs" alt="Downloads" />
<img src="https://img.shields.io/bundlephobia/minzip/typing-effect-reactjs" alt="Size" />
[![NPM](https://nodei.co/npm/typing-effect-reactjs.png)](https://npmjs.org/package/typing-effect-reactjs)

<img src="https://github.com/Sid200026/typing-effect/blob/master/docs/demo.gif" width="650"/>

<a href="https://typing-effect-sid200026.netlify.app/">View Demo</a> ||
<a href="https://sid200026.github.io/typing-effect/">Documentation</a>

---

### Table of Contents

- [ Introduction ](#introduction)
- [ Installation](#installation)
- [ Documentation](#documentation)
  - [ Typing Component](#typing)
  - [ TypingStep Component](#typingstep)

---

<a name="introduction" />

## Introduction

Typing-Effect is an UI Component for **React** which provides elegant typing effects with a very few lines of code. Typing-Effect provides an effective way in

**Current Features**

<pre>
✅  Full Control over your animations  
✅  Easy delete  
✅  Smart Backspacing  
✅  No external CSS or JS dependency  
</pre>

**Upcoming Features**

<pre>
🙆  Embedding html tags inside strings  
🙆  Insert at specific position  
</pre>

---

<a name="installation" />

## Installation

**Install via npm**

```bash
npm install typing-effect-reactjs
```

**Development Installation**

```bash
git clone https://github.com/Sid200026/typing-effect.git
cd typing-effect/
npm install
npm start
```

**Import**

```jsx
import {Typing, TypingStep} from "typing-effect-reactjs";
```

---

<a name="documentation" />

## Documentation

Typing-Effect library provides 2 UI Components that can be used to render aesthetically pleasing yet elegant typing effects

1. <Typing /> : A simple UI Component that will satisfy the requirements 90% of the time
2. <TypingStep /> : Fully customisable UI Component for advanced use cases

<a name="typing" />

### Typing Component

Typing Component operates at sentence level ie. it does not support character operations. An example of character operations can be typing some text then deleting 2 characters and then adding some more. For this usecase, `<TypingStep>` component was developed. For most of the other use cases, `<Typing>` component suffices.

**Examples**

```jsx
<Typing text="typing-effect is a React Component made with <3" />
```

```jsx
<Typing
  text={[
    "Winner of Football World Cup 2018 is France",
    "Winner of Football World Cup 2014 is Germany",
    "Winner of Cricket World Cup 2019 is England",
    "Winner of Cricket World Cup 2015 is Australia",
  ]}
  smartBackspace
/>
```

**Props**

|      Prop Name       |         Prop Type         |                                                Description                                                 | Default Value |
| :------------------: | :-----------------------: | :--------------------------------------------------------------------------------------------------------: | :-----------: |
|         text         |      array or string      |                           An array of text or a string that needs to be rendered                           |   Required    |
|  suppressEmptyArray  |          boolean          |               Whether to raise an error if text array is empty ( Not applicable for string )               |     false     |
|  ignoreInitialDelay  |          boolean          |           Whether to initially render the first character ( set as true to render immediately )            |     true      |
|       element        | string or React Component |                          HTML Element or React Component used to render the text                           |      h4       |
|      styleClass      |          string           |                            Any style class to be added to the rendered element                             |      ""       |
|      typeSpeed       |          number           |                                   Speed at which to type in milliseconds                                   |      40       |
|     deleteSpeed      |          number           |                                  Speed at which to delete in milliseconds                                  |      30       |
|    letterSpacing     |          number           |                                   Spacing between the rendered elements                                    |       0       |
|   cursorThickness    |          number           |                                          Thickness of the cursor                                           |     0.15      |
|     cursorColor      |          string           |                                            Color of the cursor                                             |     black     |
|    cursorPadding     |          number           |                                 Distance between cursor and the last word                                  |     0.15      |
|    blinkingSpeed     |          number           |                                       Rate at which to blink cursor                                        |      530      |
| disableBlinkingOnEnd |     boolean or number     | Whether to disable blinking on end ( true, false ) or number of times to blink before stopping ( number )  |       5       |
|     shouldDelete     |          boolean          |                         Should delete the current text or just append the new text                         |     true      |
|    smartBackspace    |          boolean          | Whether to delete only the minimal number of characters required to match the current string with the next |     true      |

**Example Code**

<a href="https://github.com/Sid200026/typing-effect/blob/master/src/examples/Example1.jsx">Example 1</a>
<a href="https://github.com/Sid200026/typing-effect/blob/master/src/examples/Example2.jsx">Example 2</a>
<a href="https://github.com/Sid200026/typing-effect/blob/master/src/examples/Example3.jsx">Example 3</a>

<a name="typingstep" />

### TypingStep Component

TypingStep Component operates at character level. The caveat specified in `<Typing>` component can be solved by `<TypingStep>` component. TypingStep allows us to do the following three operations

1. Add text
2. Delete characters
3. Delay Execution

**Example**

```jsx
<TypingStep
  sequence={[
    {
      content: "Typing-Effect provides to fucntionality",
    },
    {
      content: 100, // 100ms delay
    },
    {
      content: -16, // Delete 16 characters
    },
    {
      content: 200, // 200ms delay
    },
    {
      content: "two components : \n1. <Typing />\n2. <TypingStep />",
    },
  ]}
/>
```

```jsx
const sequence = [
  {
    content: "Six is less than five",
    config: {
      styleClass: "typing",
    },
  },
  {
    content: 400,
    config: {
      styleClass: "wrong", // Custom Style class
    },
  },
  {
    content: -14,
    config: {
      styleClass: "wrong",
      cursorColor: "red",
    },
  },
  {
    content: 200, // 200ms delay
    config: {
      styleClass: "typing",
    },
  },
  {
    content: "greater than five",
    config: {
      styleClass: "typing",
    },
  },
  {
    content: 100, // 200ms delay
    config: {
      styleClass: "typing",
    },
  },
];

<TypingStep sequence={sequence} element="h4" styleClass="correct" />;
```

**Props**

##### Sequence Prop ( `array of objects`)

The sequence prop consists of a list of commands that will be executed by the `<TypingStep>` component.

Structure of each command

```js
{
  // Command to be executed
  content: config: {
    // List of configs that will override global configs
  }
}
```

###### content

|                      String                      |              Negative Number               |                Positive Number                |
| :----------------------------------------------: | :----------------------------------------: | :-------------------------------------------: |
| Adds the string to the currently rendered string | Deletes the number of characters specified |       Delays the next command execution       |
|              `content : "Hi there"`              |               `content : -5`               |                `content : 500`                |
|      Adds `Hi there` to the current string       |       Deletes the last 5 characters        | Delays the execution of next command by 500ms |

###### config

A set of local configs that can override the global configs. Overriding will occur only when that specific command is executed. At the end of command execution, global configs takes preference. All the properties that config can override are given below. The following 3 properties cannot be overriden

1. sequence
2. ignoreInitialDelay
3. element
4. disableBlinkingOnEnd

|      Prop Name       |         Prop Type         |                                                Description                                                | Default Value |
| :------------------: | :-----------------------: | :-------------------------------------------------------------------------------------------------------: | :-----------: |
|       sequence       |           array           |                            Sequence of commands and configurations to execute                             |   required    |
|  ignoreInitialDelay  |          boolean          |           Whether to initially render the first character ( set as true to render immediately )           |     true      |
|       element        | string or React Component |                          HTML Element or React Component used to render the text                          |      h4       |
|      styleClass      |          string           |                            Any style class to be added to the rendered element                            |      ""       |
|      typeSpeed       |          number           |                                  Speed at which to type in milliseconds                                   |      40       |
|     deleteSpeed      |          number           |                                 Speed at which to delete in milliseconds                                  |      30       |
|    letterSpacing     |          number           |                                   Spacing between the rendered elements                                   |       0       |
|   cursorThickness    |          number           |                                          Thickness of the cursor                                          |     0.15      |
|     cursorColor      |          string           |                                            Color of the cursor                                            |     black     |
|    cursorPadding     |          number           |                                 Distance between cursor and the last word                                 |     0.15      |
|    blinkingSpeed     |          number           |                                       Rate at which to blink cursor                                       |      530      |
| disableBlinkingOnEnd |     boolean or number     | Whether to disable blinking on end ( true, false ) or number of times to blink before stopping ( number ) |       5       |

**Example Code**

<a href="https://github.com/Sid200026/typing-effect/blob/master/src/examples/Example4.jsx">Example 4</a>
<a href="https://github.com/Sid200026/typing-effect/blob/master/src/examples/Example5.jsx">Example 5</a>
<a href="https://github.com/Sid200026/typing-effect/blob/master/src/examples/Example6.jsx">Example 6</a>
<a href="https://github.com/Sid200026/typing-effect/blob/master/src/examples/Example7.jsx">Example 7</a>

---
