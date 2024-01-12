import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const Products = () => {
    const books = Array.from({ length: 12 }, (v, k) => k + 1);
    return (
        <>
            <Navbar />
            <div className="md-pl-40 md-pr-40 container pl-40 pr-40">
                <div className="flex">
                    <ul className="list-none text-xs">
                        <Link to="/" className="inline-block pt-4">
                            Home
                        </Link>
                        <li className="text-zinc-300 inline-block"> / View More</li>
                    </ul>
                </div>
                <h1 className="text-2xl font-bold">View More</h1>
                <select className="mb-10">
                    <option value={"best-selling"}>Best Selling</option>
                    <option value={"featured"}>Featured</option>
                    <option value={"newest"}>Newest</option>
                    <option value={"oldest"}>Oldest</option>
                    <option value={"a-z"}>Alphabet, A - Z</option>
                    <option value={"z-a"}>Alphabet, Z - A</option>
                    <option value={"low-high"}>Price, low to high</option>
                    <option value={"high-low"}>Price, high to low</option>
                </select>
                <div id="item" className="grid grid-cols-4 gap-4">
                    {books.map((index) => (
                        <Link className="animate-pulse" to="/detailProduct">
                            <div key={index}>
                                <img
                                    className="w-full transform rounded-lg transition-transform duration-300 hover:scale-105"
                                    src={"https://bookstore-tcj.netlify.app/assets/library-jI5gRUk5.jpg"}
                                    alt="Book Cover"
                                />
                                <p className="text-center">Name</p>
                                <p id="price" className="text-center">
                                    40 $
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Products;
