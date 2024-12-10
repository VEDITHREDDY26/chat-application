import { ToastContainer } from "react-toastify"
import "./notification.css"
import "react-toastify/dist/ReactToastify.css"

const Notification = () => {
  return (
    <div >
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </div>
  )
}

export default Notification
