import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ComponentPreview } from './pages/components/ComponentPreview';
import { PokerCardShowcase } from './pages/components/PokerCardShowcase';
import { Layout, Menu } from 'antd';
import './App.css';

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="app-layout">
        <Header className="app-header">
          <div className="logo">
            <Link to="/" style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
              德州扑克组件库
            </Link>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                label: <Link to="/">组件预览</Link>,
              },
              {
                key: '2',
                label: <Link to="/poker-cards">扑克牌组件</Link>,
              },
            ]}
          />
        </Header>
        <Content className="app-content">
          <Routes>
            <Route path="/" element={<ComponentPreview />} />
            <Route path="/poker-cards" element={<PokerCardShowcase />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
