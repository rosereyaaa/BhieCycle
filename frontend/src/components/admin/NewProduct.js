import React, { Fragment, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
// import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { newProduct, clearErrors } from "../../actions/productActions";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Toast from "../layout/Toast";
import { Avatar, Button, FormGroup, Grid, Select, MenuItem, Paper, Stack, TextField, Typography, InputLabel } from "@mui/material";

const NewProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [types, setTypes] = useState("");
    const [images, setImages] = useState([]);
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

    let navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.newProduct);

    const message = (message = "") =>
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    useEffect(() => {
        if (error) {
            toast("Error", "Error");
            dispatch(clearErrors());
        }

        if (success) {
            toast("New Product!", "Success");
            navigate("/admin/products");

            message("Product created successfully");

            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, error, success, navigate]);

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

        dispatch(newProduct(formData));
    };

    const onChange = (e) => {
        const files = Array.from(e.target.files);

        setImagesPreview([]);

        setImages([]);

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

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        setImagesPreview(URL.createObjectURL(file));
        imagesPreview(file);
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
            <MetaData title={"New Product"} />
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Typography variant='h3' align='center' padding='10px'>New Products</Typography>
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

                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="custom-file-input"
                                        id="customFile"
                                        accept="images/*"
                                        onChange={onChange}
                                        multiple
                                    />
                                    <label className="custom-file-label" htmlFor="customFile">
                                        Choose Avatar
                                    </label>
                                </div>
                                <Button id="register_button" type="submit" size="large" variant="contained" color="secondary" fullWidth>Create Product</Button>
                            </Stack>
                        </FormGroup>
                    </form>
                </Paper>
            </Grid>
        </Fragment>
    );
};

export default NewProduct;