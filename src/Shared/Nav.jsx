
import { useContext, useEffect, useState } from 'react';
import {  NavLink } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { MdOutlineShoppingBag } from "react-icons/md";

// import './shared.css'
const Nav = () => {
  const {user,logOut,cart} = useContext(AuthContext)
  console.log(cart)

  
  const [theme, setTheme] = useState(()=>{
    return localStorage.getItem('theme') || 'light';
})
useEffect(() => {
  localStorage.setItem('theme', theme)
  const localTheme = localStorage.getItem('theme')
  document.querySelector('html').setAttribute('data-theme', theme)
}, [theme])
const handleToggle = e => {
  setTheme(prevTheme=>(prevTheme==='light' ? 'dark' : 'light'))
 
}

  
    return (
        <div>
            <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <div><NavLink to="/">Home</NavLink></div>
    <div><NavLink to="products" >Products</NavLink></div>
    <div><NavLink to="" >Categoris</NavLink></div>
    <div><NavLink to="" >Custom</NavLink></div>
    <div><NavLink to="create" >Create Product</NavLink></div>
      </ul>
    </div>
    <a className="lobster-regular text-xl flex items-center gap-2"><img src="images/logo.JPG" className='h-16 hidden lg:flex'/><div className='font-bold'>Furni<span className='text-[#1f99f4]'>Flex</span></div></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <div className='flex gap-4'>
    <div><NavLink to="/" style={({isActive})=>(isActive?{fontWeight:"bold", color:"black"}:{font:"light"})}>Home</NavLink></div>
    <div><NavLink to="products" style={({isActive})=>(isActive?{fontWeight:"bold", color:"black"}:{font:"light"})}>Products</NavLink></div>
    <div><NavLink to="/category" style={({isActive})=>(isActive?{fontWeight:"bold", color:"black"}:{font:"light"})}>Categoris</NavLink></div>
    <div><NavLink to="custome" style={({isActive})=>(isActive?{fontWeight:"bold", color:"black"}:{font:"light"})}>Custom</NavLink></div>
    <div><NavLink to="create" style={({isActive})=>(isActive?{fontWeight:"bold", color:"black"}:{font:"light"})}>Create Product</NavLink></div>
    </div>
    </ul>
  </div>
  <div className="navbar-end">
  <div className="indicator mr-4">
  <span className="indicator-item indicator-bottom badge bg-[#333233] text-white">{cart.length}</span>
  <div className=" grid  place-items-center"><MdOutlineShoppingBag className='text-2xl'/></div>
</div>
    <details className="dropdown dropdown-end">
  <summary className="btn m-1">
    {/* open or close */}
    <div className="avatar">
  <div className="w-10 rounded-full">
    <img src={user?.photoURL} />
  </div>
</div>
    </summary>
  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52  shadow">
    <li><a>{user?.displayName}</a></li>
    <li onClick={logOut}><a>Log Out</a></li>
   <li><a  className='flex items-center'>Dark/Light <input onChange={handleToggle} type="checkbox" className="toggle" defaultChecked /></a></li>
  </ul>
</details>
  </div>
</div>
        </div>
    );
};

export default Nav;