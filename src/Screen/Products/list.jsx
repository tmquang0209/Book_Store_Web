import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { getProductList } from "../../API/product";

import ProductItem from "../../components/Products/item";
import EmptyItem from "../../components/Products/emptyItem";
import { getCategory } from "../../API/category";
import { Input } from "@material-tailwind/react";
import { LIMIT_PER_PAGE } from "../../components/Constants/number";

const emptyArr = Array.from(Array(12).keys());

const sortArr = [
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
    const [active, setActive] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);

    const inputSearch = [
        {
            name: "keyword",
            type: "text",
            placeholder: "Keyword",
            onChange: (e) => {
                setSearchParams({ ...searchParams, keyword: e.target.value });

                // Update URL
                const url = new URL(window.location.href);
                url.searchParams.set("keyword", e.target.value);

                // Update the browser's location without triggering a page reload
                window.history.pushState({}, "", url.toString());
            },
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

    const onValueChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
        // add to url
        const url = new URL(window.location.href);
        url.searchParams.set(e.target.name, e.target.value);
    };

    const fetchBooks = async (searchParams) => {
        const res = await getProductList(searchParams);

        setBooks(res.data || []);
        setNumberOfPages(Math.ceil(res.data.length / LIMIT_PER_PAGE));
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
        // set selected value
        // category
        const checkCategory = categoryList.current?.find((item) => item.category_id === category);
        if (checkCategory) {
            document.getElementById("category").value = checkCategory.category_id;
        }
        // sort
        const checkSort = sortArr.find((item) => item.name === sort);
        if (checkSort) {
            document.getElementById("sort").value = checkSort.name;
        }

        fetchBooks({ keyword, category, sort, from, to });
        getCategoryList();
    }, []);

    // pagination
    const getItemProps = (index) => ({
        variant: active === index ? "filled" : "text",
        color: "gray",
        onClick: () => setActive(index),
    });

    const next = () => {
        console.log(active, numberOfPages);
        if (active === numberOfPages) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };

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
                                size="lg"
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
                            id="sort"
                            className="h-10 w-full rounded-md border border-solid border-brown-100 p-1"
                            onChange={(e) => setSearchParams({ ...searchParams, sort: e.target.value })}
                        >
                            {sortArr.map((item, index) => (
                                <option
                                    key={index}
                                    value={item.name}
                                    {...searchParams}
                                    {...(searchParams["sort"] === item.value ? "selected" : null)}
                                >
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
                          books.slice((active - 1) * LIMIT_PER_PAGE, active * LIMIT_PER_PAGE).map((item, index) => (
                              <div className="items-center justify-center">
                                  <ProductItem item={item} index={index} />
                              </div>
                          ))}
                    {books.length === 0 && <div className="text-center">No product found</div>}
                </div>
                <div className="mb-5 flex justify-center self-auto">
                    <Button variant="text" className="flex items-center gap-2" onClick={prev} disabled={active === 1}>
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {Array.from(Array(numberOfPages).keys()).map((index) => (
                            <Button key={index} {...getItemProps(index + 1)}>
                                {index + 1}
                            </Button>
                        ))}
                    </div>
                    <Button variant="text" className="flex items-center gap-2" onClick={next} disabled={active === numberOfPages}>
                        Next
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Products;
