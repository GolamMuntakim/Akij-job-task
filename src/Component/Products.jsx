import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { RxCross2 } from "react-icons/rx";


const Products = () => {
  const {cart,handleDelete} = useContext(AuthContext)

  console.log(cart)
  const totalPrice = cart.reduce((total, item) => {
    return total + parseFloat(item?.productData?.price || 0);
  }, 0);

 
    return (
        <div className="grid grid-cols-2 w-[1200px] p-8">
          <div className="w-[700px]">
            <h1 className="font-bold">An Over view of your product</h1>
          <div className="mt-10 w-[500px] ">
          {
                cart.map((carts,idx)=>(
                    <div className="overflow-x-auto shadow-md p-2 w-[500px] mx-2" key={carts._id}>
                    <table className="table">
                      <tbody>
                        <tr>
                          <th>
                           {idx}
                          </th>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                  <img
                                    src={carts?.productData?.image}
                                    alt="Avatar Tailwind CSS Component" />
                                </div>
                              </div>
                            
                            </div>
                          </td>
                          <td>
                           {carts?.productData?.name}
                            <br />
                          </td>
                          <div className="flex flex-col gap-6">
                            <button className="btn btn-ghost btn-xs"
                            onClick={() => handleDelete(carts?._id)}
                            ><RxCross2 />
                            </button>
                            <button className="btn btn-ghost btn-xs ">${carts?.productData?.price}</button>
                          </div>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                 
                ))
              
            }
          </div>
          </div>
          <div className="w-[300px] ">
           <h1 className="font-bold text-2xl"> Our Details</h1>
           <div className="w-[150px]">
           <div>
           <div className="flex justify-between">
              <h1>Sub Total</h1>
              <h1>{totalPrice.toFixed(2)}</h1>
            </div>
            <div className="flex justify-between">
              <h1>Shipping</h1>
              <h1>Free</h1>
            </div>
            <div className="flex justify-between">
              <h1>Estimated Tax</h1>
              <h1>-$</h1>
            </div>
            <div className="flex justify-between">
              <h1>Total</h1>
              <h1>{totalPrice.toFixed(2)}</h1>
            </div>
            <button>Go To Checkout</button>
           </div>
           </div>

          </div>
        </div>
    );
};

export default Products;