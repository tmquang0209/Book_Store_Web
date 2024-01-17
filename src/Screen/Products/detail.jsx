import React, { useEffect } from "react";
import { Rating, Typography } from "@material-tailwind/react";
import ReactImageGallery from "react-image-gallery";
import { connect } from "react-redux";

import { addToCart } from "../../components/Store/Actions/cartAction";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getProductDetail } from "../../API/product";
import { NO_IMAGE } from "../../components/Constants/images";
import { currencyFormat, formatNumber } from "../../components/Common/formatNumber";

const ProductDetails = (props) => {
    const { addToCart } = props;

    const [product, setProduct] = React.useState({});
    // const [loading, setLoading] = React.useState(true);
    const [images, setImages] = React.useState([]);

    const fetchProduct = async (productId) => {
        const response = await getProductDetail(productId);

        if (response.success) {
            setProduct({ ...response.data, order: 1 });
            // setLoading(false);

            // create image array
            const images = [];
            response.data.images.forEach((image) => {
                images.push({
                    original: image,
                    thumbnail: image,
                });
            });
            setImages(images);
        }
    };

    const handleQuantityChange = (e) => {
        setProduct({ ...product, order: Number(e.target.value) });
    };

    const handleAddToCart = () => {
        addToCart({
            product_id: product.product_id,
            quantity: product.order,
        });
    };

    useEffect(() => {
        const url = new URL(window.location.href);
        const productId = url.searchParams.get("product_id");
        fetchProduct(productId);
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mb-10 mt-10">
                <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
                    {images.length !== 0 ? (
                        <ReactImageGallery
                            items={images}
                            useBrowserFullscreen={false}
                            showFullscreenButton={false}
                            showPlayButton={false}
                            lazyLoad
                            showNav={false}
                            thumbnailLoading={true}
                            // thumbnailPosition="right"
                        />
                    ) : (
                        <img alt="no_image" src={NO_IMAGE} />
                    )}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{product?.name}</h1>
                        <div className="border"></div>
                        <div className="flex flex-row items-center gap-2 font-bold text-gray-700">
                            {product?.reviews?.avgRating || 0}
                            <Rating value={product?.reviews?.avgRating || 0} readonly ratedColor="amber" unratedColor="amber" />
                            <Typography color="blue-gray" className="font-medium text-gray-700">
                                ({product?.reviews?.totalReview || 0} Reviews)
                            </Typography>
                        </div>
                        <div className="text-2xl font-bold text-red-500">{currencyFormat(product?.price || 0)}</div>
                        <div>Available: {formatNumber(product?.quantity?.inStock)}</div>
                        <div>
                            <span>Category: </span>
                            <a className="text-primary" href={`/products?category=${product?.category?.category_id}`}>
                                {product?.category?.name}
                            </a>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div>
                                <span>Quantity: </span>
                                <input
                                    value={product?.order || 1}
                                    type="number"
                                    className="w-20 rounded-md border border-brown-100 p-1"
                                    min={1}
                                    max={Number(product?.quantity?.inStock)}
                                    onChange={handleQuantityChange}
                                />
                            </div>
                            <div>
                                <button
                                    className="translate rounded-md bg-gradient-to-r from-primary to-secondary  px-2 py-1 text-white"
                                    onClick={handleAddToCart}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <div>
                        <h1 className="text-xl font-bold">Description</h1>
                        <div>{product?.description}</div>
                    </div>
                </div>
                <div className="mt-5">
                    <h1 className="text-xl font-bold">Reviews</h1>
                </div>
                <div className="mt-5">
                    <h1 className="text-xl font-bold">Similar books</h1>
                </div>
            </div>
            <Footer />
        </>
    );
};

const mapStateToProps = (state) => ({
    cart: state.cart,
});

export default connect(mapStateToProps, { addToCart })(ProductDetails);
