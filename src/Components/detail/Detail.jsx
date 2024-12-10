import React from "react";
import "./Detail.css";
const Detail = () => {
  return (
    <div className="detail">
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>MUNEEB</h2>
        <p>
          Lorem ipsum dolor sit 
        </p>
      </div>

      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowUp.png" alt="" />
          </div>
          <div className="photos">
            <div className="photo-item">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/29694048/pexels-photo-29694048/free-photo-of-elegant-black-and-white-portrait-of-a-woman.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photo-item">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/29694048/pexels-photo-29694048/free-photo-of-elegant-black-and-white-portrait-of-a-woman.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon"/>
            </div>
            <div className="photo-item">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/29694048/pexels-photo-29694048/free-photo-of-elegant-black-and-white-portrait-of-a-woman.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon"/>
            </div>
            <div className="photo-item">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/29694048/pexels-photo-29694048/free-photo-of-elegant-black-and-white-portrait-of-a-woman.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon"/>
            </div>
            <div className="photo-item">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/29694048/pexels-photo-29694048/free-photo-of-elegant-black-and-white-portrait-of-a-woman.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon"/>
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" className="icon"/>
          </div>
        </div>

        <button>Block User</button>
        <button className="logout">Logout</button>

      </div>
    </div>
  );
};

export default Detail;
