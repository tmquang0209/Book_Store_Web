import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";
import { Rating, Textarea, Typography } from "@material-tailwind/react";

import { getProductsCanReview, submitReview } from "../../API/reviews";

import { NO_IMAGE } from "../../components/Constants/images";

import { Toast } from "../../components/Common/toast";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { connect } from "react-redux";
import { getOrderDetails } from "../../API/order";

const Review = (props) => {
    const { auth } = props;
    const id = useParams().id;
    const [rating, setRating] = useState([]);
    const [review, setReview] = useState([]);
    const [products, setProducts] = useState([]);
    const [msg, setMsg] = useState({
        message: "",
        success: false,
    });

    const handleRating = (value, productId) => {
        setRating((prevRating) => {
            const findIndex = prevRating.findIndex((item) => item.product_id === productId);
            if (findIndex !== -1) {
                prevRating[findIndex].rating = value;
            } else {
                prevRating.push({ product_id: productId, rating: value });
            }
            return [...prevRating];
        });
    };

    const handleReview = (e) => {
        const productId = Number(e.target.dataset.id);
        const newReview = e.target.value;

        setReview((prevReview) => {
            const updatedReview = [...prevReview];
            const findIndex = updatedReview.findIndex((item) => item.product_id === productId);

            if (findIndex !== -1) {
                updatedReview[findIndex].review = newReview;
            } else {
                updatedReview.push({ product_id: productId, review: newReview });
            }

            return updatedReview;
        });
    };

    const handleSubmit = async () => {
        // combine rating and review
        const data = products.map((product) => {
            const findRating = rating.find((item) => item.product_id === product.product_id);
            const findReview = review.find((item) => item.product_id === product.product_id);
            if (!findRating || !findReview) {
                setMsg({ message: "Please review all products", success: false });
                return;
            }
            return {
                product_id: product.product_id,
                rating: findRating?.rating || 0,
                review: findReview?.review || "",
            };
        });

        // submit review
        const res = await submitReview({ reviews: { ...data }, order_id: id });
        setMsg({ message: res.message, success: res.success });
    };

    useEffect(() => {
        if (!id) {
            window.location.href = "/";
        }

        // check can review
        const checkCanReview = async () => {
            const res = await getOrderDetails(id);
            const data = res.data;
            if (data.status !== "delivered") {
                window.location.href = "/orders_history";
            }
        };
        checkCanReview();

        // fetch product details
        const fetchData = async () => {
            const res = await getProductsCanReview(id);
            console.log(res);
            if (res.success) {
                const products = res.data;
                setProducts(products);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!auth.isAuth) {
                window.location.href = "/";
            }
        }, 1000);

        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timer);
    }, [auth.isAuth, auth.user]);

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <div className="pb-5">
                    <button onClick={() => window.history.back()} className="flex items-center text-lg hover:text-primary">
                        <IoIosArrowBack />
                        Go back
                    </button>
                </div>
                {msg.message && <Toast message={msg.message} type={msg.success} />}
                {products.map((product, index) => (
                    <div key={index.toString()} className="my-10 flex flex-col items-center justify-center gap-3">
                        <img src={product.thumbnail || NO_IMAGE} alt={123} className="h-40 w-40 object-cover" />
                        <div>
                            <h1 className="text-2xl font-bold">Review</h1>
                            <h2 className="text-xl">{product.name}</h2>
                        </div>

                        <div className="flex items-center gap-2">
                            <Rating
                                id="rating"
                                data-id={product.product_id}
                                color="yellow"
                                value={rating.find((item) => item.product_id === product.product_id)?.rating || 0}
                                onChange={(value) => handleRating(value, product.product_id)}
                            />
                            <Typography className="text-xl">{rating.find((item) => item.product_id === product.product_id)?.rating || 0}</Typography>
                        </div>
                        <Textarea
                            data-id={product.product_id}
                            variant="outlined"
                            label="Write your review"
                            onChange={handleReview}
                            value={review.find((item) => item.product_id === product.product_id)?.review || ""}
                        />
                    </div>
                ))}
                <div className="flex items-center justify-center">
                    <button onClick={handleSubmit} className="mt-5 rounded-md bg-gradient-to-r from-primary to-secondary px-5 py-2 text-white">
                        Submit
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};
export default connect(mapStateToProps, null)(Review);
