import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";

const UpdateProduct = (props) => {

    const { id } = useParams();
    const [productTitle, setProductTitle] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const navigate = useNavigate('');
    const [errors, setErrors] = useState([])

    // retrieve the current values for this person to get prefilled values for form
    useEffect(() => {
        axios.get('http://localhost:8000/api/oneProductById/' + id)
            .then(res => {
                setProductTitle(res.data.productTitle);
                setProductPrice(res.data.productPrice);
                setProductDescription(res.data.productDescription);
            })
            .catch(err => console.log('get product detail in update err: ', err))
    }, [])

    const updateProduct = (e) => {
        e.preventDefault();

        axios.put('http://localhost:8000/api/edit/' + id, {
            productTitle,
            productPrice,
            productDescription
        })
            .then(res => {
                console.log('update completed: ', res);
                navigate("/home");
            })
            .catch(err => {console.log('put err: ', err);
                            setErrors(err.response.data.errors)})
    }

    return (
        <section id='updateProduct'>
            <h1 className='itemDetail'>Edit Item Details</h1>
            <form onSubmit={updateProduct}>
                    <input className='itemDetail' type="text"  
                    value={productTitle} 
                    onChange={(e) => { setProductTitle(e.target.value) }} />
                    {errors.productTitle?<p className='errorMessage'>{errors.productTitle.message}</p>:null}<br />
                    <input className='itemDetail'  type="number" min="0" step=".01"  
                    value={productPrice} 
                    onChange={(e) => { setProductPrice(e.target.value) }} />
                    {errors.productPrice?<p className='errorMessage'>{errors.productPrice.message}</p>:null}<br />
                
                    <input className='itemDetail' type="text"  
                    value={productDescription} 
                    onChange={(e) => { setProductDescription(e.target.value) }} />
                    {errors.productDescription?<p className='errorMessage'>{errors.productDescription.message}</p>:null}<br />
                    <div id='detailButtons'>
                    <Link to={'/home'} className='lookLikeButton'>Home</Link>
                    <Link to={`/productDetail/${id}`} className='lookLikeButton'>Details</Link>
                <button>Submit</button>
                <Link to={`/productDetail/${id}`} className='lookLikeButton'>Cancel</Link>

                    </div>
                   
            </form>
        </section>
    )
}
export default UpdateProduct;