import React, { useState, useEffect } from 'react';
import { RingLoader } from 'react-spinners';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Button } from '@headlessui/react';
import HeartList from './HeartList';

const ProductComponent=({product}) => {
const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchPrpduct = async()=>{
    try {
        const response = await fetch ('https://fakestoreapi.com/products')
        const data = await response.json()
        setProducts(data)
    } catch (error) {
        console.error('Error fetching the product' , error)
    }
    finally{
        setLoading(false)
    }
  }
;
  fetchPrpduct();
}
 , [])
   

  const [isToggled, setIsToggled]  = useState(false)
 
 function handleCart() {
  console.log("Added to Cart")
}

function handleHeartClick() {
  setIsToggled(!isToggled)
}

return(
    <div>
      {loading?  (<div className='flex items-center justify-center min-h-screen'> 
        <RingLoader color={'#4A90E2'} size={150}/>
    </div>):(
        
         <div>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
            <h2>{product.title}</h2>
            <img src={product.image} alt={product.title} style={{ width: '100px', height: '100px' }} />
            <p>{product.description.substring(0, 100)}...</p>
            <p className="font-bold">Price: ${product.price}</p>
            <HeartList productId={product.id} />
            {/* <HeartIcon onClick={handleHeartClick} className= {`w-6 h-6 cursor-pointer bottom-2 right-2 ${isToggled ? 'fill-red-500' : 'text-gray-500'}`} /> */}
            <Button onClick={handleCart}
  className = "rounded py-2 px-4 text-sm text-white bg-sky-500"  >
    Add To Cart</Button>
          </div>
        ))}
      </div>
       </div>
    )}
    </div>
)



};

export default ProductComponent