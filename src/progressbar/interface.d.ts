/**
 * @zh 组件Props属性：页面加载进度条
 * @en Component props: page loading progress bar
 */
export interface IKsProgressBarProps {
  /**
   * @zh 属性：位置及方向，默认为 `t-lr`，t-lr：顶部从左到右，t-rl：顶部从右到左，b-lr：底部从左到右，b-rl：底部从右到左，l-tb：左侧从上到下，l-bt：左侧从下到上，r-tb：右侧从上到下，r-bt：右侧从下到上
   * @en Property: Position and direction, default is `t-lr`, t-lr: top from left to right, t-rl: top from right to left, b-lr: bottom from left to right, b-rl: bottom from right to left, l-tb: left from top to bottom, l-bt: left from bottom to top, r-tb: right from top to bottom, r-bt: right from bottom to top
   */
  position?: 't-lr' | 't-rl' | 'b-lr' | 'b-rl' | 'l-tb' | 'l-bt' | 'r-tb' | 'r-bt';
  /**
   * @zh 属性：启动后，无脑加载到多少百分比，默认为 65%
   * @en Property: After launching, load up to a default percentage of 65% without any specific logic.
   */
  loadTo?: number;
  /**
   * @zh 属性：`loadTo` 执行时间，默认为 1500ms
   * @en Property: `loadTo` execution time, the default is 1500ms
   */
  durationLoadTo?: number;
  /**
   * @zh 属性：当到达 `loadTo` 时，若是还没加载完毕，则进入缓慢加载，直到多少百分比，停止缓慢加载，默认为 85%
   * @en Property: When `loadTo` is reached, if it is not loaded yet, it enters slow loading, and stops slow loading when it reaches a certain percentage, the default is 85%
   */
  loadToSlow?: number;
  /**
   * @zh 属性：缓慢加载时间，默认为 3000ms
   * @en Property: Slow loading time, the default is 3000ms
   */
  durationLoadToSlow?: number;
  /**
   * @zh 属性：当加载完毕后，直接加载到100%的时间，默认为 100ms
   * @en Property: The time to load directly to 100% after loading is completed, the default is 100ms
   */
  durationDone?: number;
  /**
   * @zh 属性：浮动值，即每个阶段终点的上下浮动的范围，默认为 10，比如 60% 的进度，实际显示的进度为 60% - 10% ~ 60% + 10% 之间的随机值，最高不超过 100%，最小不低于 0%
   * @en Property: The floating value, that is, the range of upper and lower floating at the end of each stage, the default is 10, for example, the progress of 60%, the actual display progress is a random value between 60% - 10% and 60% + 10%, the highest not exceeding 100%, the minimum not less than 0%
   */
  fluctuation?: number;
  /**
   * @zh 属性：完成后，延迟隐藏时间，默认为 0ms
   * @en Property: After completion, the delay hide time, the default is 0ms
   */
  delayHide?: number;
  /**
   * @zh 属性：完成后，隐藏动画时间，默认为 300ms
   * @en Property: After completion, the hide animation time, the default is 300ms
   */
  durationHide?: number;
  /**
   * @zh 属性：子元素
   * @en Property: Child element
   */
  children: ReactNode;
  /**
   * @zh 事件：进度条开始加载
   * @en Event: Progress bar start loading
   */
  onStart?: () => void;
  /**
   * @zh 事件：`loadTo` 开始加载
   * @en Event: `loadTo` start loading
   */
  onLoadToStart?: () => void;
  /**
   * @zh 事件：`loadTo` 加载中
   * @en Event: `loadTo` loading
   * @param value 加载百分比
   */
  onLoadToUpdate?: (value: number) => void;
  /**
   * @zh 事件：`loadTo` 加载完毕
   * @en Event: `loadTo` loading completed
   */
  onLoadToEnd?: () => void;
  /**
   * @zh 事件：`loadToSlow` 开始加载
   * @en Event: `loadToSlow` start loading
   */
  onLoadToSlowStart?: () => void;
  /**
   * @zh 事件：`loadToSlow` 加载中
   * @en Event: `loadToSlow` loading
   * @param value 加载百分比
   */
  onLoadToSlowUpdate?: (value: number) => void;
  /**
   * @zh 事件：`loadToSlow` 加载完毕
   * @en Event: `loadToSlow` loading completed
   */
  onLoadToSlowEnd?: () => void;
  /**
   * @zh 事件：全程加载中
   * @en Event: Loading all the way
   */
  onUpdate?: () => void;
  /**
   * @zh 事件：加载完毕
   * @en Event: Loading completed
   */
  onDone?: () => void;
}

export { IKsProgressBarProps };
