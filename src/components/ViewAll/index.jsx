import React from 'react';
import { Link } from "react-router-dom";

const ViewAll = () => {
    const books = Array.from({ length: 12 }, (v, k) => k + 1);

    return (
        <div className="container pl-40 pr-40 md-pl-40 md-pr-40">
            <div className="flex">
                <ul className="list-none text-xs">
                    <Link to="/" className="inline-block pt-4">
                        Home
                    </Link>
                    <li className="inline-block text-zinc-300"> / View More</li>
                </ul>
            </div>
            <h1 className="font-bold text-2xl">View More</h1>
            <select className="mb-10">
                <option value={'best-selling'}>Best Selling</option>
                <option value={'featured'}>Featured</option>
                <option value={'newest'}>Newest</option>
                <option value={'oldest'}>Oldest</option>
                <option value={'a-z'}>Alphabet, A - Z</option>
                <option value={'z-a'}>Alphabet, Z - A</option>
                <option value={'low-high'}>Price, low to high</option>
                <option value={'high-low'}>Price, high to low</option>
            </select>
            <div id="item" className="grid grid-cols-4 gap-4">
                {books.map((index) => (

                    <Link to="/detailProduct">
                        <div key={index}>
                            <img className="w-full rounded-lg transition-transform duration-300 transform hover:scale-105" src={'https://bookstore-tcj.netlify.app/assets/library-jI5gRUk5.jpg'} alt="Book Cover" />
                            <p className="text-center">Name</p>
                            <p id="price" className="text-center">40 $</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ViewAll;
