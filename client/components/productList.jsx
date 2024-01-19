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
            <p>Products:</p>
            {products.map((product) => {
                return (
                    <div key={product._id} style={{ border: '1px white solid', margin: '3px', paddingBottom: '10px' }}>
                        <p>{product.productTitle}</p>
                        <Link to={`/productDetail/${product._id}`}>see details</Link>
                        <button onClick={(e) => deleteProduct(product._id, product.productTitle)}>Delete</button>
                    </div>
                )

            })}
        </>
    );
}
export default ProductList;