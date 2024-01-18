import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams, Link} from "react-router-dom";

const ProductDetail = (props) => {
    const {id} = useParams();
    const [product, setProduct] = useState([])

    useEffect(() => {
        console.log('api address: ', "http://localhost:8000/api/productDetail/" + id)
        axios.get("http://localhost:8000/api/productDetail/" + id) //attach id to api address
            .then( res => {
                console.log('get product detail res.data = ', res.data);
                setProduct(res.data);
            })
            .catch( err => console.log('get product detail error: ', err) );
    }, []);

    return (
        <div>
            <p>Title: {product.productTitle}</p>
            <p>Price: ${product.productPrice}</p>
            <p>Description: {product.productDescription}</p>
            <Link to={'/home'}>Go Back</Link>
        </div>
    );
}
export default ProductDetail;