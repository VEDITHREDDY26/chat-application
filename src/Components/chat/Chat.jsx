import { useEffect, useRef, useState } from "react";
import "./Chat.css";
import EmojiPicker from "emoji-picker-react";
import { useUserStore } from '../../lib/UserStore';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from '../../lib/ChatStore';
import { toast } from "react-toastify";

const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  const [isCameraActive, setIsCameraActive] = useState(false);

  const { currentUser } = useUserStore();
  const { chatId, user , isCurrentUserBlocked,isReceiverBlocked} = useChatStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "chats", chatId),
      (res) => {
        setChat(res.data());
      }
    );

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  // Define the upload function here
  const upload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "chat-app2");
    data.append("cloud_name", "dssejymog");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dssejymog/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const uploadedData = await res.json();
      const imageUrl = uploadedData.secure_url;
      return imageUrl; // Return the uploaded image URL
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Failed to upload image");
      return null; // Return null in case of error
    }
  };

  const handleImg = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    setImg({
      file,
      url: URL.createObjectURL(file),
    });
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      document.body.appendChild(video); // Display camera preview

      setIsCameraActive(true); // Activate the camera preview

      // Store the video and canvas references to stop them later
      video.current = video;
      stream.current = stream;
    } catch (err) {
      console.error("Camera access denied", err);
    }
  };

  const captureImage = async () => {
    if (!isCameraActive) return; // Only capture image if the camera is active

    const video = document.querySelector("video");
    const stream = video.srcObject;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Capture image from video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    const blob = dataURItoBlob(dataUrl);
    setImg({ file: blob, url: dataUrl });

    // Stop the video stream after capturing the image
    stream.getTracks().forEach((track) => track.stop());

    document.body.removeChild(video); // Remove the preview
    setIsCameraActive(false); // Deactivate the camera preview
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const buffer = new ArrayBuffer(byteString.length);
    const view = new Uint8Array(buffer);

    for (let i = 0; i < byteString.length; i++) {
      view[i] = byteString.charCodeAt(i);
    }

    return new Blob([buffer], { type: mimeString });
  };

  const handleSend = async () => {
    let imgUrl = null;
  
    if (text === "" || !currentUser) return;
  
    try {
      if (img.file) {
        imgUrl = await upload(img.file); // Use the upload function here
      }
  
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: Date.now(),
          ...(imgUrl && { img: imgUrl }), // Include the image URL if available
        }),
      });
  
      const userIDs = [currentUser.id, user.id];
  
      const updates = userIDs.map(async (id) => {
        const userChatRef = doc(db, "userChats", id);
        const userChatsSnapshot = await getDoc(userChatRef);
  
        let userChatData = userChatsSnapshot.exists()
          ? userChatsSnapshot.data()
          : { chats: [] };
  
        const chatIndex = userChatData.chats.findIndex((c) => c.chatId === chatId);
  
        if (chatIndex !== -1) {
          userChatData.chats[chatIndex].lastMessage = text;
          userChatData.chats[chatIndex].isSeen = id === currentUser.id;
          userChatData.chats[chatIndex].updatedAt = Date.now();
        }
  
        await updateDoc(userChatRef, {
          chats: userChatData.chats,
        });
      });
  
      setText(""); // Clear text input after sending
      setImg({ file: null, url: "" }); // Clear image state after sending
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar||"avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username || "User"}</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit </p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message) => (
          <div className={message.senderId === currentUser?.id ? "message own" : "message"} key={message?.createdAt}>
            <div className="texts">
              {message.img && <img src={message.img} alt="sent image" />}
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="preview" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="" />
          </label>
          <input type="file" id="file" style={{ display: "none" }} onChange={handleImg} />
          <img src="./camera.png" alt="" onClick={startCamera}/>
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder={isCurrentUserBlocked || isReceiverBlocked ? "You cannot send a message" : "Type a message...."}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={() => setOpen((prev) => !prev)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton" onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>Send</button>
        {isCameraActive && (
          <button  className="sendButton"onClick={captureImage}>Capture</button> // Add capture button to trigger image capture
        )}
      </div>
    </div>
  );
};

export default Chat;






// .chat {
//     flex: 2;
//     border-left: 1px solid #dddddd35;
//     border-right: 1px solid #dddddd35;
//     height: 100%;
//     display: flex;
//     flex-direction: column;
// }

// .top {
//     padding: 20px;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     border-bottom: 1px solid #dddddd35;
// }

// .user {
//     display: flex;
//     align-items: center;
//     gap: 20px;
// }

// .user img {
//     width: 60px;
//     height: 60px;
//     border-radius: 50%;
//     object-fit: cover;
// }

// .texts {
//     display: flex;
//     flex-direction: column;
//     gap: 5px;
// }

// .texts span {
//     font-size: 18px;
//     font-weight: bold;
// }

// .texts p {
//     font-size: 14px;
//     font-weight: 300;
//     color: #a5a5a5;
// }

// .icons {
//     display: flex;
//     gap: 20px;
// }

// .icons img {
//     width: 20px;
//     height: 20px;
// }

// .center {
//     padding: 20px;
//     flex: 1;
//     overflow-y: auto; /* Allow scrolling when content overflows */
//     display: flex;
//     flex-direction: column;
//     gap: 20px;
// }

// .message {
//     max-width: 70%;
//     display: flex;
//     gap: 20px;
//     margin-bottom: 10px; /* Space between messages */

//     &.own {
//         align-self: flex-end; /* Align the sent messages to the right */
//     }

//     .texts {
//         flex: 1;
//         display: flex;
//         flex-direction: column;
//         gap: 5px;
//         max-width: 100%; /* Prevent overflow in texts container */
//     }

//     /* Handle images in messages */
//     img {
//         width: auto; /* Maintain original width based on aspect ratio */
//         max-width: 100%; /* Ensure image doesn't overflow */
//         max-height: 400px; /* Limit max height */
//         object-fit: contain; /* Preserve aspect ratio */
//         border-radius: 10px;
//         margin-bottom: 10px;
//     }

//     p {
//         padding: 20px;
//         background-color: rgba(17, 25, 40, 0.3);
//         border-radius: 10px;
//         word-wrap: break-word; /* Ensure text wraps properly */
//     }
// }

// .bottom {
//     padding: 20px;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     border-top: 1px solid #dddddd35;
//     gap: 20px;
//     margin-top: auto;
// }

// .icons {
//     display: flex;
//     gap: 20px;
// }

// .icons img {
//     width: 20px;
//     height: 20px;
//     cursor: pointer;
// }

// input {
//     flex: 1;
//     background-color: rgba(17, 25, 40, 0.5);
//     border: none;
//     outline: none;
//     color: white;
//     padding: 20px;
//     border-radius: 10px;
//     font-size: 16px;

//     &:disabled{
//         background-color: #5182feb4;
//         cursor:not-allowed;
//     }
// }

// .emoji {
//     position: relative;
// }

// .picker {
//     position: absolute;
//     bottom: 50px;
//     left: 0;
// }

// .sendButton {
//     background-color: #5183fe;
//     color: white;
//     padding: 10px 20px;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;

//     &:disabled{
//         background-color: #5182feb4;
//         cursor:not-allowed;
//     }
// }