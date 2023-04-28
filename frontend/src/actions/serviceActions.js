import axios from "axios";

import {
    ADMIN_SERVICES_REQUEST,
    ADMIN_SERVICES_SUCCESS,
    ADMIN_SERVICES_FAIL,
    SERVICE_DETAILS_REQUEST,
    SERVICE_DETAILS_SUCCESS,
    SERVICE_DETAILS_FAIL,
    NEW_SERVICE_REQUEST,
    NEW_SERVICE_SUCCESS,
    NEW_SERVICE_FAIL,
    UPDATE_SERVICE_REQUEST,
    UPDATE_SERVICE_SUCCESS,
    UPDATE_SERVICE_FAIL,
    DELETE_SERVICE_REQUEST,
    DELETE_SERVICE_SUCCESS,
    DELETE_SERVICE_FAIL,
    CLEAR_ERRORS
} from "../constants/serviceConstants";

export const getAdminServices = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_SERVICES_REQUEST });

        const { data } = await axios.get(`/api/v1/services`);

        dispatch({
            type: ADMIN_SERVICES_SUCCESS,

            payload: data.services,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_SERVICES_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const newService = (servicesData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_SERVICE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            `/api/v1/service/new`,
            servicesData,
            config
        );

        dispatch({
            type: NEW_SERVICE_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: NEW_SERVICE_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getServiceDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: SERVICE_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/service/${id}`);

        dispatch({
            type: SERVICE_DETAILS_SUCCESS,
            payload: data.service,
        });
    } catch (error) {
        dispatch({
            type: SERVICE_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updateService = (id, servicesData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SERVICE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(
            `/api/v1/update/service/${id}`,
            servicesData,
            config
        );

        dispatch({
            type: UPDATE_SERVICE_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_SERVICE_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteService = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_SERVICE_REQUEST });

        const { data } = await axios.delete(`/api/v1/remove/service/${id}`);

        dispatch({
            type: DELETE_SERVICE_SUCCESS,

            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_SERVICE_FAIL,

            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};