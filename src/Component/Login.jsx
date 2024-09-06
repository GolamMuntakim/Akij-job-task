import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from "react-icons/fa";



const Login = () => {
    const { signIn, signInWithGoogle, user, loading } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const [error, setError] = useState('')
  
    useEffect(() => {
      if (user) {
        navigate('/')
      }
    }, [navigate, user])
    const handleGoogleSignin = async () => {
        try {
          const result = await signInWithGoogle()
          const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
            email: result?.user?.email,
          }, { withCredentials: true })
          toast.success('Log in succesfully')
          navigate("/")
        } catch (err) {
          toast.error(err?.message)
        }
      }
    const handleSignIn = async e => {
        e.preventDefault()
        setError('')
        const form = e.target
        const email = form.email.value
        const pass = form.password.value
        try {
          const result = await signIn(email, pass)
          const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
            email: result?.user?.email,
          }, { withCredentials: true })
          navigate('/')
          toast.success('Log in successfully')
        } catch (err) {
          if (err.code === 'auth/invalid-credential') {
            toast.error('Incorrect password')
            window.location.reload()
          } else if (err.code === 'auth/user-not-found') {
            setError('user not found')
          } else {
            setError(err.message)
          }
          toast.error(err?.message)
        }
      }
    return (
        <div className="grid grid-cols-2 w-full items-center">
            <div className="ml-[200px] h-screen">
             
                <form className="card-body" onSubmit={handleSignIn}>
                <h1>Welcome Back!</h1>
                <p>Enter Your Credentials to access your account</p>
                <div className="form-control">
                
                  <input type="email" name='email' placeholder="Enter your email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                 
                  <input type="password" name='password' placeholder="Enter your password" className="input input-bordered" required />
                  <label className="label gap-4 justify-end">
                    <a href="#"><small>Forget Password</small></a>
                   
                  </label>
                  <div className="flex gap-2 items-center">
                  <input type="checkbox" defaultChecked className="checkbox" />
                  <p>I agree to the terms and condition</p>
                  </div>
                </div>
                <div className="form-control mt-6">
                  <button className="btn bg-black text-white">Sign in</button>
                </div>
                <div className="divider">OR</div>
                <div className="flex justify-center gap-4 w-full ">
                <button onClick={handleGoogleSignin} className="btn flex gap-4 items-center  shadow-xl  border-2 border-solid justify-center p-4"><FcGoogle />Sign In With Google</button>
                <button  className="btn flex gap-4 items-center  shadow-xl  border-2 border-solid justify-center p-4"><FaApple />
                Sign In With Apple</button>
              </div>
              <div className="w-full text-center">
              <a href="#" className="label-text-alt link link-hover"> Have any account?   <Link to="/register" className="text-blue-600 font-semibold">Register Now</Link></a>
              </div>
              </form>
            </div>
            <div>
                <img className="w-full object-cover bg-cover h-screen" src="images/login.JPG" alt=""  />
            </div>
        </div>
    );
};

export default Login;