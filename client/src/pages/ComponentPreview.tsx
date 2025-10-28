import { Layout, Card, Typography, Empty } from 'antd';
import '../styles/ComponentPreview.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export const ComponentPreview: React.FC = () => {
  return (
    <Layout className="component-preview-layout">
      <Header className="preview-header">
        <Title level={3}>组件预览</Title>
        <Text type="secondary">用于展示和测试各种组件</Text>
      </Header>
      <Content className="preview-content">
        <div className="component-list">
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
        </div>
      </Content>
    </Layout>
  );
};
