import React from 'react';
import "./UserInfo1.css";
import useUserStore from '../../../lib/UserStore';

const UserInfo = () => {

  const {currentUser} = useUserStore();

  return (
    <div className='userInfo'>
      <div className='user'>
        <img src={currentUser.avatar || "./avatar.png"} alt="User Avatar" />
        <h2>{currentUser.username}</h2>
      </div>

      <div className='icon'>
        <img src="/more.png" alt="More Options" />
        <img src="/video.png" alt="Start Video" />
        <img src="/edit.png" alt="Edit Profile" />
      </div>
    </div>
  );
};

export default UserInfo;
