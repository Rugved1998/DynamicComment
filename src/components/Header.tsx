import React, { useState } from 'react';

interface HeaderProps {
  handleSort: (sortBy: 'createdAt' | 'reactCount') => void;
  commentsCount: number; // Added commentsCount prop
}

const Header: React.FC<HeaderProps> = ({ handleSort, commentsCount }) => {
  const [activeButton, setActiveButton] = useState<'createdAt' | 'reactCount'>('createdAt');

  const handleClick = (sortBy: 'createdAt' | 'reactCount') => {
    setActiveButton(sortBy);
    handleSort(sortBy);
  };

  return (
    <div className="header">
      <div>
        Comments ({commentsCount}) {/* Display count of comments */}
      </div>
      <div className="sort">
        <button
          className={activeButton === 'createdAt' ? 'active' : ''}
          onClick={() => handleClick('createdAt')}
          disabled={activeButton === 'createdAt'}
        >
          Latest
        </button>
        <button
          className={activeButton === 'reactCount' ? 'active' : ''}
          onClick={() => handleClick('reactCount')}
          disabled={activeButton === 'reactCount'}
        >
          Popular
        </button>
      </div>
    </div>
  );
};

export default Header;
