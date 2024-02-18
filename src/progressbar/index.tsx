import styles from './index.module.less';
import { ReactNode, memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { number as randomNumber } from '@kwooshung/randoms';
import { IKsProgressBarProps, TDimensionStyles } from './interfaces';

/**
 * @zh 定时器间隔
 * @en Timer interval
 */
let timerInterval: NodeJS.Timeout;

/**
 * @zh 定时器间隔
 * @en Timer interval
 */
let timerIntervalSlow: NodeJS.Timeout;

/**
 * @zh 清除定时器
 * @en Clear timer
 */
const clearTimer = () => {
  clearInterval(timerInterval);
  clearInterval(timerIntervalSlow);
};

/**
 * @zh 计算终点的上下浮动值
 * @en Calculate the upper and lower fluctuation values of the end point
 * @param {number} start 起点
 * @param {number} end 终点
 * @param {number} fluctuation 浮动值
 */
const calculateFluctuation = (start: number, end: number, fluctuation: number): number => {
  let loadToFluctuationLow = end - fluctuation;
  let loadToFluctuationHigh = end + fluctuation;
  loadToFluctuationLow < start && (loadToFluctuationLow = start);
  loadToFluctuationHigh > 100 && (loadToFluctuationHigh = 100);
  return randomNumber(loadToFluctuationLow, loadToFluctuationHigh);
};

/**
 * @zh 更新进度
 * @en Update progress
 * @param {number} progress 进度
 * @param {number} max 最大值
 */
const updateProgress = (progress: number, max: number): number => Math.min(progress + 1, max);

/**
 * @zh 需要设置宽度的进度条位置
 * @en progress bar position that needs to set width
 */
const widthPositions = ['t-lr', 't-rl', 'b-lr', 'b-rl'];

/**
 * @zh 根据位置和进度计算进度条的样式
 * @en Calculate the progress bar style based on position and progress
 * @param {string} position 位置
 * @param {number} progress 进度
 * @param {number} delayHide 隐藏延迟
 * @param {number} durationHide 隐藏持续时间
 * @returns {TDimensionStyles} 返回样式
 */
const calculateProgressBarStyle = (position: string, progress: number, delayHide: number, durationHide: number): TDimensionStyles => {
  const styles: TDimensionStyles = widthPositions.includes(position) ? { width: `${progress}%` } : { height: `${progress}%` };
  styles['--ks-progressbar-transition-delay'] = `${delayHide}ms`;
  styles['--ks-progressbar-transition-duration'] = `${durationHide}ms`;
  return styles;
};

/**
 * @zh 组件：页面加载进度条
 * @en Component: page loading progress bar
 */
const KsProgressBar = ({
  active = false,
  done = false,
  position = 't-lr',
  loadTo = 65,
  durationLoadTo = 3000,
  loadToSlow = 85,
  durationLoadToSlow = 6000,
  fluctuation = 10,
  delayHide = 500,
  durationHide = 300,
  onStart,
  onLoadToStart,
  onLoadToUpdate,
  onLoadToDone,
  onLoadToSlowStart,
  onLoadToSlowUpdate,
  onLoadToSlowDone,
  onUpdate,
  onDone,
  children
}: IKsProgressBarProps): ReactNode => {
  const refBar = useRef<HTMLDivElement>(null);

  // 状态：进度条的样式
  const [dimensionStyles, setDimensionStyles] = useState<TDimensionStyles>({});

  // 监听进度条的进度变化，针对无脑加载到指定进度的情况
  useEffect(() => {
    // 检查进度条是否应该激活
    if (active) {
      // 如果done为true，则直接设置进度条的样式
      if (done) {
        clearTimer();
        // 事件：进度条加载完成
        onDone && onDone();
        refBar.current && refBar.current.classList.add(styles['done']);
        setDimensionStyles(calculateProgressBarStyle(position, 100, delayHide, durationHide));
        return;
      } else {
        clearTimer();
        // 事件：进度条开始加载
        onStart && onStart();
        refBar.current && refBar.current.classList.remove(styles['done']);
        setDimensionStyles(calculateProgressBarStyle(position, 0, delayHide, durationHide));
      }

      const _loadTo = calculateFluctuation(0, loadTo, fluctuation);

      let progress = 0;

      // 事件：加载开始
      onLoadToStart && onLoadToStart();

      // 设置定时器，定期增加进度
      timerInterval = setInterval(() => {
        // 更新进度，但不超过loadTo的值
        progress = updateProgress(progress, _loadTo);

        // 事件：无脑加载中
        onLoadToUpdate && onLoadToUpdate(progress);
        // 事件：全程加载中
        onUpdate && onUpdate(progress);

        // 更新进度条的UI
        setDimensionStyles(calculateProgressBarStyle(position, progress, delayHide, durationHide));

        // 如果进度达到或超过loadTo值，则清除定时器
        if (progress >= _loadTo) {
          clearTimer();

          // 事件：无脑加载完成
          onLoadToDone && onLoadToDone();
          // 事件：慢速加载开始
          onLoadToSlowStart && onLoadToSlowStart();

          const _loadToSlow = calculateFluctuation(_loadTo, loadToSlow, fluctuation);

          timerIntervalSlow = setInterval(
            () => {
              progress = updateProgress(progress, _loadToSlow);

              // 事件：慢速加载中
              onLoadToSlowUpdate && onLoadToSlowUpdate(progress);
              // 事件：全程加载中
              onUpdate && onUpdate(progress);

              // 更新进度条的UI
              setDimensionStyles(calculateProgressBarStyle(position, progress, delayHide, durationHide));

              if (progress >= _loadToSlow) {
                clearTimer();
                // 事件：慢速加载完毕
                onLoadToSlowDone && onLoadToSlowDone();
              }
            },
            durationLoadToSlow / (_loadToSlow - _loadTo)
          );
        }
      }, durationLoadTo / _loadTo);
    } else {
      setDimensionStyles({});
    }

    return () => clearTimer();
  }, [
    active,
    done,
    position,
    loadTo,
    durationLoadTo,
    loadToSlow,
    durationLoadToSlow,
    fluctuation,
    delayHide,
    durationHide,
    onStart,
    onLoadToStart,
    onLoadToUpdate,
    onLoadToDone,
    onLoadToSlowStart,
    onLoadToSlowUpdate,
    onLoadToSlowDone,
    onUpdate,
    onDone
  ]);

  // 组件卸载时清理定时器
  useEffect(() => () => clearTimer(), []);

  return (
    <div className={classNames(styles['ks-progressbar'], position)} style={dimensionStyles} ref={refBar}>
      {children}
    </div>
  );
};

export default memo(KsProgressBar);
