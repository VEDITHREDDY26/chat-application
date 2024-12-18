import "../../AddUser/AddUser.css";
import { db } from "../../../lib/firebase";
import { collection, getDocs, query, where, serverTimestamp, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useState } from "react";
import useChatStore from "../../../lib/UserStore";

const AddUser1 = () => {
  const [user, setUser] = useState(null);
  const { currentUser } = useChatStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      } else {
        console.log("No users found");
      }
    } catch (err) {
      console.error("Error searching user:", err);
    }
  };

  const handleAdd = async () => {
    console.log("Add User button clicked");

    // Ensure user and currentUser are valid before proceeding
    if (!user || !user.id || !currentUser || !currentUser.id) {
      console.log("User or current user is missing or invalid");
      return;
    }

    try {
      // Create a new chat reference
      const newChatRef = doc(collection(db, "chats"));

      // Set initial chat data
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      // Add chat to userChats for the selected user
      await updateDoc(doc(db, "userChats", user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      // Add chat to userChats for the current user
      await updateDoc(doc(db, "userChats", currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });

      console.log("Chat created with ID:", newChatRef.id);
    } catch (err) {
      console.error("Error adding user to chat:", err);
    }
  };

  return (
    <div className="addUser">
      <h1>Add User</h1>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="username" name="username" required />
        <button>Search</button>
      </form>

      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="" />
            <span>{user.name || user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser1;
