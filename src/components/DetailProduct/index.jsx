const DetailProduct = () => {


    return (
        <div className="w4/5 flex justify-around mt-12">
            <div>
                <div>
                    <img src={'https://bookstore-tcj.netlify.app/assets/library-jI5gRUk5.jpg'} alt="Ảnh chính" />
                </div>
                <div className="flex justify-around mt-8">
                    <img className="w-40" src={'https://bookstore-tcj.netlify.app/assets/library-jI5gRUk5.jpg'} alt="Ảnh phụ" />
                    <img className="w-40" src={'https://bookstore-tcj.netlify.app/assets/library-jI5gRUk5.jpg'} alt="Ảnh phụ" />
                    <img className="w-40" src={'https://bookstore-tcj.netlify.app/assets/library-jI5gRUk5.jpg'} alt="Ảnh phụ" />
                </div>
            </div>
            <div>
                <h1 className="font-bold text-xl">Name Name Name</h1>
                {/* rate */}
                <p>36 view</p>
                <p className="font-bold">40$</p>
                <p className="text-orange-700">Còn 5 sản phẩm trong kho</p>
                <div>
                    <p>Loại sản phẩm:</p>
                    <div className="flex justify-around">
                        <input type="radio" name="type-of-book" value={"old"} />Old
                        <input type="radio" name="type-of-book" value={'new'} />New
                    </div>
                </div>
                <div className="inline">
                    <p>There are
                        <div className="inline">
                            {/* so nguoi dang xem */}
                        </div>
                        people viewing this product right now.</p>
                </div>
                <div>
                    <div>
                        <button className="w-6 h-8">-</button>
                        <input type="number" min={1} className="appearance-none focus:border-none" readOnly />
                        <button className="w-6 h-8 border-solid" >+</button>
                    </div>
                    <div>
                        <button>ADD TO CART</button>
                    </div>
                </div>
                <h2>Estimated delivery between:</h2>
                <h3>
                    {/* dien ngay du kien, khoang 3 ngay */}
                </h3>
            </div>
        </div>
    );
}
export default DetailProduct;