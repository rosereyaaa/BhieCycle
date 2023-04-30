import React, { useState, Fragment } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';

export default function MonthlySalesChart({ data }) {
    const [xValues, setXValues] = useState([])

    const formatDate = (date) => {
        if (xValues.includes(date.getMonth())) {
            setXValues([...xValues, date.getMonth()])

        } return ''
    }

    return (
        <Fragment>
            <Typography variant="h6">Monthly Sales Chart</Typography>
            <ResponsiveContainer width="95%" height={300}>
                <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="total" stroke="#8884d8" />
                    <CartesianGrid stroke="#451952" strokeDasharray="5 5" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </Fragment>
    );
}