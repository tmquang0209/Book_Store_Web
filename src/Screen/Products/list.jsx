import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { getProductList } from "../../API/product";

import ProductItem from "../../components/Products/item";
import EmptyItem from "../../components/Products/emptyItem";
import { getCategory } from "../../API/category";
import { Input } from "@material-tailwind/react";

const emptyArr = Array.from(Array(12).keys());

const sort = [
    {
        name: "best-selling",
        value: "Best Selling",
    },
    {
        name: "featured",
        value: "Featured",
    },
    {
        name: "newest",
        value: "Newest",
    },
    {
        name: "oldest",
        value: "Oldest",
    },
    {
        name: "a-z",
        value: "Alphabet, A - Z",
    },
    {
        name: "z-a",
        value: "Alphabet, Z - A",
    },
    {
        name: "low-high",
        value: "Price, low to high",
    },
    {
        name: "high-low",
        value: "Price, high to low",
    },
];

const Products = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const inputSearch = [
        {
            name: "keyword",
            type: "text",
            placeholder: "Keyword",
            onChange: (e) => setSearchParams({ ...searchParams, keyword: e.target.value }),
        },
        {
            name: "from",
            type: "number",
            placeholder: "From",
            onChange: (e) => setSearchParams({ ...searchParams, from: Number(e.target.value) !== 0 ? Math.abs(e.target.value) : e.target.value }),
        },
        {
            name: "to",
            type: "number",
            placeholder: "To",
            onChange: (e) => setSearchParams({ ...searchParams, to: Number(e.target.value) !== 0 ? Math.abs(e.target.value) : e.target.value }),
        },
    ];

    const [searchParams, setSearchParams] = useState({
        keyword: "",
        category: "",
        sort: "",
        from: "",
        to: "",
    });

    const categoryList = useRef(null);

    const getCategoryList = async () => {
        const res = await getCategory();
        categoryList.current = res.data;
    };

    const fetchBooks = async (searchParams) => {
        console.log(searchParams);
        const res = await getProductList(searchParams);

        setBooks(res.data || []);
        setLoading(false);
    };

    const handleSearch = async (searchParams) => {
        const res = await getProductList(searchParams);
        setBooks(res.data || []);
    };

    useEffect(() => {
        handleSearch(searchParams);
    }, [searchParams]);

    useEffect(() => {
        const url = new URL(window.location.href);
        const keyword = url.searchParams.get("keyword");
        const category = url.searchParams.get("category");
        const sort = url.searchParams.get("sort");
        const from = url.searchParams.get("from");
        const to = url.searchParams.get("to");

        setSearchParams({ keyword, category, sort, from, to });

        fetchBooks({ keyword, category, sort, from, to });
        getCategoryList();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="flex">
                    <ul className="list-none text-xs">
                        <Link to="/" className="inline-block pt-4">
                            Home
                        </Link>
                        <li className="text-zinc-300 inline-block"> / Products</li>
                    </ul>
                </div>
                <h1 className="text-2xl font-bold">All products</h1>
                <div className="mb-5 flex flex-wrap justify-between gap-2">
                    <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        <select
                            className="h-10 w-full rounded-md border border-solid border-brown-100 p-1"
                            onChange={(e) => setSearchParams({ ...searchParams, category: e.target.value })}
                        >
                            <option value="">All</option>
                            {categoryList.current?.map((item, index) => (
                                <option key={index} value={item.category_id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {inputSearch.map((field, index) => (
                            <Input
                                key={index}
                                size="regular"
                                label={field.placeholder}
                                type={field.type}
                                {...(field.type === "number" ? { min: 0 } : {})}
                                value={searchParams[field.name]}
                                id={field.name}
                                className="w-full"
                                placeholder={field.placeholder}
                                onChange={field.onChange}
                            />
                        ))}
                        <select
                            className="h-10 w-full rounded-md border border-solid border-brown-100 p-1"
                            onChange={(e) => setSearchParams({ ...searchParams, sort: e.target.value })}
                        >
                            {sort.map((item, index) => (
                                <option key={index} value={item.name}>
                                    {item.value}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div
                    id="item"
                    className={`grid ${
                        loading ? "animate-pulse" : null
                    } mb-3 grid grid-cols-1 place-items-center gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-5`}
                >
                    {loading
                        ? emptyArr.map((item, index) => (
                              <div className="items-center justify-center">
                                  <EmptyItem index={index} />
                              </div>
                          ))
                        : books &&
                          books.map((item, index) => (
                              <div className="items-center justify-center">
                                  <ProductItem item={item} index={index} />
                              </div>
                          ))}
                    {books.length === 0 && <div className="text-center">No product found</div>}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Products;
