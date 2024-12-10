import React, { useState } from 'react'
import { onSnapshot } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import useUserStore from '../../../lib/UserStore';
import "./chatList.css"
import AddUser from './AddUser1'
import { useEffect } from 'react';
// import { useChatStore } from '../../../lib/UserStore';
// import { promises } from 'dns';
import { getDoc } from 'firebase/firestore';



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



const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const { currentUser } = useUserStore(); // Assuming you are using a user store

  useEffect(() => {
    if (!currentUser?.id) {
      console.error("User not logged in or currentUser.id is undefined.");
      return;
    }

    const unsubscribe = onSnapshot(doc(db, "userchats", currentUser.id), async (snapshot) => {
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

  return (
    <div className='chatList'>
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="Search" className='searchimg' />
          <input type="text" placeholder='Search' className='inputblk' />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt="Toggle Add Mode"
          className='add'
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {chats.map((chat) => (
        <div className="item" key={chat.chatId}>
          <img src={chat.user?.avatar || "/default-avatar.png"} alt="Avatar" />
          <div className="texts">
            <span>{chat.user?.name || "Unknown User"}</span>
            <p>{chat.lastMessage || "No messages yet."}</p>
          </div>
        </div>
      ))}
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;

