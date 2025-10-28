// 基础类型定义

// 用户类型
export interface User {
  id: string;
  fingerprint: string;
  nickname: string;
  avatar?: string;
  chips: number;
  points: number;
  createdAt: string;
  updatedAt: string;
}

// 游戏状态
export const GamePhase = {
  WAITING: 'waiting',
  PRE_FLOP: 'pre_flop',
  FLOP: 'flop',
  TURN: 'turn',
  RIVER: 'river',
  SHOWDOWN: 'showdown',
} as const;
export type GamePhase = typeof GamePhase[keyof typeof GamePhase];

// 玩家动作
export const PlayerAction = {
  FOLD: 'fold',
  CHECK: 'check',
  CALL: 'call',
  RAISE: 'raise',
  ALL_IN: 'all_in',
} as const;
export type PlayerAction = typeof PlayerAction[keyof typeof PlayerAction];

// 牌型
export const HandRank = {
  HIGH_CARD: 'high_card',
  PAIR: 'pair',
  TWO_PAIR: 'two_pair',
  THREE_OF_A_KIND: 'three_of_a_kind',
  STRAIGHT: 'straight',
  FLUSH: 'flush',
  FULL_HOUSE: 'full_house',
  FOUR_OF_A_KIND: 'four_of_a_kind',
  STRAIGHT_FLUSH: 'straight_flush',
  ROYAL_FLUSH: 'royal_flush',
} as const;
export type HandRank = typeof HandRank[keyof typeof HandRank];

// 卡牌
export interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  rank: 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
}

// 游戏玩家
export interface GamePlayer {
  id: string;
  user: User;
  cards: Card[];
  chips: number;
  bet: number;
  status: 'waiting' | 'playing' | 'folded' | 'all_in' | string;
  position: number;
}

// 游戏房间
export interface GameRoom {
  id: string;
  name: string;
  players: GamePlayer[];
  communityCards: Card[];
  dealerPosition: number;
  smallBlindPosition: number;
  bigBlindPosition: number;
  currentPlayer: string | null;
  phase: GamePhase | string;
  pot: number;
  currentBet: number;
  minRaise: number;
  smallBlind: number;
  bigBlind: number;
  maxPlayers: number;
}

// WebSocket 消息类型
export interface WebSocketMessage {
  type: string;
  payload: any;
  timestamp: number;
}

// Redux State
export interface RootState {
  user: UserState;
  game: GameState;
  websocket: WebSocketState;
}

export interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface GameState {
  currentRoom: GameRoom | null;
  isLoading: boolean;
  error: string | null;
}

export interface WebSocketState {
  connected: boolean;
  connecting: boolean;
  error: string | null;
}