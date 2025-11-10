import React, { useState, useCallback, useEffect, useRef } from 'react';
import './BottomBar.css';

interface BottomBarProps {
  // 玩家余额
  playerBalance?: number;
  // 当前需要跟注的金额
  callAmount?: number;
  // 最小加注金额
  minRaise?: number;
  // 底池大小（用于快速下注）
  pot?: number;
  // 是否正在加载/提交
  isLoading?: boolean;
  // 按钮点击回调
  onCheck?: () => void;
  onFold?: () => void;
  onCall?: (amount: number) => void;
  onRaise?: (amount: number) => void;
  onAllIn?: (amount: number) => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  playerBalance = 0,
  callAmount = 0,
  minRaise = 0,
  pot = 0,
  isLoading = false,
  onCheck,
  onFold,
  onCall,
  onRaise,
  onAllIn,
}) => {
  const [currentBet, setCurrentBet] = useState(Math.max(callAmount, minRaise));
  const [tooltip, setTooltip] = useState<{ message: string; x: number; y: number } | null>(null);
  const tooltipTimeoutRef = useRef<number | null>(null);

  // 计算禁用状态
  const canCall = callAmount > 0 && callAmount <= playerBalance && !isLoading;
  const canCheck = callAmount === 0 && !isLoading;
  const canRaise = currentBet > callAmount && currentBet >= minRaise && currentBet <= playerBalance && !isLoading;
  const canAllIn = playerBalance > 0 && !isLoading;
  const canFold = !isLoading;
  
  // 自动判断是否显示（根据游戏状态）
  const showRaise = playerBalance > 0 && minRaise <= playerBalance;
  const showAllIn = playerBalance > 0;
  const showQuickBet = pot > 0 && showRaise;

  const handleBetChange = useCallback((value: number) => {
    const bet = Math.min(Math.max(value, minRaise), playerBalance);
    setCurrentBet(bet);
  }, [minRaise, playerBalance]);

  // 快速下注
  const handleQuickBet = useCallback((multiplier: number) => {
    if (pot > 0) {
      const quickBet = Math.min(Math.floor(pot * multiplier), playerBalance);
      const bet = Math.max(quickBet, minRaise);
      setCurrentBet(Math.min(bet, playerBalance));
    }
  }, [pot, playerBalance, minRaise]);

  const handleCheckOrCall = useCallback(() => {
    if (isLoading) return;
    if (callAmount === 0) {
      if (canCheck) {
        onCheck?.();
      }
    } else {
      if (canCall) {
        onCall?.(callAmount);
      }
    }
  }, [callAmount, canCheck, canCall, isLoading, onCheck, onCall]);

  const handleFold = useCallback(() => {
    if (isLoading || !canFold) return;
    onFold?.();
  }, [canFold, isLoading, onFold]);

  const handleRaise = useCallback(() => {
    if (isLoading || !canRaise) return;
    if (currentBet > callAmount && currentBet >= minRaise && currentBet <= playerBalance) {
      onRaise?.(currentBet);
    }
  }, [currentBet, callAmount, minRaise, playerBalance, canRaise, isLoading, onRaise]);

  const handleAllIn = useCallback(() => {
    if (isLoading || !canAllIn) return;
    if (playerBalance > 0) {
      const allInAmount = playerBalance;
      setCurrentBet(allInAmount);
      onAllIn?.(allInAmount);
    }
  }, [playerBalance, canAllIn, isLoading, onAllIn]);

  // Tooltip 显示
  const showTooltip = useCallback((message: string, event: React.MouseEvent) => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    setTooltip({
      message,
      x: event.clientX,
      y: event.clientY - 40,
    });
  }, []);

  const hideTooltip = useCallback(() => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    tooltipTimeoutRef.current = window.setTimeout(() => {
      setTooltip(null);
    }, 200);
  }, []);

  // 键盘快捷键
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isLoading) return;
      // 防止在输入框中触发
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;

      switch (e.key.toLowerCase()) {
        case 'f':
          if (canFold) {
            e.preventDefault();
            handleFold();
          }
          break;
        case 'c':
          if (canCheck || canCall) {
            e.preventDefault();
            handleCheckOrCall();
          }
          break;
        case 'r':
          if (canRaise) {
            e.preventDefault();
            handleRaise();
          }
          break;
        case 'a':
          if (canAllIn) {
            e.preventDefault();
            handleAllIn();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isLoading, canFold, canCheck, canCall, canRaise, canAllIn, handleFold, handleCheckOrCall, handleRaise, handleAllIn]);

  // 获取禁用提示信息
  const getDisabledMessage = (type: 'check' | 'call' | 'raise' | 'allin' | 'fold') => {
    if (isLoading) return '正在处理中...';
    switch (type) {
      case 'call':
        if (callAmount > playerBalance) return '余额不足';
        return '';
      case 'raise':
        if (currentBet < minRaise) return `最小加注金额为 $${minRaise.toLocaleString()}`;
        if (currentBet > playerBalance) return '余额不足';
        if (currentBet <= callAmount) return '加注金额必须大于跟注金额';
        return '';
      case 'allin':
        if (playerBalance === 0) return '余额为0';
        return '';
      default:
        return '';
    }
  };

  return (
    <div className="bottom-bar">
      {isLoading && <div className="loading-overlay" />}
      <div className="bar-container">
        {/* 下注操作区 */}
        <div className="betting-section">
          {/* 操作按钮 */}
          <div className="betting-actions">
            <button 
                className={`action-button ${callAmount === 0 ? 'check-button' : 'call-button'} ${(callAmount === 0 ? !canCheck : !canCall) ? 'disabled' : ''}`}
                onClick={handleCheckOrCall}
                disabled={callAmount === 0 ? !canCheck : !canCall}
                onMouseEnter={(e) => {
                  const msg = getDisabledMessage(callAmount === 0 ? 'check' : 'call');
                  if (msg) showTooltip(msg, e);
                }}
                onMouseLeave={hideTooltip}
              >
                {isLoading ? (
                  <span className="button-loading">处理中...</span>
                ) : (
                  <>
                    <span className="keyboard-shortcut">[C]</span>
                    <span>{callAmount === 0 ? '过牌' : `跟注 $${callAmount.toLocaleString()}`}</span>
                  </>
                )}
              </button>
          </div>

          {/* 加注控制 */}
          {showRaise && (
            <div 
              className={`betting-controls ${!canRaise ? 'disabled' : ''}`}
              onMouseEnter={(e) => {
                if (!canRaise) {
                  const msg = getDisabledMessage('raise');
                  if (msg) showTooltip(msg, e);
                }
              }}
              onMouseLeave={hideTooltip}
            >
              <div 
                className="bet-amount-display" 
                onClick={canRaise ? handleRaise : undefined}
                style={{ cursor: canRaise ? 'pointer' : 'not-allowed' }}
              >
                <span className="current-bet">${currentBet.toLocaleString()}</span>
                <span className="raise-label">
                  <span className="keyboard-shortcut">[R]</span>
                  加注
                </span>
              </div>
              <div className="bet-slider-wrapper" onClick={(e) => e.stopPropagation()}>
                <div className="bet-slider-container">
                  <input
                    type="range"
                    className="bet-slider"
                    min={minRaise}
                    max={playerBalance}
                    value={currentBet}
                    onChange={(e) => handleBetChange(Number(e.target.value))}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    disabled={isLoading}
                  />
                </div>
                <span className="max-bet">最大: ${playerBalance.toLocaleString()}</span>
              </div>
              {/* 快速下注按钮 */}
              {showQuickBet && pot > 0 && (
                <div className="quick-bet-buttons">
                  <button
                    className="quick-bet-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickBet(0.5);
                    }}
                    disabled={isLoading}
                    title="1/2底池"
                  >
                    1/2
                  </button>
                  <button
                    className="quick-bet-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickBet(0.67);
                    }}
                    disabled={isLoading}
                    title="2/3底池"
                  >
                    2/3
                  </button>
                  <button
                    className="quick-bet-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickBet(1);
                    }}
                    disabled={isLoading}
                    title="全底池"
                  >
                    全池
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 梭哈按钮 */}
          {showAllIn && (
            <button 
              className={`action-button all-in-button ${!canAllIn ? 'disabled' : ''}`}
              onClick={handleAllIn}
              disabled={!canAllIn}
              onMouseEnter={(e) => {
                const msg = getDisabledMessage('allin');
                if (msg) showTooltip(msg, e);
              }}
              onMouseLeave={hideTooltip}
            >
              {isLoading ? (
                <span className="button-loading">处理中...</span>
              ) : (
                <>
                  <span className="keyboard-shortcut">[A]</span>
                  <span>梭哈</span>
                  <span className="all-in-amount">${playerBalance.toLocaleString()}</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* 弃牌按钮区域 */}
        <div className="fold-section">
          <button 
            className={`action-button fold-button ${!canFold ? 'disabled' : ''}`}
            onClick={handleFold}
            disabled={!canFold}
            onMouseEnter={(e) => {
              const msg = getDisabledMessage('fold');
              if (msg) showTooltip(msg, e);
            }}
            onMouseLeave={hideTooltip}
          >
            {isLoading ? (
              '处理中...'
            ) : (
              <>
                <span className="keyboard-shortcut">[F]</span>
                <span>弃牌</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Tooltip */}
      {tooltip && (
        <div 
          className="tooltip"
          style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
        >
          {tooltip.message}
        </div>
      )}
    </div>
  );
};

