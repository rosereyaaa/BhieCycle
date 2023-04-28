import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, FormGroup, Grid, Input, Paper, Stack, TextField, Typography } from "@mui/material";
import Header from '../layout/Header'

const Register = () => {
    // const [user, setUser] = useState({
    //     name: "",
    //     email: "",
    //     password: "",
    // });

    // const { name, email, password } = user;
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState("");

    // const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(
        "/images/default_avatar.jpg"
    );

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }

        if (error) {
            dispatch(clearErrors());
        }
    }, [dispatch, isAuthenticated, error, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("password", password);
        formData.set("avatar", avatar);

        dispatch(register(formData));
    };
    const onChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            // setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    //Avatar Functions
    // const [avatar, setAvatar] = useState(null);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        setAvatarPreview(URL.createObjectURL(file));
        setAvatar(file);
    };

    //Paper CSS/Style
    const paperStyle = {
        padding: 100,
        height: '80vh',
        width: 500,
        margin: "100px auto",
        backgroundColor: "#e2daeb"
    }

    return (
        <Fragment>
            <Header />
            <MetaData title={"Register User"} />
            <Grid color='#f4effc'>
                <Paper elevation={10} style={paperStyle}>
                    <Typography variant='h3' align='center' padding='10px'>Register</Typography>
                    <form
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                    >
                        <FormGroup>
                            <Stack spacing={2} alignItems='center'>
                                <TextField label='Name' variant='standard' id='name_field'
                                    type='name' value={name}
                                    onChange={(e) => setName(e.target.value)} fullWidth required />
                                <TextField label='Email' variant='standard' id='email_field'
                                    type='email' value={email}
                                    onChange={(e) => setEmail(e.target.value)} fullWidth required />
                                <TextField label='Password' variant='standard' id='password_field'
                                    type='password' value={password}
                                    onChange={(e) => setPassword(e.target.value)} fullWidth required />
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="custom-file-input"
                                        id="customFile"
                                        accept="images/*"
                                        onChange={onChange}
                                    />
                                    <label className="custom-file-label" htmlFor="customFile">
                                        Choose Avatar
                                    </label>
                                </div>
                                <Button id="register_button" type="submit" size="large" variant="contained" color="secondary" fullWidth>Register</Button>
                            </Stack>
                        </FormGroup>
                    </form>
                </Paper>
            </Grid>
        </Fragment>
    );
};

export default Register;