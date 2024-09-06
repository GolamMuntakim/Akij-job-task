
import { Outlet } from 'react-router-dom'
import './App.css'
import Nav from './Shared/Nav'
import Footer from './Shared/Footer'

function App() {


  return (
    <>
     <div>
      <Nav></Nav>
      <Outlet></Outlet>
      <Footer></Footer>
     </div>
    </>
  )
}

export default App
