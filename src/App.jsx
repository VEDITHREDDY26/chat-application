// import Chat from "./Components/chat/Chat"
// import Detail from "./Components/detail/Detail"
// import List from "./Components/list/LIst"
// import Login from "./Components/Login/Login";
// import Notification from "./Components/notification/notification";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./lib/firebase";
// import { useState,useEffect } from "react";
// import useUserStore from "./lib/UserStore";
// import {doc,getDoc} from "firebase/firestore";


// const App = () => {

  
//   const {currentUser,isLoading,fetchUserInfo} = useUserStore();

//   useEffect(()=>{
//     const unsubscribe = onAuthStateChanged(auth,(user)=>{
//       // setUser(user);
//       fetchUserInfo(user.uid);
//       console.log(user);
//     })
//     return ()=>unsubscribe();
//   },[fetchUserInfo])

//   console.log(currentUser);

//   if(isLoading){
//     return <div className="loading">Loading...</div>
//   }
//   return (
//     <div className='container' >
      
//         {currentUser ? (
//           <>
//           <List/>
//           <Chat/>
//           <Detail/>
//           </> 
//         )
//       :(
//         <Login/>
//       )}
//       <Notification/>
     

//     </div>
//   )
// }

// export default App



import Chat from "./Components/chat/Chat";
import Detail from "./Components/detail/Detail";
import List from "./Components/list/LIst";
import Login from "./Components/Login/Login";
import Notification from "./Components/notification/notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useState, useEffect } from "react";
import useUserStore from "./lib/UserStore";


const App = () => {
  // const isLoading = false;
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
     fetchUserInfo(user?.uid);
    });

    return () => unsubscribe();
  }, [fetchUserInfo]);

  console.log(currentUser);

  // if (isLoading) {
  //   return <div className="loading">Loading...</div>;
  // }
  

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          <Chat />
          <Detail />
          
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
