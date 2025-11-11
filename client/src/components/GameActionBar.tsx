import React from 'react';
import { BottomBar } from './BottomBar';
import { Chat } from './Chat';
import type { ChatMessage } from './Chat';
import type { BottomBarProps } from './BottomBar';
import './GameActionBar.css';

interface GameActionBarProps extends BottomBarProps {
  // 聊天相关属性
  chatMessages: ChatMessage[];
  onSendMessage?: (content: string) => void;
  chatMaxLength?: number;
}

export const GameActionBar: React.FC<GameActionBarProps> = ({
  // BottomBar props
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
  // Chat props
  chatMessages,
  onSendMessage,
  chatMaxLength = 200,
}) => {
  return (
    <div className="game-action-bar">
      <div className="game-action-bar-container">
        <div className="game-action-bar-content">
          <BottomBar
            playerBalance={playerBalance}
            callAmount={callAmount}
            minRaise={minRaise}
            pot={pot}
            isLoading={isLoading}
            onCheck={onCheck}
            onFold={onFold}
            onCall={onCall}
            onRaise={onRaise}
            onAllIn={onAllIn}
          />
        </div>
        <div className="game-action-bar-chat">
          <Chat
            messages={chatMessages}
            onSendMessage={onSendMessage}
            maxLength={chatMaxLength}
          />
        </div>
      </div>
    </div>
  );
};

