import React, { useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline'; // Adjust the import based on your setup

function HeartList({ productId }) {
  const [isToggled, setIsToggled] = useState(false); // Local state for each heart icon

  const handleHeartClick = () => {
    setIsToggled((prev) => !prev); // Toggle the state
  };

  return (
    <HeartIcon
      onClick={handleHeartClick}
      className={`w-6 h-6 cursor-pointer ${
        isToggled ? 'fill-red-500' : 'text-gray-500'
      }`}
      id={productId} // Set the ID of the heart icon
    />
  );
}

export default HeartList;
