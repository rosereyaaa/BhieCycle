import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import React, { Fragment } from 'react'
import { Typography } from '@mui/material';

export default function ProductCountChart({ data }) {
    const pieColors = [
        "#BD83B8",
        "#854f6c",
        "#DFB6B2",
        "#451952",
        "#662549",
        "#AE445A",
        "#F39F5A",
        "#E8BCB9",
        "#FF6633",
        "#FFB399",
        "#FF33FF",
        "#FFFF99",
        "#00B3E6",
        "#E6B333",
        "#3366E6",
        "#999966",
        "#809980",
        "#E6FF80",
        "#1AFF33",
        "#999933",
        "#FF3380",
        "#CCCC00",
        "#66E64D",
        "#4D80CC",
        "#FF4D4D",
        "#99E6E6",
        "#6666FF"
    ]

    const data02 = data.map(product => ({
        name: product.name,
        value: product.totalStock
    }));

    return (
        <Fragment>
            <Typography variant="h6">Products Stock Count</Typography>
            <ResponsiveContainer width="100%" height={700}>
                <PieChart width={1000} height={400}>
                    <Pie
                        data={data02}
                        dataKey="value"
                        nameKey="name"
                        isAnimationActive={true}
                        cx="50%"
                        cy="50%"
                        outerRadius={300}
                        fill="#8884d8"
                        label
                    >
                        {
                            data02.map((entry, index) => <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />)
                        }
                    </Pie>
                    <Tooltip />
                    <Legend layout="horizontal" verticalAlign="top" align="center"></Legend>
                </PieChart>
            </ResponsiveContainer>
        </Fragment>
    );
}
