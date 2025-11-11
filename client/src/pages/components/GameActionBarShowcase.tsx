import React, { useState, useEffect } from 'react';
import { GameActionBar } from '../../components/GameActionBar';
import type { ChatMessage } from '../../components/Chat';

export const GameActionBarShowcase: React.FC = () => {
  const [playerBalance, setPlayerBalance] = useState(1250);
  const [callAmount, setCallAmount] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [pot, setPot] = useState(2450);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      type: 'system',
      username: '系统',
      content: '欢迎来到游戏房间！',
      timestamp: new Date('2024-01-01T14:30:00'),
    },
    {
      id: '1',
      type: 'other',
      username: '扑克大师',
      content: '大家好！准备开始新的一局吗？',
      timestamp: new Date('2024-01-01T14:32:00'),
    },
    {
      id: '2',
      type: 'user',
      username: '我',
      content: '当然！我已经准备好了 🎯',
      timestamp: new Date('2024-01-01T14:33:00'),
    },
  ]);

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

  const handleSendMessage = (content: string) => {
    console.log('发送消息:', content);
    // 实际应用中，这里应该通过 WebSocket 发送消息到服务器
  };

  // 接收外部消息的示例（通过 WebSocket）
  useEffect(() => {
    // setMessages 会在 WebSocket 订阅回调中使用
    void setChatMessages;
    
    /*
    // 订阅聊天消息
    const unsubscribe = wsService.subscribe('chat', (data: any) => {
      const newMessage: ChatMessage = {
        id: data.id || Date.now().toString(),
        type: data.username === '我' ? 'user' : 'other',
        username: data.username,
        content: data.content,
        timestamp: new Date(data.timestamp || Date.now()),
        isEmoticon: data.isEmoticon || false,
      };
      
      setChatMessages(prev => {
        const exists = prev.some(m => m.id === newMessage.id);
        if (exists) return prev;
        return [...prev, newMessage];
      });
    });

    return () => {
      unsubscribe();
    };
    */
  }, []);

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)', 
      minHeight: '100vh',
      position: 'relative',
      paddingBottom: '200px'
    }}>
      <div style={{ 
        paddingTop: '100px', 
        color: 'white', 
        padding: '120px 50px 50px' 
      }}>
        <h1 style={{ color: 'white', fontSize: '32px', marginBottom: '16px' }}>
          游戏操作栏组件（融合版）
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '24px' }}>
          将底部操作栏和聊天组件融合在一起
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
      </div>

      <GameActionBar
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
        chatMessages={chatMessages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

