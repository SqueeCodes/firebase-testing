import React from "react";
import "./App.css";
import { auth } from "./firebase/init";
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
