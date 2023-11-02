import React from 'react';
import { Card, Button, Tag } from 'antd';

const PortfolioItem = ({ item }) => {
    return (
        <Card
            style={{ width: '100%', marginTop: 16 }}
            cover={
                // Hero - możesz zastąpić to swoim komponentem obrazka/wideo lub custom HTML
                <img
                    alt={item.title}
                    src={item.image}
                />
            }
            actions={[
                <Button href={item.detailsLink} type="primary">Szczegóły</Button>,
                item.demoLink && <Button href={item.demoLink} type="default">Live Demo</Button>
            ]}
        >
            <Card.Meta
                title={item.title}
                description={item.description}
            />
            <div style={{ marginTop: '10px' }}>
                {item.categories.map(category => (
                    <Tag key={category} color="blue">{category}</Tag>
                ))}
            </div>
            <div style={{ marginTop: '10px' }}>
                {item.technologies.map(tech => (
                    <Tag key={tech}>{tech}</Tag>
                ))}
            </div>
        </Card>
    );
}

export default PortfolioItem;