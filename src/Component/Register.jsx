

import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { imageupload } from "../api/utilities";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";



const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { signIn, signInWithGoogle, createUser, updateUserProfile, user, setUser, loading } = useContext(AuthContext)
  const handleGoogleSignin = async () => {
    try {
      const result = await signInWithGoogle()
      console.log(result.user)
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
        email: result?.user?.email,
      }, { withCredentials: true })
      console.log(data)
      toast.success("You have sign in succesfully")
      navigate("/")
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  const handleSignUp = async e => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const fullName = `${firstName} ${lastName}`;
    const image = form.image.files[0]
    const pass = form.password.value
    console.log({ email, fullName, pass, image })
    try {
      const image_url = await imageupload(image)
      const result = await createUser(email, pass)
      await updateUserProfile(fullName, image_url)
      setUser({ ...result?.user, photoURL: image_url, displayName: fullName })
      console.log(result.user)
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
        email: result?.user?.email,
      }, {
        withCredentials: true
      })
      console.log(data)
      navigate("/")
      toast.success('Congratulation!! You have registered succesfully')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }
  if (user || loading) return <div className="min-h-screen w-full flex items-center justify-center"><span className="loading loading-infinity loading-lg"></span></div>
  return (
    <div className="grid grid-cols-2 w-full items-center gap-48 justify-center mt-20 lg:mt-0 mx-auto">
      <Helmet>
        <title>
          Register
        </title>
      </Helmet>
      <div className="lg:ml-[150px]  h-screen w-[400px] mx-auto  lg:w-[500px]">
        <form className="card-body" onSubmit={handleSignUp}>
          <h1 className="text-center font-bold">Welcome To</h1>
          <h1 className="text-center text-4xl font-bold">Furni<span className="text-[#1f99f4]">Flex</span></h1>
          <p className="text-center text-[#cecfce]">Signup for purchase your desire product</p>

          <div className="form-control mt-4">
            <div className="flex flex-col lg:flex-row  gap-2 items-center">
              <div>

                <input type="text" name='firstName' placeholder="Enter your First Name" className="input input-bordered" required />
              </div>
              <div>


                <input type="text" name='lastName' placeholder="Enter your Last Name" className="input input-bordered" required />
              </div>

            </div>

            <input type="email" name='email' placeholder="Enter your email" className="input input-bordered mt-2 w-[250px] lg:w-[434px] mx-auto" required />
          </div>
          <div className="form-control">
            <div className="flex flex-col lg:flex-row  items-center gap-2">
              <div>

                <input type={showPassword ? "text" : "password"} name='password' placeholder="Enter your password" className="input input-bordered relative w-[250px]" required />
                <span className="absolute left-[210px] top-[370px] lg:left-[370px] lg:top-[290px]" onClick={() => setShowPassword(!showPassword)}
                >
                  {
                    showPassword ? <FaRegEyeSlash /> : <FaRegEye />
                  }
                </span>
              </div>

              <div className="form-control">

                <input type="file" name="image" id="image" accept="image/*" className="file-input file-input-bordered file-input-primary w-[250px]  lg:w-[180px]" required />
              </div>
            </div>

            <div className="flex gap-2 w-[300px] mx-auto items-center mt-2">
              <input type="checkbox" defaultChecked className="checkbox" />
              <p>I agree to the terms and condition</p>
            </div>
          </div>
          <div className="form-control mt-2 ">
            <button className="btn bg-black text-white mx-auto w-[250px] lg:w-[435px]">Sign in</button>
          </div>
          <div className="divider">OR</div>
          <div className="flex flex-col lg:flex-row justify-center gap-4 w-full ">

            <button onClick={handleGoogleSignin} className="btn flex gap-4 items-center  shadow-xl  border-2 border-solid justify-center p-2"><FcGoogle />Sign In With Google</button>
            <button className="btn flex gap-4 items-center  shadow-xl  border-2 border-solid justify-center p-2"><FaApple />
              Sign In With Apple</button>
          </div>
          <div className="w-full text-center">
            <a href="#" className="label-text-alt link link-hover"> Have any account?<Link to="/login" className="text-blue-600 font-semibold">Sign in</Link></a>
          </div>
        </form>
      </div>
      <div className="hidden lg:flex w-full ">
        <img className="w-full object-cover  h-screen" src="images/login.JPG" alt="" />
      </div>
    </div>
  );
};

export default Register;