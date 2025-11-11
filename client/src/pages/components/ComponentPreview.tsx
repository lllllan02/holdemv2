import React from 'react';
import { Layout, Card, Typography, Row, Col, Tag, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../../styles/ComponentPreview.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

interface ComponentInfo {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  route: string;
}

const components: ComponentInfo[] = [
  {
    id: 'poker-card',
    title: '扑克牌组件',
    description: '支持所有花色、点数和尺寸的扑克牌组件，包含牌面/牌背切换功能',
    status: 'completed',
    route: '/poker-cards',
  },
  {
    id: 'topbar',
    title: '顶部导航栏组件',
    description: '固定顶部导航栏，显示底池、玩家数、游戏阶段和玩家信息',
    status: 'completed',
    route: '/topbar',
  },
  {
    id: 'bottombar',
    title: '底部操作栏组件',
    description: '固定底部操作栏，提供过牌、跟注、加注、梭哈和弃牌等游戏操作',
    status: 'completed',
    route: '/bottombar',
  },
  {
    id: 'chat',
    title: '聊天组件',
    description: '游戏内聊天功能，支持文字消息和表情符号，可折叠展开',
    status: 'completed',
    route: '/chat',
  },
  {
    id: 'game-action-bar',
    title: '游戏操作栏组件（融合版）',
    description: '将底部操作栏和聊天组件融合在一起，提供完整的游戏操作和聊天功能',
    status: 'completed',
    route: '/game-action-bar',
  },
  // 可以在这里添加更多组件
];

const statusColors = {
  completed: 'success',
  'in-progress': 'processing',
  planned: 'default',
};

const statusTexts = {
  completed: '已完成',
  'in-progress': '开发中',
  planned: '计划中',
};

export const ComponentPreview: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (component: ComponentInfo) => {
    if (component.status !== 'planned') {
      navigate(component.route);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Layout className="component-preview-layout">
        <Header className="preview-header">
          <Title level={3}>组件预览</Title>
          <Text type="secondary">用于展示和测试各种组件</Text>
        </Header>
        <Content className="preview-content">
          <div className="component-list">
            {components.length > 0 ? (
              <Row gutter={[24, 24]}>
                {components.map(component => (
                  <Col key={component.id} xs={24} sm={24} md={12} lg={8}>
                    <Card
                      hoverable={component.status !== 'planned'}
                      className={`component-card component-card-${component.status}`}
                      onClick={() => handleCardClick(component)}
                      style={{ height: '100%' }}
                    >
                      <div className="component-card-body">
                        <div className="component-card-header">
                          <Title level={4} style={{ margin: 0 }}>
                            {component.title}
                          </Title>
                          <Tag color={statusColors[component.status]}>
                            {statusTexts[component.status]}
                          </Tag>
                        </div>
                        <Text type="secondary" className="component-description">
                          {component.description}
                        </Text>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <Card>
                <Empty 
                  description={
                    <Text type="secondary">
                      暂无组件<br />
                      当您实现组件后，可以在这里展示和预览
                    </Text>
                  }
                />
              </Card>
            )}
          </div>
        </Content>
      </Layout>
    </div>
  );
};