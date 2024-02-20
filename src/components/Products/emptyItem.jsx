import React from "react";

const EmptyItem = () => {
    return (
        <>
            <div className="flex flex-col">
                <img
                    className="w-full transform rounded-lg bg-gray-500 transition-transform duration-300"
                    alt="Thumbnail"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmiZH325PyzJ7Fz2Cg3edua16QDfv9NHKrFQ&usqp=CAU"
                />
                <div className="py-2">
                    <p className="text-md flex h-5 text-wrap rounded-sm bg-gray-800 font-bold"></p>
                    <p id="price" className="mt-1 h-5 rounded-sm bg-gray-800"></p>
                </div>
            </div>
        </>
    );
};

export default EmptyItem;
