import React from "react";
import { Link } from "react-router-dom";
import { NO_IMAGE } from "../Constants/images";

const ProductItem = ({ item, index }) => {
    return (
        <>
            <Link to={`/product_details?product_id=${item.product_id}`} className="flex">
                <div data-aos="zoom-in" data-aos-delay={index * 100} key={item.product_id}>
                    <img
                        className="w-full transform rounded-lg transition-transform duration-300 hover:scale-105"
                        src={item.thumbnail ? item.thumbnail : NO_IMAGE}
                        alt="Thumbnail"
                    />
                    <div className="px-1 py-2">
                        <p className="text-md flex text-wrap font-bold">{item.name}</p>
                        <p id="price" className="">
                            {item.price}
                        </p>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default ProductItem;
