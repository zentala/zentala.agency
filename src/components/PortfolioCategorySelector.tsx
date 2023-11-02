import React, { useState } from 'react';
import { Button } from 'antd';

const PortfolioCategorySelector = ({ onCategoryChange }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const handleButtonClick = (category) => {
      setSelectedCategory(category);
      onCategoryChange(category === 'all' ? null : category);
  };

    return (
        <Button.Group>
            <Button 
                type={selectedCategory === 'all' ? "primary" : "default"} 
                onClick={() => handleButtonClick('all')}
            >
                Wszystkie prace
            </Button>
            {['Hardware', 'Websites', 'Apps', 'Marketing', 'Design', 'Automation'].map(category => (
                <Button 
                    key={category} 
                    type={selectedCategory === category.toLowerCase() ? "primary" : "default"} 
                    onClick={() => handleButtonClick(category.toLowerCase())}
                >
                    {category}
                </Button>
            ))}
        </Button.Group>
    );
}

export default PortfolioCategorySelector;
