import { createContext, useEffect, useState } from "react";
import {getAuth,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged,updateProfile, signInWithPopup} from 'firebase/auth'
import axios from "axios"
import { app } from "../firebase/firebase.Config";
import toast from "react-hot-toast";

export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const [cart,setCart] = useState([])
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIn=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const signInWithGoogle = () =>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
    const logOut = async() =>{
        setLoading(true)
        const {data} = await axios(`${import.meta.env.VITE_API_URL}/logout`,{
            withCredentials:true
        })
        console.log(data)
        return signOut(auth)
    }
    const updateUserProfile = (name, photo)=>{
        return updateProfile(auth.currentUser,{
            displayName : name,
            photoURL: photo,
        })
    }

    // const addToCart = async (product) => {
    //     try {
    //         const { _id, ...productData } = product;
    //         await axios.post(`${import.meta.env.VITE_API_URL}/add-cart`, productData, { withCredentials: true });
    //         toast.success("Product added to cart");
    //     } catch (error) {
    //         toast.error("Failed to add product to cart");
    //         console.error("Error adding product to cart:", error);
    //     }
    // };
    // useEffect(() => {
    //     refreshCart();  
       
    // }, []);
    const addToCart = async (product) => {
        try {
            const { _id, ...productData } = product;
            await axios.post(`${import.meta.env.VITE_API_URL}/add-cart`, productData, { withCredentials: true });
            toast.success("Product added to cart");
            // Trigger a refresh and update state
            refreshCart();
        } catch (error) {
            toast.error("Failed to add product to cart");
            console.error("Error adding product to cart:", error);
        }
    };

    const refreshCart = async () => {
        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/all-cart`);
            setCart(data);
        } catch (error) {
            console.error("Error refreshing cart:", error);
        }
    };

    useEffect(() => {
        refreshCart(); 
    }, []);


    const handleDelete = async (id) => {
        try {
          const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteproduct/${id}`)
          console.log(data)
          toast.success("Deleted Succesfully")
          rerefreshCart()
        } catch (err) {
          toast.error(err?.message)
        }
      }
      const rerefreshCart = async () => {
        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/all-cart`);
            setCart(data);
        } catch (error) {
            console.error("Error refreshing cart:", error);
        }
    };

    useEffect(() => {
        rerefreshCart(); 
    }, []);

  
  
   
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{return unsubscribe()}
    },[])
    const authInfo = {
        user, setUser, loading, setLoading, createUser , signIn, signInWithGoogle, logOut,updateUserProfile,addToCart,cart, refreshCart,handleDelete}
    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;