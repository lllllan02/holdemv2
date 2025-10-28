# 德州扑克前端项目

基于 React 18 + TypeScript + Vite 构建的德州扑克游戏前端。

## 技术栈

- **框架**: React 18 + TypeScript
- **状态管理**: Redux Toolkit
- **UI组件**: Ant Design
- **构建工具**: Vite
- **通信**: WebSocket + Axios
- **指纹识别**: FingerprintJS

## 项目结构

```
client/
├── src/
│   ├── components/      # React 组件
│   ├── store/          # Redux store
│   │   ├── slices/     # Redux slices
│   │   └── index.ts    # Store 配置
│   ├── services/       # API 服务和 WebSocket
│   ├── types/          # TypeScript 类型定义
│   ├── utils/          # 工具函数
│   ├── hooks/Similar \
│   ├── pages/          # 页面组件
│   ├── styles/         # 样式文件
│   ├── constants/      # 常量定义
│   ├── App.tsx         # 根组件
│   └── main.tsx        # 应用入口
├── public/             # 静态资源
└── package.json        # 依赖配置
```

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 环境变量

创建 `.env` 文件并配置以下变量：

- `VITE_API_URL`: API 服务器地址
- `VITE_WS_URL`: WebSocket 服务器地址

## 功能模块

### 用户管理
- 浏览器指纹识别
- 用户信息管理
- 本地数据存储

### 游戏核心
- 游戏房间
- 实时对局
- 牌型识别
- 筹码管理

### 实时通信
- WebSocket 连接管理
- 游戏状态同步
- 消息订阅机制

### 游戏记录
- 对局记录
- 统计分析
- 历史查询

## 开发计划

- [x] 项目基础架构
- [x] Redux 状态管理
- [x] WebSocket 服务
- [x] 指纹识别
- [ ] 游戏界面
- [ ] 游戏逻辑
- [ ] 聊天系统
- [ ] 成就系统

## License

MIT
