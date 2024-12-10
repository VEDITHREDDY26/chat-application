import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import EmojiPicker from "emoji-picker-react";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior:"smooth"})
  },[])

  const handleEmoji = (e) => {
    console.log(e);
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>MUNEEB</span>
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
        <div className="message own">
          {/* <img src="./author.png" alt="" /> */}
          <div className="texts">
            <img
              src="https://images.pexels.com/photos/29694048/pexels-photo-29694048/free-photo-of-elegant-black-and-white-portrait-of-a-woman.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
              explicabo debitis eum modi ea voluptate provident minima aliquam
              consequatur ipsum?
            </p>
            <span>1 min ago </span>
          </div>
        </div>
        <div className="message">
          <img src="https://images.pexels.com/photos/29694048/pexels-photo-29694048/free-photo-of-elegant-black-and-white-portrait-of-a-woman.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
              explicabo debitis eum modi ea voluptate provident minima aliquam
              consequatur ipsum?
            </p>
            <span>1 min ago </span>
          </div>
        </div>
        <div className="message own">
          {/* <img src="./author.png" alt="" /> */}
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
              explicabo debitis eum modi ea voluptate provident minima aliquam
              consequatur ipsum?
            </p>
            <span>1 min ago </span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
              explicabo debitis eum modi ea voluptate provident minima aliquam
              consequatur ipsum?
            </p>
            <span>1 min ago </span>
          </div>
        </div>
        <div className="message own">
          {/* <img src="./author.png" alt="" /> */}
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
              explicabo debitis eum modi ea voluptate provident minima aliquam
              consequatur ipsum?
            </p>
            <span>1 min ago </span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
              explicabo debitis eum modi ea voluptate provident minima aliquam
              consequatur ipsum?
            </p>
            <span>1 min ago </span>
          </div>
        </div>
        <div className="message own">
          {/* <img src="./author.png" alt="" /> */}
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
              explicabo debitis eum modi ea voluptate provident minima aliquam
              consequatur ipsum?
            </p>
            <span>1 min ago </span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
              explicabo debitis eum modi ea voluptate provident minima aliquam
              consequatur ipsum?
            </p>
            <span>1 min ago </span>
          </div>
        </div>
        <div ref = {endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chat;
