import React from "react";

const Banner = () => {
    return (
        <>
            <div className="py-10">
                <div data-aos="slide-up" className="aos-animate container">
                    <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
                        {/* image section */}
                        <div className="">
                            <img
                                data-aos="zoom-in"
                                src="https://bookstore-tcj.netlify.app/assets/library-jI5gRUk5.jpg"
                                alt=""
                                className="mx-auto block h-[350px] w-full max-w-[400px]"
                            />
                        </div>
                        {/* content section */}
                        <div data-aos="slide-up" className="flex flex-col justify-center gap-6 sm:pt-0">
                            <h1 className="text-3xl font-bold sm:text-4xl">Library at your fingertips</h1>
                            <p className="text-sm leading-5 tracking-wide text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero odio minus enim sint quia architecto distinctio
                                quisquam autem suscipit praesentium?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;
