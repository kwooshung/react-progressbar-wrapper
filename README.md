<div align="center">

# @kwooshung/react-progressbar-wrapper

An intuitive and user-friendly progress bar component. It supports custom positioning and styling, adapting to a variety of content and layout needs while providing a smooth user experience and high degree of customization.

[![GitHub License](https://img.shields.io/github/license/kwooshung/react-progressbar-wrapper?labelColor=272e3b&color=165dff)](LICENSE)
![GitHub Release Date - Published_At](https://img.shields.io/github/release-date/kwooshung/react-progressbar-wrapper?labelColor=272e3b&color=00b42A&logo=github)
![GitHub last commit](https://img.shields.io/github/last-commit/kwooshung/react-progressbar-wrapper?labelColor=272e3b&color=165dff)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/kwooshung/react-progressbar-wrapper?labelColor=272e3b&color=165dff)
![GitHub top language](https://img.shields.io/github/languages/top/kwooshung/react-progressbar-wrapper?labelColor=272e3b&color=165dff)
![GitHub pull requests](https://img.shields.io/github/issues-pr/kwooshung/react-progressbar-wrapper?labelColor=272e3b&color=165dff)
![GitHub issues](https://img.shields.io/github/issues/kwooshung/react-progressbar-wrapper?labelColor=272e3b&color=165dff)
![Github Stars](https://img.shields.io/github/stars/kwooshung/react-progressbar-wrapper?labelColor=272e3b&color=165dff)
[![NPM Version](https://img.shields.io/npm/v/@kwooshung/react-progressbar-wrapper?labelColor=272e3b&color=165dff)](https://www.npmjs.com/package/@kwooshung/react-progressbar-wrapper)
[![Npm.js Downloads/Week](https://img.shields.io/npm/dw/@kwooshung/react-progressbar-wrapper?labelColor=272e3b&labelColor=272e3b&color=165dff&logo=npm)](https://www.npmjs.com/package/@kwooshung/react-progressbar-wrapper)
[![Github CI/CD](https://github.com/kwooshung/react-progressbar-wrapper/actions/workflows/ci.yml/badge.svg)](https://github.com/kwooshung/react-progressbar-wrapper/actions/)
[![codecov](https://codecov.io/gh/kwooshung/react-progressbar-wrapper/graph/badge.svg?token=CBQ1WB8xkr)](https://codecov.io/gh/kwooshung/react-progressbar-wrapper)
[![Maintainability](https://api.codeclimate.com/v1/badges/30c9c143fe08f23bb28f/maintainability)](https://codeclimate.com/github/kwooshung/react-progressbar-wrapper/maintainability)
[![Gitee Repo](https://img.shields.io/badge/Gitee-react--progressbar--wrapper-165dff?logo=gitee)](https://gitee.com/kwooshung/react-progressbar-wrapper/)

<p align="center">
    <a href="README.md" style="font-weight:700;color:#165dff;text-decoration:underline;">English</a> | 
    <a href="README.zh-CN.md">中文</a>
</p>
</div>

# Why Develop It?

- Why not use [NProgress](https://github.com/rstacruz/nprogress)? I used to be a frequent user of it as well, but over time, I found that it didn't meet my requirements. I was looking for a way to offer users a more realistic simulation of loading experiences, rather than just a simple, uniform speed load.

- The style isn't flexible enough. I wanted to be able to customize the style of the loading bar, such as its color, height, and position. Although [NProgress](https://github.com/rstacruz/nprogress) supports customization, I'm not fond of its method of definition. More importantly, it doesn't allow for defining the **direction** and **position** of the scrollbar.

# Why Use It?

- Supports customization of styles and components, offering more flexibility than just passing in properties.
- Simulates a more realistic loading experience. For example, it loads to 60% in 3 seconds, then slowly to 80% over the next 5 seconds. It stops at 80% and waits for further instructions until the `done` property is `true`, at which point the loading bar immediately reaches 100% and then gradually fades away. For more details, refer to the `API` section below.
- Multiple events for easy monitoring of the progress bar at each stage.
- Versatile positioning options: you can place it at the top, bottom, left, or right side.
- Various loading directions, including from left to right, right to left, top to bottom, and bottom to top, suitable for **rtl** and **horizontal** web page scenarios.
- Supports bilingual comments in both English and Chinese.
- Low learning curve, simple and flexible to use.
- Implemented with modern **ES6** features.
- Written in **TypeScript** for type safety.
- Supports on-demand import with `esm` modularization, natively supporting **tree-shaking**, so you don't have to worry about the size after packaging.
- This project also provides a `commonjs` (`cjs`) version.
- Test coverage of **100%**.

# Installation

## npm

```bash
npm install @kwooshung/react-progressbar-wrapper
```

## yarn

```bash
yarn add @kwooshung/react-progressbar-wrapper
```

## pnpm

```bash
pnpm add @kwooshung/react-progressbar-wrapper
```

# Usage

## Style

In some frameworks, you can directly import the styles in the global `css` / `less` / `scss` files as shown below:

```css
@import url('@kwooshung/react-progressbar-wrapper/dist/index.css');
```

In certain frameworks, like `Next.js`, you may need to add a `~` symbol for it to work, as shown below:

```css
@import url('~@kwooshung/react-progressbar-wrapper/dist/index.css');
```

You can also import it in a global page, such as the `Layout` page in `Next.js`, or within the corresponding component, as shown below:

```tsx
import '@kwooshung/react-progressbar-wrapper/dist/index.css';
```

## Components

在某个元素上使用 `ReactProgressbarWrapper` 组件，如下所示：

```tsx
import ProgressbarWrapper from '@kwooshung/react-progressbar-wrapper';
import '@kwooshung/react-progressbar-wrapper/dist/index.css';

const ProgressChildren = <div style={{ height: '2px', background: 'linear-gradient(112.44deg,#ff5858 2.09%,#c058ff 75.22%)', backgroundSize: '165%' }} />;

const Demo = () => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <>
      <ProgressBar active={active}>{ProgressChildren}</ProgressBar>
      <button onClick={() => setActive(!active)}>Toggle</button>
    </>
  );
};

export default Demo;
```

# API

## Props

| Parameter          | Description                                                                                                                                                                        | Type    | Default |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| active             | Controls whether the progress bar is active.                                                                                                                                       | boolean | false   |
| done               | Indicates whether the loading is complete.                                                                                                                                         | boolean | false   |
| position           | Sets the position and direction of the progress bar. Options: 't-lr', 't-rl', 'b-lr', 'b-rl', 'l-tb', 'l-bt', 'r-tb', 'r-bt'. See `Position and Direction` below for more details. | string  | 't-lr'  |
| loadTo             | Sets the initial percentage to load to.                                                                                                                                            | number  | 65      |
| durationLoadTo     | Sets the time (in milliseconds) to reach the `loadTo` percentage.                                                                                                                  | number  | 3000    |
| loadToSlow         | Sets the target percentage for slow loading.                                                                                                                                       | number  | 85      |
| durationLoadToSlow | Sets the time (in milliseconds) to reach the `loadToSlow` percentage.                                                                                                              | number  | 6000    |
| fluctuation        | Sets the fluctuation range at the end of each stage. For instance, if `loadTo` is set to `60%`, the endpoint will randomly be between `50%~70%`.                                   | number  | 10      |
| delayHide          | Sets the delay time (in milliseconds) to hide after completion.                                                                                                                    | number  | 500     |
| durationHide       | Sets the duration (in milliseconds) of the hide animation.                                                                                                                         | number  | 300     |

## Events

| Event              | Description                                                                         | Type                    |
| ------------------ | ----------------------------------------------------------------------------------- | ----------------------- |
| onStart            | Triggered when the progress bar starts loading.                                     | () => void;             |
| onLoadToStart      | Triggered when `loadTo` starts loading.                                             | () => void;             |
| onLoadToUpdate     | Triggered during `loadTo` loading, parameter is the current loading percentage.     | (value:number) => void; |
| onLoadToDone       | Triggered when `loadTo` loading is complete.                                        | () => void;             |
| onLoadToSlowStart  | Triggered when `loadToSlow` starts loading.                                         | () => void;             |
| onLoadToSlowUpdate | Triggered during `loadToSlow` loading, parameter is the current loading percentage. | (value:number) => void; |
| onLoadToSlowDone   | Triggered when `loadToSlow` loading is complete.                                    | () => void;             |
| onUpdate           | Triggered during overall loading, parameter is the current loading percentage.      | (value:number) => void; |
| onDone             | Triggered when the progress bar loading is complete.                                | () => void;             |

## Position and Direction

- t-lr: Top from left to right
- t-rl: Top from right to left
- b-lr: Bottom from left to right
- b-rl: Bottom from right to left
- l-tb: Left side from top to bottom
- l-bt: Left side from bottom to top
- r-tb: Right side from top to bottom
- r-bt: Right side from bottom to top
