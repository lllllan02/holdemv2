import React, { useState, useEffect } from 'react';
import { Chat } from '../../components/Chat';
import type { ChatMessage } from '../../components/Chat';
// import { wsService } from '../../services/websocket'; // 实际使用时取消注释

export const ChatShowcase: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
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
    {
      id: '3',
      type: 'other',
      username: '德州高手',
      content: '这局我要大显身手！',
      timestamp: new Date('2024-01-01T14:33:00'),
    },
    {
      id: '4',
      type: 'other',
      username: '幸运玩家',
      content: '🍀',
      timestamp: new Date('2024-01-01T14:34:00'),
      isEmoticon: true,
    },
    {
      id: '5',
      type: 'other',
      username: '新手玩家',
      content: '第一次玩，请多指教！',
      timestamp: new Date('2024-01-01T14:35:00'),
    },
    {
      id: '6',
      type: 'user',
      username: '我',
      content: '加油！😊',
      timestamp: new Date('2024-01-01T14:35:00'),
    },
  ]);

  const handleSendMessage = (content: string) => {
    // 通过 WebSocket 发送消息到服务器
    // 注意：发送后不要立即添加到本地消息列表
    // 服务器会广播消息，然后通过 onMessage 回调接收并添加到列表
    // 这样可以确保所有客户端（包括发送者）都收到相同的消息格式
    
    // 示例代码（实际使用时取消注释）：
    /*
    wsService.send({
      type: 'chat',
      payload: {
        content,
        username: '我', // 或从 Redux store 获取当前用户名
      },
    });
    */
    
    console.log('发送消息:', content);
  };

  // 接收外部消息（通过 WebSocket）
  useEffect(() => {
    // 实际使用时，取消下面的注释并配置 WebSocket
    // setMessages 会在 WebSocket 订阅回调中使用
    void setMessages; // 占位符，避免 linter 警告
    
    /*
    // 订阅聊天消息
    const unsubscribe = wsService.subscribe('chat', (data: any) => {
      const newMessage: ChatMessage = {
        id: data.id || Date.now().toString(),
        // 根据用户名判断消息类型
        type: data.username === '我' ? 'user' : 'other',
        username: data.username,
        content: data.content,
        timestamp: new Date(data.timestamp || Date.now()),
        isEmoticon: data.isEmoticon || false,
      };
      
      // 追加新消息到列表
      setMessages(prev => {
        // 避免重复添加（根据 id 判断）
        const exists = prev.some(m => m.id === newMessage.id);
        if (exists) return prev;
        return [...prev, newMessage];
      });
    });

    // 清理订阅
    return () => {
      unsubscribe();
    };
    */
  }, [setMessages]);

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)', 
      minHeight: '100vh',
      position: 'relative',
    }}>
      <div style={{ 
        paddingTop: '100px', 
        color: 'white', 
        padding: '120px 50px 50px' 
      }}>
        <h1 style={{ color: 'white', fontSize: '32px', marginBottom: '16px' }}>
          聊天组件
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '24px' }}>
          游戏内聊天功能，支持文字消息和表情符号
        </p>
        
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>功能说明</h2>
          <ul style={{ fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
            <li>点击标题栏可以折叠/展开聊天窗口</li>
            <li>支持发送文字消息（最多200字符）</li>
            <li>支持发送表情符号</li>
            <li>回车键快速发送</li>
            <li>自动滚动到最新消息</li>
            <li>消息显示发送时间和用户名</li>
          </ul>
        </div>
      </div>

      <Chat
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

