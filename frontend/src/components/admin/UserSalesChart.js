import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";
import React, { Fragment } from 'react'
import { Typography } from '@mui/material';

export default function UserSalesChart({ data }) {
    const barColors = ["#BD83B8", "#854f6c", "#DFB6B2"]
    return (
        <Fragment>
            <Typography variant="h6">Sales per customer</Typography>
            <ResponsiveContainer width="90%" height={600}>
                <BarChart
                    data={data}
                >
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="userDetails.name" />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    {/* <Bar dataKey="total" fill="green"  /> */}
                    {/* <Bar dataKey="total" fill="green" stroke="#000000"
                    strokeWidth={5} />  */}
                    <Bar dataKey="total"
                        strokeWidth={5} >
                        {
                            data.map((item, index) => (
                                <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
                            ))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Fragment>

    );
}