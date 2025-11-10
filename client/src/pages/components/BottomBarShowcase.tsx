import React, { useState } from 'react';
import { BottomBar } from '../../components/BottomBar';

export const BottomBarShowcase: React.FC = () => {
  const [playerBalance, setPlayerBalance] = useState(1250);
  const [callAmount, setCallAmount] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [pot, setPot] = useState(2450);

  const handleCheck = () => {
    console.log('过牌');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('过牌');
    }, 1000);
  };

  const handleFold = () => {
    console.log('弃牌');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('弃牌');
    }, 1000);
  };

  const handleCall = (amount: number) => {
    console.log(`跟注 $${amount}`);
    setIsLoading(true);
    setTimeout(() => {
      setPlayerBalance(prev => prev - amount);
      setIsLoading(false);
      alert(`跟注 $${amount}`);
    }, 1000);
  };

  const handleRaise = (amount: number) => {
    console.log(`加注到 $${amount}`);
    setIsLoading(true);
    setTimeout(() => {
      setPlayerBalance(prev => prev - amount);
      setIsLoading(false);
      alert(`加注到 $${amount}`);
    }, 1000);
  };

  const handleAllIn = (amount: number) => {
    console.log(`梭哈 $${amount}`);
    setIsLoading(true);
    setTimeout(() => {
      setPlayerBalance(0);
      setIsLoading(false);
      alert(`梭哈 $${amount}`);
    }, 1000);
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)', 
      minHeight: '100vh',
      position: 'relative',
      paddingBottom: '150px'
    }}>
      <div style={{ 
        paddingTop: '100px', 
        color: 'white', 
        padding: '120px 50px 50px' 
      }}>
        <h1 style={{ color: 'white', fontSize: '32px', marginBottom: '16px' }}>
          底部操作栏组件
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '24px' }}>
          固定底部操作栏，提供游戏操作按钮和下注控制
        </p>
        
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>当前状态</h2>
          <p>玩家余额: ${playerBalance.toLocaleString()}</p>
          <p>跟注金额: ${callAmount.toLocaleString()}</p>
          <p>底池: ${pot.toLocaleString()}</p>
          <p>加载状态: {isLoading ? '是' : '否'}</p>
        </div>

        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          padding: '20px', 
          borderRadius: '8px'
        }}>
          <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>测试控制</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setCallAmount(0)}
              style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
            >
              设置跟注为 $0 (显示过牌)
            </button>
            <button 
              onClick={() => setCallAmount(50)}
              style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
            >
              设置跟注为 $50
            </button>
            <button 
              onClick={() => setCallAmount(100)}
              style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
            >
              设置跟注为 $100
            </button>
            <button 
              onClick={() => setPlayerBalance(1250)}
              style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
            >
              重置余额为 $1,250
            </button>
            <button 
              onClick={() => setPot(2450)}
              style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
            >
              重置底池为 $2,450
            </button>
          </div>
        </div>

        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>键盘快捷键</h2>
          <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <strong>F</strong> - 弃牌<br />
            <strong>C</strong> - 过牌/跟注<br />
            <strong>R</strong> - 加注<br />
            <strong>A</strong> - 梭哈
          </p>
        </div>
      </div>

      <BottomBar
        playerBalance={playerBalance}
        callAmount={callAmount}
        minRaise={callAmount * 2}
        pot={pot}
        isLoading={isLoading}
        onCheck={handleCheck}
        onFold={handleFold}
        onCall={handleCall}
        onRaise={handleRaise}
        onAllIn={handleAllIn}
      />
    </div>
  );
};

