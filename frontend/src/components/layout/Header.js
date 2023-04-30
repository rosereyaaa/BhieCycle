import React, { Fragment, useState } from "react";
// import "../../App.css";
import { Route, Link, Routes } from "react-router-dom";
import Search from "./Search";
import { logout, loadUser } from "../../actions/userActions";
import "../../App.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Menu, MenuItem, Divider, TextField } from "@mui/material";
import { BsCart4 } from 'react-icons/bs';

const Header = () => {
    const notify = (message = "") =>
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    const dispatch = useDispatch();

    const { user, loading, admin } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    // const { cartItems } = useSelector((state) => state.cart);

    // const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout());
        notify("Logged Out Successfully");
    };

    const profileHandler = () => {
        dispatch(loadUser());
    };

    const headerStyle = {
        backgroundColor: "#67568c"
    }

    //Avatar DropDown
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const handleCloser = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    return (
        <Fragment>
            <AppBar style={headerStyle}>
                <Toolbar>
                    <Link to="/">
                        <img src="/images/BhieCycle -logo.png" width="100" />
                    </Link>

                    {user ? (
                        <Fragment>
                            {/* <IconButton
                                size="medium"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ marginRight: 2 }}
                            >
                                <i class="fa fa-bars"></i>
                                <MenuIcon />
                            </IconButton> */}

                            {/* <Typography>Bhie-Cycle</Typography> */}
                            <Button color="inherit" href="/ShopProduct" >Shop Products </Button>
                            {/* <TextField
                                variant="outlined"
                                placeholder={<Search />}
                                sx={{ width: '50%' }}
                            /> */}
                            <div className="col-12 col-md-6 mt-2 mt-md-0">
                                <Search />
                            </div>
                            <Link to="/cart" style={{ textDecoration: "none", marginLeft: "auto" }}>
                                <span id="cart" className="ml-2">
                                    Cart
                                </span>
                                <BsCart4 style={{ width: 30, height: 30, color: "white" }} />
                                <span className="ml-1" id="cart_count">
                                    {cartItems.length}
                                </span>
                            </Link>
                            <Button color="inherit" onClick={handleClick}>
                                <Avatar src={user.avatar && user.avatar.url}
                                    alt={user && user.name} sx={{ width: 56, height: 56, marginLeft: "" }}>
                                </Avatar>
                            </Button>
                            <Menu
                                id="dropdown-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem component={Link} to="/profile">Profile</MenuItem>
                                <Divider />
                                <MenuItem onClick={logoutHandler} to="/">Logout</MenuItem>
                            </Menu>
                        </Fragment>

                    ) : (
                        !loading && (
                            // <Link to="/login" className="btn ml-4" id="login_btn">
                            //     Login
                            // </Link>
                            <Fragment>
                                {/* <Typography>Bhie-Cycle</Typography> */}
                                <Typography component={Link} to="/" style={{ textDecoration: 'none' }} variant="h6" color="inherit" href="/" sx={{ fontSize: 24 }}>
                                    Bhie-Cycle
                                </Typography>
                                <Button sx={{ marginLeft: "auto" }} color="inherit" href="/login">Login</Button>
                                <Button color="inherit" href="/register">Register</Button>
                            </Fragment>
                        )
                    )}
                    {/* </div> */}
                    {/* </nav> */}
                </Toolbar>
            </AppBar >
        </Fragment >
    );
};

export default Header;