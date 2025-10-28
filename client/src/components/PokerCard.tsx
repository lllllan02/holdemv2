import React from 'react';
import './PokerCard.css';

export type CardSuit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type CardRank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface PokerCardProps {
  suit?: CardSuit;
  rank?: CardRank;
  width?: number | string;
  rotation?: number;
}

export const PokerCard: React.FC<PokerCardProps> = (props) => {
  const {
    suit,
    rank,
    width,
    rotation = 0,
  } = props;

  // 如果 suit 或 rank 为空，则显示牌背
  const isBack = !suit || !rank;

  const getCardImage = () => {
    if (!suit || !rank) return undefined;
    
    const fileName = `${suit}_${rank.toLowerCase()}.svg`;
    return `/cards/${fileName}`;
  };

  const getCardStyle = () => {
    const style: React.CSSProperties = {};
    
    // 扑克牌标准宽高比约为 1:1.4
    const ASPECT_RATIO = 1.4;
    
    if (width) {
      // 自定义宽度
      style.width = typeof width === 'number' ? `${width}px` : width;
      // 根据宽度自动计算高度
      const widthValue = typeof width === 'number' ? width : parseFloat(width);
      if (!isNaN(widthValue)) {
        style.height = `${widthValue * ASPECT_RATIO}px`;
      }
    }
    
    // 旋转角度
    if (rotation !== 0) {
      style.transform = `rotate(${rotation}deg)`;
    }
    
    return style;
  };

  return (
    <div 
      className={isBack ? 'poker-card poker-card-back' : 'poker-card'}
      style={getCardStyle()}
    >
      {isBack ? (
        <div className="poker-card-back-pattern" />
      ) : (
        <img 
          src={getCardImage()} 
          alt={`${rank} of ${suit}`}
          className="poker-card-image"
        />
      )}
    </div>
  );
};
