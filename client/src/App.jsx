import './App.css'
import Main from '../views/Main'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductDetail from '../components/productDetail'
import UpdateProduct from '../components/updateProduct'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/home" default element={<Main/>}/>
        <Route path="productDetail/:id" element={<ProductDetail/>} />
        <Route path="/product/edit/:id" element={<UpdateProduct/>}/>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
