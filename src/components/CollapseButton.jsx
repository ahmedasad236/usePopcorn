import React from 'react';

function CollapseButton({ isOpen, setIsOpen }) {
  return (
    <button
      className="btn-toggle"
      onClick={() => setIsOpen((open) => !open)}
    >
      {isOpen ? '–' : '+'}
    </button>
  );
}

export default CollapseButton;
