import React,{useEffect} from 'react';
import { User } from 'firebase/auth';

interface UserNameProps {
  user: User; 
}

const UserName: React.FC<UserNameProps> = ({ user }) => {
    useEffect(() => {
        console.log('User Information:', user);
      }, [user]);
  
  return (
    <div className={'profile'}>
        <div className={'logo'}>
            <img src={`${user.photoURL}` } alt={'profile'}/>
        </div>
        <div>
            {user.displayName || user.email || 'Anonymous User'}
        </div>
    </div>
  );
};

export default UserName;
