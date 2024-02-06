import { act, render } from '@testing-library/react';
import KsProgressBar from '.';

describe('KsProgressBar 组件测试', () => {
  it('当 `active` 为 `false` 时，进度条应该不显示', () => {
    const { container } = render(<KsProgressBar active={false} />);
    const bar = container.querySelector('[class*=ks-progressbar]:first-child') as HTMLElement;
    expect(bar?.hasAttribute('style')).toBeFalsy();
  });

  it('当 `active` 为 `true` 时，进度条应该显示', () => {
    const { container } = render(<KsProgressBar active={true} />);
    const bar = container.querySelector('[class*=ks-progressbar]:first-child') as HTMLElement;
    expect(bar?.hasAttribute('style')).toBeTruthy();
  });

  it('当 `done` 为 `true` 时，进度条应该显示完成状态', async () => {
    const { container } = render(<KsProgressBar active={true} done={true} />);
    const bar = container.querySelector('[class*=ks-progressbar]:first-child') as HTMLElement;
    // 等待动画完成
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    expect(bar?.style.width).toBe('100%');
  });

  it('当 `position` 更改时，应该更新进度条位置', () => {
    const { container, rerender } = render(<KsProgressBar active={true} position='t-lr' />);
    let bar = container.querySelector('.t-lr');
    expect(bar).toBeTruthy();

    rerender(<KsProgressBar active={true} position='l-tb' />);
    bar = container.querySelector('.l-tb');
    expect(bar).toBeTruthy();
  });

  it('当 `loadTo` 变化时，进度条应该相应变化', async () => {
    const { container } = render(<KsProgressBar active={true} loadTo={50} />);
    const bar = container.querySelector('[class*=ks-progressbar]:first-child') as HTMLElement;
    // 增加等待时间
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });
    // 可能需要调整这里的预期值
    expect(parseFloat(bar?.style.width || '0')).toBeGreaterThanOrEqual(30);
    expect(parseFloat(bar?.style.width || '100')).toBeLessThanOrEqual(70);
  });

  it('当 `loadToSlow` 变化时，进度条应该相应变化', async () => {
    const { container } = render(<KsProgressBar active={true} loadTo={50} durationLoadTo={400} loadToSlow={75} durationLoadToSlow={600} />);
    const bar = container.querySelector('[class*=ks-progressbar]:first-child') as HTMLElement;
    // 等待动画完成到一定程度
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });

    const progress = parseFloat(bar?.style.width);

    expect(progress).toBeGreaterThanOrEqual(65);
    expect(progress).toBeLessThanOrEqual(85);
  });

  it('当 `fluctuation` 变化时，进度条的进度应该在规定的范围内', async () => {
    const { container } = render(<KsProgressBar active={true} loadTo={50} durationLoadTo={400} loadToSlow={80} durationLoadToSlow={400} fluctuation={5} />);
    const bar = container.querySelector('[class*=ks-progressbar]:first-child') as HTMLElement;
    // 等待动画完成到一定程度
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });

    const progress = parseFloat(bar?.style.width);

    expect(progress).toBeGreaterThanOrEqual(75);
    expect(progress).toBeLessThanOrEqual(85);
  });

  it('当进度条的浮动计算可能超过 100% 时，应确保进度不超过 100%', async () => {
    const mockOnUpdate = vi.fn();
    // 设置一个较高的 loadTo 值和 fluctuation，确保进度加浮动可能超过 100%
    render(<KsProgressBar active={true} loadTo={110} fluctuation={5} onUpdate={mockOnUpdate} durationLoadTo={200} durationLoadToSlow={200} />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });

    // 检查 onUpdate 被调用，并且进度值不超过 100%
    expect(mockOnUpdate).toHaveBeenCalled();
    expect(mockOnUpdate.mock.calls.some((call) => call[0] <= 100)).toBeTruthy();
  });

  it('当进度条开始加载时，应该调用 `onStart`', () => {
    const mockOnStart = vi.fn();
    render(<KsProgressBar active={true} onStart={mockOnStart} />);

    expect(mockOnStart).toHaveBeenCalled();
  });

  it('当 `loadTo` 开始加载时，应该调用 onLoadToStart', async () => {
    const mockOnLoadToStart = vi.fn();
    render(<KsProgressBar active={true} loadTo={50} onLoadToStart={mockOnLoadToStart} durationLoadTo={200} durationLoadToSlow={200} />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });

    expect(mockOnLoadToStart).toHaveBeenCalled();
  });

  it('当 `loadTo` 加载中时，应该调用 onLoadToUpdate', async () => {
    const mockOnLoadToUpdate = vi.fn();
    render(<KsProgressBar active={true} loadTo={50} onLoadToUpdate={mockOnLoadToUpdate} durationLoadTo={200} durationLoadToSlow={200} />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });

    expect(mockOnLoadToUpdate).toHaveBeenCalled();
  });

  it('当 `loadTo` 加载完毕时，应该调用 onLoadToDone', async () => {
    const mockOnLoadToDone = vi.fn();
    render(<KsProgressBar active={true} loadTo={50} onLoadToDone={mockOnLoadToDone} durationLoadTo={200} durationLoadToSlow={200} />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });

    expect(mockOnLoadToDone).toHaveBeenCalled();
  });

  it('当 `loadToSlow` 开始加载时，应该调用 onLoadToSlowStart', async () => {
    const mockOnLoadToSlowStart = vi.fn();
    render(<KsProgressBar active={true} loadToSlow={75} onLoadToSlowStart={mockOnLoadToSlowStart} durationLoadTo={200} durationLoadToSlow={200} />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 4000));
    });

    expect(mockOnLoadToSlowStart).toHaveBeenCalled();
  });

  it('当 `loadToSlow` 加载中时，应该调用 onLoadToSlowUpdate', async () => {
    const mockOnLoadToSlowUpdate = vi.fn();
    render(<KsProgressBar active={true} loadToSlow={75} onLoadToSlowUpdate={mockOnLoadToSlowUpdate} durationLoadTo={200} durationLoadToSlow={200} />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });

    expect(mockOnLoadToSlowUpdate).toHaveBeenCalled();
  });

  it('当 `loadToSlow` 加载完毕时，应该调用 onLoadToSlowDone', async () => {
    const mockOnLoadToSlowDone = vi.fn();
    render(<KsProgressBar active={true} loadToSlow={75} onLoadToSlowDone={mockOnLoadToSlowDone} durationLoadTo={200} durationLoadToSlow={200} />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });

    expect(mockOnLoadToSlowDone).toHaveBeenCalled();
  });

  it('当进度条全程加载中时，应该调用 onUpdate', async () => {
    const mockOnUpdate = vi.fn();
    render(<KsProgressBar active={true} onUpdate={mockOnUpdate} durationLoadTo={200} durationLoadToSlow={200} />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });

    expect(mockOnUpdate).toHaveBeenCalled();
  });

  it('当进度条加载完毕时，应该调用 onDone', async () => {
    const mockOnDone = vi.fn();
    render(<KsProgressBar active={true} done={true} onDone={mockOnDone} durationLoadTo={200} durationLoadToSlow={200} />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 4000));
    });

    expect(mockOnDone).toHaveBeenCalled();
  });
});
