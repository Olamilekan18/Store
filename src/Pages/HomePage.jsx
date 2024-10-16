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

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.email}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Please log in or sign up</h1>
        </div>
      )}
    </div>
  );
}

export default App;

