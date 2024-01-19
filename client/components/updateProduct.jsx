import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = (props) => {

    const { id } = useParams();
    const [productTitle, setProductTitle] = useState();
    const [productPrice, setProductPrice] = useState();
    const [productDescription, setProductDescription] = useState();
    const navigate = useNavigate();

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
                navigate("/home");
            })
            .catch(err => console.log('put err: ', err))
    }

    return (
        <div>
            <h1>Update Product Details</h1>
            <form onSubmit={updateProduct}>
                <p>
                    <label>Title</label>
                    <input type="text"  
                    value={productTitle} 
                    onChange={(e) => { setProductTitle(e.target.value) }} /><br />
                </p>
                <p>
                <label>Price</label>
                    <input   type="number" min="0" step=".01"  
                    value={productPrice} 
                    onChange={(e) => { setProductPrice(e.target.value) }} /><br />
                </p>
                <p>
                <label>Description</label>
                    <input type="text"  
                    value={productDescription} 
                    onChange={(e) => { setProductDescription(e.target.value) }} /><br />
                </p>
                <button>Submit</button>
            </form>
        </div>
    )
}
export default UpdateProduct;