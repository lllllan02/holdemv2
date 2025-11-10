import React from 'react';
import './TopBar.css';

// 默认头像 SVG
const DefaultAvatar: React.FC = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="28" r="28" fill="#66CC33" stroke="none" strokeWidth="0"/>
    <circle cx="28" cy="22" r="7" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M12 40 Q12 35 28 35 Q44 35 44 40" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);


interface TopBarProps {
  pot?: number;
  playerCount?: number;
  gameStage?: string;
  currentActionPlayer?: string;
  playerName?: string;
  chips?: number;
  avatar?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  pot = 2450,
  playerCount = 6,
  gameStage = '翻牌前',
  currentActionPlayer,
  playerName = '玩家昵称',
  chips = 1250000,
  avatar,
}) => {
  return (
    <div className="top-bar">
      <div className="top-bar-left-section"></div>

      <div className="top-bar-center-section">
        <div className="top-bar-game-info-item">
          <span className="top-bar-info-label">底池</span>
          <span className="top-bar-info-value top-bar-info-value-pot">
            ${pot.toLocaleString()}
          </span>
        </div>
        <div className="top-bar-game-info-item">
          <span className="top-bar-info-label">玩家</span>
          <span className="top-bar-info-value">{playerCount}人</span>
        </div>
        <div className="top-bar-game-info-item">
          <span className="top-bar-info-label">阶段</span>
          <span className="top-bar-info-value">{gameStage}</span>
        </div>
        {currentActionPlayer && (
          <div className="top-bar-game-info-item">
            <span className="top-bar-info-label">行动</span>
            <span className="top-bar-info-value top-bar-info-value-action">{currentActionPlayer}</span>
          </div>
        )}
      </div>

      <div className="top-bar-right-section">
        <div className="top-bar-profile-container">
          {avatar ? (
            <img 
              className="top-bar-profile-image" 
              src={avatar} 
              alt="用户头像"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const svgElement = e.currentTarget.nextElementSibling as HTMLElement;
                if (svgElement) svgElement.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`top-bar-profile-image ${avatar ? 'hidden' : ''}`}>
            <DefaultAvatar />
          </div>
          <div className="top-bar-player-info-container">
            <h2 className="top-bar-player-subtitle">{playerName}</h2>
            <div className="top-bar-chips-container">
              <span className="top-bar-chips-symbol">$</span>
              <h1 className="top-bar-player-chips">{chips.toLocaleString()}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
