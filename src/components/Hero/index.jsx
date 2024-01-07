import React from "react";

const Hero = () => {
    return (
        <>
            <div className="sm:min-[650px] d flex min-h-[550px] items-center justify-center bg-gray-50">
                <div className="container pb-8 sm:pb-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        {/* detail */}
                        <div className="order-2 flex flex-col justify-center gap-4 pt-12 text-center sm:order-1 sm:pt-0 sm:text-left">
                            <h1 data-aos="zoom-out" className="text-5xl font-bold sm:text-6xl lg:text-7xl">
                                His Life will forever be Changed
                                <p className="bg-gradient-to-b from-primary to-secondary bg-clip-text text-right text-sm text-transparent">
                                    by Anonymous
                                </p>
                            </h1>
                            <p data-aos="fade-up" data-aos-duration="500" data-aos-delay="100" className="text-sm">
                                lorem His Life will forever be Changed dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.
                            </p>
                            <div>
                                <button
                                    data-aos="zoom-in"
                                    className="aos-init mt-4 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-white duration-200 hover:scale-105"
                                >
                                    Order Now
                                </button>
                            </div>
                        </div>
                        {/* image */}
                        <div className="relative order-1 flex min-h-[450px] items-center justify-center sm:order-2">
                            <div className="sm-h-[450px] flex h-[300px] items-center justify-center overflow-hidden">
                                <img
                                    data-aos="zoom-in"
                                    src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                                    alt="book cover"
                                    className="sm:[h-450px] mx-auto h-[300px] w-[300px] object-contain sm:w-[450px] sm:scale-125"
                                />
                                {/* other image */}
                                <div className="absolute -bottom-[30px] flex justify-center gap-4 rounded-full bg-white lg:-right-1 lg:top-1/2 lg:-translate-y-1/2 lg:flex-col lg:py-2">
                                    <img
                                        data-aos="zoom-in"
                                        data-aos-once="true"
                                        alt=""
                                        src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                                        className="inline-block h-[130px] max-w-[100px] object-contain duration-200 hover:scale-110 hover:cursor-pointer"
                                    />
                                    <img
                                        data-aos="zoom-in"
                                        data-aos-once="true"
                                        alt=""
                                        src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                                        className="inline-block h-[130px] max-w-[100px] object-contain duration-200 hover:scale-110 hover:cursor-pointer"
                                    />
                                    <img
                                        data-aos="zoom-in"
                                        data-aos-once="true"
                                        alt=""
                                        src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                                        className="inline-block h-[130px] max-w-[100px] object-contain duration-200 hover:scale-110 hover:cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
