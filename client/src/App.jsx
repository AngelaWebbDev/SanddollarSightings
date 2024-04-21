import './App.css'
import Home from '../views/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from '../components/welcome'
import SightingDetail from '../components/sightingDetail'
import UpdateSighting from '../components/updateSighting'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Welcome/>}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/sightingDetail/:id" element={<SightingDetail />} />
        <Route path="/sighting/edit/:id" element={<UpdateSighting/>}/>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
