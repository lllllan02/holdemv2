import React from 'react';
import { TopBar } from '../../components/TopBar';

export const TopBarShowcase: React.FC = () => {
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', 
      minHeight: '100vh',
      position: 'relative' 
    }}>
      <TopBar 
        pot={2450} 
        playerCount={6} 
        gameStage="翻牌前" 
        currentActionPlayer="玩家A"
        playerName="测试玩家" 
        chips={1250000} 
      />
      <div style={{ 
        paddingTop: '100px', 
        color: 'white', 
        padding: '120px 50px 50px' 
      }}>
        <h1 style={{ color: 'white', fontSize: '32px', marginBottom: '16px' }}>
          顶部导航栏组件
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
          固定顶部导航栏，显示游戏信息和玩家状态
        </p>
      </div>
    </div>
  );
};
