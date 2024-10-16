import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import SignUp from './Signup';

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser)
            {      setUser(currentUser);
          }else{
            setUser(null)
          }
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
 <h1>Welcome, {user.displayName ? user.displayName : 'User'}</h1>          
          <button onClick={handleLogout} className='bg-sky-500 hover:bg-red-700'>Logout</button>
        </div>
      ) : (
      <SignUp/>
      )}
    </div>
  );
}

export default Home;

