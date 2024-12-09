import React from 'react'
import "./chatList.css"

const chatList = () => {
  return (
    <div className='chatList'>
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" className='searchimg' />
          <input type="text" placeholder='search' className='inputblk'/>
        </div>
        <img src="./plus.png" alt="" className='add'/>
      </div>
    </div>
  )
}

export default chatList
