import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { RxCross2 } from "react-icons/rx";
import { Helmet } from "react-helmet-async";


const Products = () => {
  const { cart, handleDelete } = useContext(AuthContext)

  console.log(cart)
  const totalPrice = cart.reduce((total, item) => {
    return total + parseFloat(item?.productData?.price || 0);
  }, 0);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:w-[1200px] lg:p-8 gap-40 lg:gap-0 mx-auto">
 
        <Helmet>
          <title>
            Product
          </title>
        </Helmet>

      <div className="w-full lg:w-[700px] mx-auto p-4">
        <h1 className="font-bold text-2xl">An Over view of your product</h1>
        <div className="mt-10 w-full lg:w-[500px] mx-auto ">
          {
            cart.map((carts, idx) => (
              <div className="lg:overflow-x-auto shadow-md p-2 w-[340px] mx-auto lg:w-[500px] " key={carts._id}>
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
                                alt="Avatar" />
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
      <div className="w-[300px] mx-auto">
        <h1 className="font-bold text-2xl"> Our Details</h1>
        <div className="w-[300px] mx-auto shadow-sm shadow-black p-6 mt-10 text-[#838282]">
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
              <h1 className="text-[#646465] font-semibold">Total</h1>
              <h1 className="text-[#0f0f0e] font-semibold">{totalPrice.toFixed(2)}</h1>
            </div>
            <button className="btn bg-black text-white w-full mt-4">Go To Checkout</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Products;