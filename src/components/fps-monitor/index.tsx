import React, { useRef, useEffect, useState } from 'react';

interface FPSMonitorProps {
  /** 更新间隔（毫秒），默认1000ms */
  interval?: number;
  /** 自定义样式类名 */
  className?: string;
}

const FPSMonitor: React.FC<FPSMonitorProps> = ({ 
  interval = 1000, 
  className = '' 
}) => {
  // 使用 ref 存储帧率计算相关变量，避免触发重渲染
  const frameCountRef = useRef<number>(0);
  const lastUpdateTimeRef = useRef<number>(performance.now());
  const rafIdRef = useRef<number | null>(null);

  // 仅当显示值变化时才触发重渲染
  const [fps, setFps] = useState<number>(0);

  useEffect(() => {
    // 帧率计算函数
    const updateFPS = () => {
      const now = performance.now();
      frameCountRef.current += 1;

      // 如果距离上次更新时间超过设定的间隔
      if (now - lastUpdateTimeRef.current >= interval) {
        const elapsed = (now - lastUpdateTimeRef.current) / 1000; // 转为秒
        const currentFps = Math.round(frameCountRef.current / elapsed);
        
        // 只在值变化时更新 state，减少渲染
        setFps(prev => prev !== currentFps ? currentFps : prev);
        
        // 重置计数器
        frameCountRef.current = 0;
        lastUpdateTimeRef.current = now;
      }

      // 继续下一帧
      rafIdRef.current = requestAnimationFrame(updateFPS);
    };

    // 开始监控
    rafIdRef.current = requestAnimationFrame(updateFPS);

    // 清理：取消动画帧
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [interval]); // 仅当 interval 变化时重新创建

  // 当页面不可见时暂停计算（性能优化）
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      } else if (!document.hidden && rafIdRef.current === null) {
        // 页面重新可见时恢复
        lastUpdateTimeRef.current = performance.now();
        frameCountRef.current = 0;
        rafIdRef.current = requestAnimationFrame(function resumeFPS() {
          // 使用局部函数递归
          const updateFPS = () => {
            const now = performance.now();
            frameCountRef.current += 1;

            if (now - lastUpdateTimeRef.current >= interval) {
              const elapsed = (now - lastUpdateTimeRef.current) / 1000;
              const currentFps = Math.round(frameCountRef.current / elapsed);
              setFps(prev => prev !== currentFps ? currentFps : prev);
              frameCountRef.current = 0;
              lastUpdateTimeRef.current = now;
            }

            rafIdRef.current = requestAnimationFrame(updateFPS);
          };
          updateFPS();
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [interval]);

  // 根据FPS值动态改变颜色
  const getColor = (fps: number): string => {
    if (fps >= 55) return '#4caf50'; // 绿色
    if (fps >= 30) return '#ff9800'; // 橙色
    return '#f44336'; // 红色
  };

  return (
    <div 
      className={`fps-monitor ${className}`}
      style={{
        fontWeight: 'bold',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        userSelect: 'none',
        pointerEvents: 'none', // 不干扰页面交互
      }}
    >
      <span style={{ opacity: 0.6 }}>FPS</span>
      <span style={{ color: getColor(fps), minWidth: '36px', textAlign: 'center' }}>
        {fps}
      </span>
    </div>
  );
};

export default FPSMonitor;