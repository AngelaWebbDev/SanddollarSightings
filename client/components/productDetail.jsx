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
        <section id='productDetail'>
            <h1 className='itemDetail'>{product.productTitle}</h1>
            <p className='itemDetail'>${product.productPrice}</p>
            <p id='description' className='itemDetail'>{product.productDescription}</p>
            <div id='detailButtons'>
                <Link to={'/home'} className='lookLikeButton'>Back to List</Link>
                <Link to={`/product/edit/${id}`} className='lookLikeButton'>Edit</Link>
                <button onClick={(e) => deleteProduct(product._id, product.productTitle)}>Delete</button>
            </div>
            
        </section>
    );
}
export default ProductDetail;