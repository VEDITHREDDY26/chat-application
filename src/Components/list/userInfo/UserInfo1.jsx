import React from 'react';
import "./UserInfo1.css";

const UserInfo = () => {
  return (
    <div className='userInfo'>
      <div className='user'>
        <img src="/avatar.png" alt="User Avatar" />
        <h2>Muneeb</h2>
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
