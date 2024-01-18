import './App.css'
import Main from '../views/Main'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductDetail from '../components/productDetail'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Main/>} default/>
        <Route path="productDetail/:id" element={<ProductDetail/>} />
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
