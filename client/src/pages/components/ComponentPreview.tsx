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
  );
};
