import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate, Link } from "react-router-dom";

const ProductDetail = (props) => {
    const { id } = useParams();
    const [product, setProduct] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/oneProductById/" + id) //attach id to api address
            .then(res => {
                console.log('get product detail res.data = ', res.data);
                setProduct(res.data);
            })
            .catch(err => console.log('get product detail error: ', err));
    }, []);

    const deleteProduct = (id, title) => {
        axios.delete('http://localhost:8000/api/oneProductById/' + id)
            .then(res => {
                console.log(`${title} was deleted`);
                navigate('/home');
            })
            .catch(err => console.log('deleteProduct err: ', err))
    }

    return (
        <div>
            <p>Title: {product.productTitle}</p>
            <p>Price: ${product.productPrice}</p>
            <p>Description: {product.productDescription}</p>
            <Link to={'/home'} style={{ border: "blue 1px solid", margin: '3px', padding: '3px' }}>Go Back</Link>
            <Link to={`/product/edit/${id}`} style={{ border: "blue 1px solid", margin: '3px', padding: '3px' }}>Edit</Link>
            <button onClick={(e) => deleteProduct(product._id, product.productTitle)}>Delete</button>
        </div>
    );
}
export default ProductDetail;