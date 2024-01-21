import React, { useState } from 'react'
import axios from 'axios';

const ProductForm = (props) => {
    const {products, setProducts} = props;
    const [productTitle, setProductTitle] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('')
    const [confirmMessage, setConfirmMessage] = useState('')
    const [errors, setErrors] = useState([])

    //handler when the form is submitted
    const addNewProductHandler = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/newproduct', {
            productTitle,
            productPrice,
            productDescription
        })
            .then(res => {
                setProducts([...products, res.data]);
            })
            .catch(err => {console.log('post to /api/newproduct error: ', err);
                            setErrors(err.response.data.errors)})

        setConfirmMessage(`${productTitle} has been added.`)
        setProductTitle('')
        setProductPrice('')
        setProductDescription('')
    }

    return (
        <form onSubmit={addNewProductHandler}>
            <p>{confirmMessage}</p>
            {/* <p> */}
                <label>Title</label>
                <input  type="text" 
                        onChange={(e) => setProductTitle(e.target.value)} 
                        value={productTitle} />
                {errors.productTitle?<p>{errors.productTitle.message}</p>:null}
                <br/>
            {/* </p>
            <p> */}
                <label>Price</label>
                <input  type="number" min="0" step=".01" 
                        onChange={(e) => setProductPrice(e.target.value)} 
                        value={productPrice}/>
                        {errors.productPrice?<p>{errors.productPrice.message}</p>:null}<br/>
            {/* </p>
            <p> */}
                <label>Description</label>
                <input type="textarea" rows='20' cols='40'
                        onChange={e => setProductDescription(e.target.value)}
                        value={productDescription}/>
                        {errors.productDescription?<p>{errors.productDescription.message}</p>:null}<br />
            {/* </p> */}
            <button style={{border:"2px red solid"}}>Add New Product</button>
        </form>
    )
}
export default ProductForm;