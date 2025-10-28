import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/useRedux'
import { initializeUser } from './store/slices/userSlice'
import { wsService } from './services/websocket'
import { setConnected, setConnecting } from './store/slices/websocketSlice'
import './App.css'

function App() {
  const dispatch = useAppDispatch()
  const { currentUser, isLoading } = useAppSelector((state) => state.user)
  const { connected } = useAppSelector((state) => state.websocket)

  useEffect(() => {
    // 初始化用户
    dispatch(initializeUser())

    // 连接 WebSocket
    dispatch(setConnecting(true))
    wsService.connect()

    // 监听连接状态变化
    const unsubscribe = wsService.onConnectionChange((isConnected) => {
      dispatch(setConnected(isConnected))
    })

    return () => {
      unsubscribe()
      wsService.disconnect()
    }
  }, [dispatch])

  return (
    <div className="app">
      <header className="app-header">
        <h1>德州扑克</h1>
        <div className="status">
          <span className={`status-indicator ${connected ? 'connected' : 'disconnected'}`}>
            {connected ? '✓ 已连接' : '✗ 未连接'}
          </span>
          {currentUser && (
            <span className="user-info">
              用户: {currentUser.nickname} | 筹码: {currentUser.chips} | 段位分: {currentUser.points}
            </span>
          )}
        </div>
      </header>
      <main className="app-main">
        {isLoading ? (
          <div className="loading">加载中...</div>
        ) : (
          <div className="game-container">
            <p>游戏界面开发中...</p>
            <p>当前用户: {currentUser?.nickname || '未登录'}</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
