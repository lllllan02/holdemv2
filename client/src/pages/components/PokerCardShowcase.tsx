import React, { useState } from 'react';
import { Card, Space, Row, Col, Typography, Select, Switch, Slider } from 'antd';
import { PokerCard } from '../../components/PokerCard';
import type { CardSuit, CardRank } from '../../components/PokerCard';
import '../../styles/PokerCardShowcase.css';

const { Title, Text } = Typography;
const { Option } = Select;

export const PokerCardShowcase: React.FC = () => {
  const [selectedSuit, setSelectedSuit] = useState<CardSuit>('hearts');
  const [selectedRank, setSelectedRank] = useState<CardRank>('A');
  const [faceUp, setFaceUp] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [width, setWidth] = useState(80);

  const suits: CardSuit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
  const ranks: CardRank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const suitNames = {
    hearts: '红桃',
    diamonds: '方块',
    clubs: '梅花',
    spades: '黑桃',
  };

  return (
    <div className="poker-showcase">
      <div className="showcase-header">
        <Title level={2}>扑克牌组件展示</Title>
        <Text type="secondary">测试和预览扑克牌组件的各种状态</Text>
      </div>

      <div className="showcase-content">
        <Card title="交互式测试" style={{ marginBottom: 24 }}>
          <Row gutter={24}>
            <Col span={8}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Text strong>花色：</Text>
                  <Select value={selectedSuit} onChange={setSelectedSuit} style={{ width: '100%', marginTop: 8 }}>
                    {suits.map(suit => (
                      <Option key={suit} value={suit}>{suitNames[suit]}</Option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Text strong>点数：</Text>
                  <Select value={selectedRank} onChange={setSelectedRank} style={{ width: '100%', marginTop: 8 }}>
                    {ranks.map(rank => (
                      <Option key={rank} value={rank}>{rank}</Option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Text strong>牌面朝上：</Text>
                  <Switch checked={faceUp} onChange={setFaceUp} style={{ marginTop: 8 }} />
                </div>

                <div>
                  <Text strong>宽度: {width}px</Text>
                  <Slider 
                    min={40} 
                    max={200} 
                    value={width} 
                    onChange={setWidth}
                    style={{ marginTop: 8 }}
                  />
                </div>

                <div>
                  <Text strong>旋转: {rotation}°</Text>
                  <Slider 
                    min={-180} 
                    max={180} 
                    value={rotation} 
                    onChange={setRotation}
                    style={{ marginTop: 8 }}
                  />
                </div>
              </Space>
            </Col>

            <Col span={16}>
              <div className="interactive-preview">
                <PokerCard 
                  suit={faceUp ? selectedSuit : undefined} 
                  rank={faceUp ? selectedRank : undefined} 
                  width={width}
                  rotation={rotation}
                />
              </div>
            </Col>
          </Row>
        </Card>

        <Card title="所有卡牌">
          <div className="all-cards-section">
            <div className="suit-group">
              <Row gutter={[12, 12]} align="middle">
                <Col flex="none">
                  <Title level={4} style={{ margin: 0, minWidth: '60px' }}>红桃</Title>
                </Col>
                <Col flex="auto">
                  <Row gutter={[12, 12]}>
                    {ranks.map(rank => (
                      <Col key={rank}>
                        <PokerCard suit="hearts" rank={rank} width={80} />
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </div>

            <div className="suit-group">
              <Row gutter={[12, 12]} align="middle">
                <Col flex="none">
                  <Title level={4} style={{ margin: 0, minWidth: '60px' }}>方块</Title>
                </Col>
                <Col flex="auto">
                  <Row gutter={[12, 12]}>
                    {ranks.map(rank => (
                      <Col key={rank}>
                        <PokerCard suit="diamonds" rank={rank} width={80} />
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </div>

            <div className="suit-group">
              <Row gutter={[12, 12]} align="middle">
                <Col flex="none">
                  <Title level={4} style={{ margin: 0, minWidth: '60px' }}>梅花</Title>
                </Col>
                <Col flex="auto">
                  <Row gutter={[12, 12]}>
                    {ranks.map(rank => (
                      <Col key={rank}>
                        <PokerCard suit="clubs" rank={rank} width={80} />
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </div>

            <div className="suit-group">
              <Row gutter={[12, 12]} align="middle">
                <Col flex="none">
                  <Title level={4} style={{ margin: 0, minWidth: '60px' }}>黑桃</Title>
                </Col>
                <Col flex="auto">
                  <Row gutter={[12, 12]}>
                    {ranks.map(rank => (
                      <Col key={rank}>
                        <PokerCard suit="spades" rank={rank} width={80} />
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
