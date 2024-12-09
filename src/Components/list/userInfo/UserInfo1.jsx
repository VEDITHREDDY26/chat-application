import React from 'react'
import "./userInfo.css"

const userInfo = () => {
  return (
    <div className='userInfo'>
      user info
      <div className='user'>
        <img src="../../../../public/avatar.png" alt="" />
        <h2>muneeb</h2>
      </div>

      <div className='icon'>
        <img src="../../../../public/more.png" alt="" />
        <img src="../../../../public/video.png  ./video.png" alt="" />
        <img src="../../../../public/edit.png" alt="" />
      </div>
    </div>
  )
}

export default userInfo
