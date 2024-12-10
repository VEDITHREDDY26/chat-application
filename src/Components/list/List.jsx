import React from 'react'
import "./List.css"

import UserInfo1 from './userInfo/UserInfo1'
import ChatList from './chatList/ChatList'

const List = () => {
  return (
    <div className='list'>
      <UserInfo1/>
      <ChatList/>
    

    </div>
  )
}

export default List
