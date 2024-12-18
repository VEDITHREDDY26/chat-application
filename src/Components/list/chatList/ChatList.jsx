// import React, { useState } from 'react'
// import { onSnapshot } from 'firebase/firestore';
// import { doc } from 'firebase/firestore';
// import { db } from '../../../lib/firebase';
// import useUserStore from '../../../lib/UserStore';
// import "./chatList.css"
// import AddUser from './AddUser1'
// import { useEffect } from 'react';
// // import { useChatStore } from '../../../lib/UserStore';
// // import { promises } from 'dns';
// import { getDoc } from 'firebase/firestore';


// import { useUserStore } from '../../../lib/UserStore';

// const chatList = () => {
//   const [chats,setChats] = useState([]);
//   const [addMode , setAddMode] = useState(false);
//   const {currentUser} = useUserStore();

//   useEffect(()=>{
//     const unsubscribe = onSnapshot(doc(db,"userchats",currentUser.id),async(res)=>{
//       const items = res.data().chats;
//       const promises = items.map(async(item)=>{
//         const userDocRef = doc(db,"users",item.receiverId);
//         const userDocSnap = await getDoc(userDocRef);
//         const user = userDocSnap.data();
//         return { ...item,user};
//       });
//       const chatData = await Promise.all(promises);
//       setChats(chatData).sort((a,b)=>b.updatedAt - a.updatedAt); 
//     });
//     return () => unsubscribe();
//   },[currentUser.id]);
//   // console.log(chats);

//   return (
//     <div className='chatList'>
//       <div className="search">
//         <div className="searchBar">
//           <img src="/search.png" alt="" className='searchimg' />
//           <input type="text" placeholder='search' className='inputblk'/>
//         </div>
//         <img src={addMode ? "./minus.png":"./plus.png"} alt="" className='add'
//         onClick={()=> setAddMode((prev) => !prev)}/>
//       </div>
//       {chats.map((chat)=>(
//         <div className="item" key={chat.chatId}>
//           <img src={chat.avatar} alt="" />
//         <div className="texts">
//           <span>Muneeb</span>
//           <p>{chat.lastMessage}</p>
//         </div>
//         </div>
//       ))}
//       {addMode && <AddUser/>}
//     </div>
//   )
// }

// export default chatList

import React, { useState, useEffect } from 'react';
import { onSnapshot, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import useUserStore from '../../../lib/UserStore';
import useChatStore from "../../../lib/ChatStore"
import "./chatList.css";
import AddUser from './AddUser1';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input,setInput] = useState("");

  const { currentUser } = useUserStore(); // Assuming you are using a user store
  const {changeChat} = useChatStore();

  useEffect(() => {
    if (!currentUser?.id) {
      console.error("User not logged in or currentUser.id is undefined.");
      return;
    }

    

    const unsubscribe = onSnapshot(doc(db, "userChats", currentUser.id), async (snapshot) => {
      if (!snapshot.exists()) {
        console.error("No chats found for the user.");
        setChats([]);
        return;
      }

      const items = snapshot.data()?.chats || [];
      try {
        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.exists() ? userDocSnap.data() : null;
          return { ...item, user };
        });

        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt)); // Sort after Promise resolution
      } catch (err) {
        console.error("Error fetching chats:", err);
      }
    });

    return () => unsubscribe(); // Cleanup Firestore listener
  }, [currentUser?.id]);

  const handleSelect = async (chat)=>{
    const userChats = chats.map((item)=>{
      const {user,...rest} = item;
      return rest;
    })


    const chatIndex = userChats.findIndex((item) => {
      return item.chatId === chat.chatId; // Corrected
    });
    
    if (chatIndex !== -1) {
      userChats[chatIndex].isSeen = true;
    
      const userChatsRef = doc(db, "userChats", currentUser.id);
    
      try {
        await updateDoc(userChatsRef, {
          chats: userChats,
        });
        changeChat(chat.chatId, chat.user);
      } catch (err) {
        console.error("Error updating chat:", err);
      }
    } else {
      console.error("Chat not found in userChats.");
    }
  }

  const filteredChats = chats.filter((c)=>
  c.user.username.toLowerCase().includes (input.toLowerCase()));


  return (
    <div className='chatList'>
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="Search" className='searchimg' />
          <input type="text" placeholder='Search' className='inputblk' onChange={(e)=>setInput(e.target.value)}/>
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt="Toggle Add Mode"
          className='add'
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {filteredChats.map((chat) => (
        <div className="item" key={chat.chatId} onClick={()=>handleSelect(chat)} style={{backgroundColor:chat.isSeen ? "transparent" : "#5183fe"}}>
          <img src={chat.user.blocked.includes(currentUser.id) ? "./avatar.png" : chat.user.avatar || "./avatar.png"} alt="Avatar" />
          <div className="texts">
            <span>{chat.user.blocked.includes(currentUser.id) ? "USer" : chat.user.username}</span>
            {/* <p>{chat.lastMessage || "No messages yet."}</p> */}
          </div>
        </div>
      ))}
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
