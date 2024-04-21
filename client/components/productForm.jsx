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
                document.getElementById('titleInput').focus();
                setConfirmMessage(`${productTitle} has been added.`);setProductTitle('');
                setProductPrice('');
                setProductDescription('');
                setErrors([]);
            })
            .catch(err => {console.log('post to /api/newproduct error: ', err);
                            setErrors(err.response.data.errors);
                            document.getElementById('titleInput').focus();
                            setConfirmMessage('Product not added due to the errors below:')
                        })
        
        
    }

    return (
        <form id='addForm' onSubmit={addNewProductHandler}>
            <p id='confirmMessage' className='errorMessage'>{confirmMessage}</p>
                <input  type="text" 
                        placeholder="title"
                        id='titleInput'
                        onChange={(e) => setProductTitle(e.target.value)} 
                        value={productTitle}
                        autoFocus />
                {errors.productTitle?<p className='errorMessage'>{errors.productTitle.message}</p>:null}
                <input  type="number" min="0" step=".01" 
                placeholder='price'
                        onChange={(e) => setProductPrice(e.target.value)} 
                        value={productPrice}/>
                        {errors.productPrice?<p className='errorMessage'>{errors.productPrice.message}</p>:null}
                <textarea rows='3' cols='40'
                        onChange={e => setProductDescription(e.target.value)}
                        placeholder='Description (max 100 characters)'
                        value={productDescription}/>
                        {errors.productDescription?<p className='errorMessage'>{errors.productDescription.message}</p>:null}
            <button className='addButton'>Add New Product</button>
        </form>
    )
}
export default ProductForm;