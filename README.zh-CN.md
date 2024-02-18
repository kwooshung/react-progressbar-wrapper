<div align="center">

# @kwooshung/react-progressbar-wrapper

一个直观、易用的进度条组件。支持自定义位置和样式，能够适应各种内容和布局需求，同时提供流畅的用户体验和高度的可定制性。

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
    <a href="README.md">English</a> | 
    <a href="README.zh-CN.md" style="font-weight:700;color:#165dff;text-decoration:underline;">中文</a>
</p>
</div>

# 为什么开发它？

- 为什么不用 [NProgress](https://github.com/rstacruz/nprogress)？我曾经也经常使用它，但逐渐发现它不能满足我的要求，我希望的是给用户一种模拟更真实的加载体验，而不是简简单单的匀速加载。
- 样式不够自由，我希望可以自定义加载条的样式，比如颜色、高度、位置等等，虽然 [NProgress](https://github.com/rstacruz/nprogress) 也支持自定义，但是我不喜欢它的定义方式，更重要的是不能定义滚动条的 **方向** 和 **位置**。

# 为什么使用它？

- 支持自定义样式，支持自定义组件，比直接传入属性，更加灵活。
- 可以模拟更真实的加载体验，比如在3秒内加载到60%，然后再5秒内缓慢的加载80%，直到最大80%的时候，停止并等待进一步指示，直到属性 `done` 为 `true`，加载条才会立即到 `100%` 后渐隐消失，具体参考下方 `API`；
- 多种事件，方便监听每个阶段的进度条；
- 位置位置多样，你可以顶部、底部、左侧、右侧；
- 加载方向多样，从左到右，从右到左，从上到下，从下到上，方便 **rtl** 和 **横向** 网页的场景使用；
- 支持中英文双语注释；
- 学习成本低，使用简单且灵活；
- **ES6** 的现代特性实现；
- **TypeScript** 编写，类型安全；
- 可按需引入，`esm` 模块化，天生支持 **树摇（tree-shaking）**，不用担心打包后的体积；
- 当然本项目也提供了 `commonjs` 规范的 `cjs` 版本；
- 测试覆盖率 **100%**；

# 安装

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

# 使用方法

## 样式

在某些框架中直接在全局`css` / `less` / `scss`中引入样式即可，如下所示：

```css
@import url('@kwooshung/react-progressbar-wrapper/dist/index.css');
```

在部分框架中，如 `Next.js` 中，可能需要加入`~`符，才行，如下所示：

```css
@import url('~@kwooshung/react-progressbar-wrapper/dist/index.css');
```

你也可以在全局页面，如 `Next.js` 中的 `Layout` 页面 或 对应组件 中引入，如下所示：

```tsx
import '@kwooshung/react-progressbar-wrapper/dist/index.css';
```

## 组件

在某个元素上使用 `ReactProgressbarWrapper` 组件，如下所示：

```tsx
import { KsProgressbarWrapper } from '@kwooshung/react-progressbar-wrapper';
import '@kwooshung/react-progressbar-wrapper/dist/index.css';

const ProgressChildren = <div style={{ height: '2px', background: 'linear-gradient(112.44deg,#ff5858 2.09%,#c058ff 75.22%)', backgroundSize: '165%' }} />;

const Demo = () => {
  const [active, setActive] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  return (
    <>
      <KsProgressbarWrapper active={active} done={done}>
        {ProgressChildren}
      </KsProgressbarWrapper>
      <button onClick={() => setActive(!active)}>Toggle</button>
    </>
  );
};

export default Demo;
```

# API

## Props

| 参数               | 说明                                                                                                                            | 类型    | 默认值 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ------- | ------ |
| active             | 控制进度条是否激活。                                                                                                            | boolean | false  |
| done               | 指示是否加载完毕。                                                                                                              | boolean | false  |
| position           | 设置进度条的位置和方向。可选值: 't-lr', 't-rl', 'b-lr', 'b-rl', 'l-tb', 'l-bt', 'r-tb', 'r-bt'。更多说明，看下方 `位置方向说明` | string  | 't-lr' |
| loadTo             | 设置初始加载到的百分比。                                                                                                        | number  | 65     |
| durationLoadTo     | 设置达到 `loadTo` 百分比的时间（毫秒）。                                                                                        | number  | 3000   |
| loadToSlow         | 设置缓慢加载的目标百分比。                                                                                                      | number  | 85     |
| durationLoadToSlow | 设置达到 `loadToSlow` 百分比的时间（毫秒）。                                                                                    | number  | 6000   |
| fluctuation        | 设置每个阶段终点的浮动范围。比如 `loadTo` 为 `60%`，那么，终点将会随机为 `50%~70%` 之间。                                       | number  | 10     |
| delayHide          | 设置完成后的延迟隐藏时间（毫秒）。                                                                                              | number  | 500    |
| durationHide       | 设置隐藏动画的持续时间（毫秒）。                                                                                                | number  | 300    |

## Events

| 事件               | 说明                                              | 类型                    |
| ------------------ | ------------------------------------------------- | ----------------------- |
| onStart            | 进度条开始加载时触发。                            | () => void;             |
| onLoadToStart      | loadTo 开始加载时触发。                           | () => void;             |
| onLoadToUpdate     | loadTo 加载过程中触发，参数为当前加载百分比。     | (value:number) => void; |
| onLoadToDone       | loadTo 加载完毕时触发。                           | () => void;             |
| onLoadToSlowStart  | loadToSlow 开始加载时触发。                       | () => void;             |
| onLoadToSlowUpdate | loadToSlow 加载过程中触发，参数为当前加载百分比。 | (value:number) => void; |
| onLoadToSlowDone   | loadToSlow 加载完毕时触发。                       | () => void;             |
| onUpdate           | 全程加载中触发，参数为当前加载百分比。            | (value:number) => void; |
| onDone             | 进度条加载完毕时触发。                            | () => void;             |

## 位置方向

- t-lr: 顶部从左到右
- t-rl: 顶部从右到左
- b-lr: 底部从左到右
- b-rl: 底部从右到左
- l-tb: 左侧从上到下
- l-bt: 左侧从下到上
- r-tb: 右侧从上到下
- r-bt: 右侧从下到上
