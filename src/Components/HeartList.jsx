import React, { useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify


function HeartList({ productId }) {
  const [isToggled, setIsToggled] = useState(false); // Local state for each heart icon

  const handleHeartClick = () => {
    console.log("added to favorites")
    setIsToggled((prev) => !prev); // Toggle the state
    // if (!isToggled) {
    //   toast.success('Added to favorites!');
    // } else {
    //   toast.error('Removed from favorites!');
    // }
  };

  return (
    <>
    <HeartIcon
      onClick={handleHeartClick}
      className={`w-6 h-6 cursor-pointer ${
        isToggled ? 'fill-red-500' : 'text-gray-500'
      }`}
      id={productId} // Set the ID of the heart icon
      
    />
    {/* <ToastContainer 
     closeOnClick
     pauseOnHover
     draggable
    
    limit={1}
     autoClose={3000}
     hideProgressBar={false}
     closeButton = {false}
    //  closeOnClick={true}
    //  pauseOnHover={true}
    /> */}
    </>
  );
}

export default HeartList;
