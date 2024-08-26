import React from 'react';




const Header: React.FC = () => {
   
  
  return (
    <div className={'header'}>
        <div>
            Comments
        </div> 
        <div className={'sort'}>
            <button>Latest</button>
            <button>Popular</button>
        </div> 
    </div>
  );
};

export default Header;
