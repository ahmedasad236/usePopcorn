import React, { useState } from 'react';
import CollapseButton from './CollapseButton';

function CollapsedBox({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <CollapseButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {isOpen && children}
    </div>
  );
}

export default CollapsedBox;
