import React, { useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const ProductList = (props) => {
    const { products, setProducts } = props;

    useEffect(() => {
        axios.get("http://localhost:8000/api/allProducts")
            .then((res) => {
                console.log('api get allProducts res.data: ', res.data);
                setProducts(res.data);
                // console.log('products = ', products)
            })
            .catch((err) => {
                console.log('get all products error: ', err);
            })
    }, [])

    return (
        <>
        <p>Products:</p>
        {products.map((product) => {  
            return(
                <div key={product._id} style={{border:'1px white solid', margin:'3px', paddingBottom:'10px'}}>
                    <p>Title: {product.productTitle}</p>
                </div>
            )
            
        })}
        </>
    );
}
export default ProductList;