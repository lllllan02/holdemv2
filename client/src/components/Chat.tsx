import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import './Chat.css';

export type ChatMessage = {
  id: string;
  type: 'user' | 'other' | 'system';
  username: string;
  content: string;
  timestamp: Date;
  isEmoticon?: boolean;
  avatar?: string; // 用户头像 URL
};

interface ChatProps {
  // 最大消息长度
  maxLength?: number;
  // 消息列表（受控模式，必须提供）
  messages: ChatMessage[];
  // 发送消息回调
  onSendMessage?: (content: string) => void;
}

const EMOTICONS = [
  // 扑克牌花色
  '♠️', '♥️', '♦️', '♣️', '🃏', '🎴',
  // 游戏相关
  '🎰', '🎲', '🎯', '💰', '🏆', '🍀',
  // 游戏常用表情
  '😊', '😂', '😎', '🤔', '😤', '😡',
  '🤯', '🥳', '🎉', '😱', '😏', '😒',
  '🙄', '😬', '😌', '😔', '🤨', '🤭',
  '🤫', '😄', '😃', '😁', '😉', '🤣',
  '😅', '😆', '🤩', '🤪', '😇', '😈',
  // 手势和动作
  '👍', '👎', '👏', '🙌', '🤝', '💪',
  '🤞', '✌️', '👊', '✊', '👌', '🤘',
  '🙏', '👋',
  // 其他游戏相关
  '💯', '🔥', '⭐', '💥', '💢', '💬',
  '💭', '🧠', '👀'
];

export const Chat: React.FC<ChatProps> = ({
  maxLength = 200,
  messages,
  onSendMessage,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [showEmoticonPanel, setShowEmoticonPanel] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const emoticonPanelRef = useRef<HTMLDivElement>(null);
  const emoticonToggleRef = useRef<HTMLButtonElement>(null);

  // 自动滚动到底部
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // 点击外部关闭表情面板
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showEmoticonPanel &&
        emoticonPanelRef.current &&
        emoticonToggleRef.current &&
        !emoticonPanelRef.current.contains(event.target as Node) &&
        !emoticonToggleRef.current.contains(event.target as Node)
      ) {
        setShowEmoticonPanel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmoticonPanel]);

  const toggleChat = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSendMessage = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      setInputValue('');
      // 通过回调通知父组件发送消息，由父组件管理消息状态
      onSendMessage?.(trimmedValue);
    }
  };

  const handleSendEmoticon = (emoticon: string) => {
    setShowEmoticonPanel(false);
    // 通过回调通知父组件发送表情，由父组件管理消息状态
    onSendMessage?.(emoticon);
  };

  const toggleEmoticons = () => {
    setShowEmoticonPanel(!showEmoticonPanel);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  const canSend = inputValue.trim().length > 0;

  return (
    <div className={`chat-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="chat-header" onClick={toggleChat}>
        <div className="chat-title">💬 游戏聊天</div>
        <span className="collapse-icon">▼</span>
      </div>

      <div className="chat-content">
        <div className="chat-messages">
          {messages.map((message) => (
            <ChatMessageItem key={message.id} message={message} formatTime={formatTime} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <input
              ref={chatInputRef}
              type="text"
              className="chat-input"
              placeholder="输入消息..."
              maxLength={maxLength}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              ref={emoticonToggleRef}
              className="emoticon-toggle-btn"
              onClick={toggleEmoticons}
            >
              <span>{showEmoticonPanel ? '✕' : '😊'}</span>
            </button>
            <button
              className="send-button"
              onClick={handleSendMessage}
              disabled={!canSend}
            >
              ➤
            </button>
          </div>
        </div>

        <div className={`emoticon-panel ${showEmoticonPanel ? 'show' : ''}`} ref={emoticonPanelRef}>
          <div className="emoticon-grid">
            {EMOTICONS.map((emoticon) => (
              <button
                key={emoticon}
                className="emoticon-btn"
                onClick={() => handleSendEmoticon(emoticon)}
              >
                {emoticon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 优化：将消息项提取为独立组件，使用 memo 避免不必要的重渲染
const ChatMessageItem = memo<{
  message: ChatMessage;
  formatTime: (date: Date) => string;
}>(({ message, formatTime }) => {
  return (
    <div className={`message ${message.type}`}>
      {message.type === 'system' ? (
        <div className="message-content">{message.content}</div>
      ) : (
        <>
          <div className="message-header">
            <div className="message-avatar">
              {message.avatar ? (
                <img 
                  src={message.avatar} 
                  alt={message.username}
                  className="message-avatar-img"
                  onError={(e) => {
                    // 如果头像加载失败，显示默认头像
                    const target = e.target as HTMLImageElement;
                    target.src = '';
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.message-avatar-default')) {
                      const defaultAvatar = document.createElement('div');
                      defaultAvatar.className = 'message-avatar-default';
                      parent.appendChild(defaultAvatar);
                    }
                  }}
                />
              ) : (
                <div className="message-avatar-default"></div>
              )}
            </div>
            <div className="message-username">{message.username}</div>
            <div className="message-time">{formatTime(message.timestamp)}</div>
          </div>
          <div className={`message-content ${message.isEmoticon ? 'emoticon-message' : ''}`}>
            {message.content}
          </div>
        </>
      )}
    </div>
  );
});

ChatMessageItem.displayName = 'ChatMessageItem';

