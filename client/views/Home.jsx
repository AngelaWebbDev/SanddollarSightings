import React, { useState } from 'react';
import ProductForm from '../components/productForm.jsx';
import ProductList from '../components/productList.jsx';

const Home = (props) => {
    const [products, setProducts] = useState([]);

    return (
        <div>
            <ProductForm products={products} setProducts={setProducts}/>
            <ProductList products={products} setProducts={setProducts} />
        </div>
    )
}
export default Home;