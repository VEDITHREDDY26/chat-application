// import React, { useState } from 'react'
// import "./Login.css"
// import { toast } from 'react-toastify'
// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { auth } from '../../lib/firebase'
// import { doc, setDoc } from 'firebase/firestore'
// import { db } from '../../lib/firebase'


// const Login = () => {
//   const[avatar,setAvatar] = useState({
//     file:null,
//     url:""
//   });

  
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     // console.log(e.target.password.value);
//     const formData = new FormData(e.target);

//     const {username,email,password} = Object.fromEntries(formData);

//     console.log(username,email,password);
//     try{
//       const res = await createUserWithEmailAndPassword(auth,email,password);
//       await setDoc(doc(db,"users",res.user.uid),{
//         username,
//         email,
//         id:res.user.uid,
//         blocked:[],
        
//       });

//       await setDoc(doc(db,"userChats",res.user.uid),{
//         chats:[],
        
//       });
//       console.log(res);
//       toast.success("User Created Successfully");

      
//     }
//     catch(err){
//       console.log(err);
//       toast.error(err.message);
//     }
//   }

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // toast.error ("Login Successfully");
//     console.log(e.target.password.value);
//   }

//   const handleAvatar = async(e) => {
//     const file = e.target.files[0];
//     if(!file){
//       return;
//     }
//     const data = new FormData();
//     data.append("file",file);
//     data.append("upload_preset","chat-app");
//     data.append("cloud_name","dkza3nom1");

//    const res = await fetch("https://api.cloudinary.com/v1_1/dkza3nom1/image/upload",{
//       method:"POST",
//       body:data
//     })
    
//     const uploadedUrl = await res.json();
//     console.log(uploadedUrl);
//   }

//     // const user = true;
//   return (
//     <div className='login'>
//       <div className="item">

//       <h2>Welcome to the chat app</h2>
      
//       <form  onSubmit={handleLogin}>
//         <input type='text' placeholder='Email' />
//         <input type='password' placeholder='Password' name='password' />
//         <button>Sign In </button>
//       </form>
//       </div>

//       <div className="separator">

//       </div>

//       <div className='item'>
//         <h2>Create an account </h2>

//         <form onSubmit={handleRegister}>
//           <label htmlFor="file">
//             <img src={avatar.url || "./avatar.png"} alt="" />
//             Upload Image </label>
//           <input type='file' id='file'  style={{display:"none"}} onChange={handleAvatar}/>
//           <input type='text' placeholder='Username' name='username' />
//           <input type='text' placeholder='Email' name='email' />
//           <input type='password' placeholder='Password' name='password' />
//           <button>Sign Up</button>
//         </form>
//       </div>
      
//     </div>
//   )
// }

// export default Login

// import React, { useState } from "react";
// import "./Login.css";
// import { toast } from "react-toastify";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../lib/firebase";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../../lib/firebase";

// const Login = () => {
//   const [avatar, setAvatar] = useState({
//     file: null,
//     url: "",
//   });

//   const [loading,setLoading] = useState(false);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData(e.target);
//     const { username, email, password } = Object.fromEntries(formData);

//     if (!username || !email || !password) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     try { 
//       const res = await createUserWithEmailAndPassword(auth, email, password);
//       const imageUrl = avatar.url;
//       await setDoc(doc(db, "users", res.user.uid), {
//         username,
//         email,
//         avatar: imageUrl,
//         id: res.user.uid,
//         blocked: [],
        
//       });

//       await setDoc(doc(db, "userChats", res.user.uid), {
//         chats: [],
//       });

//       toast.success("User Created Successfully");
//       console.log(res);
//     } catch (err) {
//       console.error(err);
//       toast.error(err.message);
//     }finally{
//       setLoading(false);
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData(e.target);
//     const { email, password } = Object.fromEntries(formData);

//     try{
//       await signInWithEmailAndPassword(auth,email,password);
//       toast.success("Logged in Successfully");
//     }catch(err){
//       console.error(err);
//       toast.error(err.message);
//     }finally{
//       setLoading(false);
//     }
//   };

//   const handleAvatar = async (e) => {
//     const file = e.target.files[0];
//     if (!file) {
//       toast.error("Please select a file");
//       return;
//     }

//     const data = new FormData();
//     data.append("file", file);
//     data.append("upload_preset", "chat-application");
//     data.append("cloud_name", "dkza3nom1");

//     try {
//       const res = await fetch("https://api.cloudinary.com/v1_1/dkza3nom1/image/upload", {
//         method: "POST",
//         body: data,
//       });

//       const uploadedData = await res.json();
//       console.log(uploadedData.url);
//       const imageUrl = uploadedData.secure_url;
//       setAvatar({
//         file,
//         url: uploadedData.secure_url,
//       });

//       toast.success("Avatar uploaded successfully");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to upload avatar");
//     }
//   };

//   return (
//     <div className="login">
//       <div className="item">
//         <h2>Welcome to the chat app</h2>
//         <form onSubmit={handleLogin}>
//           <input type="text" placeholder="Email" name="email" />
//           <input type="password" placeholder="Password" name="password" />
//           <button type="submit" disabled={loading}>{loading ?"loading":"Sign In"}</button>
//         </form>
//       </div>

//       <div className="separator"></div>

//       <div className="item">
//         <h2>Create an account</h2>
//         <form onSubmit={handleRegister}>
//           <label htmlFor="file">
//             <img src={avatar.url || "./avatar.png"} alt="Avatar Preview" />
//             Upload Image
//           </label>
//           <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
//           <input type="text" placeholder="Username" name="username" />
//           <input type="text" placeholder="Email" name="email" />
//           <input type="password" placeholder="Password" name="password" />
//           <button type="submit" disabled={loading}>{loading ? "loading" : "Sign Up"} </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(false);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    // Validation
    if (!username || !email || !password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      setLoading(false);
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const imageUrl = avatar.url || "./avatar.png"; // Fallback to default avatar if not uploaded
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imageUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userChats", res.user.uid), {
        chats: [],
      });

      toast.success("User created successfully!");
      console.log("Registration response:", res);
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(
        err.code === "auth/email-already-in-use"
          ? "This email is already in use"
          : "Failed to create account"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    // Validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
    } catch (err) {
      console.error("Login error:", err);
      toast.error(
        err.code === "auth/user-not-found"
          ? "No user found with this email"
          : err.code === "auth/wrong-password"
          ? "Incorrect password"
          : "Failed to log in"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a file");
      return;
    }

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
      setAvatar({
        file,
        url: imageUrl,
      });

      toast.success("Avatar uploaded successfully!");
    } catch (err) {
      console.error("Avatar upload error:", err);
      toast.error("Failed to upload avatar");
    }
  };
  return (
    <div className="login">
      <div className="item">
        <h2>Welcome to the chat app</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>

      <div className="separator"></div>

      <div className="item">
        <h2>Create an account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="Avatar Preview" />
            Upload Image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
