import "../../AddUser/AddUser.css"

const AddUser1 = () => {
  return (
    <div className="addUser">
      <h1>Add User</h1>
      <form action="">
        <input type="text" placeholder="username" name="username" />
        <button>Search</button>
      </form>

      <div className="user">
        <div className="detail">
            <img src="./avatar.png" alt="" />
            <span>MUNEEB</span>
        </div>
        <button>Add User</button>
      </div>
    </div>
  )
}

export default AddUser1