import React, { useState } from 'react'
import axios from 'axios';

const ProductForm = () => {
    const [productTitle, setProductTitle] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('')
    const [confirmMessage, setConfirmMessage] = useState('')

    //handler when the form is submitted
    const addNewProductHandler = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/newproduct', {
            productTitle,
            productPrice,
            productDescription
        })
            .then(res => {
                console.log('res from post to /api/newproduct: ', res);
                console.log('res.data: ', res.data);
            })
            .catch(err => console.log('post to /api/newproduct error: ', err))

        setConfirmMessage(`${productTitle} has been added.`)
        setProductTitle('')
        setProductPrice('')
        setProductDescription('')
    }

    return (
        <form onSubmit={addNewProductHandler}>
            <p>{confirmMessage}</p>
            <p>
                <label>Title</label><br />
                <input  type="text" 
                        onChange={(e) => setProductTitle(e.target.value)} 
                        value={productTitle} />
            </p>
            <p>
                <label>Price</label><br />
                <input  type="number" min="0" step=".01" 
                        onChange={(e) => setProductPrice(e.target.value)} 
                        value={productPrice}/>
            </p>
            <p>
                <label>Description</label><br />
                <input type="textarea" rows='20' cols='40'
                        onChange={e => setProductDescription(e.target.value)}
                        value={productDescription}/>
            </p>
            <button>Create</button>
        </form>
    )
}
export default ProductForm;