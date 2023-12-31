import { useState } from 'react';
import propTypes from 'prop-types';
import Star from './Star';

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
};

const starsContainerStyle = {
  display: 'flex',
  gap: '4px'
};

StarRating.prototype = {
  maxRating: propTypes.number,
  defaultRating: propTypes.number,
  size: propTypes.number,
  color: propTypes.string,
  className: propTypes.string,
  messages: propTypes.array,
  onSetRating: propTypes.func
};

function StarRating({
  maxRating = 5,
  defaultRating = 0,
  color = '#fcc419',
  size = 48,
  messages = [],
  onSetRating = (rate) => {}
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
    onSetRating(rate);
  };
  const textStyle = {
    lineHeight: '0',
    margin: '0',
    fontSize: `${size / 1.5}px`,
    color
  };
  return (
    <div style={containerStyle}>
      <div style={starsContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            color={color}
            size={size}
            key={`star${i}`}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            isFull={tempRating ? tempRating >= i + 1 : i + 1 <= rating}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ''}
      </p>
    </div>
  );
}

export default StarRating;
