import React from "react";
import Slider from "react-slick";

const reviews = [
    {
        id: 1,
        name: "Victor 1",
        image: "https://picsum.photos/101/101",
        review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    },
    {
        id: 2,
        name: "Victor 2",
        image: "https://picsum.photos/101/101",
        review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    },
    {
        id: 3,
        name: "Victor 3",
        image: "https://picsum.photos/101/101",
        review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    },
];

const Testimonial = () => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        pauseOnHover: true,
        pauseOnFocus: true,
        responsive: [
            {
                breakpoint: 10000,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            <div className="py-10">
                <div className="container">
                    {/* header */}
                    <div data-aos="slide-up" className="mx-auto mb-20 max-w-[600px] text-center">
                        <p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-sm text-transparent">What our customer says</p>
                        <h1 className="text-3xl font-bold">Testimonials</h1>
                        <p className="text-xs text-gray-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa iure, corporis</p>
                    </div>
                    {/* review card */}
                    <div data-aos="zoom-in" className="mx-auto grid grid-cols-1 gap-6">
                        <Slider {...settings}>
                            {reviews.map((review) => (
                                <div className="my-6">
                                    <div key={review.id} className="relative mx-4 flex flex-col gap-4 rounded-xl bg-primary/10 px-6 py-8 shadow-lg">
                                        <div>
                                            <img className="h-20 w-20 rounded-full" src={review.image} alt="" />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">{review.review}</p>
                                                <h1 className="dark:text-light text-xl font-bold text-black/80">{review.name}</h1>
                                            </div>
                                        </div>

                                        <p className="absolute right-0 top-0 font-serif text-9xl text-black/20">,,</p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Testimonial;
