import React, { useEffect } from "react";
import { Rating, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from "@material-tailwind/react";
import ReactImageGallery from "react-image-gallery";
import { connect } from "react-redux";

import { addToCart } from "../../components/Store/Actions/cartAction";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getProductDetail, getSimilarProducts } from "../../API/product";
import { NO_AVATAR, NO_IMAGE } from "../../components/Constants/images";
import { currencyFormat, formatNumber } from "../../components/Common/formatNumber";
import { getReviewByProduct } from "../../API/reviews";
import { FiEye } from "react-icons/fi";
import { FaCartPlus } from "react-icons/fa";

const reviewsTab = [
    { label: "All", value: "all" },
    { label: `5 ⭐`, value: 5 },
    { label: "4 ⭐", value: 4 },
    { label: "3 ⭐", value: 3 },
    { label: "2 ⭐", value: 2 },
    { label: "1 ⭐", value: 1 },
];

const RatingStar = (props) => {
    const { value } = props;

    const stars = Array.from({ length: 5 }, (_, index) => (
        <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`h-6 w-6 cursor-pointer text-amber-500 ${index < value ? "fill-current" : ""}`}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            ></path>
        </svg>
    ));

    return (
        <div className="flex items-center gap-1">
            {stars}
            <Typography color="blue-gray" className="font-medium text-gray-700">
                ({value})
            </Typography>
        </div>
    );
};

const ProductDetails = (props) => {
    const { addToCart } = props;

    const [product, setProduct] = React.useState({});
    // const [loading, setLoading] = React.useState(true);
    const [images, setImages] = React.useState([]);
    const [reviews, setReviews] = React.useState([]);
    const [activeTab, setActiveTab] = React.useState("all");
    const [similarProducts, setSimilarProducts] = React.useState([]);

    const fetchSimilarProducts = async (productId) => {
        const response = await getSimilarProducts(productId);
        if (response.success) {
            setSimilarProducts(response.data);
        }
    };

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

    const fetchReviews = async (productId) => {
        const response = await getReviewByProduct(productId);
        if (response.success) {
            setReviews(response.data);
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
        fetchReviews(productId);
        fetchSimilarProducts(productId);
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
                            <RatingStar value={product?.reviews?.avgRating || 0} />
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
                    <div>
                        <Tabs value="all" className="bg-transparent">
                            <TabsHeader
                                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                                indicatorProps={{
                                    className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                }}
                            >
                                {reviewsTab.map(({ label, value }) => (
                                    <Tab
                                        key={value}
                                        value={value}
                                        onClick={() => setActiveTab(value)}
                                        className={activeTab === value ? "text-gray-900" : ""}
                                    >
                                        {label}
                                    </Tab>
                                ))}
                            </TabsHeader>
                            <TabsBody
                                animate={{
                                    initial: { y: 250 },
                                    mount: { y: 0 },
                                    unmount: { y: 250 },
                                }}
                            >
                                {reviewsTab.map((tab, index) => (
                                    <TabPanel key={index.toString()} value={tab.value}>
                                        {reviews
                                            ?.filter((review) => review.rating === tab.value || tab.value === "all")
                                            .map((review, index) => (
                                                <div key={index.toString()} className="flex flex-row gap-2">
                                                    <img
                                                        src={review?.user?.avatar || NO_AVATAR}
                                                        alt={review?.name}
                                                        className="h-10 w-10 rounded-full"
                                                    />
                                                    <div className="flex flex-col gap-2">
                                                        <div>
                                                            <h1 className="text-lg font-bold">{review?.name}</h1>
                                                            <Rating value={review?.rating} readonly />
                                                        </div>
                                                        <div>{review?.review}</div>
                                                    </div>
                                                </div>
                                            ))}
                                    </TabPanel>
                                ))}
                            </TabsBody>
                        </Tabs>
                    </div>
                </div>
                <div className="mt-5">
                    <h1 className="text-xl font-bold">Similar books</h1>
                    <div className="flex w-full flex-row gap-5 overflow-auto">
                        {similarProducts.map((product, index) => (
                            <div className="mb-2 rounded-2xl shadow-sm">
                                <div className="h-[200px] w-[150px]">
                                    <img alt="" src={product.thumbnail || NO_IMAGE} />
                                </div>
                                <div className="flex flex-col gap-2 px-2">
                                    <h1 className="text-lg font-bold">{product.name}</h1>
                                    <div className="text-xl font-bold text-red-500">{currencyFormat(product?.price || 0)}</div>
                                    <div className="mt-4 grid grid-cols-2 items-center justify-center">
                                        <a
                                            href={`/product_details?product_id=${product.product_id}`}
                                            className="flex w-full items-center justify-center px-4 py-2 hover:scale-105 hover:bg-primary hover:text-white"
                                        >
                                            <FiEye />
                                        </a>
                                        <button
                                            onClick={() => addToCart({ product_id: product.product_id, quantity: 1 })}
                                            className="flex w-full items-center justify-center px-4 py-2 hover:scale-105 hover:bg-primary hover:text-white"
                                        >
                                            <FaCartPlus />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
