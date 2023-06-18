import { useState } from 'react';
import CollapseButton from './CollapseButton';
import WatchedSummary from './WatchedSummary';
import WatchedList from './WatchedList';

function WatchedBox({ watched }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <CollapseButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {isOpen && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </>
      )}
    </div>
  );
}

export default WatchedBox;
