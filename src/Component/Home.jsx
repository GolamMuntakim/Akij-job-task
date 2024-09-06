
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from "axios";
import {  useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineShoppingBag } from "react-icons/md";
import { AuthContext } from '../AuthProvider/AuthProvider';




const Home = () => {
  const {addToCart} = useContext(AuthContext)
    const [activeButton, setActiveButton] = useState('');
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [count, setCount] = useState(0)
    const [pages, setPages] = useState(6)
  
    const pagenumber = Math.ceil(count / pages)
    const pageButton = [...Array(pagenumber).keys()].map(item => item + 1)
    useEffect(() => {
        getData()
    }, [currentPage,pages])
    const getData = async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/allproduct?page=${currentPage}&size=${pages}`)
        setProducts(data);
        setFilteredProducts(data);
    }
    console.log(products)
    useEffect(() => {
        getCount()
      }, [])
    
      const getCount = async () => {
        try {
          const { data } = await axios(`${import.meta.env.VITE_API_URL}/product-count`);
          console.log("API Response (Product Count):", data);
    
          if (data && data.count >= 0) {
            setCount(data?.count);
          } else {
            console.error("Unexpected API response structure:", data);
            setCount(0);
          }
        } catch (error) {
          console.error("Error fetching product count:", error);
          setCount(0);
        }
      };



    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        filterProducts(buttonName);
    };
    const filterProducts = (type) => {
        if (type === '') {
            setFilteredProducts(products); 
        } else {
            const filtered = products.filter(product => product?.type === type);
            setFilteredProducts(filtered);
        }
    };
    const handlePagination = (v) => {
        setCurrentPage(v)
      }


      

  
      
      
    return (
        <div className="grid grid-cols-2 p-0 m-0 w-full lg:w-[1200px] mx-auto">
            <div className="mt-10 w-full lg:w-[250px] min-h-screen shadow-xl ">
                <div className="space-y-4 w-full lg:w-[210px] lg:ml-10">
                    <button
                        className={`w-full lg:w-[210px] p-2 flex ${activeButton === 'Rocking' ? 'bg-black text-white rounded-lg' : 'font-bold'}`}
                        onClick={() => handleButtonClick('Rocking')}
                    >
                        <p className="flex gap-4 items-center">Rocking Chair</p>
                    </button>
                    <button
                        className={`w-full lg:w-[210px] p-2 flex ${activeButton === 'Side' ? 'bg-black text-white rounded-lg' : 'font-bold'}`}
                        onClick={() => handleButtonClick('Side')}
                    >
                        <p className="flex gap-4 items-center">Side Chair</p>
                    </button>
                    <button
                        className={`w-full lg:w-[210px] p-2 flex ${activeButton === 'Lounge' ? 'bg-black text-white rounded-lg' : 'font-bold'}`}
                        onClick={() => handleButtonClick('Lounge')}
                    >
                        <p className="flex gap-4 items-center">Lounge Chair</p>
                    </button>
                </div>
            </div>
            <div className=" w-full lg:w-[1000px] -ml-24  lg:-ml-[390px] min-h-screen">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:p-8">
                {
                    filteredProducts.map(product => (
                      
                        <div className="card w-72 bg-base-100  shadow-sm shadow-black" key={product?._id}>
                            <figure>
                                <img
                                className="h-48 w-full "
                                    src={product?.image}
                                    alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{product?.name}</h2>
                                <div className="flex gap-2">
                                <p className="font-bold">${product?.price}</p>
                                <p className="opacity-40 line-through	">${product?.discount}</p>
                                <p className="text-red-800 font-bold">${product?.Parcentage} OFF</p>
                                </div>
                                <p>{product?.description}</p>
                                <div className="card-actions w-full">
                                    <button className="btn bg-black text-white w-full"
                                    onClick={() => addToCart(product)}
                                    ><MdOutlineShoppingBag />
                                    Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    ))
                  
                }
               </div>
                 {/* pagination */}
      <div className='flex justify-center w-full md:w-[400px] lg:w-[1000px] mt-12'>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePagination(currentPage - 1)}
          className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white'>
          <div className='flex items-center -mx-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>

          </div>
        </button>

        {pageButton.map(btnNum => (
          <button
            key={btnNum}
            onClick={() => handlePagination(btnNum)}
            className={`${currentPage === btnNum ? 'bg-black text-white' : ''}   px-4 py-2 lg:mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}

        <button
          disabled={currentPage === pagenumber}
          onClick={() => handlePagination(currentPage + 1)}
          className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>
          <div className='flex items-center -mx-1'>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </div>
        </button>
      </div>
            </div>
        </div>
    );
};

export default Home;