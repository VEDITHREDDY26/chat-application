import Chat from "./Components/chat/Chat"
import Detail from "./Components/detail/Detail"
import List from "./Components/list/LIst"
import Login from "./Components/Login/Login";
import Notification from "./Components/notification/notification";


const App = () => {

  const user = false;
  return (
    <div className='container' >
      
        {user ? (
          <>
          <List/>
          <Chat/>
          <Detail/>
          </> 
        )
      :(
        <Login/>
      )}
      <Notification/>
     

    </div>
  )
}

export default App