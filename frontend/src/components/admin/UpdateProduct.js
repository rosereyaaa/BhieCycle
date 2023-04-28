import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
// import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Avatar, Button, FormGroup, Grid, Select, MenuItem, Paper, Stack, TextField, Typography, InputLabel } from "@mui/material";


import {
    updateProduct,
    getProductDetails,
    clearErrors,
} from "../../actions/productActions";

import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [types, setTypes] = useState("");
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
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
    const type = [
        "Accessories",
        "Product"
    ];

    const dispatch = useDispatch();

    const { error, product } = useSelector((state) => state.productDetails);

    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.product);

    let { id } = useParams();

    let navigate = useNavigate();

    const errMsg = (message = "") =>
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    const successMsg = (message = "") =>
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(getProductDetails(id));
        } else {
            setName(product.name);

            setPrice(product.price);

            setDescription(product.description);

            setCategory(product.category);

            setTypes(product.types);

            setStock(product.stock);

            setOldImages(product.images);
        }

        if (error) {
            errMsg(error);

            dispatch(clearErrors());
        }

        if (updateError) {
            errMsg(updateError);

            dispatch(clearErrors());
        }

        if (isUpdated) {
            navigate("/admin/products");

            successMsg("Product updated successfully");

            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [dispatch, error, isUpdated, navigate, updateError, product, id]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("name", name);

        formData.set("price", price);

        formData.set("description", description);

        formData.set("category", category);

        formData.set("stock", stock);

        formData.set("types", types);

        images.forEach((image) => {
            formData.append("images", image);
        });

        dispatch(updateProduct(product._id, formData));
    };

    const onChange = (e) => {
        const files = Array.from(e.target.files);

        setImagesPreview([]);

        setImages([]);

        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldArray) => [...oldArray, reader.result]);

                    setImages((oldArray) => [...oldArray, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    //Paper CSS/Style
    const paperStyle = {
        padding: 40,
        height: '130vh',
        width: 1000,
        margin: "100px auto",
        backgroundColor: "#e2daeb"
    }

    return (
        <Fragment>
            <MetaData title={"Update Product"} />
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Typography variant='h3' align='center' padding='10px'>Update Products</Typography>
                    <form
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                    >
                        <FormGroup>
                            <Stack spacing={2} alignItems='center'>

                                <TextField label="Type" fullWidth disabled variant="standard"></TextField>
                                <Select
                                    labelId="types"
                                    label="Types"
                                    id="types_field"
                                    value={types}
                                    onChange={(e) => setTypes(e.target.value)}
                                    fullWidth required
                                >
                                    {type.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <TextField label='Name' variant='standard' id='name_field'
                                    type='name' value={name}
                                    onChange={(e) => setName(e.target.value)} fullWidth required />
                                <TextField
                                    id="description_field"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    fullWidth required
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                {/* <InputLabel sx={{ textAlign: 'left', marginRight: '10px' }}>Categories</InputLabel> */}
                                <TextField label="Category" fullWidth disabled variant="standard"></TextField>
                                <Select
                                    labelId="category"
                                    label="Categories"
                                    id="category_field"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    fullWidth required
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>

                                <TextField label='Price' variant='standard' id='price_field'
                                    type='number' value={price}
                                    onChange={(e) => setPrice(e.target.value)} fullWidth required />

                                <TextField label='Stock' variant='standard' id='stock_field'
                                    type='number' value={stock}
                                    onChange={(e) => setStock(e.target.value)} fullWidth required />

                                {/* <div className="custom-file">
                                    <label>Images</label> */}

                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="images"
                                        className="custom-file-input"
                                        id="customFile"
                                        onChange={onChange}
                                        multiple
                                        fullWidth
                                    />

                                    <label className="custom-file-label" htmlFor="customFile">
                                        Choose Images
                                    </label>
                                </div>

                                {oldImages &&
                                    oldImages.map((img) => (
                                        <img
                                            key={img}
                                            src={img.url}
                                            alt={img.url}
                                            className="mt-3 mr-2"
                                            width="55"
                                            height="52"
                                        />
                                    ))}

                                {imagesPreview.map((img) => (
                                    <img
                                        src={img}
                                        key={img}
                                        alt="Images Preview"
                                        className="mt-3 mr-2"
                                        width="55"
                                        height="52"
                                    />
                                ))}
                                {/* </div> */}
                                <Button id="register_button" type="submit" size="large" variant="contained" color="secondary" fullWidth>Update Product</Button>
                            </Stack>
                        </FormGroup>
                    </form>
                </Paper>
            </Grid>
        </Fragment>
    );
};

export default UpdateProduct;