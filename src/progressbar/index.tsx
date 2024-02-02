import styles from './index.module.less';
import { ReactNode } from 'react';
import { IKsProgressBarProps } from './interface';

/**
 * @zh 组件Props属性：页面加载进度条 默认值
 * @en Component props: page loading progress bar default value
 */
const defaultProps: IKsProgressBarProps = {
  position: 't-lr',
  loadTo: 65,
  durationLoadTo: 1500,
  loadToSlow: 85,
  durationLoadToSlow: 3000,
  durationDone: 100,
  fluctuation: 10,
  delayHide: 0,
  durationHide: 300,
  children: undefined
};

/**
 * @zh 组件：页面加载进度条
 * @en Component: page loading progress bar
 */
const KsProgressBar = (props: IKsProgressBarProps): ReactNode => {
  props = { ...defaultProps, ...props };
  const children = props.children;

  return <>{children}</>;
};

KsProgressBar.defaultProps = defaultProps;

export default KsProgressBar;
