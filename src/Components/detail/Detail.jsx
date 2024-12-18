import React, { useState, useEffect } from "react";
import "./Detail.css";
import { auth, db } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import useChatStore from "../../lib/ChatStore";
import useUserStore from "../../lib/UserStore";
import { arrayRemove, arrayUnion, doc, updateDoc, getDocs, collection } from "firebase/firestore";

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
  const { currentUser } = useUserStore();
  const [sharedFiles, setSharedFiles] = useState([]);
  const [sharedPhotos, setSharedPhotos] = useState([]);
  const [showChatSettings, setShowChatSettings] = useState(false);
  const [showPrivacyHelp, setShowPrivacyHelp] = useState(false);
  const [showSharedPhotos, setShowSharedPhotos] = useState(false);
  const [showSharedFiles, setShowSharedFiles] = useState(false);

  useEffect(() => {
    if (chatId) {
      // Fetch shared files and photos from Firestore (assuming collection 'messages' contains the data)
      const fetchSharedFilesAndPhotos = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "messages"));
          const files = [];
          const photos = [];
          querySnapshot.forEach(doc => {
            const data = doc.data();
            if (data.fileUrl) files.push(data.fileUrl);
            if (data.photoUrl) photos.push(data.photoUrl);
          });
          setSharedFiles(files);
          setSharedPhotos(photos);
        } catch (error) {
          console.log("Error fetching shared files/photos:", error);
        }
      };

      fetchSharedFilesAndPhotos();
    }
  }, [chatId]);

  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", currentUser.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>
          Lorem ipsum sit
        </p>
      </div>

      <div className="info">
        {/* Chat settings toggle */}
        <div className="option" onClick={() => setShowChatSettings(!showChatSettings)}>
          <div className="title">
            <span>Chat settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        {showChatSettings && (
          <div className="chat-settings">
            <p>Settings options like notifications, themes etc.</p>
          </div>
        )}

        {/* Privacy & Help toggle */}
        <div className="option" onClick={() => setShowPrivacyHelp(!showPrivacyHelp)}>
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        {showPrivacyHelp && (
          <div className="privacy-help">
            <p>Here you can manage privacy settings and get help.</p>
          </div>
        )}

        {/* Shared Photos toggle */}
        <div className="option" onClick={() => setShowSharedPhotos(!showSharedPhotos)}>
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        {showSharedPhotos && (
          <div className="photos">
            {sharedPhotos.length === 0 ? (
              <p>No photos shared yet.</p>
            ) : (
              sharedPhotos.map((photo, index) => (
                <div className="photo-item" key={index}>
                  <div className="photoDetail">
                    <img src={photo} alt={`photo_${index}`} />
                    <span>photo_{index + 1}.png</span>
                  </div>
                  <img src="./download.png" alt="" className="icon" />
                </div>
              ))
            )}
          </div>
        )}

        {/* Shared Files toggle */}
        <div className="option" onClick={() => setShowSharedFiles(!showSharedFiles)}>
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        {showSharedFiles && (
          <div className="files">
            {sharedFiles.length === 0 ? (
              <p>No files shared yet.</p>
            ) : (
              sharedFiles.map((file, index) => (
                <div className="file-item" key={index}>
                  <div className="fileDetail">
                    <span>{`file_${index + 1}.pdf`}</span>
                  </div>
                  <img src="./download.png" alt="" className="icon" />
                </div>
              ))
            )}
          </div>
        )}

        {/* Block User Button */}
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are blocked!"
            : isReceiverBlocked
            ? "User blocked"
            : "Block User"}
        </button>

        {/* Logout Button */}
        <button className="logout" onClick={() => auth.signOut()}>Logout</button>
      </div>
    </div>
  );
};

export default Detail;
