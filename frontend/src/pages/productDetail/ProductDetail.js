import React, { useEffect, useState } from 'react'
import Product from './product';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../redux/features/prod/productService';
import Loader from '../../components/loader/Loader';




const ProductDetail = () => {
  const [isLoading, setIsloading] = useState(true)
  const {id} = useParams()
  const [singleProduct, setSingleProduct] = useState({})

 useEffect(() => {
  const getProduct = async() => {

    try {
      const res = await axios.get(API_URL + id)
      console.log(res.data)
      const productData = res.data;
      setSingleProduct(productData)
    
        // Scroll to the top of the page
        window.scrollTo(0, 0);
      
      setIsloading(false)
    } catch (error) {
      console.log(error)
    }

  }
  getProduct()
 },[])


  
  return (
    <>
    {isLoading && <Loader/>}
    <section className='--bg-grey'>
    <div className="container">
      <h3>Product details</h3>
   <Product
   id={singleProduct.id}
   name={singleProduct.name}
   price={singleProduct.price}
   description={singleProduct.description}
   color={singleProduct.color}
   sku={singleProduct.sku}
   sold = {singleProduct.sold}
   imageURL={singleProduct.imageURL}
  
  
   />
    </div>
  </section>
  </>
  )
}

export default ProductDetail