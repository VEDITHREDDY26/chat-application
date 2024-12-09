import Chat from "./Components/chat/Chat"
import Detail from "./Components/detail/Detail"
import List from "./Components/list/LIst"


const App = () => {
  return (
    <div className='container' >
      
      <List/>
      <Chat/>
      <Detail/>

    </div>
  )
}

export default App