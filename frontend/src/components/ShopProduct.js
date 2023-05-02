import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import Header from "./layout/Header";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider, { Range, createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import { Grid } from "@mui/material";

//

const ShopProduct = ({ match }) => {
    const dispatch = useDispatch();

    const createSliderWithToolTip = Slider.createSliderWithToolTip;
    const Range = createSliderWithTooltip(Slider.Range);
    const [price, setPrice] = useState([1, 1000]);

    const categories = [
        "Whole Built Bike",
        "Frames",
        "Brakes",
        "Wheel Sets",
        "Drivetrain Groupsets",
        "Handle Bars",
        "Helmets",
        "Shoes",
        "Jerseys",
        "Shorts",
        "Masks",
        "Sports Glasses",
        "Bell"
    ];

    const {
        loading,
        products,
        error,
        productsCount,
        resPerPage,
        filteredProductsCount,
    } = useSelector((state) => state.products);

    const [category, setCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    let { keyword } = useParams();

    useEffect(() => {
        if (error) {
            console.log(error);
        }
        dispatch(getProducts(keyword, currentPage, price, category));
    }, [dispatch, error, keyword, price, currentPage, category]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }
    let count = productsCount;

    if (keyword) {
        count = filteredProductsCount;
    }

    console.log(keyword, count, filteredProductsCount, resPerPage);

    const [dataSource, setDataSource] = useState(products.slice(0, 3));
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreData = () => {
        if (dataSource.length < products.length) {
            setTimeout(() => {
                const newData = products.slice(0, dataSource.length + 3);
                setDataSource(newData);
            }, 500);
        } else {
            setHasMore(false);
        }
    };

    console.log(dataSource)
    return (
        <Fragment>
            <Header /><br /><br /><br />
            <div class="container">
                <MetaData title={"Buy Best Products Online"} />
                <div className="row"></div>
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <InfiniteScroll
                            dataLength={dataSource.length}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={<p>Loading...</p>}
                            endMessage={
                                <p style={{ textAlign: "center" }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }>
                            {products.map((product) => (
                                <Product key={product._id} product={product} />
                            ))}
                        </InfiniteScroll>
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
};

export default ShopProduct;