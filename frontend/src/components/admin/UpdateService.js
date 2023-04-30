import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, FormGroup, Grid, Paper, Stack, TextField, Typography } from "@mui/material";


import {
    updateService,
    getServiceDetails,
    clearErrors,
} from "../../actions/serviceActions";

import { UPDATE_SERVICE_RESET } from "../../constants/serviceConstants";

const UpdateService = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const dispatch = useDispatch();

    const { error, service } = useSelector((state) => state.serviceDetails);

    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.service);

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
        if (service && service._id !== id) {
            dispatch(getServiceDetails(id));
        } else {
            setName(service.name);

            setPrice(service.price);

            setDescription(service.description);

            setOldImages(service.images);
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
            navigate("/services");

            successMsg("Services updated successfully");

            dispatch({ type: UPDATE_SERVICE_RESET });
        }
    }, [dispatch, error, isUpdated, navigate, updateError, service, id]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("name", name);

        formData.set("price", price);

        formData.set("description", description);

        images.forEach((image) => {
            formData.append("images", image);
        });

        dispatch(updateService(service._id, formData));
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
        height: '90vh',
        width: 1000,
        margin: "100px auto",
        backgroundColor: "#e2daeb"
    }

    const gridStyle = {
        paddingRight: 50,
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <MetaData title={"Update Service"} />
                    <Grid style={gridStyle}>
                        <Paper elevation={10} style={paperStyle}>
                            <Typography variant='h3' align='center' padding='10px'>Update Service</Typography>
                            <form
                                onSubmit={submitHandler}
                                encType="multipart/form-data"
                            >
                                <FormGroup>
                                    <Stack spacing={2} alignItems='center'>

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

                                        <TextField label='Price' variant='standard' id='price_field'
                                            type='number' value={price}
                                            onChange={(e) => setPrice(e.target.value)} fullWidth required />

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
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateService;