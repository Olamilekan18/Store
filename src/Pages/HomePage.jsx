// import { useState } from "react";
// import { useNavigate } from "react-router-dom"

// function Home() {
// const navigate = useNavigate();
// const [email,setEmail] = useState('')
// const [password, setPassword] = useState('')
//   return (
//     <>
//     <p className="text-center bg-blue-500 text-3xl">Hello World</p>
//     </>
//   )
// }

// export default Home


import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import SignUp from './Signup';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/')
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.name}</h1>
          
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
      <SignUp/>
      )}
    </div>
  );
}

export default App;

