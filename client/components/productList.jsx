import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = (props) => {
    const {products, setProducts } = props;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/allProducts")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.log('get all products error: ', err);
            })
    }, [])

    const deleteProduct = (id, title) => {
        axios.delete('http://localhost:8000/api/oneProductById/' + id)
            .then(res => {
                console.log(`${title} was deleted`);
                navigate('/home');
                setProducts(products.filter(product => id!=product._id))
            })
            .catch(err => console.log('deleteProduct err: ', err))
    }

    return (
        <>
            <h3>Products</h3>
            {products.sort((item1, item2) => (item1.productTitle.toLowerCase() < item2.productTitle.toLowerCase() 
                            ? -1 
                            : ((item1.productTitle.toLowerCase() > item2.productTitle.toLowerCase()) ? 1 : 0))).map((product) => {
                return (
                    <div key={product._id} className='oneProduct'>
                        <p className='productTitle'>{product.productTitle}</p>
                        <Link to={`/productDetail/${product._id}`} className='lookLikeButton'>Details</Link>
                        <button onClick={(e) => deleteProduct(product._id, product.productTitle)}>Delete</button>
                    </div>
                )

            })}
        </>
    );
}
export default ProductList;