// 常量定义

// 游戏配置
export const GAME_CONFIG = {
  MAX_PLAYERS: 6,
  MIN_PLAYERS: 2,
  SMALL_BLIND: 10,
  BIG_BLIND: 20,
  MIN_BUY_IN: 100,
  INITIAL_CHIPS: 500,
  INITIAL_POINTS: 100,
} as const;

// 用户配置
export const USER_CONFIG = {
  MIN_NICKNAME_LENGTH: 1,
  MAX_NICKNAME_LENGTH: 20,
  DEFAULT_NICKNAME_PREFIX: '玩家',
} as const;

// 货币配置
export const CURRENCY_CONFIG = {
  POINTS_TO_CHIPS_RATE: 10, // 1 段位分 = 10 筹码
  MIN_CHIPS_FOR_EXCHANGE: 200, // 筹码低于此值可兑换
  MAX_EXCHANGE_AMOUNT: 100, // 每次最多兑换筹码数
  MIN_POINTS: 50, // 最低段位分保护
} as const;

// 段位分奖励配置
export const POINTS_REWARD = {
  // 基础分数（根据游戏阶段）
  PRE_FLOP: { win: 4, lose: -1 },
  FLOP: { win: 3, lose: -2 },
  TURN: { win: 3, lose: -2 },
  RIVER: { win: 2, lose: -3 },
  // 筹码调整
  CHIP_BONUS: {
    50: 1,
    100: 2,
    200: 4,
    500: 8,
  },
  // 连胜奖励
  WIN_STREAK_BASE: 1,
  // 牌型奖励
  HAND_REWARD: {
    ROYAL_FLUSH: 20,
    STRAIGHT_FLUSH: 10,
    FOUR_OF_A_KIND: 8,
    FULL_HOUSE: 5,
    FLUSH: 3,
    STRAIGHT: 2,
  },
} as const;

// WebSocket 消息类型
export const WS_MESSAGE_TYPES = {
  // 连接相关
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  HEARTBEAT: 'heartbeat',
  
  // 游戏相关
  JOIN_GAME: 'join_game',
  LEAVE_GAME: 'leave_game',
  PLAYER_ACTION: 'player_action',
  GAME_STATE: 'game_state',
  GAME_UPDATE: 'game_update',
  
  // 聊天相关
  CHAT_MESSAGE: 'chat_message',
  
  // 系统相关
  ERROR: 'error',
  NOTIFICATION: 'notification',
} as const;

// 错误消息
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接失败',
  WEBSOCKET_ERROR: 'WebSocket 连接失败',
  USER_NOT_FOUND: '用户不存在',
  GAME_FULL: '游戏房间已满',
  GAME_ALREADY_STARTED: '游戏已开始',
  INSUFFICIENT_CHIPS: '筹码不足',
  INVALID_ACTION: '无效的操作',
  UNKNOWN_ERROR: '未知错误',
} as const;

// 成功消息
export const SUCCESS_MESSAGES = {
  USER_CREATED: '用户创建成功',
  GAME_JOINED: '加入游戏成功',
  ACTION_SUCCESS: '操作成功',
} as const;

