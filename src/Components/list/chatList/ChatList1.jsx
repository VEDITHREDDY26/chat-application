import React, { useState } from 'react'
import "./chatList.css"

const chatList = () => {
  const [addMode , setAddMode] = useState(false);
  return (
    <div className='chatList'>
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" className='searchimg' />
          <input type="text" placeholder='search' className='inputblk'/>
        </div>
        <img src={addMode ? "./minus.png":"./plus.png"} alt="" className='add'
        onClick={()=> setAddMode((prev) => !prev)}/>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Muneeb</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Muneeb</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Muneeb</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  )
}

export default chatList
