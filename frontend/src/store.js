import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
    authReducer,
    userReducer,
    forgotPasswordReducer,
    allUsersReducer,
    userDetailsReducer,
} from "./reducers/userReducers";

import {
    productsReducer,
    productDetailsReducer,
    newReviewReducer,
    newProductReducer,
    productReducer,
    reviewReducer,
    productReviewsReducer,
} from "./reducers/productReducers";

import {
    servicesReducer,
    newServiceReducer,
    serviceReducer,
    serviceDetailsReducer,
    newReviewsReducer,
    serviceReviewsReducer,
    reviewsReducer
} from "./reducers/serviceReducers";

import { cartReducer } from "./reducers/cartReducers";

import {
    newOrderReducer,
    myOrdersReducer,
    orderDetailsReducer,
    allOrdersReducer,
    orderReducer,
} from "./reducers/orderReducers";

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],

        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
};

const reducer = combineReducers({
    //User
    auth: authReducer,
    allUsers: allUsersReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    userDetails: userDetailsReducer,

    //Product Reducer
    products: productsReducer,
    productDetails: productDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    product: productReducer,

    //Service Reducer
    services: servicesReducer,
    serviceDetails: serviceDetailsReducer,
    newReviews: newReviewsReducer,
    newService: newServiceReducer,
    serviceReviews: serviceReviewsReducer,
    reviews: reviewsReducer,
    service: serviceReducer,

    //Cart Reducer 
    cart: cartReducer,

    //Order Reducer
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
});

const middlware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlware))
);

export default store;