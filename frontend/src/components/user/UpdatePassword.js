import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { Button, FormGroup, Grid, Paper, Stack, TextField, Typography } from "@mui/material";

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState("");

    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    let navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector((state) => state.user);

    const success = (message = "") =>
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    const notify = (error = "") =>
        toast.error(error, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    useEffect(() => {
        if (error) {
            console.log(error);

            notify(error);

            dispatch(clearErrors());
        }

        if (isUpdated) {
            success("Password updated successfully");

            navigate("/profile");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, navigate, isUpdated]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("oldPassword", oldPassword);
        formData.set("password", password);

        dispatch(updatePassword(formData));
    };

    //Paper CSS/Style
    const paperStyle = {
        padding: 40,
        height: '55vh',
        width: 1000,
        margin: "100px auto",
        backgroundColor: "#e2daeb"
    }

    return (
        <Fragment>
            <MetaData title={"Change Password"} />
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Typography variant='h3' align='center' padding='10px'>Change Password</Typography>
                    <form
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                    >
                        <FormGroup>
                            <Stack spacing={4} alignItems='center'>

                                <TextField label='Old Password' variant='standard' id='old_password_field'
                                    type='password' value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)} fullWidth required />

                                <TextField label='New Password' variant='standard' id='new_password_field'
                                    type='password' value={password}
                                    onChange={(e) => setPassword(e.target.value)} fullWidth required />
                                <Button id="register_button" type="submit" size="large" variant="contained" color="secondary" fullWidth disabled={loading ? true : false}>Update Password</Button>
                            </Stack>
                        </FormGroup>
                    </form>
                </Paper>
            </Grid>
        </Fragment>
    );
};

export default UpdatePassword;