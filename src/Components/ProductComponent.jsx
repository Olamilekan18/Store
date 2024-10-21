import React, { useState, useEffect } from 'react';
import { RingLoader } from 'react-spinners';

const ProductComponent=() => {
const [product, setProduct] = useState(null)
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchPrpduct = async()=>{
    try {
        const response = await fetch ('https://fakestoreapi.com/products/1')
        const data = await response.json()
        setProduct(data)
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

return(
    <div>
      {loading?  (<div className='flex items-center justify-center min-h-screen'> 
        <RingLoader color={'#4A90E2'} size={150}/>
    </div>):(
         <div>
         <h1>{product.title}</h1>
         <p>{product.description}</p>
         <p>Price: ${product.price}</p>
         <img src={product.image} alt={product.title} />
       </div>
    )}
    </div>
)



};

export default ProductComponent