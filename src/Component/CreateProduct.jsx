import axios from "axios";
import { imageupload } from "../api/utilities";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";



const CreateProduct = () => {
    // const { user } = useContext(AuthContext)
    // const [startDate, setStartDate] = useState(new Date())
    const navigate = useNavigate()
    const handleFormSubmit = async e => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const image = form.image.files[0]
        const price = form.price.value
        const type = form.type.value
        const discount = form.discount.value
        const Parcentage = form.Parcentage.value
        const description = form.description.value

        try {
            const image_url = await imageupload(image)
            const productData = { name, image: image_url, price, type, discount, Parcentage, description }
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/product`, productData)
            console.log(data)
            toast.success('Product Added Succesfully')
            navigate('/')
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <div>
            <Helmet>
                <title>
                    Create Product
                </title>
            </Helmet>
            <div className=" bg-base-200 min-h-screen">
                <div className="hero-content ">
                    <div className=" bg-base-100 w-full lg:w-[1000px]  shrink-0 shadow-2xl">
                        <form className="card-body"
                            onSubmit={handleFormSubmit}
                        >
                            <div className="grid grid-cols-2 gap-8">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Product Name</span>
                                    </label>
                                    <input type="text" name="name" placeholder="Product Name" className="input input-bordered" required />
                                </div>
                                <div className='flex flex-col gap-2 '>
                                    <label className="label" htmlFor='type'>
                                        <span className="label-text">Product Type</span>
                                    </label>
                                    <select
                                        name='type'
                                        id='type'
                                        className='border p-2 rounded-md'
                                        required
                                    >
                                        <option value='Rocking'>Rocking Chair</option>
                                        <option value='Side'>Side Chair</option>
                                        <option value='Lounge'>Lounge Chair</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Product Image</span>
                                    </label>
                                    <input type="file" name="image" className="file-input file-input-bordered file-input-primary w-full max-w-xs" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Price</span>
                                    </label>
                                    <input type="number" name="price" placeholder="price" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Discount Price</span>
                                    </label>
                                    <input type="number" name="discount" placeholder="discount" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Discount Parcentage</span>
                                    </label>
                                    <input type="number" name="Parcentage" placeholder="Parcentage" className="input input-bordered" required />
                                </div>



                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <input type="text" name="description" placeholder="Description" className="input input-bordered w-full" required />
                            </div>

                            <div className="form-control mt-6 flex justify-center items-center">
                                <button className="btn bg-black text-white w-[200px]">Add Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;