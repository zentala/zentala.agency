import React from 'react';
import { Button } from 'antd';
import './AntdExtended.sass';

interface CustomButtonProps {
  customStyle?: 'myTheme';
  [key: string]: any;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ customStyle, ...props }) => {
  let className = '';

  if (customStyle === 'lead') {
    className = 'leading-button';
  }

  return <Button className={className} {...props} />;
};


