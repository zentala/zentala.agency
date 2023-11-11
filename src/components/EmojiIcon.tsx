import React from 'react';

interface EmojiIconProps {
  emoji: string;
  label?: string;
}

const EmojiIcon: React.FC<EmojiIconProps> = ({ emoji = "✖️", label = "" }) => (
  <span role="img" className="emoji-icon" aria-label={label} aria-hidden={!label}>
    {emoji}
  </span>
);

export default EmojiIcon;