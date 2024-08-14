import React from "react";
import "./App.css";
import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Skeleton from "./components/Skeleton";
import img from './assets/img.png';


function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  async function updatePost() {
    const hardcodedId = "FBFrVhKNYC030E1uSa8I";
    const postRef = doc(db, "posts", hardcodedId);
    const post = await getPostById(hardcodedId);
    console.log(post);
    const newPost = {
      ...post,
      title: "Land a 400k Job."
    };
    console.log(newPost)
    updateDoc(postRef, newPost);
  }

  function deletePost() {
    const hardcodedId = "FBFrVhKNYC030E1uSa8I";
    const postRef = doc(db, "posts", hardcodedId);
    deleteDoc(postRef)
  }

  function createPost() {
    const post = {
      title: "Finish interview section",
      description: "Do Frontend Simplified",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post)
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map(elem => ({ ...elem.data(), id: elem.id }));
    console.log(posts)
  }

  async function getPostById(id) {
    const hardcodedId = "FBFrVhKNYC030E1uSa8I";
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map(doc => doc.data()));

  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function register() {
    setLoading(true);
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function login() {
    setLoading(true);
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => {
        console.log(user);
        setUser(user);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function logout() {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="img__wrapper">
            <figure>
              <img src={img} className="logo__img" alt="App logo" />
            </figure>
          </div>
          <div className="btns__wrapper">
            {loading ? (
              <Skeleton width="56px" height="56px" />
            ) : user ? (
              <button className="logout__btn" onClick={logout}>
                {user.email[0].toUpperCase()}
              </button>
            ) : (
              <>
                <button className="login__btn" onClick={login}>
                  Login
                </button>
                <button className="register__btn" onClick={register}>
                  Register
                </button>
              </>
            )}
            <button onClick={createPost}>Create Post</button>
            <button onClick={getAllPosts}>Show Posts</button>
            <button onClick={getPostById}>Show Posts by ID</button>
            <button onClick={getPostByUid}>Show Posts by UID</button>
            <button onClick={updatePost}>Update Post</button>
            <button onClick={deletePost}>Delete Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
